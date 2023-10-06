import PanelCard from '@/components/custom/panel/panelCard'
import React from 'react'

type InfoPanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  category?: string | React.ReactNode
  tooltip?: string
  onClick?: () => void
}

function InfoPanelCard({
  title = '',
  badge = '',
  category = '',
  tooltip = '',
  onClick = () => {}
}: InfoPanelCardProps): JSX.Element {
  return (
    <PanelCard
      title={category}
      badge={badge}
      // description={<p className="text-sm"></p>}
      content={<div className="text-2xl font-bold">{title}</div>}
      tooltip={tooltip}
      onClick={onClick}
    />
  )
}

export default InfoPanelCard
