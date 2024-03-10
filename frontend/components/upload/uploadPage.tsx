'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract } from "ethers"
import { useEffect, useRef, useState } from "react"
import { callFunction } from "@/lib/callFunction"
import Upload from "./upload"
import BalanceViewer from "../lib/balanceViewer"
import Login from "../lib/login/login"

export default function UploadPage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [isManager, setIsManager] = useState<boolean>(false)
  const [login, setLogin] = useState<boolean>(false)

  useEffect(() => {
    const listener = async () => {
      if(!contract.current) return
      const [_isManager] = await callFunction(contract.current, 'isManager', [])
      setIsManager(_isManager)
    }
    window.addEventListener('login', listener)

    return () => window.removeEventListener('login', listener)
  }, [])

  return (
    <>
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='block h-[35%] w-[40%]'>
          <div className='h-[80%] w-full mb-15'>
            <Upload type={isManager} contract={contract} login={login} /> 
          </div>
          <div className='h-[10%] w-full mb-7 flex justify-center items-center'>
            <BalanceViewer contract={contract} />
          </div>
          <div className='h-[10%] w-full mb-5 flex justify-center items-center'>
            <Login
              contract={contract}
              signer={signer}
              provider={provider}
              setLoginStatus={setLogin}
            />
          </div>
        </div>
      </div>
    </>
  )
}