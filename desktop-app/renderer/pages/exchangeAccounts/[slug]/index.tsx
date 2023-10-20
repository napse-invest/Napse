import {
  RetreivedExchangeAccount,
  deleteExchangeAccount,
  getExchangeAccount,
  updateExchangeAccount
} from '@/api/exchangeAccounts/exchangeAccount'
import SelectedObject from '@/components/custom/selectedObject/selectedObject'
import TabsLayout from '@/components/custom/selectedObject/tabs'
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
        header={'Exchange Account'}
        description={
          'Here is an overview of your exchange account. An exchange account reprents a connection to an exchange/broker.'
        }
      >
        <TabsLayout
          settingsTab={
            <SelectedObject
              objectName="Exchange Account"
              objectIdentifier="name"
              object={exchangeAccount}
              setObject={setExchangeAccount}
              updateOnClick={() => {
                updateExchangeAccount(
                  searchParams,
                  router.query.slug as string,
                  {
                    name: exchangeAccount.name,
                    description: exchangeAccount.description
                  }
                )
              }}
              deleteOnClick={() => {
                deleteExchangeAccount(searchParams, router.query.slug as string)
              }}
              inputs={[
                { label: 'Name', key: 'name', type: 'input' },
                {
                  label: 'Description',
                  key: 'description',
                  type: 'input'
                },
                {
                  label: 'Exchange',
                  key: 'exchange',
                  type: 'input',
                  disabled: true
                },
                {
                  label: 'Testing',
                  key: 'testing',
                  type: 'switch',
                  disabled: true
                }
              ]}
            />
          }
        />
      </DefaultPageLayout>
    </ContextHeader>
  )
}
