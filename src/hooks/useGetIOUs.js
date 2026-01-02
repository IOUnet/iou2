import React, {useEffect, useState, useCallback, useContext} from 'react'
import { useReadContract, useAccount } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { formatEther, hexToString } from 'viem'
import ChainWebContext from '../context/chain/ChainWebContext'
import StoreIOUsArtifact from '../artifacts/StoreIOUs.json'
import ProxyIOUArtifact from '../artifacts/ProxyIOU.json'
import IOUTokenArtifact from '../artifacts/IOUtoken.json'
import { ADDRESS_BOOK } from '../constants'

const StoreIOUsABI = StoreIOUsArtifact.abi
const ProxyIOUABI = ProxyIOUArtifact.abi
const IOUTokenABI = IOUTokenArtifact.abi

export default function useGetIOUs() {
    const { address: account } = useAccount()
    const { chainId } = useContext(ChainWebContext)
    const [IOUAddresses, setIOUAddresses] = useState([])
    const [IOUList, setIOUList] = useState([])

    const chainKey = chainId ? String(chainId) : null
    const chainAddresses = (chainKey && ADDRESS_BOOK?.[chainKey]) || {}

    // Get the list of IOU addresses for the user
    const { data: iouAddresses } = useReadContract({
        address: chainAddresses.StoreIOUs,
        abi: StoreIOUsABI,
        functionName: 'getIOUList',
        args: [account],
        enabled: !!account && !!chainAddresses.StoreIOUs,
    })

    useEffect(() => {
        if (iouAddresses) {
            setIOUAddresses(iouAddresses)
        }
    }, [iouAddresses])

    // For each address, get the IOU details
    useEffect(() => {
        if (IOUAddresses.length > 0) {
            const fetchDetails = async () => {
                const details = []
                for (const addr of IOUAddresses) {
                    try {
                        const iouData = await readContract({
                            address: chainAddresses.ProxyIOU,
                            abi: ProxyIOUABI,
                            functionName: 'getIOU',
                            args: [addr],
                        })
                        if (iouData) {
                            const desc = iouData.description
                            const keys = desc.keywords.map(k => hexToString(k))
                            details.push({
                                id: details.length,
                                title: iouData.name,
                                symbol: iouData.symbol,
                                count: details.length,
                                description: desc.description,
                                issuerName: desc.myName,
                                issuerAddr: desc.issuer,
                                socialProfile: desc.socialProfile,
                                keys: keys.join(','),
                                portfolio: "coming soon...",
                                address: addr,
                                minted: formatEther(desc.totalMinted),
                                payed: formatEther(desc.totalBurned),
                                rating: desc.avRate,
                                units: hexToString(desc.units),
                                location: desc.location,
                                phone: hexToString(desc.phone)
                            })
                        }
                    } catch (error) {
                        console.error('Error fetching IOU details:', error)
                    }
                }
                setIOUList(details)
            }
            fetchDetails()
        }
    }, [IOUAddresses, chainAddresses.ProxyIOU])

    return IOUList
}
