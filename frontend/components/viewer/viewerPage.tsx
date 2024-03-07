'use client'

import { BrowserProvider, AbstractProvider, Signer, Contract, ethers } from "ethers"
import { useRef, useState } from "react"
import ConnetWallet from "../lib/connectWallet"
// import { connectContract } from "@/lib/connectContract"
import ConnectContract from "../lib/connectContract"
import { contractAddress } from "@/lib/contractInfo"
import { callTransaction } from "@/lib/callTransaction"

export default function ViewerPage() {
  const provider = useRef<BrowserProvider | AbstractProvider | null>(null)
  const signer = useRef<Signer | null>(null)
  const contract = useRef<Contract | null>(null)
  const [newsId, setNewsId] = useState<string>("")

  const contractInit = () => {
    console.log('a')
    console.log(contract.current)
    // contract.current?.on(contract.current?.filters.Balance, (_balance, event) => {
    //   const balance = ethers.formatEther(_balance)
    //   console.log(`${balance}`)
    //   console.log(event)
    // })
    // console.log(contract.current?.filters.Balance)
    // contract.current?.on("Balance", (_balance, event) => {
    //   const balance = ethers.formatEther(_balance)
    //   console.log(`${balance}`)
    //   console.log(event)
    // })
    // contract.current?.on("Transfer", (from, to, _amount, event) => {
    //   const amount = ethers.formatEther(_amount)
    //   console.log(`${from} => ${to}: ${amount}`)
    //   console.log(event)
    // })
  }

  const check = async () => {
    // await signer.current?.sendTransaction({
    //   to: contractAddress,
    //   value: ethers.parseEther('1.0')
    // })
    try {
      if(!contract.current)
        return

      const ret = await callTransaction(contract.current, 'upload', ['william', 'killer'])
      const [newsIdNumber] = ret
      

      console.log(await contract.current?.getURLs(newsIdNumber))
    } catch(err) {
      console.log(err)
    }

    // const abiDecoder = ethers.AbiCoder.defaultAbiCoder()
    // const detx = abiDecoder.decode(['uint256'], tx)
    // console.log(detx)
    // const tx = await contract.current?.upload("a", "b")
    // console.log(tx)
  }

  const getEther = async () => {
    await signer.current?.sendTransaction({
      to: contractAddress,
      value: ethers.parseEther('10.0')
    })
  }

  return (
    <>
      <ConnectContract contract={contract} signer={signer} init={contractInit} />
      <div>
        <input placeholder='type address...' name = 'news_address'/>
      </div>
      <div>
        <button onClick = {check}>submit</button>
      </div>
    </>
  )
}