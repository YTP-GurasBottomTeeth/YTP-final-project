'use client'

export default function NewsIdViewer({ newsId }: { newsId: string }) {
  return (
    <div className='w-[20%]'>
      <span className='inline-block w-[50%]'>{"News ID: "}</span>
      <span className="inline-flex w-[50%] justify-end">
        <span>{newsId}</span>
      </span>
    </div>
  )
}