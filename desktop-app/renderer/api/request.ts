import { getServer } from '@/lib/localStorage'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

export function request(
  searchParams: ReturnType<typeof useSearchParams>,
  method: string,
  url: string,
  ...args: any[]
) {
  const serverID = searchParams.get('server')
  if (!serverID) {
    throw new Error('No server selected')
  }
  const serverUrl = getServer(serverID).url
  return axios({
    method: method,
    url: url,
    baseURL: serverUrl,
    ...args
  })
}
