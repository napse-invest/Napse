import PanelCard, { CardType } from '@/components/custom/panel/panelCard'
import { ReactNode } from 'react'

function InfoPanelCard({
  title = '',
  badge = '',
  textContent = '',
  description = '',
  cardType = 'button',
  tooltip = '',
  onClick = () => {}
}: {
  title?: ReactNode
  badge?: string
  textContent: ReactNode
  description?: string
  cardType?: CardType
  tooltip?: ReactNode
  onClick?: () => void
}): JSX.Element {
  return (
    <PanelCard
      className="h-32 w-80 min-w-fit"
      title={title}
      badge={badge}
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
        {textContent}
      </div>
    </PanelCard>
  )
}

export default InfoPanelCard
