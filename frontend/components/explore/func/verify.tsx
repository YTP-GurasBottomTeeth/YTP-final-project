'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";
import RetValue from "../utility/retValue";

export default function Verify({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const [retValue, setRetValue] = useState<any[][2]>([['state', 'null']])
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('verify')
      const newsIdInput = doc?.querySelector('#newsId')
      if(newsIdInput instanceof HTMLInputElement) {
        const newsId = newsIdInput.value
        const state = await contract.current.verify(newsId)
        setRetValue([['state', state]])
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err.reason)
    }
  }

  return (
    <>
      <div id='verify'>
        <Input type={'number'} label={'newsId'} />
        <Button text={'Verify'} onClick={submit} />
        <RetValue values={retValue} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}