'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract, ethers } from "ethers"
import { useEffect, useRef, useState } from "react"
import Viewer from "./Viewer"
import { callFunction } from "@/lib/callFunction"
import URLBadge from "../lib/badge/urlBadge"
import NewsStatusBadge from "../lib/badge/newsStatusBadge"
import { connectContract } from "@/lib/connectContract"

export default function VerifyPage({ newsId }: { newsId: BigInt }) {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const contract = useRef<Contract | null>(null)
  const [newsURL, setNewsURL] = useState<string>("?")
  const [sourceURL, setSourceURL] = useState<string>("?")
  const [newsState, setNewsState] = useState<string>("Unknown")

  useEffect(() => {
    const init = () => {
      provider.current = ethers.getDefaultProvider('http://localhost:8545/')
      contract.current = connectContract(provider.current)
      dispatchEvent(new Event('connected'))
    }

    const interval = setInterval(async () => {
      if(!contract.current) return
      const [_newsState] = await callFunction(contract.current, 'verify', [newsId])
      setNewsState(_newsState)
    }, 500)

    const listener = async () => {
      if(!contract.current) return
      const [_newsState] = await callFunction(contract.current, 'verify', [newsId])
      const [_newsURL, _sourceURL] = await callFunction(contract.current, 'getURLs', [newsId])
      setNewsURL(_newsURL)
      setSourceURL(_sourceURL)
      setNewsState(_newsState)
    }
    window.addEventListener('connected', listener)

    init()

    return () => {
      clearInterval(interval)
      window.removeEventListener('connected', listener)
    }
  }, [newsId])

  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='block h-[35%] w-[35%]'>
          <div className='h-[80%] w-full' id='verify'>
            <Viewer label="News ID" value={newsId.toString()} />
            <Viewer label="News Status" value={<NewsStatusBadge status={newsState} />} />
            <Viewer label="News URL" value={<URLBadge url={newsURL} />} />
            <Viewer label="Source URL" value={<URLBadge url={sourceURL} />} />
          </div>
        </div>
      </div>
    </>
  )
}
