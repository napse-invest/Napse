import { RetrievedNapseSpace } from '@/api/spaces/spaces'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  ArrowUpRightIcon,
  ChartPieIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline'
import { TabsContent } from '@radix-ui/react-tabs'
import { AreaChart, DonutChart, Icon, Metric } from '@tremor/react'
import AdvancedCurrencyDataDialog from './advancedCurrencyDialog'
import { fakeDashboardData } from './fakeDashboardData'
import SimpleCurrencyDataTable, {
  simpleCurrencyData
} from './simpleCurrencyDataTable'

export default function WalletBoard({
  space,
  className = ''
}: {
  space: RetrievedNapseSpace
  className?: string
}): JSX.Element {
  const currencies = space['wallet']['currencies']
  const simpleCurrencies: simpleCurrencyData[] = currencies.map((currency) => ({
    ticker: currency.ticker,
    value: currency.value
  }))
  const totalAmount = currencies
    .map((currency) => currency.value)
    .reduce((a, b) => a + b, 0)

  const valueFormatter = (number: number) =>
    `$${Intl.NumberFormat('us').format(number).toString()}`

  return (
    <div className={cn('grid grid-cols-3 gap-6 mt-0', className)}>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
        </CardHeader>
        <CardContent className="">
          <AreaChart
            className="mt-4 h-80"
            data={fakeDashboardData}
            categories={['value']}
            index="date"
            colors={['green']}
            showAnimation={true}
            curveType="monotone"
            startEndOnly={true}
            // autoMinValue={true}
          />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardContent className="space-y-1.5 pt-6 pb-2 h-full flex flex-col justify-between">
          <Tabs className="" defaultValue="chart">
            <div className="flex flex-row items-center justify-between">
              <CardTitle>Overview</CardTitle>
              <TabsList>
                <TabsTrigger value="chart">
                  <Icon
                    size="xs"
                    icon={ChartPieIcon}
                    variant="simple"
                    className="icon-md"
                  />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <Icon
                    size="xs"
                    icon={ListBulletIcon}
                    variant="simple"
                    className="icon-md"
                  />
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex flex-row justify-between items-end py-5">
              <div>
                <CardDescription className="">Total value</CardDescription>
                <Metric className="text-2xl">
                  {valueFormatter(totalAmount)}
                </Metric>
              </div>
              <p className="text-md italic">
                {currencies.length}{' '}
                {currencies.length > 1 ? 'currencies' : 'currency'}
              </p>
            </div>
            <Separator className="my-4" />
            <TabsContent value="chart" className="">
              <DonutChart
                data={simpleCurrencies}
                showAnimation={false}
                category="value"
                index="ticker"
                valueFormatter={valueFormatter}
                className="m-10 ml-0"
              />
            </TabsContent>
            <TabsContent value="list" className="">
              <SimpleCurrencyDataTable data={simpleCurrencies} />
            </TabsContent>
          </Tabs>
          <div className="flex flex-col items-center">
            <AdvancedCurrencyDataDialog
              trigger={
                <Button variant="link" onClick={() => {}}>
                  Details
                  <Icon
                    size="xs"
                    icon={ArrowUpRightIcon}
                    variant="simple"
                    className="icon-md"
                  />
                </Button>
              }
              space={space}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
