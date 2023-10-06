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

type PanelCardProps = {
  title?: string | React.ReactNode
  badge?: string | React.ReactNode
  content: string | React.ReactNode
  description?: string | React.ReactNode
  tooltip?: string
  onClick?: () => void
}

function PanelCard({
  title = '',
  badge = '',
  content = '',
  description = '',
  tooltip = '',
  onClick = () => {}
}: PanelCardProps): JSX.Element {
  const CardComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ ...props }, ref) => {
    return (
      <Card {...props} ref={ref} className="hover:shadow-lg" onClick={onClick}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5">
          {typeof title === 'string' ? (
            <CardTitle className="text-sm font-normal">{title}</CardTitle>
          ) : (
            title
          )}
          {typeof badge === 'string' ? (
            <div className="text-xs italic">{badge}</div>
          ) : (
            badge
          )}
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
  })

  CardComponent.displayName = 'Card'

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CardComponent />
          {/* {CardComponent()} */}
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <CardComponent />
  )
}

export default PanelCard
