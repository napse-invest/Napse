import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface Bot {
  name: string
  uuid: string
  value: number
  delta: number
  fleet: string
  space?: string
  exchangeAccount: string
}

export async function listBot(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<Bot[]>> {
  const response = await request(searchParams, 'GET', `/api/bot/`)
  return response as AxiosResponse<Bot[]>
}
