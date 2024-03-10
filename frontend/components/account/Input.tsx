'use client'

export default function Input({ text, label, id, disable, type }: { text: string, label: string, id:string, disable: boolean, type?: string }) {
  return (
    <div className='my-1 w-full'>
      <label className="inline-block w-[15%]" htmlFor={id}>{text + ": "}</label>
      <span className='inline-flex justify-end w-[85%]'>
        <input className="w-full border rounded border-gray-400 px-1" type={type} id={id} disabled={disable}></input>
      </span>
    </div>
  )
}