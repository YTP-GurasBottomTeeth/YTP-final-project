'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import { callTransaction } from "@/lib/callTransaction";
import ErrMsg from "../utility/errMsg";

export default function WithdrawAll({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      await callTransaction(contract.current, 'withdrawAll', [])
    } catch(err: any) {
      console.log(err)
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='withdrawAll'>
        <Button text={'WithdrawAll'} onClick={submit} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}