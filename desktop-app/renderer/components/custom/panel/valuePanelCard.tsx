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

function formatChangeValue(delta: number): string {
  return `${delta >= 0 ? '+' : ''}${Intl.NumberFormat('us-US', {
    maximumSignificantDigits: 3
  }).format(delta)}%`
}

function formatCurrencyValue(value: number): string {
  return Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

function ValuePanelCard({
  title = '',
  badge = '',
  value = 0,
  delta = 0,
  tooltip = '',
  onClick = () => {}
}: {
  title: string | React.ReactNode
  badge?: string
  value: number
  delta?: number
  tooltip?: string
  onClick?: () => void
}): JSX.Element {
  return (
    <PanelCard
      title={title}
      badge={badge}
      description={formatChangeValue(delta)}
      descriptionClassName={`text-sm ${changeValueColor(delta)}`}
      tooltip={tooltip}
      onClick={onClick}
    >
      <div className="text-2xl font-bold">{formatCurrencyValue(value)}</div>
    </PanelCard>
  )
}

export default ValuePanelCard
