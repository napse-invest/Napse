import PanelCard from '@/components/custom/panel/panelCard'

export default function MinimalistPanelCard({
  title,
  tooltip,
  onClick = () => {}
}: {
  title: string
  tooltip?: string
  onClick?: () => void
}): JSX.Element {
  return (
    <PanelCard tooltip={tooltip} onClick={onClick}>
      <div className="text-center text-2xl font-bold">{title}</div>
    </PanelCard>
  )
}
