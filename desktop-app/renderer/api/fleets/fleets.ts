import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface BaseFleet {
  name: string
  space?: string
  clusters?: Cluster[]
}

export interface Fleet extends BaseFleet {
  uuid: string
  value: number
  bot_count: number
  delta: number
  exchange_account: string
}

export interface Cluster {
  template_bot: string
  share: number
  breakpoint: number
  autoscale: boolean
}

export async function listFleet(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<Fleet[]>> {
  const response = await request(searchParams, 'GET', `/api/fleet/`)
  return response as AxiosResponse<Fleet[]>
}

export async function createFleet(
  searchParams: ReturnType<typeof useSearchParams>,
  fleet: BaseFleet
): Promise<AxiosResponse<Fleet>> {
  const response = await request(searchParams, 'POST', `/api/fleet/`, fleet)
  return response as AxiosResponse<Fleet>
}
