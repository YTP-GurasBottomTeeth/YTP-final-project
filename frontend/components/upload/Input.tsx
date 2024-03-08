'use client'

export default function Input({ label, type }: { label: string, type?: string }) {
  return (
    <div>
      <label htmlFor={label}>{label + ": "}</label>
      <input className="border-2 border-gray-400" type={type} id={label}></input>
    </div>
  )
}