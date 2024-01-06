import {
  BanknotesIcon,
  ChartBarSquareIcon,
  EllipsisHorizontalIcon,
  TicketIcon
} from '@heroicons/react/24/outline'
import { Color } from '@tremor/react'
import React$1 from 'react'

type KpiData = {
  name: string
  value: string | number
  icon: React$1.ElementType
  color: Color
}

export function getKeyData(key: string, value: number): KpiData {
  const KpiData: Record<string, KpiData> = {
    value: {
      icon: BanknotesIcon,
      color: 'emerald',
      name: 'Value',
      value: value
    },
    order_count_30: {
      icon: TicketIcon,
      color: 'blue',
      name: 'Orders',
      value: value
    },
    delta_30: {
      icon: ChartBarSquareIcon,
      color: 'amber',
      name: 'Delta',
      value:
        value >= 0
          ? `+ ${(value * 100).toFixed(value % 1 === 0 ? 0 : 1)} %`
          : `${(value * 100).toFixed(value % 1 === 0 ? 0 : 1)} %`
    }
  }

  return (
    KpiData[key] || {
      icon: EllipsisHorizontalIcon,
      color: 'gray',
      name: 'Unknown',
      value: value
    }
  )
}
