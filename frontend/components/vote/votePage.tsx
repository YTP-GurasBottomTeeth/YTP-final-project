'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useEffect, useRef, useState } from "react"
import { callFunction } from "@/lib/callFunction"
import Viewer from "./Viewer"
import Button from "./button"
import { callTransaction } from "@/lib/callTransaction"
import ErrMsg from "./errMsg"
import Login from "../lib/login/login"
import URLBadge from "../lib/badge/urlBadge"
import NewsStatusBadge from "../lib/badge/newsStatusBadge"

export default function VotePage({ newsId }: { newsId: BigInt }) {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [login, setLogin] = useState<boolean>(false)
  const [isVoted, setIsVoted] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("")
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
      const [_isVoted] = await callFunction(contract.current, 'isVoted', [newsId])
      setNewsState(_newsState)
      setIsVoted(_isVoted)
    }, 500)

    return () => {
      clearInterval(interval)
      window.removeEventListener('login', listener)
    }
  }, [newsId])

  const submit = async (approve: boolean) => {
    if(!contract.current) return
    try {
      await callTransaction(contract.current, 'vote', [newsId, approve])
    } catch(err: any) {
      setErrMsg(err.toString())
    }
  }

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="block w-[35%] h-[35%]">
          <div id='vote'>
            <Viewer label="News ID" value={newsId.toString()} />
            <Viewer label="News Status" value={<NewsStatusBadge status={newsState} />} />
            <Viewer label="News URL" value={<URLBadge url={newsURL} />} />
            <Viewer label="Source URL" value={<URLBadge url={sourceURL} />} />
            <div className='flex w-full justify-center items-center'>
              <div className="block w-[30%]">
                <div className="inline-block w-[50%]">
                  <Button type='Deny' text="Deny" onClick={() => submit(false)} disable={!login || isVoted}/>
                </div>
                <div className="inline-flex w-[50%] justify-end">
                  <Button type='Approve' text="Approve" onClick={() => submit(true)} disable={!login || isVoted}/>
                </div>
              </div>
            </div>
            <ErrMsg msg={errMsg} />
          </div>
          <div className="flex justify-center items-center mt-16">
            <Login
              signer={signer}
              provider={provider}
              contract={contract}
              setLoginStatus={setLogin}
            />
          </div>
        </div>
      </div>
    </>
  )
}