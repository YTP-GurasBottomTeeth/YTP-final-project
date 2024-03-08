'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useRef, useState } from "react"
import ConnectContract from "../lib/connectContract"
import ConnetWallet from "../lib/connectWallet"
import { callFunction } from "@/lib/callFunction"
import { useRouter } from "next/navigation"
import Viewer from "./Viewer"
import Button from "./button"
import { callTransaction } from "@/lib/callTransaction"
import ErrMsg from "./errMsg"

export default async function VotePage({ newsId }: { newsId: BigInt }) {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const router = useRouter()
  const [errMsg, setErrMsg] = useState<string>("")

  if(!contract.current) {
    router.push('/internal-error')
    return
  }
  const [newsURL, sourceURL] = await callFunction(contract.current, 'getURLs', [newsId])
  const [newsState] = await callFunction(contract.current, 'verify', [newsId])
  const submit = async (approve: boolean) => {
    if(!contract.current) return
    try {
      await callTransaction(contract.current, 'vote', [newsId, approve])
      router.push(`/vote/${newsId}`)
    } catch(err: any) {
      setErrMsg(err)
    }
  }

  return (
    <>
      <div>
        <ConnetWallet provider={provider} signer={signer} />
        <ConnectContract contract={contract} signer={signer} />
      </div>
      <div id='vote'>
        <Viewer label="News ID" value={newsId.toString()} />
        <Viewer label="News Status" value={newsState} />
        <Viewer label="News URL" value={newsURL} />
        <Viewer label="Source URL" value={sourceURL} />
        <Button text="Deny" onClick={() => submit(false)} />
        <Button text="Approve" onClick={() => submit(true)} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}