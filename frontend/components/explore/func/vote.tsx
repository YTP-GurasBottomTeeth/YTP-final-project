'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import { callTransaction } from "@/lib/callTransaction";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";

export default function Vote({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('vote')
      const newsIdInput = doc?.querySelector('#newsId')
      const approveInput = doc?.querySelector('#approve')
      if(newsIdInput instanceof HTMLInputElement && approveInput instanceof HTMLInputElement) {
        const newsId = newsIdInput.value
        const approve = approveInput.checked
        await callTransaction(contract.current, 'vote', [newsId, approve])
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='vote'>
        <Input type="number" label="newsId" />
        <Input type="checkbox" label="approve" />
        <Button text={'Vote'} onClick={submit} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}