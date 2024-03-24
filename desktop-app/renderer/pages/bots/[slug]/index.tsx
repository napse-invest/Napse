import { RetrievedBot, Statistics, retrieveBot } from '@/api/bots/bots'
import CurrencyDataDialog from '@/components/custom/data-table/currencyDialog'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { Button } from '@/components/ui/button'
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
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { AreaChart, DonutChart, Icon, Metric } from '@tremor/react'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const valueFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`

function formatCurrencyValue(value: number): string {
  if (value >= 0) {
    return `+$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  }
  return `-$${(-value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
}
function formatDeltaValue(value: number): string {
  if (value >= 0) {
    return `+${value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}%`
  }
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
  console.log('BOT::', bot)

  if (!bot) {
    // TODO: setup a squeleton or a loader
    return <></>
  }

  const currencies = bot['wallet']['currencies']
  const simpleCurrencies: simpleCurrencyData[] = currencies.map((currency) => ({
    ticker: currency.ticker,
    value: currency.value
  }))

  const {
    ['invested_percent']: investPercent,
    ['diff_30']: diff30,
    ['delta_30']: delta30,
    ...statistics
  } = bot.statistics as Statistics

  // Make history data
  const data = []
  for (let dataPoint of bot.wallet?.history?.data_points || []) {
    const value = dataPoint.fields.find((field) => field.key === 'WALLET_VALUE')
      ?.value
    console.log('value::', value)
    const date = dataPoint.created_at
    const obj = { date, value }
    data.push(obj)
  }
  const formatedData = data.map((item) => {
    return { ...item, date: format(item.date, 'd MMM yy') }
  })

  console.log('formatedData::', formatedData)

  return (
    <ContextHeader isBot>
      <DefaultPageLayout header={bot.name} description={''}>
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="operations" disabled>
              Operations
            </TabsTrigger>
            <TabsTrigger value="orders" disabled>
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" disabled>
              Settings
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
                        <div
                          className={`text-${
                            (diff30 as number) >= 0
                              ? 'text-emerald-700 dark:text-emerald-500'
                              : 'text-red-700 dark:text-red-500'
                          }`}
                        >
                          {formatCurrencyValue(diff30 as number)}
                        </div>
                        <div
                          className={`text-${
                            (delta30 as number) >= 0
                              ? 'text-emerald-700 dark:text-emerald-500'
                              : 'text-red-700 dark:text-red-500'
                          }`}
                        >
                          ({formatDeltaValue(delta30 as number)})
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
                  // data={formattedFakeDashboardData}
                  data={formatedData}
                  index="date"
                  categories={['value']}
                  colors={['blue', 'violet', 'fuchsia']}
                  valueFormatter={valueFormatter}
                  yAxisWidth={55}
                  onValueChange={() => {}}
                  showAnimation={true}
                  curveType="monotone"
                  className="mt-6 hidden h-96 sm:block"
                />
                <div className="my-4 text-base font-medium">Summary</div>
                <div className="flex flex-row items-center gap-10">
                  <div className="w-full px-6">
                    {Object.entries(statistics || {}).map(
                      ([statName, statValue], index) => {
                        return (
                          <div key={index}>
                            <div className="flex flex-row justify-between">
                              <div>{statName}</div>
                              <div>{statValue}</div>
                            </div>
                            <Separator className="my-3" />
                          </div>
                        )
                      }
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <DonutChart
                      data={simpleCurrencies}
                      showAnimation={true}
                      category="value"
                      index="ticker"
                      label={`${investPercent}% invested`}
                      valueFormatter={valueFormatter}
                      className="mx-20 w-44"
                    />
                    <div className="mt-2">
                      <CurrencyDataDialog
                        trigger={
                          <Button variant="ghost" onClick={() => {}}>
                            Details
                            <Icon
                              size="xs"
                              icon={ArrowUpRightIcon}
                              variant="simple"
                              className="icon-md"
                            />
                          </Button>
                        }
                        wallet={bot.wallet}
                      />
                    </div>
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
