import {
  RetreivedExchangeAccount,
  getExchangeAccount
} from '@/api/exchangeAccounts/exchangeAccount'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const defaultExchangeAccount: RetreivedExchangeAccount = {
  uuid: '',
  name: '',
  description: '',
  testing: false,
  exchange: ''
}

export default function ExchangeAccount(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [exchangeAccount, setExchangeAccount] =
    useState<RetreivedExchangeAccount>(defaultExchangeAccount)

  useEffect(() => {
    const fetchExchangeAccount = async () => {
      try {
        const response = await getExchangeAccount(
          searchParams,
          router.query.slug as string
        )
        setExchangeAccount(response.data)
      } catch (error) {
        console.error(error)
        setExchangeAccount(defaultExchangeAccount)
      }
    }
    if (searchParams.get('server')) {
      fetchExchangeAccount()
    }
  }, [searchParams, router.query.slug])

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={
          'Exchange Account' +
          (exchangeAccount.name && ' - ' + exchangeAccount.name)
        }
        description={
          'Here is an overview of your exchange account. An exchange account reprents a connection to an exchange/broker.'
        }
      >
        <div></div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
