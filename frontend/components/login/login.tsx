'use client'

import { getProvider } from "@/lib/connectProvider"
import { ReactUseRef } from "@/lib/type"
import { AbstractProvider, Contract, Signer } from "ethers"
import { BrowserProvider } from "ethers"
import { init } from "next/dist/compiled/webpack/webpack"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { connectContract } from "@/lib/connectContract"

type CompAttr = {
  provider: ReactUseRef<BrowserProvider | AbstractProvider>,
  signer: ReactUseRef<Signer>,
  contract: ReactUseRef<Contract>,
  init?: () => void,
  setLoginStatus?: Dispatch<SetStateAction<boolean>>
}

export default function Login({ provider, signer, contract, setLoginStatus, init }: CompAttr) {
  const [status, setStatus] = useState<boolean>(false)
  const onClick = async () => {
    provider.current = getProvider()
    if(provider.current instanceof BrowserProvider) {
      signer.current = await provider.current.getSigner()
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if(!status) {
        if(signer.current) {
          contract.current = connectContract(signer.current)
          setStatus(true)
          if(typeof setLoginStatus !== 'undefined')
            setLoginStatus(true)
          if(typeof init !== 'undefined')
            init()
        }
      }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <button className='p-2 px-3 border rounded bg-blue-500 text-white transition-color duration-300 disabled:bg-gray-300 select-none' onClick={onClick} disabled={status}>{"Login"}</button>
}