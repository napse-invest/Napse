import PanelCard from '@/components/custom/panel/panelCard'
import { string } from 'prop-types'
import React from 'react'

type MinimalistPanelCardProps = {
  title: string
  tooltip?: string
  onClick?: () => void
}

function MinimalistPanelCard({
  title,
  tooltip,
  onClick = () => {}
}: MinimalistPanelCardProps): JSX.Element {
  return (
    <PanelCard
      content={<div className="text-center text-2xl font-bold">{title}</div>}
      tooltip={tooltip}
      onClick={onClick}
    />
  )
}

export default MinimalistPanelCard
