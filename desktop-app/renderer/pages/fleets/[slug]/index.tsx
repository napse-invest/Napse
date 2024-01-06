import { RetrievedFleet } from '@/api/fleets/fleets'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Fleet(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const fleetID: string = searchParams.get('fleet') || ''
  const [fleet, setFleet] = useState<RetrievedFleet>()

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Retrieved fleet'}
        description={
          'Here is an overview of all your fleets. A fleet fully manages the bots it owns.'
        }
      >
        <div>create new fleet</div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
