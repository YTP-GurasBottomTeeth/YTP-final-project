'use client'

import { MouseEventHandler } from "react"

export default function Button({ text, disable, onClick }: { text: string, disable: boolean, onClick: MouseEventHandler}) {
  return <button className="border rounded p-2 px-3 bg-blue-500 text-white disabled:bg-gray-300 transition-colors duration-300 select-none" onClick={onClick} disabled={disable}>{text}</button>
}