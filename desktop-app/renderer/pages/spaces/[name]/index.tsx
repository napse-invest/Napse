import ContextHeader from '@/components/layout/contextHeader'
import React from 'react'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Title, LineChart } from '@tremor/react'
import { bool } from 'prop-types'

const chartdata = [
  { index: 0, wallet: 1000 },
  { index: 1, wallet: 174 },
  { index: 2, wallet: -394 },
  { index: 3, wallet: 1518 },
  { index: 4, wallet: 1720 },
  { index: 5, wallet: 3088 },
  { index: 6, wallet: 2769 },
  { index: 7, wallet: 4329 },
  { index: 8, wallet: 6703 },
  { index: 9, wallet: 4626 },
  { index: 10, wallet: 3762 },
  { index: 11, wallet: 5867 },
  { index: 12, wallet: 4915 },
  { index: 13, wallet: 4691 },
  { index: 14, wallet: 3655 },
  { index: 15, wallet: 5941 },
  { index: 16, wallet: 6069 },
  { index: 17, wallet: 7644 },
  { index: 18, wallet: 7206 },
  { index: 19, wallet: 6069 },
  { index: 20, wallet: 4222 },
  { index: 21, wallet: 2336 },
  { index: 22, wallet: 1302 },
  { index: 23, wallet: 1875 },
  { index: 24, wallet: 2000 },
  { index: 25, wallet: 2210 },
  { index: 26, wallet: 1446 },
  { index: 27, wallet: 1194 },
  { index: 28, wallet: -474 },
  { index: 29, wallet: 441 }
]
const dataFormatter = (number: number) =>
  `${Intl.NumberFormat('us').format(number).toString()}%`
interface Space {
  name: string
  id: number
  value: number
  fleet_count: number
  change?: number
}

const GraphCardComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <Card {...props} ref={ref} className="h-96">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5">
        <CardTitle className="text-sm font-normal">MY FUCKING GRAPH</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart
          className="mx-auto pb-2"
          data={chartdata}
          index="index"
          categories={['wallet']}
          colors={['emerald']}
          curveType="monotone"
          startEndOnly={true}
          // valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      </CardContent>
    </Card>
  )
})

export default function Spaces(): JSX.Element {
  // const { name } = useSelector((state: RootStateType) => state.headerState)

  let spaces: Array<Space> = [
    {
      name: 'Stat 1',
      id: 1,
      value: 100,
      fleet_count: 10,
      change: 10
    },
    {
      name: 'Stat 2',
      id: 2,
      value: 200,
      fleet_count: 20,
      change: 20
    },
    {
      name: 'Stat 3',
      id: 3,
      value: 300,
      fleet_count: 30,
      change: 30
    },
    {
      name: 'Stat 4',
      id: 4,
      value: 400,
      fleet_count: 40,
      change: 40
    }
  ]

  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {spaces.map((space, index) => (
          <ValuePanelCard
            key={index}
            title={space.name}
            value={space.value}
            change={space.change}
            // tooltip={space.tooltip}
            onClick={() => {}}
            // badge={String(space.fleet_count) + ' fleets'}
          />
        ))}
      </div>
      <div className="mx-auto my-10 h-24 max-w-screen-xl justify-center px-24">
        <GraphCardComponent />
      </div>
    </ContextHeader>
  )
}
