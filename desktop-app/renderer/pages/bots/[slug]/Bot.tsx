import { RetrievedBot, retrieveBot } from '@/api/bots/bots'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import {
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { classNames, data, summary, valueFormatter } from '.'

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
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your Bots'}
        description={
          'Bots look to make your money grow while you do something else.'
        }
      >
        <>
          <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Portfolio performance
          </h3>
          <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong mt-1 font-semibold">
            $32,227.40
          </p>
          <p className="text-tremor-default mt-1 font-medium">
            <span className="text-emerald-700 dark:text-emerald-500">
              +$430.90 (4.1%)
            </span>{' '}
            <span className="text-tremor-content dark:text-dark-tremor-content font-normal">
              Past 24 hours
            </span>
          </p>
          <LineChart
            data={data}
            index="date"
            categories={[
              'ETF Shares Vital',
              'Vitainvest Core',
              'iShares Tech Growth'
            ]}
            colors={['blue', 'violet', 'fuchsia']}
            valueFormatter={valueFormatter}
            yAxisWidth={55}
            onValueChange={() => {}}
            className="mt-6 hidden h-96 sm:block"
          />
          <LineChart
            data={data}
            index="date"
            categories={[
              'ETF Shares Vital',
              'Vitainvest Core',
              'iShares Tech Growth'
            ]}
            colors={['blue', 'violet', 'fuchsia']}
            valueFormatter={valueFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            className="mt-6 h-72 sm:hidden"
          />
          <Table className="mt-8">
            <TableHead>
              <TableRow className="border-tremor-border dark:border-dark-tremor-border border-b">
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Name
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-right">
                  Value
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-right">
                  Invested
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-right">
                  Cashflow
                </TableHeaderCell>
                <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-right">
                  Gain
                </TableHeaderCell>
                <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Realized
                </TableHeaderCell>
                <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  Dividends
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summary.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    <div className="flex space-x-3">
                      <span
                        className={classNames(
                          item.bgColor,
                          'w-1 shrink-0 rounded'
                        )}
                        aria-hidden={true}
                      />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.value}</TableCell>
                  <TableCell className="text-right">{item.invested}</TableCell>
                  <TableCell className="text-right">{item.cashflow}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={classNames(
                        item.changeType === 'positive'
                          ? 'text-emerald-700 dark:text-emerald-500'
                          : 'text-red-700 dark:text-red-500'
                      )}
                    >
                      {item.gain}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={classNames(
                        item.changeType === 'positive'
                          ? 'text-emerald-700 dark:text-emerald-500'
                          : 'text-red-700 dark:text-red-500'
                      )}
                    >
                      {item.realized}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={classNames(
                        item.changeType === 'positive'
                          ? 'text-emerald-700 dark:text-emerald-500'
                          : 'text-red-700 dark:text-red-500'
                      )}
                    >
                      {item.dividends}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
