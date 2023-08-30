import ContextHeader from '@/components/layout/contextHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import ValuePanelCard from './test'

function DisplaySpaces(): JSX.Element {
  const spaces = [
    {
      name: 'Space Jam',
      bots: 3,
      value: 1.01,
      change: 20.6,
      tooltip: 'mdr'
    },
    {
      name: 'Space Mountain',
      bots: 152,
      value: 152163231.89,
      change: 0,
      tooltip: 'mdr'
    },
    {
      name: 'Zero Space',
      bots: 8,
      value: 45621.89,
      change: -6.468,
      tooltip: 'mdr'
    }
  ]

  return (
    <ContextHeader isSpace>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {spaces.map((space, index) => (
          <ValuePanelCard
            title={space.name}
            value={space.value}
            change={space.change}
            tooltip={space.tooltip}
            onClick={() => {
              console.log('test')
            }}
            badge={space.bots + ' bots'}
          />
        ))}
      </div>
    </ContextHeader>
  )
}

export default DisplaySpaces
