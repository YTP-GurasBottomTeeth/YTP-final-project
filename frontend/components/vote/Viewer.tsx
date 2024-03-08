'use client'

export default function Viewer({ label, value }: { label: string, value: string }) {
  return (
    <>
      <div>
        <span>{label + ": "}</span>
        <span>{value}</span>
      </div>
    </>
  )
}