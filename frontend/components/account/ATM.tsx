'use client'

import { ReactUseRef } from "@/lib/type";
import { Contract, ethers } from "ethers";
import React, { useState } from "react";
import Input from "./Input";
import { callTransaction } from "@/lib/callTransaction";
import { Signer } from "ethers";
import ErrMsg from "./errMsg";
import { contractAddress } from "@/lib/contractInfo";
import Button from "./button";

type CompAttr = {
  type: 'withdraw' | 'deposit' | 'withdrawAll', 
  contract: ReactUseRef<Contract>,
  signer: ReactUseRef<Signer>,
  login: boolean,
}

export default function ATM({ type, contract, signer, login }: CompAttr) {
  const text = { 'withdraw': 'Withdraw', 'deposit': 'Deposit', 'withdrawAll': 'Withdraw All'}[type]
  const [errMsg, setErrMsg] = useState<string>("")
  const onClick = async () => {
    if(!contract.current) return
    const doc = document.getElementById(`ATM_${type}`)
    const amountInput = doc?.querySelector(`#${type}`)
    if(!(amountInput instanceof HTMLInputElement)) return
    const amount = amountInput.value
    try {
      if(type === 'withdraw') {
        await callTransaction(contract.current, 'withdraw', [ethers.parseEther(amount)])
      } else if(type === 'deposit') {
        await signer.current?.sendTransaction({
          to: contractAddress,
          value: ethers.parseEther(amount)
        })
      } else {
        await callTransaction(contract.current, 'withdrawAll', [])
      }
    } catch(err: any) {
      setErrMsg(err.toString())
    }
  }

  return (
    <>
      <div id={`ATM_${type}`} className="block w-full my-2">
        <div className="inline-block w-[75%]">
          <Input label={'amount'} text="Amount" id={type} disable={!login || type === 'withdrawAll'} />
        </div>
        <div className="inline-flex w-[25%] justify-end">
          <Button text={text} disable={!login} onClick={onClick} />
        </div>
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}