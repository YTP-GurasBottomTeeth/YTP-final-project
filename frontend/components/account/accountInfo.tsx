'use client'

import { useEffect, useState } from "react"
import { ReactUseRef } from "@/lib/type"
import { BrowserProvider, ethers } from "ethers"
import { AbstractProvider } from "ethers"
import { Signer } from "ethers"

type ComponentAttr = {
  provider: ReactUseRef<BrowserProvider | AbstractProvider | null>,
  signer: ReactUseRef<Signer | null>
}

export default function AccountInfo({ provider, signer }: ComponentAttr) {
  const [balance, setBalance] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  useEffect(() => {
    const formatBalance = (balance: bigint): string => {
      return ethers.formatEther(balance)
    }
    const getBalance = async () => {
      const signerAddress = await signer.current?.getAddress()
      if(signerAddress === undefined) {
        // alert('signerAddress is undefined')
        return
      }
      setAddress(signerAddress)
      const signerBalance = await provider.current?.getBalance(signerAddress)
      if(signerBalance === undefined) {
        // alert('signerBalance is undefined')
        return
      }
      setBalance(formatBalance(signerBalance))
    }
    let interval: NodeJS.Timeout
    if(window) {
      interval = setInterval(getBalance, 3000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [])
    
  return (
    <>
      <div>
        <span>{'After connected to the wallet, please wait a second for updating info.'}</span>
      </div>
      <div>
        <span>{'Account: '}</span>
        <span>{address}</span>
      </div>
      <div>
        <span>{'Balance: '}</span>
        <span>{balance}</span>
      </div>
    </>
  )
}