export interface Order {
  side: string
  completed: boolean
  spent: {
    ticker: string
    amount: number
    price: number
    value: number
  }
  received: {
    ticker: string
    amount: number
    price: number
    value: number
  }
  fees: {
    ticker: string
    amount: number
    price: number
    value: number
  }
  created_at: string
}
