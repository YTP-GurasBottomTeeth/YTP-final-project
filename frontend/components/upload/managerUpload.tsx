'use client'

import { Contract } from "ethers"
import { useState } from "react"
import { callTransaction } from "@/lib/callTransaction"
import Input from "./Input"
import Button from "./button"
import ErrMsg from "./errMsg"
import NewsIdViewer from "./newsIdViewer"
import { ReactUseRef } from "@/lib/type"

export default function ManagerUpload({ contract }: { contract: ReactUseRef<Contract>} ) {
  const [newsId, setNewsId] = useState<string>("")
  const [errMsg, setErrMsg] = useState<string>("")

  const doc = document.getElementById('upload')
  const newsURLInput = doc?.querySelector('#newsURL')
  const sourceURLInput = doc?.querySelector('#sourceURL')

  const submit = async () => {
    if(!(newsURLInput instanceof HTMLInputElement && sourceURLInput instanceof HTMLInputElement)) return
    if(!contract.current) return
    const newsURL = newsURLInput.value
    const sourceURL = sourceURLInput.value

    try {
      const [id] = await callTransaction(contract.current, 'managerUpload', [newsURL, sourceURL])
      setNewsId(id)
    } catch(err: any) {
      setErrMsg(err)
    }
  }

  return (
    <>
      <div id='upload'>
        <h1>{"Manager Upload"}</h1>
        <Input label="newsURL" type="url" />
        <Input label="sourceURL" type="url" />
        <Button text="Upload" onClick={submit} />
        <NewsIdViewer newsId={newsId} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}