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
  const server = getServer(serverID)
  const serverUrl = server.url
  const token = server.token
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
