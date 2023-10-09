import { ExchangeAccount, get } from '@/api/exchangeAccounts/exchangeAccount'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@/components/custom/breadCrumb'
import { getServer } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BreadcrumbLayout() {
  const searchParams = useSearchParams()
  const serverID = searchParams.get('server') || ''
  const exchangeAccountID = searchParams.get('exchangeAccount') || ''
  const space = searchParams.get('space') || ''
  const fleet = searchParams.get('fleet') || ''
  const bot = searchParams.get('bot') || ''
  const server = getServer(serverID)

  const [exchangeAccount, setExchangeAccount] = useState<ExchangeAccount>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(searchParams, exchangeAccountID)
        setExchangeAccount(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    exchangeAccountID && fetchData()
  }, [exchangeAccountID, searchParams])

  return (
    <div className="mx-24 my-10">
      <Breadcrumb separator="/">
        {serverID && (
          <BreadcrumbItem>
            <BreadcrumbLink
              href={standardUrlPartial(
                '/servers/',
                serverID,
                {
                  server: serverID,
                  exchangeAccount: '',
                  space: '',
                  fleet: '',
                  bot: ''
                },
                searchParams
              )}
            >
              {server.url}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {exchangeAccountID && (
          <BreadcrumbItem isCurrentPage={!space && !fleet && !bot}>
            <BreadcrumbLink
              href={standardUrlPartial(
                '/exchangeAccounts/',
                exchangeAccountID,
                { space: '', fleet: '', bot: '' },
                searchParams
              )}
            >
              {exchangeAccount?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {space && (
          <BreadcrumbItem isCurrentPage={!fleet && !bot}>
            <BreadcrumbLink
              href={standardUrlPartial(
                '/space/',
                space,
                { fleet: '', bot: '' },
                searchParams
              )}
            >
              {space}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {fleet && (
          <BreadcrumbItem isCurrentPage={!bot}>
            <BreadcrumbLink
              href={standardUrlPartial(
                '/fleets/',
                fleet,
                { bot: '' },
                searchParams
              )}
            >
              {exchangeAccountID}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {bot && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              href={standardUrlPartial('/bots/', bot, {}, searchParams)}
            >
              {exchangeAccountID}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </div>
  )
}
