'use client'

import { Contract, ethers } from "ethers"
import { useState } from "react"
import { callTransaction } from "@/lib/callTransaction"
import Input from "./Input"
import Button from "./button"
import ErrMsg from "./errMsg"
import NewsIdViewer from "./newsIdViewer"
import { ReactUseRef } from "@/lib/type"

export default function Upload({ type, contract, login }: { type: boolean, contract: ReactUseRef<Contract>, login: boolean } ) {
  const title = type ? "Manager Upload" : "Upload"
  const funcName = type ? "managerUpload" : "upload"
  const [newsId, setNewsId] = useState<string>("?")
  const [errMsg, setErrMsg] = useState<string>("")

  const submit = async () => {
    const doc = document.getElementById(funcName)
    const newsURLInput = doc?.querySelector('#newsURL')
    const sourceURLInput = doc?.querySelector('#sourceURL')
    if(!(newsURLInput instanceof HTMLInputElement && sourceURLInput instanceof HTMLInputElement)) return
    if(!contract.current) return
    const newsURL = newsURLInput.value
    const sourceURL = sourceURLInput.value

    try {
      const [id] = await callTransaction(contract.current, funcName, [newsURL, sourceURL])
      const _newsId = id.toString()
      setNewsId(_newsId)
    } catch(err: any) {
      setErrMsg(err.toString())
    }
  }

  return (
    <>
      <div id={funcName} className="w-full">
        <h1 className='text-3xl'>{title}</h1>
        <br />
        <div className="w-full mb-5">
          <Input text="News URL" label="newsURL" type="url" disable={!login} />
          <Input text="Source URL" label="sourceURL" type="url" disable={!login} />
        </div>
        <div className='flex justify-center items-center w-full mb-3'>
          <Button text="Upload" onClick={submit} disable={!login} />
        </div>
        <div className='flex justify-center items-center w-full'>
          <NewsIdViewer newsId={newsId} />
        </div>
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}