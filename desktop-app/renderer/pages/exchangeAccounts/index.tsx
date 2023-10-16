import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import {
  ExchangeAccount,
  listExchangeAccount
} from 'api/exchangeAccounts/exchangeAccount'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ExchangeAccounts(): JSX.Element {
  const [exchangeAccounts, setExchangeAccounts] = useState<ExchangeAccount[]>(
    []
  )
  const searchParams = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listExchangeAccount(searchParams)
        setExchangeAccounts(response.data)
      } catch (error) {
        console.error(error)
        setExchangeAccounts([])
      }
    }
    fetchData()
  }, [searchParams])

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Settings - Key'}
        description={'Here is where you can manage your distibuted API keys.'}
      >
        <div className="my-10 grid max-w-screen-xl gap-6 grid-cols-3">
          {exchangeAccounts.map((exchangeAccount, index) => (
            <InfoPanelCard
              key={index}
              title={exchangeAccount.name}
              category={exchangeAccount.exchange_name.toLowerCase()}
              badge={exchangeAccount.testing ? 'testing' : ''}
              onClick={() => {
                router.push(
                  standardUrlPartial(
                    '/exchangeAccounts/',
                    exchangeAccount.uuid,
                    {
                      exchangeAccount: exchangeAccount.uuid,
                      space: '',
                      fleet: '',
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
