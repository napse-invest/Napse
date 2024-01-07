import { Bot, listBot } from '@/api/bots/bots'
import { Key, getCurrentKey } from '@/api/key/key'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Bots(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [bots, setBots] = useState<Bot[]>([])
  const [currentKey, setCurrentKey] = useState<Key>()

  useEffect(() => {
    async function fetchBots() {
      try {
        const response = await listBot(searchParams)
        setBots(response.data)
      } catch (error) {
        console.error(error)
        setBots([])
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
      fetchBots()
      fetchCurrentKey()
    }
  }, [searchParams])

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your Bots'}
        description={
          'Bots look to make your money grow while you do something else.'
        }
      >
        <div className="my-10 grid max-w-screen-xl grid-cols-3 gap-6">
          {bots.map((bot, index) => (
            <ValuePanelCard
              key={index}
              title={bot.name}
              value={bot.value}
              delta={bot.delta}
              onClick={() => {
                router.push(
                  standardUrlPartial(
                    '/bots/',
                    bot.uuid,
                    {
                      exchangeAccount: bot.exchangeAccount,
                      space: bot.space,
                      fleet: bot.fleet,
                      bot: bot.uuid
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
