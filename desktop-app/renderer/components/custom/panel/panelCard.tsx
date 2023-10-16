import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React, { ReactNode } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface CardComponentProps {
  children: React.ReactNode
  title?: string | React.ReactNode
  badge?: string | React.ReactNode
  description?: string | React.ReactNode
  tooltip?: string
  onClick?: () => void
}

const CardComponent = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ children, title, badge, description, onClick }, ref) => {
    return (
      <Card className="hover:shadow-sm" onClick={onClick} ref={ref}>
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
          {children}
          {typeof description === 'string' ? (
            <CardDescription>{description}</CardDescription>
          ) : (
            description
          )}
        </CardContent>
      </Card>
    )
  }
)

export default function PanelCard({
  children,
  title = '',
  badge = '',
  description = '',
  tooltip = '',
  onClick = () => {}
}: {
  children: ReactNode
  title?: ReactNode
  badge?: ReactNode
  description?: ReactNode
  tooltip?: ReactNode
  onClick?: () => void
}): JSX.Element {
  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <CardComponent
            title={title}
            badge={badge}
            onClick={onClick}
            children={children}
            description={description}
          />
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <CardComponent
      title={title}
      badge={badge}
      onClick={onClick}
      children={children}
      description={description}
    />
  )
}
