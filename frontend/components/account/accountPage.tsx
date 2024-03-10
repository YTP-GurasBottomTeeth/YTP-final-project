'use client'

import { AbstractProvider, ethers } from "ethers";
import { BrowserProvider } from "ethers";
import { Signer } from "ethers";
import { useRef, useState } from "react";
import Login from "../login/login";
import { Contract } from "ethers";
import Viewer from "./Viewer";
import { callFunction } from "@/lib/callFunction";
import ErrMsg from "./errMsg";
import ATM from "./ATM";
import ManagerOnly from "./managerOnly";

export default function AccountPage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [login, setLogin] = useState<boolean>(false)
  const [isManager, setIsManagr] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("")
  const [balance, setBalance] = useState<string>("? TKS")
  const [address, setAddress] = useState<string>("?")
  const [level, setLevel] = useState<string>("?")
  const [mistake, setMistake] = useState<string>("?")
  const getLevelFormat = (v: string) => v.toString()
  const interval = setInterval(async () => {
    if(!contract.current) return
    try {
      const [_balance] = await callFunction(contract.current, 'getBalance', [])
      const [_isManager] = await callFunction(contract.current, 'isManager', [])
      const [_level, _mistake] = await callFunction(contract.current, 'getLevel', [])
      const _address = await signer.current?.getAddress()
      setBalance(ethers.formatEther(_balance) + " TKS")
      setLevel(getLevelFormat(_level))
      setMistake(getLevelFormat(_mistake))
      setIsManagr(_isManager)
      if(_address) setAddress(_address)
    } catch(err: any) {
      setErrMsg(err)
    }
  }, 300)
  const loginInit = () => {
    clearInterval(interval)
    setInterval(async () => {
      if(!contract.current) return
      try {
        const [_balance] = await callFunction(contract.current, 'getBalance', [])
        const [_level, _mistake] = await callFunction(contract.current, 'getLevel', [])
        setBalance(ethers.formatEther(_balance) + " TKS")
        setLevel(getLevelFormat(_level))
        setMistake(getLevelFormat(_mistake))
      } catch(err: any) {
        setErrMsg(err)
      }
    }, 500)
  }

  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="block w-[35%]">
          <div className="block w-full">
            <Viewer label="Account Address" value={address} />
            <Viewer label="Account Balance" value={balance} />
            <Viewer label="Level" value={level} />
            <Viewer label="Mistake" value={mistake} />
            <ErrMsg msg={errMsg} />
          </div>
          <div className="block w-full mt-10">
            <ATM 
              type='deposit' 
              contract={contract} 
              signer={signer} 
              login={login}
            />
            <ATM 
              type='withdraw' 
              contract={contract} 
              signer={signer} 
              login={login}
            />
            <ATM 
              type='withdrawAll' 
              contract={contract} 
              signer={signer} 
              login={login}
            />
          </div>
          {
            isManager ?
              <ManagerOnly contract={contract} login={login} />
            :
              <></>
          }
          <div className="flex justify-center items-center mt-10">
            <Login
              provider={provider}
              signer={signer}
              contract={contract}
              setLoginStatus={setLogin}
              init={loginInit}
            />
          </div>
        </div>
      </div>
    </>
  )
}