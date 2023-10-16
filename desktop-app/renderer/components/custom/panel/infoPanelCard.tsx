import PanelCard from '@/components/custom/panel/panelCard'
import { ReactNode } from 'react'

function InfoPanelCard({
  title = '',
  badge = '',
  category = '',
  tooltip = '',
  onClick = () => {}
}: {
  title: ReactNode
  badge?: ReactNode
  category?: ReactNode
  tooltip?: ReactNode
  onClick?: () => void
}): JSX.Element {
  return (
    <PanelCard
      title={category}
      badge={badge}
      tooltip={tooltip}
      onClick={onClick}
    >
      <div className="text-2xl font-bold">{title}</div>
    </PanelCard>
  )
}

export default InfoPanelCard
