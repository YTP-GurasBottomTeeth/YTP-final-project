'use client'

import { callFunction } from "@/lib/callFunction";
import { ReactUseRef } from "@/lib/type";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

export default function BalanceViewer({ contract }: { contract: ReactUseRef<Contract> }) {
  const [balance, setBalance] = useState<string>("?")
  
  useEffect(() => {
    const interval = setInterval(async () => {
      if(!contract.current) return
      
      try {
        const [_balance] = await callFunction(contract.current, 'getBalance', [])
        setBalance(ethers.formatEther(_balance))
      } catch(err) {
        console.log(err)
      }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [contract])

  return (
    <>
      <div className='mt-3 w-[40%]'>
        <span className='w-[50%] inline-block'>{"Account Balance: "}</span>
        <span className='w-[50%] inline-flex justify-end'>
          <span>{balance + " TKS"}</span>
        </span>
      </div>
    </>
  )
}