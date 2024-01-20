import { getServer } from '@/lib/localStorage'
import axios, { AxiosHeaders } from 'axios'
import { useSearchParams } from 'next/navigation'

export function request(
  searchParams: ReturnType<typeof useSearchParams>,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
  url: string,
  data: Object | null = null,
  headers: AxiosHeaders | null = null
) {
  const serverID = searchParams.get('server')

  if (!serverID) {
    throw new Error('No server selected')
  }
  // Server
  const server = getServer(serverID)
  const serverUrl = server.url
  const token = server.token

  // url
  if (!url.includes('?')) {
    if (!url.endsWith('/')) {
      url = url + '/'
    }
    url = url + '?'
  }

  // Space
  const space_uuid = searchParams.get('space')
  if (space_uuid) {
    url = url + `&space=${space_uuid}`
  }
  console.log('url', url)

  return axios({
    method: method,
    url: url,
    baseURL: serverUrl,
    headers: {
      Authorization: 'Api-Key ' + token,
      ...headers
    },
    data: data || {}
  })
}

export function convertInterfaceToSnakeCaseDict(obj: any) {
  // from camelCase to snake_case for REST API communication

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const newKey = key.replace(
        /[A-Z]/g,
        (letter) => `_${letter.toLowerCase()}`
      )
      acc[newKey] = value
      return acc
    },
    {} as Record<string, unknown>
  )
}
