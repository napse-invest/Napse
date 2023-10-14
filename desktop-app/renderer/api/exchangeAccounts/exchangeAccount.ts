import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface ExchangeAccount {
  uuid: string
  name: string
  exchange_name: string
  testing: boolean
}

export async function listExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<ExchangeAccount[]>> {
  const response = await request(searchParams, 'GET', '/api/exchange_account/')
  return response as AxiosResponse<ExchangeAccount[]>
}

export async function getExchangeAccount(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<ExchangeAccount>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/exchange_account/${id}/`
  )
  return response as AxiosResponse<ExchangeAccount>
}
