'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";
import { ethers } from "ethers";

export default function Deposit({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('deposit')
      const amountInput = doc?.querySelector('#amount')
      if(amountInput instanceof HTMLInputElement) {
        const amount = amountInput.value
        const contractAddress = await contract.current.getAddress()
        await signer.current?.sendTransaction({
          to: contractAddress,
          value: ethers.parseEther(amount)
        })
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err.reason)
    }
  }

  return (
    <>
      <div id='deposit'>
        <Input type={'number'} label={'amount'} />
        <Button text={'Deposit'} onClick={submit} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}