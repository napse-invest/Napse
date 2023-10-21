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

export type CardType = 'button' | 'disabledButton'

interface CardComponentProps {
  children: React.ReactNode
  className?: string
  title?: ReactNode
  badge?: ReactNode
  description?: string
  descriptionClassName?: string
  tooltip?: string
  onClick?: () => void
  cardType?: CardType
}

const CardComponent = React.forwardRef<HTMLDivElement, CardComponentProps>(
  (
    {
      children,
      className,
      title,
      badge,
      description,
      cardType,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        className={cn(
          (cardType === 'button' ? 'hover:bg-secondary cursor-pointer ' : '') +
            'flex flex-col justify-center space-y-2',
          className
        )}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {(title || badge) && (
          <CardHeader className="flex flex-row items-end justify-between px-6">
            <CardTitle className="px-1 text-sm font-normal">{title}</CardTitle>
            {badge &&
              (typeof badge === 'string' ? (
                <Badge className="hover:bg-foreground text-xs italic">
                  {badge}
                </Badge>
              ) : (
                <React.Fragment>{badge}</React.Fragment>
              ))}
          </CardHeader>
        )}
        <CardContent
          className={
            'flex flex-col items-stretch px-0 ' +
            (title || badge ? '' : ' pt-6')
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
  cardType = 'button',
  tooltip = '',
  onClick = () => {}
}: {
  children: ReactNode
  className?: string
  title?: ReactNode
  badge?: ReactNode
  description?: string
  cardType?: CardType
  tooltip?: ReactNode
  onClick?: () => void
}): JSX.Element {
  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-80" asChild>
          <CardComponent
            className={className}
            title={title}
            badge={badge}
            onClick={onClick}
            description={description}
            cardType={cardType}
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
      cardType={cardType}
    >
      {children}
    </CardComponent>
  )
}
