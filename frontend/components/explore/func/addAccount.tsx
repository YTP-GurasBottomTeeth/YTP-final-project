'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import { callTransaction } from "@/lib/callTransaction";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";

export default function AddAccount({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('addAccount')
      const addressInput = doc?.querySelector('#address')
      if(addressInput instanceof HTMLInputElement) {
        const address = addressInput.value
        await callTransaction(contract.current, 'addAccount', [address])
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='addAccount'>
        <Input label="address" />
        <Button text={'Add Account'} onClick={submit} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}