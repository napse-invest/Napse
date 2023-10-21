import { Fleet } from 'api/fleets/fleets'
import { request } from 'api/request'
import { Wallet } from 'api/wallets/wallets'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface BaseNapseSpace{
  name: string
  description: string
  exchange_account: string
}

export interface NapseSpace extends BaseNapseSpace{
  uuid: string
  value: number
  fleet_count: number
}

interface Statistics {
  [Key: string]: number
}

interface History{
  // TODO: Improve this
  [Key: string]: number
}

export interface RetrievedNapseSpace extends BaseNapseSpace  {
  uuid: string
  exchange_account: string
  created_at: string
  statistics: Statistics
  wallet: Wallet
  // history:
  fleets: Fleet[]
}




export async function listSpace(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<NapseSpace[]>> {
  const response = await request(searchParams, 'GET', '/api/space/')
  return response as AxiosResponse<NapseSpace[]>
}

export async function retrieveSpace(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<RetrievedNapseSpace>> {
  const response = await request(searchParams, 'GET', `/api/space/${id}/`)
  return response as AxiosResponse<RetrievedNapseSpace>
}
