import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import ContextHeader from '@/components/layout/contextHeader'

import { NapseSpace, listSpace } from '@/api/spaces/spaces'
import { standardUrlPartial } from '@/lib/queryParams'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Spaces(): JSX.Element {
  const [spaces, setSpaces] = useState<NapseSpace[]>([])
  const searchParams = useSearchParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<NapseSpace[]> =
          await listSpace(searchParams)
        setSpaces(response.data)
      } catch (error) {
        console.error(error)
        setSpaces([])
      }
    }
    fetchData()
  }, [searchParams])

  const router = useRouter()

  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {spaces.map((space, index) => (
          <ValuePanelCard
            key={index}
            title={space.name}
            value={space.value}
            delta={space.delta}
            // tooltip={space.tooltip}
            onClick={() => {
              router
                .push(
                  standardUrlPartial(
                    '/spaces/',
                    space.uuid,
                    {
                      exchangeAccount: space.exchange_account,
                      space: space.uuid
                    },
                    searchParams
                  )
                )
                .catch((err) => {
                  console.error(err)
                })
            }}
            badge={String(space.fleet_count) + ' fleets'}
          />
        ))}
      </div>
    </ContextHeader>
  )
}
