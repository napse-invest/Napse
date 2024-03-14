import { Key, getCurrentKey } from '@/api/key/key'
import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'

import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import { NapseSpace, listSpace } from 'api/spaces/spaces'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateSpaceDialog from './createSpaceDialog'

export default function Spaces(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [spaces, setSpaces] = useState<NapseSpace[]>([])
  const [currentKey, setCurrentKey] = useState<Key>()

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await listSpace(searchParams)
        setSpaces(response.data)
      } catch (error) {
        console.error(error)
        setSpaces([])
      }
    }
    const fetchCurrentKey = async () => {
      try {
        const response = await getCurrentKey(searchParams)
        setCurrentKey(response)
      } catch (error) {
        console.error(error)
        setCurrentKey(undefined)
      }
    }
    if (searchParams.get('server')) {
      fetchSpaces()
      fetchCurrentKey()
    }
  }, [searchParams])

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your spaces'}
        description={
          'Here is an overview of all your spaces. A space make it easy to manage your money.'
        }
      >
        <div className="my-10 grid max-w-screen-xl grid-cols-3 gap-6">
          {spaces.map((space, index) => (
            <ValuePanelCard
              key={index}
              title={space.name}
              value={space.value}
              delta={space.delta}
              onClick={() => {
                // console.log('space', space.uuid)
                router.push(
                  standardUrlPartial(
                    '/spaces/',
                    space.uuid,
                    {
                      exchangeAccount: space.exchangeAccount,
                      space: space.uuid,
                      fleet: '',
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
              <CreateSpaceDialog
                spaces={spaces}
                setSpaces={setSpaces}
                disabledButton={currentKey?.is_master_key ? false : true}
              />
            }
          />
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
