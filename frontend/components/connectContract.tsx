'use client'

import { connectContract } from "@/lib/connectContract";
import { ReactUseRef } from "@/lib/type";
import { Signer } from "ethers";
import { Contract } from "ethers";
import { useEffect, useRef } from "react";

type AttrType = {
  contract: ReactUseRef<Contract>,
  signer: ReactUseRef<Signer>,
  init: () => void
}

export function ConnectContract({ contract, signer, init }: AttrType) {
  const isContractConnected = useRef<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(!isContractConnected.current) {
        if(signer.current) {
          contract.current = connectContract(signer.current)
          isContractConnected.current = true
          console.log('YESSSSSS')
          init()
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <></>
}