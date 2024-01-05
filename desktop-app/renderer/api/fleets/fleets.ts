import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface Fleet {
  name: string
  uuid: string
  value: number
  bot_count: number
}

export async function listFleet(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<Fleet[]>> {
  const response = await request(searchParams, 'GET', `/api/fleet/`)
  return response as AxiosResponse<Fleet[]>
}
