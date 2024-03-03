'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import { callTransaction } from "@/lib/callTransaction";
import ErrMsg from "../utility/errMsg";

export default function AddAccount({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const addr = await signer.current.getAddress()
      const [] = await callTransaction(contract.current, 'addAccount', [addr])
    } catch(err: any) {
      console.log(err)
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='addAccount'>
        <Button text={'Add Account'} onClick={submit} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}