import { request } from 'api/request'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

export interface Key {
  name: string
  prefix: string
  permissions: string[]
  is_master_key: boolean
  revoked: boolean
  description: string
}

export async function getKey(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<Key>> {
  const response = await request(searchParams, 'GET', `/api/key/${id}/`)
  return response as AxiosResponse<Key>
}
export async function listKey(
  searchParams: ReturnType<typeof useSearchParams>,
  space: string | null = null
): Promise<AxiosResponse<Key[]>> {
  const response = await request(
    searchParams,
    'GET',
    space ? `/api/key/?space=${space}` : '/api/key/'
  )
  return response as AxiosResponse<Key[]>
}

export async function createKey(
  searchParams: ReturnType<typeof useSearchParams>,
  name: string,
  description: string
): Promise<AxiosResponse<{ key: string }>> {
  const response = await request(searchParams, 'POST', '/api/key/', {
    name,
    description
  })
  return response as AxiosResponse<{ key: string }>
}
