'use client'

export default function NewsIdViewer({ newsId }: { newsId: string }) {
  return (
    <div>
      <span>{"News ID: "}</span>
      <span>{newsId}</span>
    </div>
  )
}