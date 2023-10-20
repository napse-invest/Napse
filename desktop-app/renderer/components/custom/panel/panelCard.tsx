import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import React, { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CardComponentProps {
  children: React.ReactNode
  className?: string
  title?: string | React.ReactNode
  badge?: string | React.ReactNode
  description?: string | React.ReactNode
  tooltip?: string
  onClick?: () => void
}

const CardComponent = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ children, className, title, badge, description, onClick }, ref) => {
    return (
      <Card
        className={cn(
          'hover:bg-secondary flex flex-col justify-center space-y-2',
          className
        )}
        onClick={onClick}
        ref={ref}
      >
        {(title || badge) && (
          <CardHeader className="flex flex-row items-end justify-between space-y-0">
            <CardTitle className="px-3 text-sm font-normal">{title}</CardTitle>
            {badge && (
              <Badge className="hover:bg-foreground text-xs italic">
                {badge}
              </Badge>
            )}
          </CardHeader>
        )}
        <CardContent
          className={
            'flex flex-col items-center' + (title || badge ? '' : ' pt-6')
          }
        >
          {children}
          {description && <CardDescription>{description}</CardDescription>}
        </CardContent>
      </Card>
    )
  }
)
CardComponent.displayName = 'CardComponent'

export default function PanelCard({
  children,
  className = '',
  title = '',
  badge = '',
  description = '',
  tooltip = '',
  onClick = () => {}
}: {
  children: ReactNode
  className?: string
  title?: ReactNode
  badge?: ReactNode
  description?: ReactNode
  tooltip?: ReactNode
  onClick?: () => void
}): JSX.Element {
  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <CardComponent
            className={className}
            title={title}
            badge={badge}
            onClick={onClick}
            description={description}
          >
            {children}
          </CardComponent>
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <CardComponent
      className={className}
      title={title}
      badge={badge}
      onClick={onClick}
      description={description}
    >
      {children}
    </CardComponent>
  )
}
