'use client'

import { MouseEventHandler } from "react"

export default function Button({ text, onClick }: { text: string, onClick: MouseEventHandler}) {
  return <button className="border-2 rounded border-gray-400 p-1" onClick={onClick}>{text}</button>
}