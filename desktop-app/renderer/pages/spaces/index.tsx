import ContextHeader from '@/components/layout/contextHeader'
import React from 'react'
import ValuePanelCard from '@/components/custom/panel/value_panel_card'

function DisplaySpaces(): JSX.Element {
  const spaces = [
    {
      name: 'Space Jam',
      bots: 3,
      value: 1.01,
      change: 20.6,
      tooltip: 'test'
    },
    {
      name: 'Space Mountain',
      bots: 152,
      value: 152163231.89,
      change: 0,
      tooltip: 'test'
    },
    {
      name: 'Zero Space',
      bots: 8,
      value: 45621.89,
      change: -6.468,
      tooltip: 'test'
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
