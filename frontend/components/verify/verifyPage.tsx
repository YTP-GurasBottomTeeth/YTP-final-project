'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useRef } from "react"
import ConnectContract from "../lib/connectContract"
import ConnetWallet from "../lib/connectWallet"
import Viewer from "./Viewer"
import { useRouter } from "next/navigation"
import { callFunction } from "@/lib/callFunction"

export default async function VerifyPage({ newsId }: { newsId: BigInt }) {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const router = useRouter()

  if(!contract.current) {
    router.push('/internal-error')
    return
  }
  const [newsURL, sourceURL] = await callFunction(contract.current, 'getURLs', [newsId])
  const [newsState] = await callFunction(contract.current, 'verify', [newsId])

  return (
    <>
      <div>
        <ConnetWallet provider={provider} signer={signer} />
        <ConnectContract contract={contract} signer={signer} />
      </div>
      <div id='verify'>
        <Viewer label="News ID" value={newsId.toString()} />
        <Viewer label="News Status" value={newsState} />
        <Viewer label="News URL" value={newsURL} />
        <Viewer label="Source URL" value={sourceURL} />
      </div>
    </>
  )
}