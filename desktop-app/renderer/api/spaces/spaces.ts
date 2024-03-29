import { ExchangeAccount } from '@/api/exchangeAccounts/exchangeAccount'
import { convertInterfaceToSnakeCaseDict } from '@/api/request'
import { Fleet } from 'api/fleets/fleets'
import { request } from 'api/request'
import { Wallet } from 'api/wallets/wallets'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
interface Statistics {
  [key: string]: number
}

interface History {
  // TODO: Improve this
  [Key: string]: number
}
export interface BaseNapseSpace {
  name: string
  description: string
  exchangeAccount: string
  testing: boolean
}

export interface NapseSpace extends BaseNapseSpace {
  uuid: string
  value: number
  delta: number
}

export interface RetrievedNapseSpace extends BaseNapseSpace {
  uuid: string
  exchangeAccount: string
  created_at: string
  statistics: Statistics
  wallet: Wallet
  history: History
  fleets: Fleet[]
}

export async function getPossibleExchangeAccounts(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<ExchangeAccount[]>> {
  const response = await request(searchParams, 'GET', '/api/exchange_account/')
  return response as AxiosResponse<ExchangeAccount[]>
}

export async function listSpace(
  searchParams: ReturnType<typeof useSearchParams>
): Promise<AxiosResponse<NapseSpace[]>> {
  const response = await request(searchParams, 'GET', '/api/space/')
  return response as AxiosResponse<NapseSpace[]>
}

export async function retrieveSpace(
  searchParams: ReturnType<typeof useSearchParams>,
  id: string
): Promise<AxiosResponse<RetrievedNapseSpace>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/space/${id}/?space=${id}`
  )
  return response as AxiosResponse<RetrievedNapseSpace>
}

export async function createSpace(
  searchParams: ReturnType<typeof useSearchParams>,
  space: BaseNapseSpace
): Promise<AxiosResponse<NapseSpace>> {
  const formated_space = convertInterfaceToSnakeCaseDict(space)
  const response = await request(
    searchParams,
    'POST',
    '/api/space/',
    formated_space
  )
  return response as AxiosResponse<NapseSpace>
}

// Invest related
export interface Operation {
  ticker: string
  amount: number
}
export async function spacePossibleInvestments(
  searchParams: ReturnType<typeof useSearchParams>,
  space: RetrievedNapseSpace
): Promise<AxiosResponse<Operation[]>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/space/${space.uuid}/invest/`
  )
  return response as AxiosResponse<Operation[]>
}

export async function spaceInvest(
  searchParams: ReturnType<typeof useSearchParams>,
  space: RetrievedNapseSpace,
  investment: Operation
): Promise<AxiosResponse<Operation>> {
  const formated_operation = convertInterfaceToSnakeCaseDict(investment)
  const response = await request(
    searchParams,
    'POST',
    `/api/space/${space.uuid}/invest/`,
    formated_operation
  )
  return response as AxiosResponse<Operation>
}

// Withdraw related
export async function spacePossibleWithdraws(
  searchParams: ReturnType<typeof useSearchParams>,
  space: RetrievedNapseSpace
): Promise<AxiosResponse<Operation[]>> {
  const response = await request(
    searchParams,
    'GET',
    `/api/space/${space.uuid}/withdraw/`
  )
  return response as AxiosResponse<Operation[]>
}

export async function spaceWithdraw(
  searchParams: ReturnType<typeof useSearchParams>,
  space: RetrievedNapseSpace,
  investment: Operation
): Promise<AxiosResponse<Operation>> {
  const formated_operation = convertInterfaceToSnakeCaseDict(investment)
  const response = await request(
    searchParams,
    'POST',
    `/api/space/${space.uuid}/withdraw/`,
    formated_operation
  )
  return response as AxiosResponse<Operation>
}
