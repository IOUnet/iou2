import React, { useState, useCallback, useMemo } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { getAddress, isAddress, parseEther } from 'viem'
import * as t from '../assets/translations.json'
import { mapTxError } from '../helpers/txErrors'
import { generateQrDataUrl } from '../helpers/qr'

// ERC20 Token ABI with mint function
const ERC20_ABI = [
  {
    "constant": false,
    "inputs": [
      {"name": "to", "type": "address"},
      {"name": "amount", "type": "uint256"},
      {"name": "comment", "type": "string"}
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const STAGES = {
    DRAFT: 'draft',
    REVIEW: 'review',
    SUBMITTING: 'submitting',
    RESULT: 'result'
}

export default function useSendIOU() {
    const { address, isConnected } = useAccount()
    const [isApproved, setIsApproved] = useState(false)
    const [flowStage, setFlowStage] = useState(STAGES.DRAFT)
    const [draftParams, setDraftParams] = useState()
    const [chainLabel, setChainLabel] = useState('Polygon')
    const [txError, setTxError] = useState()
    const [recipient, setRecipient] = useState('')
    const [isUserConfirmed, setConfirmed] = useState(false)
    const [qrDataUrl, setQrDataUrl] = useState('')

    const {
        writeContract,
        data: hash,
        error: writeError,
        isPending: isWritePending
    } = useWriteContract()

    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isTxConfirmed,
        error: confirmError
    } = useWaitForTransactionReceipt({
        hash,
    })

    // Normalize and validate recipient address for checksum safety
    const normalizedAddress = useMemo(() => {
        if (!recipient) return ''
        try {
            return getAddress(recipient)
        } catch (err) {
            return ''
        }
    }, [recipient])

    const isAddressValid = useMemo(() => {
        if (!recipient) return false
        return isAddress(recipient)
    }, [recipient])

    React.useEffect(() => {
        let active = true

        const buildQr = async () => {
            if (!normalizedAddress) {
                if (active) setQrDataUrl('')
                return
            }

            const url = await generateQrDataUrl(normalizedAddress)
            if (active) setQrDataUrl(url)
        }

        buildQr()

        return () => {
            active = false
        }
    }, [normalizedAddress])

    const beginReview = useCallback((params) => {
        if (!params || !params.tokenAddress || !params.address || !params.amount) {
            throw new Error('Invalid mint parameters')
        }

        setDraftParams(params)
        setChainLabel(params.chainLabel || 'Polygon')
        setTxError(undefined)
        setFlowStage(STAGES.REVIEW)
        setRecipient(params.address || '')
        setConfirmed(false)
    }, [])

    const cancelReview = useCallback(() => {
        setDraftParams(undefined)
        setTxError(undefined)
        setFlowStage(STAGES.DRAFT)
    }, [])

    const confirmSend = useCallback(() => {
        if (!isConnected || !address) {
            setTxError({ code: 'WALLET_NOT_CONNECTED', messageKey: 'connectWalletError' })
            setFlowStage(STAGES.RESULT)
            return
        }

        if (!draftParams) return
        if (isWritePending || isConfirming) return

        if (!isAddressValid || !normalizedAddress) {
            setTxError({ code: 'invalid_address', messageKey: 'tx.error.invalidAddress' })
            setFlowStage(STAGES.RESULT)
            return
        }

        if (!isUserConfirmed) {
            setTxError({ code: 'missing_confirmation', messageKey: 'tx.error.missingConfirmation' })
            setFlowStage(STAGES.RESULT)
            return
        }

        try {
            const tokenAmount = parseEther(draftParams.amount.toString())

            setFlowStage(STAGES.SUBMITTING)
            setTxError(undefined)

            writeContract({
                address: draftParams.tokenAddress,
                abi: ERC20_ABI,
                functionName: 'mint',
                args: [
                    normalizedAddress,
                    tokenAmount,
                    draftParams.comment || ''
                ],
            })

            setIsApproved(true)
        } catch (error) {
            setTxError(mapTxError(error))
            setFlowStage(STAGES.RESULT)
        }
    }, [address, isConnected, draftParams, isWritePending, isConfirming, isAddressValid, normalizedAddress, isUserConfirmed, writeContract])

    React.useEffect(() => {
        if (writeError) {
            setTxError(mapTxError(writeError))
            setFlowStage(STAGES.RESULT)
        }
    }, [writeError])

    React.useEffect(() => {
        if (confirmError) {
            setTxError(mapTxError(confirmError))
            setFlowStage(STAGES.RESULT)
        }
    }, [confirmError])

    React.useEffect(() => {
        if (isTxConfirmed) {
            setFlowStage(STAGES.RESULT)
            setDraftParams(undefined)
        }
    }, [isTxConfirmed])

    const progressStatus = useMemo(() => {
        if (flowStage === STAGES.DRAFT || flowStage === STAGES.REVIEW) return 'idle'
        if (txError) return 'failed'
        if (isTxConfirmed) return 'confirmed'
        if (isWritePending) return 'waiting_wallet'
        if (isConfirming || hash) return 'submitted'
        return 'idle'
    }, [flowStage, txError, isTxConfirmed, isWritePending, isConfirming, hash])

    const errorMessage = txError ? (t[txError.messageKey] || txError.messageKey) : undefined

    return {
        stage: flowStage,
        reviewParams: draftParams,
        beginReview,
        confirmSend,
        cancelReview,
        isApproved,
        progress: {
            status: progressStatus,
            txHash: hash,
            chainLabel,
            errorMessage
        },
        receipt,
        // QR helpers for recipient sharing
        qrValue: normalizedAddress,
        qrDataUrl,
        // Address safety helpers
        recipient,
        setRecipient,
        normalizedAddress,
        isAddressValid,
        // Confirmation gate to force explicit user acknowledgement before sending
        confirmationRequired: true,
        isConfirmed: isUserConfirmed,
        setConfirmed,
    }
}
