'use client'

import { connectContract } from "@/lib/connectContract";
import { ReactUseRef } from "@/lib/type";
import { Signer } from "ethers";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

type AttrType = {
  contract: ReactUseRef<Contract>,
  signer: ReactUseRef<Signer>,
  init?: () => void
}

export default function ConnectContract({ contract, signer, init }: AttrType) {
  const [contractConnected, setContractConnected] = useState<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(!contractConnected) {
        if(signer.current) {
          contract.current = connectContract(signer.current)
          setContractConnected(true)
          if(typeof init !== 'undefined')
            init()
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div>
        <span>{'Contract Status: '}</span>
        <span>{contractConnected ? 'Connected' : 'Not Connected'}</span>
      </div>
    </>
  )
}