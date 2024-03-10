'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useEffect, useRef, useState } from "react"
import Viewer from "./Viewer"
import { callFunction } from "@/lib/callFunction"
import Login from "../lib/login/login"
import URLBadge from "../lib/badge/urlBadge"
import NewsStatusBadge from "../lib/badge/newsStatusBadge"

export default function VerifyPage({ newsId }: { newsId: BigInt }) {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [login, setLogin] = useState<boolean>(false)
  const [newsURL, setNewsURL] = useState<string>("?")
  const [sourceURL, setSourceURL] = useState<string>("?")
  const [newsState, setNewsState] = useState<string>("Unknown")

  useEffect(() => {
    const listener = async () => {
      if(!contract.current) return
      const [_newsURL, _sourceURL] = await callFunction(contract.current, 'getURLs', [newsId])
      setNewsURL(_newsURL)
      setSourceURL(_sourceURL)
    }
    window.addEventListener('login', listener)

    const interval = setInterval(async () => {
      if(!contract.current) return
      const [_newsState] = await callFunction(contract.current, 'verify', [newsId])
      setNewsState(_newsState)
    }, 500)

    return () => {
      clearInterval(interval)
      window.removeEventListener('login', listener)
    }
  }, [])

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
          <div className='h-[20%] flex justify-center items-center w-full mt-3'>
            <Login 
              provider={provider} 
              signer={signer} 
              contract={contract} 
              setLoginStatus={setLogin}
            />
          </div>
        </div>
      </div>
    </>
  )
}