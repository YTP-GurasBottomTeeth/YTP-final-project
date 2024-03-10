'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useEffect, useRef, useState } from "react"
import ConnectContract from "../lib/connectContract"
import ConnetWallet from "../lib/connectWallet"
import Viewer from "./Viewer"
import { useRouter } from "next/navigation"
import { callFunction } from "@/lib/callFunction"
import Login from "../login/login"
import URLBadge from "../lib/badge/urlBadge"
import NewsStatusBadge from "../lib/badge/newsStatusBadge"

export default function VerifyPage({ newsId }: { newsId: BigInt }) {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [login, setLogin] = useState<boolean>(false)
  const [newsURL, setNewsURL] = useState<string>("?")
  const [sourceURL, setSourceURL] = useState<string>("?")
  const [newsState, setNewsState] = useState<string>("Unkown")
  const interval = setInterval(async () => {
    if(!contract.current) return
    const [_newsURL, _sourceURL] = await callFunction(contract.current, 'getURLs', [newsId])
    const [_newsState] = await callFunction(contract.current, 'verify', [newsId])
    setNewsURL(_newsURL)
    setSourceURL(_sourceURL)
    setNewsState(_newsState)
  }, 500)

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
              init={() => clearInterval(interval)}
            />
          </div>
        </div>
      </div>
    </>
  )
}