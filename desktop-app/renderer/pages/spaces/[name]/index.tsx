import ContextHeader from '@/components/layout/contextHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { AreaChart, DonutChart } from '@tremor/react'
import React, { useState } from 'react'

import StatCard from '@/components/custom/statCard'
import { Currency, getAssetColumns } from './assetsTable/columns'
import { AssetsDataTable } from './assetsTable/data-table'
import { OperationDataTable } from './transactionHistTable/data-table'

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
interface Stat {
  title: string
  metric: number
  delta: number
}

const GraphCardComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <Card {...props} ref={ref} className=" pb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-normal">MY GRAPH</CardTitle>
      </CardHeader>
      <CardContent className="  pb-0">
        <AreaChart
          className="mx-auto h-96 "
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

GraphCardComponent.displayName = 'GraphCardComponent'

function getData(): Currency[] {
  return [
    {
      amount: 100,
      ticker: 'BUSD'
    },
    {
      amount: 10,
      ticker: 'USDT'
    },
    {
      amount: 1000,
      ticker: 'Matic'
    },
    {
      amount: 100,
      ticker: 'BUSD'
    },
    {
      amount: 10,
      ticker: 'USDT'
    },
    {
      amount: 1000,
      ticker: 'Matic'
    },
    {
      amount: 100,
      ticker: 'BUSD'
    },
    {
      amount: 10,
      ticker: 'USDT'
    },
    {
      amount: 1000,
      ticker: 'Matic'
    },
    {
      amount: 100,
      ticker: 'BUSD'
    },
    {
      amount: 10,
      ticker: 'USDT'
    },
    {
      amount: 1000,
      ticker: 'Matic'
    },
    {
      amount: 100,
      ticker: 'BUSD'
    },
    {
      amount: 10,
      ticker: 'USDT'
    },
    {
      amount: 1000,
      ticker: 'Matic'
    }
  ]
}

export default function Spaces(): JSX.Element {
  // const { name } = useSelector((state: RootStateType) => state.headerState)

  let spaces: Array<Stat> = [
    {
      title: 'Stat 1',
      metric: 5,
      delta: 0
    },
    {
      title: 'Stat 2',
      metric: 42,
      delta: 6
    },
    {
      title: 'Stat 3',
      metric: 5,
      delta: -2
    }
  ]
  const [flip, setFlip] = useState(false)
  function toggleFlip() {
    setFlip(!flip)
  }
  const { toast } = useToast()
  const data = getData()
  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 max-w-screen-xl px-10">
        {/* <div className="hidden flex-col md:flex"> */}
        {/* <div className="flex-1 space-y-4 p-8 pt-6"> */}
        <Tabs defaultValue="space" className="">
          <TabsList>
            <TabsTrigger value="space">Space</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="fleets">Fleets</TabsTrigger>
          </TabsList>
          <TabsContent value="space">
            <div className="my-10 grid max-w-screen-xl gap-6 lg:grid-cols-3">
              {spaces.map((space, index) => (
                <StatCard
                  key={index}
                  title={space.title}
                  metric={space.metric}
                  delta={space.delta}
                />
                // <ValuePanelCard
                //   key={index}
                //   title={space.name}
                //   value={space.value}
                //   delta={space.delta}
                //   // tooltip={space.tooltip}
                //   onClick={() => {}}
                //   // badge={String(space.fleet_count) + ' fleets'}
                // />
              ))}
            </div>
            <div className=" my-10 h-24 max-w-screen-xl justify-center">
              <GraphCardComponent />
            </div>
          </TabsContent>
          <TabsContent value="wallet">
            <div className=" my-10 grid max-w-screen-xl gap-6">
              <Card className="">
                <CardHeader className="mt-0 flex flex-row justify-between">
                  <CardTitle className="">Transaction history</CardTitle>
                  <Button
                    className=""
                    variant="outline"
                    size="icon"
                    onClick={toggleFlip}
                  >
                    FLIP
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-8 justify-between gap-6">
                  <div className="col-span-5">
                    {/* <GraphCardComponent /> */}

                    <div
                      className={`preserve-3d relative h-full w-full duration-1000 ${
                        flip ? 'flip-x-180' : ''
                      }`}
                    >
                      <div className="backface-hidden absolute z-0 h-full w-full">
                        <GraphCardComponent className="" />
                      </div>
                      <div className="flip-x-180 backface-hidden absolute h-full w-full">
                        {/* <GraphCardComponent /> */}
                        <div className="">
                          <ScrollArea className=" h-[30rem] rounded-md border">
                            <AssetsDataTable
                              columns={getAssetColumns(toast)}
                              data={data}
                            />
                          </ScrollArea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <Card className="py-8">
                      <CardHeader>
                        <CardTitle />
                      </CardHeader>
                      <CardContent className="">
                        <DonutChart
                          className="my-10"
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
                        <div className="mx-10 mt-20 flex flex-row justify-between gap-8">
                          <Button
                            className="flex-1"
                            variant="secondary"
                            size="lg"
                            onClick={() => {
                              console.log('invest1')
                              toast({
                                title: 'Scheduled: Catch up',
                                description:
                                  'Friday, February 10, 2023 at 5:57 PM'
                              })
                              console.log('invest2')
                            }}
                          >
                            Invest
                          </Button>
                          <Button
                            className="flex-1"
                            variant="secondary"
                            size="lg"
                            onClick={() => {
                              console.log('withdraw')
                            }}
                          >
                            Withdraw
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <OperationDataTable
                columns={getAssetColumns(toast)}
                data={data}
              />
            </div>
          </TabsContent>
          <TabsContent value="fleets">fleet </TabsContent>
        </Tabs>
      </div>
      {/* </div> */}
    </ContextHeader>
  )
}
