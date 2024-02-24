'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract, ethers } from "ethers"
import { useEffect, useRef, useState } from "react"
import ConnetWallet from "../connectWallet"
// import { connectContract } from "@/lib/connectContract"
import { ConnectContract } from "../connectContract"

export default function UploadPage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [newsId, setNewsId] = useState<string>("")

  useEffect(() => {
    contract.current?.on(contract.current?.filters.Balance, (_balance, event) => {
      const balance = ethers.formatEther(_balance)
      console.log(`${balance}`)
      console.log(event)
    })
  }, [contract.current])

  const submit = async () => {
    // await signer.current?.sendTransaction({
    //   to: contractAddress,
    //   value: ethers.parseEther('1.0')
    // })
    await contract.current?.getBalance()
    // const tx = await contract.current?.upload("a", "b")
    // console.log(tx)
  }

  return (
    <>
      <ConnetWallet provider={provider} signer={signer} />
      <ConnectContract contract={contract} signer={signer} />
      <button onClick={submit}>{'submit'}</button>
      <div>
        <span>{'newsId: '}</span>
        <span>{newsId}</span>
      </div>
    </>
  )
}