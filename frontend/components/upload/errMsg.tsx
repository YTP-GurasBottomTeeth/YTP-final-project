'use client'

export default function ErrMsg({ msg }: { msg: string }) {
  return (
    <div>
      <span>{msg}</span>
    </div>
  )
}