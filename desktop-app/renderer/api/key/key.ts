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
  id: string,
  space: string | null = null
): Promise<AxiosResponse<Key>> {
  const response = await request(
    searchParams,
    'GET',
    space ? `/api/key/${id}/?space=${space}` : `/api/key/${id}/`
  )
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

export async function deleteKey(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<null>> {
  const response = await request(searchParams, 'DELETE', `/api/key/${id}/`)
  return response as AxiosResponse<null>
}

export async function possiblePermissions(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<string[]>> {
  const response = await request(
    searchParams,
    'GET',
    '/api/key/possible_permissions/'
  )
  return response as AxiosResponse<string[]>
}

export async function updateKey(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string,
  name?: string,
  description?: string,
  revoked?: boolean,
  permissions?: string[],
  space?: string
): Promise<AxiosResponse<null>> {
  if (permissions && !space) {
    throw new Error('space is required when updating permissions')
  }
  const response = await request(
    searchParams,
    'PATCH',
    space ? `/api/key/${id}/?space=${space}` : `/api/key/${id}/`,
    {
      name,
      description,
      revoked,
      permissions
    }
  )
  return response as AxiosResponse<null>
}
