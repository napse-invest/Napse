import PanelCard from '@/components/custom/panel/panelCard'
import { ReactNode } from 'react'

function InfoPanelCard({
  title = '',
  badge = '',
  textContent = '',
  description = '',
  tooltip = '',
  onClick = () => {}
}: {
  title?: ReactNode
  badge?: ReactNode
  textContent: ReactNode
  description?: ReactNode
  tooltip?: ReactNode
  onClick?: () => void
}): JSX.Element {
  return (
    <PanelCard
      className="h-32 w-80"
      title={title}
      badge={badge}
      description={description}
      tooltip={tooltip}
      onClick={onClick}
    >
      <div className="text-2xl font-bold">{textContent}</div>
    </PanelCard>
  )
}

export default InfoPanelCard
