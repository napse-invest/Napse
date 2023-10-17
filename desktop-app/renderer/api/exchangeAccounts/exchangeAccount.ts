import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface ExchangeAccount {
  name: string
  description: string
  exchange: string
  testing: boolean
}
export interface RetreivedExchangeAccount extends ExchangeAccount {
  uuid: string
}

export async function listExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<RetreivedExchangeAccount[]>> {
  const response = await request(searchParams, 'GET', '/api/exchange_account/')
  return response as AxiosResponse<RetreivedExchangeAccount[]>
}

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

export async function createExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>,
  data: ExchangeAccount
): Promise<AxiosResponse<RetreivedExchangeAccount>> {
  const response = await request(
    searchParams,
    'POST',
    '/api/exchange_account/',
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
