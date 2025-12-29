import React, { useState, useCallback, useMemo } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import * as t from '../assets/translations.json'
import { mapTxError } from '../helpers/txErrors'

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

    const {
        writeContract,
        data: hash,
        error: writeError,
        isPending: isWritePending
    } = useWriteContract()

    const {
        data: receipt,
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        error: confirmError
    } = useWaitForTransactionReceipt({
        hash,
    })

    const beginReview = useCallback((params) => {
        if (!params || !params.tokenAddress || !params.address || !params.amount) {
            throw new Error('Invalid mint parameters')
        }

        setDraftParams(params)
        setChainLabel(params.chainLabel || 'Polygon')
        setTxError(undefined)
        setFlowStage(STAGES.REVIEW)
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

        try {
            const tokenAmount = parseEther(draftParams.amount.toString())

            setFlowStage(STAGES.SUBMITTING)
            setTxError(undefined)

            writeContract({
                address: draftParams.tokenAddress,
                abi: ERC20_ABI,
                functionName: 'mint',
                args: [
                    draftParams.address,
                    tokenAmount,
                    draftParams.comment || ''
                ],
            })

            setIsApproved(true)
        } catch (error) {
            setTxError(mapTxError(error))
            setFlowStage(STAGES.RESULT)
        }
    }, [address, isConnected, draftParams, isWritePending, isConfirming, writeContract])

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
        if (isConfirmed) {
            setFlowStage(STAGES.RESULT)
            setDraftParams(undefined)
        }
    }, [isConfirmed])

    const progressStatus = useMemo(() => {
        if (flowStage === STAGES.DRAFT || flowStage === STAGES.REVIEW) return 'idle'
        if (txError) return 'failed'
        if (isConfirmed) return 'confirmed'
        if (isWritePending) return 'waiting_wallet'
        if (isConfirming || hash) return 'submitted'
        return 'idle'
    }, [flowStage, txError, isConfirmed, isWritePending, isConfirming, hash])

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
    }
}
