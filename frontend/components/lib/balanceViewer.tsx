'use client'

import { callFunction } from "@/lib/callFunction";
import { ReactUseRef } from "@/lib/type";
import { Contract } from "ethers";
import { useEffect, useState } from "react";

export default function BalanceViewer({ contract }: { contract: ReactUseRef<Contract> }) {
  const [balance, setBalance] = useState<string>("")
  
  useEffect(() => {
    const interval = setInterval(async () => {
      if(!contract.current) return
      
      try {
        const [_balance] = await callFunction(contract.current, 'getBalance', [])
        setBalance(_balance.toString())
      } catch(err) {
        console.log(err)
      }
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div>
        <span>{"Account Balance: "}</span>
        <span>{balance}</span>
      </div>
    </>
  )
}