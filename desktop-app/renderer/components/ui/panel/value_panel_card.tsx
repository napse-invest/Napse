import { PanelCard } from '@/components/ui/panel/panel_card'
import React from 'react'

/**
 * Determines the color class for displaying the change value in a value panel card.
 * Returns different color classes based on the value input.
 *
 * @param value - A number representing the change value.
 * @returns A string representing the color class for displaying the change value.
 *
 * @example
 * const changeValue = 10;
 * const colorClass = ChangeValueColor(changeValue);
 * console.log(colorClass); // Output: 'text-green-600'
 */
function ChangeValueColor(value: number): string {
  if (value > 0) {
    return 'text-green-600'
  } else if (value < 0) {
    return 'text-red-500'
  } else {
    return 'text-muted-foreground'
  }
}

/**
 * Formats the change value by adding a plus sign if the change is positive and formatting the number with a maximum of 3 significant digits followed by a percentage sign.
 *
 * @param change - The change value to be formatted.
 * @returns A string representing the formatted change value with a plus sign if the change is positive, followed by the number formatted with a maximum of 3 significant digits, and ending with a percentage sign.
 *
 * @example
 * const changeValue = formatChangeValue(0.123456);
 * console.log(changeValue);
 * // Output: "+0.123%"
 */
function formatChangeValue(change: number): string {
  return `${change >= 0 ? '+' : ''}${Intl.NumberFormat('us-US', {
    maximumSignificantDigits: 3
  }).format(change)}%`
}

/**
 * Formats a number as a currency value in USD.
 *
 * @param value - The number to be formatted as a currency value.
 * @returns The formatted currency value as a string.
 *
 * @example
 * const value = 1000;
 * const formattedValue = formatCurrencyValue(value);
 * console.log(formattedValue); // $1,000.00
 */
function formatCurrencyValue(value: number): string {
  return Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)
}

type ValuePanelCardProps = {
  title: string | React.ReactNode
  badge?: string | React.ReactNode
  value: number
  change: number
  tooltip?: string
  onClick?: () => void
}

/**
 * Renders a card with a title, badge, value, change, and optional tooltip.
 *
 * @param {Object} props - The input props.
 * @param {string | React.ReactNode} props.title - The title of the card. It can be a string or a React node.
 * @param {string | React.ReactNode} props.badge - The badge of the card. It can be a string or a React node.
 * @param {number} props.value - The value to be displayed in the card.
 * @param {number} props.change - The change value to be displayed in the card.
 * @param {string} props.tooltip - The tooltip text to be displayed when hovering over the card.
 * @param {function} props.onClick - The function to be called when the card is clicked.
 * @returns {JSX.Element} The rendered card component with the provided props.
 */
function ValuePanelCard({
  title = '',
  badge = '',
  value = 0,
  change = 0,
  tooltip = '',
  onClick = () => {}
}: ValuePanelCardProps): JSX.Element {
  return (
    <PanelCard
      title={title}
      badge={badge}
      description={
        <p className={`text-sm ${ChangeValueColor(change)}`}>
          {formatChangeValue(change)}
        </p>
      }
      content={
        <div className="text-2xl font-bold">{formatCurrencyValue(value)}</div>
      }
      tooltip={tooltip}
      onClick={onClick}
    />
  )
}

export default ValuePanelCard