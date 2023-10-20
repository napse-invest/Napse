import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import {
  RetreivedExchangeAccount,
  listExchangeAccount
} from 'api/exchangeAccounts/exchangeAccount'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CreateExchangeAccountDialog from './createExchangeAccountDialog'

export default function ExchangeAccounts(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [exchangeAccounts, setExchangeAccounts] = useState<
    RetreivedExchangeAccount[]
  >([])

  useEffect(() => {
    const fetchExchangeAccounts = async () => {
      try {
        const response = await listExchangeAccount(searchParams)
        setExchangeAccounts(response.data)
      } catch (error) {
        console.error(error)
        setExchangeAccounts([])
      }
    }

    if (searchParams.get('server')) {
      fetchExchangeAccounts()
    }
  }, [searchParams])
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your Exchange Accounts'}
        description={
          'Here is an overview of all your exchange accounts. An exchange account reprents a connection to an exchange/broker.'
        }
      >
        <div className="my-10 grid max-w-screen-xl grid-cols-3 gap-6">
          {exchangeAccounts.map((exchangeAccount, index) => (
            <InfoPanelCard
              key={index}
              title={'Exchange : ' + exchangeAccount.exchange}
              textContent={exchangeAccount.name}
              badge={exchangeAccount.testing ? 'testing' : null}
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
          <InfoPanelCard
            title=""
            textContent={
              <CreateExchangeAccountDialog
                exchangeAccounts={exchangeAccounts}
                setExchangeAccounts={setExchangeAccounts}
              />
            }
          />
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
