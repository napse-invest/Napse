import PanelCard, { CardType } from '@/components/custom/panel/panelCard'
import { BadgeDelta } from '@tremor/react'
import { ReactNode } from 'react'

function getDeltaType({ delta }: { delta: number }): string {
  // switch case on delta if delta is not defined
  if (delta >= 5) {
    return 'increase'
  }
  if (delta > 0 && delta < 5) {
    return 'moderateIncrease'
  }
  if (delta === 0) {
    return 'unchanged'
  }
  if (delta < 0 && delta > -5) {
    return 'moderateDecrease'
  }
  return 'decrease'
}

export function formatCurrencyValue(value: number): string {
  return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}

function ValuePanelCard({
  title = '',
  value = 0,
  delta,
  description = '',
  cardType = 'button',
  tooltip = '',
  onClick = () => {}
}: {
  title?: ReactNode
  value: number
  delta?: number
  description?: string
  cardType?: CardType
  tooltip?: string
  onClick?: () => void
}): JSX.Element {
  const badge = () => {
    if (typeof delta == undefined || delta == null) {
      return <></>
    }
    return (
      <BadgeDelta
        className="rounded-tremor-full"
        deltaType={getDeltaType({ delta })}
        isIncreasePositive={true}
        size="xs"
      >
        {delta >= 0
          ? `+${(delta * 100).toFixed(delta % 1 == 0 ? 0 : 1)}`
          : (delta * 100).toFixed(delta % 1 == 0 ? 0 : 1)}{' '}
        %
      </BadgeDelta>
    )
  }
  return (
    <PanelCard
      className="h-32 w-80 min-w-fit"
      title={title}
      badge={badge()}
      description={description}
      cardType={cardType}
      tooltip={tooltip}
      onClick={onClick}
    >
      <div
        className={
          'text-center text-2xl font-bold' +
          (cardType === 'disabledButton' ? ' cursor-not-allowed' : '')
        }
      >
        {formatCurrencyValue(value)}
      </div>
    </PanelCard>
  )
}

export default ValuePanelCard
