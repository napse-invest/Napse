import PanelCard from '@/components/custom/panel/panelCard'
import React from 'react'

function changeValueColor(value: number): string {
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

type valuePanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  value: number
  change?: number
  tooltip?: string
  onClick?: () => void
}

function ValuePanelCard({
  title = '',
  badge = '',
  value = 0,
  change = 0,
  tooltip = '',
  onClick = () => {}
}: valuePanelCardProps): JSX.Element {
  return (
    <PanelCard
      title={title}
      badge={badge}
      description={
        <p className={`text-sm ${changeValueColor(change)}`}>
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
