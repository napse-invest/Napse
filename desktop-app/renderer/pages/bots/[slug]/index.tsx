import { RetrievedBot, retrieveBot } from '@/api/bots/bots'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Bot(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const botID: string = searchParams.get('bot') || ''
  const [bot, setBot] = useState<RetrievedBot>()

  useEffect(() => {
    async function fetchBot() {
      try {
        const response = await retrieveBot(searchParams, botID)
        setBot(response.data)
      } catch (error) {
        console.error(error)
        // go to the previous page
        router.push(
          standardUrlPartial(
            '/bots/',
            null,
            { space: '', fleet: '', bot: '' },
            searchParams
          )
        )
      }
    }

    if (searchParams.get('server')) {
      fetchBot()
    }
  }, [botID, searchParams, router])
  console.log(bot)
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your Bots'}
        description={
          'Bots look to make your money grow while you do something else.'
        }
      >
        <></>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
