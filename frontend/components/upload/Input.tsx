'use client'

export default function Input({ text, label, disable, type }: { text: string, label: string, disable: boolean, type?: string }) {
  return (
    <div className='my-1 w-full'>
      <label className="inline-block w-[15%]" htmlFor={label}>{text + ": "}</label>
      <span className='inline-flex justify-end w-[85%]'>
        <input className="w-full border rounded border-gray-400 px-1" type={type} id={label} disabled={disable}></input>
      </span>
    </div>
  )
}