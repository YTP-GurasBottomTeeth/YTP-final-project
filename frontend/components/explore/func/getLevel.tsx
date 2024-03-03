'use client'

import { useState } from "react";
import { SolFuncComponentAttr } from "@/lib/type";
import Button from "../utility/button";
import ErrMsg from "../utility/errMsg";
import RetValue from "../utility/retValue";
import { callFunction } from "@/lib/callFunction";

export default function GetLevel({ signer, contract }: SolFuncComponentAttr) {
  const [errMsg, setErrMsg] = useState<string>('')
  const [retValue, setRetValue] = useState<any[][2]>([['level', 'null'], ['mistake', 'null']])
  const submit = async () => {
    if(!contract.current)
      return
    if(!signer.current)
      return
    try {
      // const [level, mistake] = await contract.current.getLevel()
      const [level, mistake] = await callFunction(contract.current, 'getLevel', [])
      setRetValue([
        ['level', level],
        ['mistake', mistake]
      ])
    } catch(err: any) {
      console.log(err)
      setErrMsg(err.reason)
    }
  }

  return (
    <>
      <div id='getLevel'>
        <Button text={'getLevel'} onClick={submit} />
        <RetValue values={retValue} />
        <ErrMsg msg={errMsg} />
      </div>
    </>
  )
}