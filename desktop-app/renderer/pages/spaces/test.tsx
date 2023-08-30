import ContextHeader from '@/components/layout/contextHeader'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import React from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

function ValueChangeColor(value: number): string {
  if (value > 0) {
    return 'text-green-600'
  } else if (value < 0) {
    return 'text-red-500'
  } else {
    return 'text-muted-foreground'
  }
}

type PanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  content: string | React.ReactNode
  description?: string | React.ReactNode
  tooltip?: string
  onClic?: () => void
}

function PanelCard({
  title = '',
  badge = '',
  content = '',
  description = '',
  tooltip = '',
  onClic = () => {}
}: PanelCardProps): JSX.Element {
  const cardBuild = () => (
    <Card className="hover:shadow-lg" onClick={onClic}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5">
        {typeof title === 'string' ? (
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        ) : (
          title
        )}
        <div className="text-xs italic">{badge}</div>
      </CardHeader>
      <CardContent>
        {content}
        {typeof description === 'string' ? (
          <CardDescription>{description}</CardDescription>
        ) : (
          description
        )}
      </CardContent>
    </Card>
  )

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{cardBuild()}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    cardBuild()
  )
}

type ValuePanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  value: number
  change: number
  tooltip?: string
  onClic?: () => void
}

function ValuePanelCard({
  title = '',
  badge = '',
  value = 0,
  change = 0,
  tooltip = '',
  onClic = () => {}
}: ValuePanelCardProps): JSX.Element {
  return (
    <PanelCard
      title={title}
      badge={badge}
      description={
        <p className={`text-sm ${ValueChangeColor(change)}`}>
          {change >= 0 ? '+' : ''}
          {Intl.NumberFormat('us-US', {
            maximumSignificantDigits: 3
          }).format(change)}
          %
        </p>
      }
      content={
        <div className="text-2xl font-bold">
          {Intl.NumberFormat('us-US', {
            style: 'currency',
            currency: 'USD'
          }).format(value)}
        </div>
      }
      tooltip={tooltip}
      onClic={onClic}
    />
  )
}

export default ValuePanelCard
