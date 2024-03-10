'use client'

import { MouseEventHandler } from "react"

export default function Button({ type, text, disable, onClick }: { type: 'Approve' | 'Deny', text: string, disable: boolean, onClick: MouseEventHandler}) {
  if(type === 'Approve')
    return <button className="border rounded p-2 px-3 bg-green-500 text-white disabled:bg-gray-300 transition-colors duration-300 select-none" onClick={onClick} disabled={disable}>{text}</button>
  if(type === 'Deny')
    return <button className="border rounded p-2 px-3 bg-red-500 text-white disabled:bg-gray-300 transition-colors duration-300 select-none" onClick={onClick} disabled={disable}>{text}</button>
  return <button className="border rounded p-2 px-3  bg-gray-300 text-white disabled:bg-gray-300 transition-colors duration-300 select-none" onClick={onClick} disabled={disable}>{text}</button>
}