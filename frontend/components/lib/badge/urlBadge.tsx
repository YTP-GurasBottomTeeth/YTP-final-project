'use client'

export default function URLBadge({ url }: { url: string }) {
  return <a className='text-blue-500 underline underline-offset-2' href={url}>{url}</a>
}