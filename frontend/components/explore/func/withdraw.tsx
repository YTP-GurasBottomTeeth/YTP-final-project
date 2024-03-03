'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import { callTransaction } from "@/lib/callTransaction";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";
import { ethers } from "ethers";

export default function Withdraw({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('withdraw')
      const amountInput = doc?.querySelector('#amount')
      if(amountInput instanceof HTMLInputElement) {
        const amount = amountInput.value
        await callTransaction(contract.current, 'withdraw', [ethers.parseEther(amount)])
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='withdraw'>
        <Input type={'number'} label={'amount'} />
        <Button text={'Withdraw'} onClick={submit} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}