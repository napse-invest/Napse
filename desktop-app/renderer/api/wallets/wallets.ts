export interface Currency {
  ticker: string
  mbp: number
  amount: number
  value: number
}

export interface Operation {
  amount: number
  ticker: string
  operation_type: string
  created_at: string
}

export interface Wallet {
  title: string
  value: string
  created_at: string
  currencies: Currency[]
  operations: Operation[]
}
