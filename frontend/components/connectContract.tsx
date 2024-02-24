'use client'

import { connectContract } from "@/lib/connectContract";
import { ReactUseRef } from "@/lib/type";
import { Signer } from "ethers";
import { Contract } from "ethers";
import { useEffect, useRef } from "react";

export function ConnectContract({ contract, signer }: { contract: ReactUseRef<Contract>, signer: ReactUseRef<Signer> }) {
  const isContractConnected = useRef<boolean>(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if(!isContractConnected.current) {
        if(signer.current) {
          contract.current = connectContract(signer.current)
          isContractConnected.current = true
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <></>
}