import { RetrievedBot, retrieveBot } from '@/api/bots/bots'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { fakeDashboardData } from '@/lib/fakeDashboardData'
import { standardUrlPartial } from '@/lib/queryParams'
import { AreaChart, DonutChart, Metric } from '@tremor/react'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`

function formatCurrencyValue(value: number): string {
  return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}
function formatDeltaValue(value: number): string {
  return `${value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%`
}

const formattedFakeDashboardData = fakeDashboardData.map((item) => {
  return { ...item, date: format(item.date, 'd MMM yy') }
})

export type simpleCurrencyData = {
  ticker: string
  value: number
}

export default function Bot(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const botID: string = searchParams.get('bot') || ''
  const [bot, setBot] = useState<RetrievedBot>()

  useEffect(() => {
    async function fetchBot() {
      try {
        const response = await retrieveBot(searchParams, botID)
        setBot(response.data)
      } catch (error) {
        console.error(error)
        // go to the previous page
        router.push(
          standardUrlPartial(
            '/bots/',
            null,
            { space: '', fleet: '', bot: '' },
            searchParams
          )
        )
      }
    }

    if (searchParams.get('server')) {
      fetchBot()
    }
  }, [botID, searchParams, router])
  console.log(bot)

  if (!bot) {
    // TODO: setup a squeleton or a loader
    return <></>
  }

  const currencies = bot['wallet']['currencies']
  const simpleCurrencies: simpleCurrencyData[] = currencies.map((currency) => ({
    ticker: currency.ticker,
    value: currency.value
  }))

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={bot.name}
        description={
          'Bots look to make your money grow while you do something else.'
        }
      >
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="operations" disabled>
              Operations
            </TabsTrigger>
            <TabsTrigger value="orders" disabled>
              Orders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="wallet" className="mt-8 flex flex-row gap-6">
            <Card className="container h-full w-full pt-4">
              <CardHeader>
                <CardDescription>Performance</CardDescription>
                <Metric>{formatCurrencyValue(bot.value as number)}</Metric>
                <div className="flex flex-row">
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="flex flex-row gap-2">
                        {/* TODO: Color depending of value (+ || -) */}
                        <div className="text-emerald-700 dark:text-emerald-500">
                          {/* TODO: dynamic stat from backend */}
                          +$430.90
                        </div>
                        <div className="text-emerald-700 dark:text-emerald-500">
                          ({formatDeltaValue(bot?.delta as number)})
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className=" text-center">
                      On the last 30 days
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </CardHeader>
              <CardContent className="">
                <AreaChart
                  data={formattedFakeDashboardData}
                  index="date"
                  categories={['value']}
                  colors={['blue', 'violet', 'fuchsia']}
                  valueFormatter={valueFormatter}
                  yAxisWidth={55}
                  onValueChange={() => {}}
                  showAnimation={true}
                  curveType="linear"
                  className="mt-6 hidden h-96 sm:block"
                />
                <div className="my-4 text-base font-medium">Summary</div>
                <div className="grid grid-cols-3 items-center gap-10">
                  <div className="col-span-2">
                    {Object.entries(bot.statistics || {}).map(
                      ([statName, statValue], index) => {
                        return (
                          <div key={index}>
                            <div className="flex flex-row justify-between">
                              <div>{statName}</div>
                              <div>{statValue}</div>
                            </div>
                            <Separator className="my-2" />
                          </div>
                        )
                      }
                    )}
                  </div>
                  <div className="flex flex-row justify-around">
                    <DonutChart
                      data={simpleCurrencies}
                      showAnimation={false}
                      category="value"
                      index="ticker"
                      valueFormatter={valueFormatter}
                      className="col-span-1 min-h-0 w-44 min-w-0" // warning appear in console
                    />
                    <div></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="operations"
            className="mt-8 flex flex-row gap-6"
          ></TabsContent>
          <TabsContent
            value="orders"
            className="mt-8 flex flex-row gap-6"
          ></TabsContent>
        </Tabs>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
