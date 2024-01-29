import { Order } from '@/api/orders/orders'
import { Wallet } from '@/api/wallets/wallets'
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

export interface RetrievedBot extends Bot {
  wallet: Wallet
  orders: Order[]
}

export async function listBot(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<Bot[]>> {
  const response = await request(searchParams, 'GET', `/api/bot/`)
  return response as AxiosResponse<Bot[]>
}

export async function listFreeBot(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<Bot[]>> {
  const response = await request(searchParams, 'GET', `/api/bot/?free=true`)
  return response as AxiosResponse<Bot[]>
}

export async function retrieveBot(
  searchParams: ReturnType<typeof useSearchParams>,
  uuid: string
): Promise<AxiosResponse<RetrievedBot>> {
  const response = await request(searchParams, 'GET', `/api/bot/${uuid}/`)
  return response as AxiosResponse<RetrievedBot>
}
