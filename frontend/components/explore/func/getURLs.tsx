'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";
import RetValue from "../utility/retValue";

export default function GetURLs({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const [retValue, setRetValue] = useState<any[][2]>([['newsURL', 'null'], ['sourceURL', 'null']])
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('getURLs')
      const newsIdInput = doc?.querySelector('#newsId')
      if(newsIdInput instanceof HTMLInputElement) {
        const newsId = newsIdInput.value
        const [newsURL, sourceURL] = await contract.current.getURLs(newsId)
        setRetValue([
          ['newsURL', newsURL],
          ['sourceURL', sourceURL]
        ])
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err.reason)
    }
  }

  return (
    <>
      <div id='getURLs'>
        <Input type="number" label={'newsId'} />
        <Button text={'Get URLs'} onClick={submit} />
        <RetValue values={retValue} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}