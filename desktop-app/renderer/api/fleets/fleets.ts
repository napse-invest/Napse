import { convertInterfaceToSnakeCaseDict } from '@/api/request'
import { Bot } from 'api/bots/bots'
import { request } from 'api/request'
import { Wallet } from 'api/wallets/wallets'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'

interface Statistics {
  [key: string]: number
}

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
  exchangeAccount: string
}

export interface RetrievedFleet extends BaseFleet {
  created_at: string
  statistics: Statistics
  wallet: Wallet
  bots: Bot[]
}

export interface Cluster {
  templateBot: Bot
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

export async function retrieveFleet(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<RetrievedFleet>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/fleet/${id}/?fleet=${id}`
  )
  return response as AxiosResponse<RetrievedFleet>
}

export async function createFleet(
  searchParams: ReturnType<typeof useSearchParams>,
  data: BaseFleet
): Promise<AxiosResponse<Fleet>> {
  let dataDict = data as any
  if (data.clusters) {
    dataDict = {
      ...data,
      clusters: data.clusters.map((cluster: Cluster) =>
        convertInterfaceToSnakeCaseDict({
          ...cluster,
          templateBot: cluster.templateBot.uuid
        })
      )
    }
  }

  const formatedData = convertInterfaceToSnakeCaseDict(dataDict)
  console.log('formatedData::', formatedData)
  const response = await request(
    searchParams,
    'POST',
    `/api/fleet/`,
    formatedData
  )
  return response as AxiosResponse<Fleet>
}
