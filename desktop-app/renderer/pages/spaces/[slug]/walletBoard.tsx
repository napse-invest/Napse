import { RetrievedNapseSpace } from '@/api/spaces/spaces'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { AreaChart, DonutChart, Icon, Metric } from '@tremor/react'
import AdvancedCurrencyDataDialog from './advancedCurrencyDialog'
import { fakeDashboardData } from './fakeDashboardData'
import { simpleCurrencyData } from './simpleCurrencyDataTable'

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
    <div className={cn('flex flex-row gap-6 ', className)}>
      <Card className="h-[30rem] w-[55rem] grow-0">
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
      <Card className="flex grow flex-col">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="flex flex-row items-end justify-between py-4">
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
          <div className="flex flex-col items-center">
            <DonutChart
              data={simpleCurrencies}
              showAnimation={false}
              category="value"
              index="ticker"
              valueFormatter={valueFormatter}
              className="mt-8 w-44"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <AdvancedCurrencyDataDialog
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
            space={space}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
