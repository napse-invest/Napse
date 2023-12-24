import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

interface Clusters {
  bot_strategy: string
  bot_name: string
  share: number
  breakpoint: number
  autoscale: boolean
}

export interface Fleet {
  name: string
  uuid: string
  value: number
  bot_count: number
  clusters?: Clusters[]
}

export async function listFleets(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<Fleet[]>> {
  const response = await request(searchParams, 'GET', '/api/fleet/')
  return response as AxiosResponse<Fleet[]>
}
