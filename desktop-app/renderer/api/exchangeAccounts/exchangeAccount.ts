import { convertInterfaceToSnakeCaseDict } from '@/api/request'
import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface BaseExchangeAccount {
  name: string
  description: string
  exchange: string
  testing: boolean
  privateKey: string
  publicKey: string
}
export interface ExchangeAccount extends BaseExchangeAccount {
  uuid: string
}
export interface RetreivedExchangeAccount
  extends Omit<Omit<ExchangeAccount, 'privateKey'>, 'publicKey'> {}

export async function getExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<RetreivedExchangeAccount>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/exchange_account/${id}/`
  )
  return response as AxiosResponse<RetreivedExchangeAccount>
}

export async function listExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<RetreivedExchangeAccount[]>> {
  const response = await request(searchParams, 'GET', '/api/exchange_account/')
  return response as AxiosResponse<RetreivedExchangeAccount[]>
}

export async function createExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>,
  data: BaseExchangeAccount
): Promise<AxiosResponse<RetreivedExchangeAccount>> {
  const formatedData = convertInterfaceToSnakeCaseDict(data)
  const response = await request(
    searchParams,
    'POST',
    '/api/exchange_account/',
    formatedData
  )
  return response as AxiosResponse<RetreivedExchangeAccount>
}

export async function deleteExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<null>> {
  const response = await request(
    searchParams,
    'DELETE',
    `/api/exchange_account/${id}/`
  )
  return response as AxiosResponse<null>
}

export async function updateExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string,
  data: { name: string; description: string }
): Promise<AxiosResponse<RetreivedExchangeAccount>> {
  const response = await request(
    searchParams,
    'PATCH',
    `/api/exchange_account/${id}/`,
    data
  )
  return response as AxiosResponse<RetreivedExchangeAccount>
}

export async function getPossibleExchanges(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<string[]>> {
  const response = await request(
    searchParams,
    'GET',
    '/api/exchange_account/possible_exchanges/'
  )
  return response as AxiosResponse<string[]>
}
