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

export interface RetrievedFleet extends Fleet {
  created_at: string
  testing: boolean
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

// Invest related
export interface Operation {
  ticker: string
  amount: number
}
export async function fleetPossibleInvestments(
  searchParams: ReturnType<typeof useSearchParams>,
  fleet: RetrievedFleet
): Promise<AxiosResponse<Operation[]>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/fleet/${fleet.uuid}/invest/`
  )
  return response as AxiosResponse<Operation[]>
}

export async function fleetInvest(
  searchParams: ReturnType<typeof useSearchParams>,
  fleet: RetrievedFleet,
  investment: Operation
): Promise<AxiosResponse<Operation>> {
  const formated_operation = convertInterfaceToSnakeCaseDict(investment)
  const response = await request(
    searchParams,
    'POST',
    `/api/fleet/${fleet.uuid}/invest/`,
    formated_operation
  )
  return response as AxiosResponse<Operation>
}

// Withdraw related
export async function fleetPossibleWithdraws(
  searchParams: ReturnType<typeof useSearchParams>,
  fleet: RetrievedFleet
): Promise<AxiosResponse<Operation[]>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/fleet/${fleet.uuid}/withdraw/`
  )
  return response as AxiosResponse<Operation[]>
}

export async function fleetWithdraw(
  searchParams: ReturnType<typeof useSearchParams>,
  fleet: RetrievedFleet,
  investment: Operation
): Promise<AxiosResponse<Operation>> {
  const formated_operation = convertInterfaceToSnakeCaseDict(investment)
  const response = await request(
    searchParams,
    'POST',
    `/api/fleet/${fleet.uuid}/withdraw/`,
    formated_operation
  )
  return response as AxiosResponse<Operation>
}
