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

type PanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  content: string | React.ReactNode
  description?: string | React.ReactNode
  tooltip?: string
  onClick?: () => void
}

/**
 * React component that renders a card with a title, badge, content, description, and an optional tooltip.
 *
 * @component
 *
 * @param {Object} props - The input props.
 * @param {string | React.ReactNode} props.title - The title of the card. It can be a string or a React node.
 * @param {string | React.ReactNode} props.badge - The badge of the card. It can be a string or a React node.
 * @param {number} props.content - Core content of the card.
 * @param {number} props.description - Text in small size.
 * @param {string} props.tooltip - The tooltip text to be displayed when hovering over the card.
 * @param {function} props.onClick - The function to be called when the card is clicked.
 * @returns {JSX.Element} The rendered card component with the provided props.
 *
 * @example
 * const MyComponent = () => {
 *   return (
 *     <PanelCard
 *       title="My Title"
 *       badge="New"
 *       content="Lorem ipsum dolor sit amet"
 *       description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
 *       tooltip="This is a tooltip"
 *       onClick={() => console.log('Card clicked')}
 *     />
 *   )
 * }
 */
export const PanelCard = React.memo(function PanelCard({
  title = '',
  badge = '',
  content = '',
  description = '',
  tooltip = '',
  onClick = () => {}
}: PanelCardProps): JSX.Element {
  const CardComponent = () => (
    <Card className="hover:shadow-lg" onClick={onClick}>
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
        <TooltipTrigger asChild>
          {/* <CardComponent /> */}
          {CardComponent()}
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <CardComponent />
  )
})
