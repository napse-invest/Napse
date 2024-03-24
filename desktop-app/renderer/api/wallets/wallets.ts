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
  created_at: Date
}

export interface DataPointField {
  key: string
  target_type: string
  value: string
}

export interface DataPoints {
  created_at: Date
  fields: DataPointField[]
}

export interface History {
  uuid: string
  data_points: DataPoints[]
}

export interface Wallet {
  title: string
  value: string
  created_at: string
  currencies: Currency[]
  operations: Operation[]
  history?: History
}
