'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import ErrMsg from "../utility/errMsg";
import RetValue from "../utility/retValue";
import { ethers } from "ethers";
import { callFunction } from "@/lib/callFunction";

export default function GetBalance({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const [retValue, setRetValue] = useState<any[][2]>([['balance', 'null']])
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      // const balance = await contract.current.getBalance()
      const [balance] = await callFunction(contract.current, 'getBalance', [])
      setRetValue([
        ['balance', ethers.formatEther(balance)]
      ])
    } catch(err: any) {
      console.log(err)
      setErrMsg(err.reason)
    }
  }

  return (
    <>
      <div id='getBalance'>
        <Button text={'getBalance'} onClick={submit} />
        <RetValue values={retValue} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}