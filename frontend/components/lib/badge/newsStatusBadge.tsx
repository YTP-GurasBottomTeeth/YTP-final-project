'use client'

export default function NewsStatusBadge({ status }: { status: 'Checking' | 'Approved' | 'Denied' | string }) {
  if(status === 'Checking') {
    return <span className='p-2 px-3 bg-blue-400 text-white'>{status}</span>
  }
  if(status === 'Approved') {
    return <span className='p-2 px-3 bg-green-400 text-white'>{status}</span>
  }
  if(status === 'Denied') {
    return <span className='p-2 px-3 bg-red-400 text-white'>{status}</span>
  }
  return <span className='p-2 px-3 bg-gray-400 text-white'>{status}</span>
}