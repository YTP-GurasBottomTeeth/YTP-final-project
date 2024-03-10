'use client'

import React from "react"

export default function Viewer({ label, value }: { label: string, value: string | React.ReactNode }) {
  return (
    <>
      <div className='my-4'>
        <span className='w-[20%] inline-flex justify-start'>{label + ": "}</span>
        <span className='w-[80%] inline-flex justify-end truncate'>{value}</span>
      </div>
    </>
  )
}