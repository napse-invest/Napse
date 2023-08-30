import ContextHeader from '@/components/layout/contextHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function ValueChangeColor(value: number): string {
  if (value > 0) {
    return 'text-green-500'
  } else if (value < 0) {
    return 'text-red-500'
  } else {
    return 'text-muted-foreground'
  }
}

type Props = {
  info?: React.ReactNode
  action?: React.ReactNode
}

function DisplaySpaces(): JSX.Element {
  const spaces = [
    {
      name: 'Space Jam',
      bots: 3,
      value: 1.01,
      change: 20.6
    },
    {
      name: 'Space Mountain',
      bots: 152,
      value: 152163231.89,
      change: 0
    },
    {
      name: 'Zero Space',
      bots: 8,
      value: 45621.89,
      change: -6.468
    }
  ]

  return (
    <ContextHeader isSpace>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {spaces.map((space, index) => (
          <Card
            key={index}
            className="hover:shadow-lg"
            onClick={() => {
              console.log('prout')
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5">
              <CardTitle className="text-sm font-medium">
                {space.name}
              </CardTitle>
              <div className="text-xs italic">{space.bots} bots</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Intl.NumberFormat('us-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(space.value)}
              </div>
              <p className={`text-xs ${ValueChangeColor(space.change)}`}>
                {space.change >= 0 ? '+' : ''}
                {Intl.NumberFormat('us-US', {
                  maximumSignificantDigits: 3
                }).format(space.change)}
                %
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ContextHeader>
  )
}

export default DisplaySpaces
