import ContextHeader from '@/components/layout/contextHeader'
import React from 'react'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DonutChart, AreaChart } from '@tremor/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

const cities = [
  {
    name: 'New York',
    sales: 9800
  },
  {
    name: 'London',
    sales: 4567
  },
  {
    name: 'Hong Kong',
    sales: 3908
  },
  {
    name: 'San Francisco',
    sales: 2400
  },
  {
    name: 'Singapore',
    sales: 1908
  },
  {
    name: 'Zurich',
    sales: 1398
  }
]

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`

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
  { index: 19, wallet: -6069 },
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
        <AreaChart
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
    }
  ]

  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 max-w-screen-xl px-10">
        {/* <div className="hidden flex-col md:flex"> */}
        {/* <div className="flex-1 space-y-4 p-8 pt-6"> */}
        <Tabs defaultValue="space" className="">
          <TabsList>
            <TabsTrigger value="space">Space</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="fleet">Fleet</TabsTrigger>
          </TabsList>
          <TabsContent value="space">
            <div className="mx-auto my-10 grid max-w-screen-xl gap-6 lg:grid-cols-3">
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
            <div className="mx-auto my-10 h-24 max-w-screen-xl justify-center">
              <GraphCardComponent />
            </div>
          </TabsContent>
          <TabsContent value="wallet">
            <div className="my-10 grid gap-6 md:grid-cols-2 lg:grid-cols-8">
              <Card className="col-span-5">
                <CardHeader>
                  <CardTitle>prout title</CardTitle>
                </CardHeader>
                <CardContent>prout content</CardContent>
              </Card>
              {/* <div className="col-span-2 mx-6 flex flex-col justify-around gap-6">
                <Button className="mt-6 flex-1" variant="outline">
                  Button
                </Button>
                
                  Button
                </Button>
              </div> */}

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <DonutChart
                    className="mt-6"
                    data={cities}
                    category="sales"
                    index="name"
                    valueFormatter={valueFormatter}
                    colors={[
                      'slate',
                      'violet',
                      'indigo',
                      'rose',
                      'cyan',
                      'amber'
                    ]}
                  />
                  <div className="mx-10 mt-10 flex flex-row justify-around gap-8">
                    <Button className="flex-1" variant="secondary" size="lg">
                      invest
                    </Button>
                    <Button className="flex-1" variant="secondary" size="lg">
                      withdraw
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="fleet">FLEET</TabsContent>
        </Tabs>
      </div>
      {/* </div> */}
    </ContextHeader>
  )
}
