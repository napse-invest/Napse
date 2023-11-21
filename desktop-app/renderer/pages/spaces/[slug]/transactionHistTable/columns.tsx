'use client'

import { ColumnDef } from '@tanstack/react-table'

export type Operation = {
  id: string
  ticker: string
  amount: number
  kind: 'credit' | 'debit' | 'transaction'
  date: Date
}

export const columns: ColumnDef<Operation>[] = [
  {
    accessorKey: 'ticker',
    header: 'Ticker'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'kind',
    header: 'Kind'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  }
]

export default function Todo(): JSX.Element {
  // TODO: implement or move this file
  return <></>
}
