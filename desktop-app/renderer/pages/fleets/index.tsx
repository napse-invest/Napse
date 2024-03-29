import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'

import { Fleet, listFleet } from '@/api/fleets/fleets'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

async function fetchFleets({
  setFleets,
  searchParams
}: {
  setFleets: Dispatch<SetStateAction<Fleet[]>>
  searchParams: ReadonlyURLSearchParams
}) {
  try {
    const response = await listFleet(searchParams)
    setFleets(response.data)
  } catch (error) {
    console.error(error)
  }
}

export default function Fleets(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [fleets, setFleets] = useState<Fleet[]>([])

  useEffect(() => {
    if (searchParams.get('server')) {
      fetchFleets({ setFleets, searchParams })
    }
  }, [searchParams])

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header="Fleets"
        description={
          'Here is an overview of all your fleets. A fleet fully manages the bots it owns.'
        }
      >
        <div className="my-10 grid max-w-screen-xl grid-cols-3 gap-6">
          {fleets.map((fleet, index) => (
            <ValuePanelCard
              key={index}
              title={fleet.name}
              value={fleet.value}
              delta={fleet.delta}
              onClick={() => {
                router.push(
                  standardUrlPartial(
                    '/fleets/',
                    fleet.uuid,
                    {
                      exchangeAccount: fleet.exchangeAccount,
                      space: fleet.space,
                      fleet: fleet.uuid,
                      bot: ''
                    },
                    searchParams
                  )
                )
              }}
            />
          ))}
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
