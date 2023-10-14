import ContextHeader from '@/components/layout/contextHeader'
import { Server, getServer } from '@/lib/localStorage'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function Servers(): JSX.Element {
  const searchParams = useSearchParams()
  const [server, setServer] = useState<Server>(
    getServer(searchParams.get('server') || '')
  )
  useEffect(
    () => setServer(getServer(searchParams.get('server') || '')),
    [searchParams]
  )

  return (
    <ContextHeader isBot isBreadcrumb={false}>
      <div className="container mt-12 space-y-6 align-middle">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter">
          Settings - Servers
        </h1>
        <p className="text-xl">Here is where you can manage your servers.</p>
      </div>
    </ContextHeader>
  )
}
