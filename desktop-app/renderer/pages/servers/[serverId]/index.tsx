import React from 'react'
import ContextHeader from '@/components/layout/contextHeader'
import { useRouter } from 'next/router'

export default function Servers(): JSX.Element {
  const router = useRouter()
  return (
    <ContextHeader isBot>
      <p>Server ID: {router.query.serverId}</p>
    </ContextHeader>
  )
}
