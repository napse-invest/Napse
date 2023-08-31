import PanelCard from '@/components/custom/panel/panel_card'
import React from 'react'

function ChangeValueColor(value: number): string {
  if (value > 0) {
    return 'text-green-600'
  } else if (value < 0) {
    return 'text-red-500'
  } else {
    return 'text-muted-foreground'
  }
}

function formatChangeValue(change: number): string {
  return `${change >= 0 ? '+' : ''}${Intl.NumberFormat('us-US', {
    maximumSignificantDigits: 3
  }).format(change)}%`
}

function formatCurrencyValue(value: number): string {
  return Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

type ValuePanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  value: number
  change: number
  tooltip?: string
  onClick?: () => void
}

const ValuePanelCard = ({
  title = '',
  badge = '',
  value = 0,
  change = 0,
  tooltip = '',
  onClick = () => {}
}: ValuePanelCardProps): JSX.Element => {
  return (
    <PanelCard
      title={title}
      badge={badge}
      description={
        <p className={`text-sm ${ChangeValueColor(change)}`}>
          {formatChangeValue(change)}
        </p>
      }
      content={
        <div className="text-2xl font-bold">{formatCurrencyValue(value)}</div>
      }
      tooltip={tooltip}
      onClick={onClick}
    />
  )
}

export default ValuePanelCard
