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

import { Badge, BadgeDelta, ProgressBar } from '@tremor/react'

type StatCardProps = {
  title: string
  metric: string | number
  delta?: number
  tooltip?: string
}

enum DeltaTypes {
  increase = 'increase',
  moderateIncrease = 'moderateIncrease',
  unchanged = 'unchanged',
  moderateDecrease = 'moderateDecrease',
  decrease = 'decrease'
}

function getDeltaType({ delta }: { delta: number }): DeltaTypes {
  // switch case on delta if delta is not defined
  if (delta > 5) {
    return DeltaTypes.increase
  }
  if (delta > 0 && delta < 5) {
    return DeltaTypes.moderateIncrease
  }
  if (delta === 0) {
    return DeltaTypes.unchanged
  }
  if (delta < 0 && delta > -5) {
    return DeltaTypes.moderateDecrease
  }
  return DeltaTypes.decrease
}

function StatCard({
  title = '',
  metric = '',
  delta = undefined,
  tooltip = 'from last month'
}: StatCardProps): JSX.Element {
  const StatCardComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(({ ...props }, ref) => {
    return (
      <Card {...props} ref={ref}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-1">
          <CardTitle className="text-muted-foreground text-sm font-normal">
            {title}
          </CardTitle>
          {typeof delta === 'number' ? (
            <BadgeDelta size="md" deltaType={getDeltaType({ delta })}>
              {delta}
            </BadgeDelta>
          ) : null}
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {metric}
          <ProgressBar value={45} color="teal" className="mt-3" />
        </CardContent>
      </Card>
    )
  })

  StatCardComponent.displayName = 'StatCard'

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <StatCardComponent />
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <StatCardComponent />
  )
}

export default StatCard
