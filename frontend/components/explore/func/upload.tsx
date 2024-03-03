'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import { callTransaction } from "@/lib/callTransaction";
import ErrMsg from "../utility/errMsg";
import Input from "../utility/Input";
import RetValue from "../utility/retValue";

export default function Upload({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const [retVal, setRetVal] = useState<any[][2]>([['newsId', 'null']])
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      const doc = document.getElementById('upload')
      const newsURLInput = doc?.querySelector('#newsURL')
      const sourceURLInput = doc?.querySelector('#sourceURL')
      if(newsURLInput instanceof HTMLInputElement && sourceURLInput instanceof HTMLInputElement) {
        const newsURL = newsURLInput.value
        const sourceURL = sourceURLInput.value
        const [newsId] = await callTransaction(contract.current, 'upload', [newsURL, sourceURL])
        setRetVal([
          ['newsId', newsId]
        ])
      }
    } catch(err: any) {
      console.log(err)
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='upload'>
        <Input type="url" label="newsURL" />
        <Input type="url" label="sourceURL" />
        <Button text={'Upload'} onClick={submit} />
        <RetValue values={retVal} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}