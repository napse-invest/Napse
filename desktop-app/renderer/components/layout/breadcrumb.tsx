import {
  ExchangeAccount,
  getExchangeAccount
} from '@/api/exchangeAccounts/exchangeAccount'
import { RetrievedNapseSpace, retrieveSpace } from '@/api/spaces/spaces'
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
  const spaceID = searchParams.get('space') || ''
  const fleet = searchParams.get('fleet') || ''
  const bot = searchParams.get('bot') || ''
  const server = getServer(serverID)

  const [exchangeAccount, setExchangeAccount] = useState<ExchangeAccount>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getExchangeAccount(
          searchParams,
          exchangeAccountID
        )
        setExchangeAccount(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    exchangeAccountID && fetchData()
  }, [exchangeAccountID, searchParams])

  const [space, setSpace] = useState<RetrievedNapseSpace>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveSpace(searchParams, spaceID)
        setSpace(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    spaceID && fetchData()
  }, [spaceID, searchParams])

  return (
    <div className="container items-center">
      <div className="py-3">
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
                {server.name}
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
          {spaceID && (
            <BreadcrumbItem isCurrentPage={!fleet && !bot}>
              <BreadcrumbLink
                href={standardUrlPartial(
                  '/space/',
                  spaceID,
                  { fleet: '', bot: '' },
                  searchParams
                )}
              >
                {space?.name}
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
    </div>
  )
}
