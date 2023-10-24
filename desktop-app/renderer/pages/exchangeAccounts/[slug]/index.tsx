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
import { standardUrlPartial } from '@/lib/queryParams'
import { AxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as z from 'zod'

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
        if ((error as AxiosError).response?.status === 403) {
          router
            .push(
              standardUrlPartial(
                '/exchangeAccounts/',
                null,
                {
                  exchangeAccount: '',
                  space: '',
                  fleet: '',
                  bot: ''
                },
                searchParams
              )
            )
            .catch((err) => {
              console.error(err)
            })
          return
        }
        console.error(error)
        setExchangeAccount(defaultExchangeAccount)
      }
    }
    if (searchParams.get('server')) {
      fetchExchangeAccount()
    }
  }, [searchParams, router.query.slug, router])
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
              updateOnClick={(values) => {
                updateExchangeAccount(
                  searchParams,
                  router.query.slug as string,
                  {
                    name: values.name,
                    description: values.description
                  }
                )
              }}
              deleteOnClick={() => {
                deleteExchangeAccount(searchParams, router.query.slug as string)
              }}
              inputs={[
                {
                  label: 'Name',
                  key: 'name',
                  type: 'input',
                  zod: z.string(),
                  default: defaultExchangeAccount.name,
                  value: exchangeAccount.name
                },
                {
                  label: 'Description',
                  key: 'description',
                  type: 'input',
                  zod: z.string(),
                  default: defaultExchangeAccount.description,
                  value: exchangeAccount.description
                },
                {
                  label: 'Exchange',
                  key: 'exchange',
                  type: 'input',
                  disabled: true,
                  zod: z.string(),
                  default: defaultExchangeAccount.exchange,
                  value: exchangeAccount.exchange
                },
                {
                  label: 'Testing',
                  key: 'testing',
                  type: 'switch',
                  disabled: true,
                  zod: z.boolean(),
                  default: defaultExchangeAccount.testing,
                  value: exchangeAccount.testing
                }
              ]}
            />
          }
        />
      </DefaultPageLayout>
    </ContextHeader>
  )
}
