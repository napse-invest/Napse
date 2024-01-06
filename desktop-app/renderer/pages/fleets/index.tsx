import { Key, getCurrentKey } from '@/api/key/key'
import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'

import { Fleet, listFleet } from '@/api/fleets/fleets'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CreateFleetDialog from './createFleetDialog'

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

async function fetchCurrentKey({
  setCurrentKey,
  searchParams
}: {
  setCurrentKey: Dispatch<SetStateAction<Key | undefined>>
  searchParams: ReadonlyURLSearchParams
}) {
  try {
    const response = await getCurrentKey(searchParams)
    setCurrentKey(response)
  } catch (error) {
    console.error(error)
    setCurrentKey(undefined)
  }
}

export default function Fleets(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [fleets, setFleets] = useState<Fleet[]>([])
  const [currentKey, setCurrentKey] = useState<Key>()

  useEffect(() => {
    if (searchParams.get('server')) {
      fetchFleets({ setFleets, searchParams })
      fetchCurrentKey({ setCurrentKey, searchParams })
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
              // delta={fleet.delta}
              onClick={() => {
                console.log('fleet', fleet)
                router.push(
                  standardUrlPartial(
                    '/fleets/',
                    fleet.uuid,
                    {
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
          <InfoPanelCard
            cardType={currentKey?.is_master_key ? 'button' : 'disabledButton'}
            tooltip={
              !currentKey?.is_master_key &&
              // 'You do not have the permission to create an exchange account.'
              `currentKey.is_master_key: ${currentKey?.is_master_key}`
            }
            textContent={
              <CreateFleetDialog
                fleets={fleets}
                setFleets={setFleets}
                disabledButton={currentKey?.is_master_key ? false : true}
              />
            }
          />
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
