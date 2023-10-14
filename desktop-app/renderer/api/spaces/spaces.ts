import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface NapseSpace {
  name: string
  uuid: string
  value: number
  fleet_count: number
  exchange_account: string
  delta?: number
}

export async function listSpace(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<NapseSpace[]>> {
  const response = await request(searchParams, 'GET', '/api/space/')
  return response as AxiosResponse<NapseSpace[]>
}

export async function getSpace(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<NapseSpace>> {
  const response = await request(searchParams, 'GET', `/api/space/${id}/`)
  return response as AxiosResponse<NapseSpace>
}
