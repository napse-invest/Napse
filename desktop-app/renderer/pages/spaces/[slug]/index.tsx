import { Fleet, listFleet } from '@/api/fleets/fleets'
import { RetrievedNapseSpace, retrieveSpace } from '@/api/spaces/spaces'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { standardUrlPartial } from '@/lib/queryParams'
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  EllipsisHorizontalIcon,
  TicketIcon
} from '@heroicons/react/24/outline'
import {
  AreaChart,
  Color,
  Icon,
  Metric,
  Card as TremorCard
} from '@tremor/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React$1, { useEffect, useState } from 'react'
import WalletBoard from '../../../components/custom/board/walletBoard'
import OperationDataTable from '../../../components/custom/data-table/operationDataTable'
import MoneyActionButtons from '../../../components/custom/moneyActionButtons'
import { fakeDashboardData } from '../../../lib/fakeDashboardData'

type KpiData = {
  name: string
  value: string | number
  icon: React$1.ElementType
  color: Color
}

function getKeyData(key: string, value: number): KpiData {
  const KpiData: Record<string, KpiData> = {
    // TicketIcon
    // BanknotesIcon
    // ChartBarSquareIcon
    value: {
      icon: BanknotesIcon,
      color: 'emerald',
      name: 'Value',
      value: value
    },
    order_count_30: {
      icon: TicketIcon,
      color: 'blue',
      name: 'Orders',
      value: value
    },
    delta_30: {
      icon: ChartBarSquareIcon,
      color: 'amber',
      name: 'Delta',
      value:
        value >= 0
          ? `+ ${(value * 100).toFixed(value % 1 === 0 ? 0 : 1)} %`
          : `${(value * 100).toFixed(value % 1 === 0 ? 0 : 1)} %`
    }
  }

  return (
    KpiData[key] || {
      icon: EllipsisHorizontalIcon,
      color: 'gray',
      name: 'Unknown',
      value: value
    }
  )
}

export default function Space(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const spaceID: string = searchParams.get('space') || ''
  // const spaceID: string = 'wrongSpaceUUID'
  const [space, setSpace] = useState<RetrievedNapseSpace>()
  const [fleets, setFleets] = useState<Fleet[]>([])

  useEffect(() => {
    async function fetchSpace() {
      try {
        const response = await retrieveSpace(searchParams, spaceID)
        setSpace(response.data)
      } catch (error) {
        console.error(error)
        // go to the previous page
        router.push(
          standardUrlPartial('/spaces/', null, { space: '' }, searchParams)
        )
      }
    }

    async function fetchFleets() {
      try {
        const response = await listFleet(searchParams)
        setFleets(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (searchParams.get('server')) {
      fetchSpace()
      fetchFleets()
    }
  }, [spaceID, searchParams, router])

  if (!space) {
    console.log('No space')
    console.log(searchParams.get('space'))
    return <></>
  } else {
    console.log(space)
  }

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={space.name}
        description={
          'Here is an overview of all your spaces. A space make it easy to manage your money.'
        }
      >
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex flex-row justify-between">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="fleets">Fleets</TabsTrigger>
            </TabsList>
            <MoneyActionButtons />
          </div>
          <TabsContent value="dashboard" className="mt-4 flex flex-row gap-6">
            {/* Graph card */}
            <Card className="h-[30rem] w-[55rem] grow-0">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
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
                  // autoMinValue={true}
                />
              </CardContent>
            </Card>
            {/* 3 KPI Cards */}
            <div className="flex grow flex-col gap-6">
              {Object.entries(space?.statistics || {}).map(
                ([key, value], index) => (
                  <TremorCard
                    key={key}
                    decoration="top"
                    decorationColor={getKeyData(key, value).color}
                    className="flex flex-row justify-start gap-6 px-10"
                  >
                    <Icon
                      icon={getKeyData(key, value).icon}
                      color={getKeyData(key, value).color}
                      variant="light"
                      // tooltip="Sum of Sales"
                      size="lg"
                      className="my-6"
                    />
                    <div className="mt-4 flex flex-col">
                      <CardDescription>
                        {getKeyData(key, value).name}
                      </CardDescription>
                      <Metric>{getKeyData(key, value).value}</Metric>
                    </div>
                  </TremorCard>
                )
              )}
            </div>
          </TabsContent>
          <TabsContent value="wallet" className="mt-0">
            <WalletBoard className="" space={space} />
          </TabsContent>
          <TabsContent value="operations" className="mt-0">
            <OperationDataTable space={space} />
          </TabsContent>
          <TabsContent value="fleets" className="mt-0">
            <div>
              {fleets.map((fleet, index) => (
                <ValuePanelCard
                  key={index}
                  title={fleet.name}
                  value={fleet.value}
                  onClick={() => {
                    router.push(
                      standardUrlPartial(
                        '/fleets/',
                        fleet.uuid,
                        {
                          fleet: fleet.uuid,
                          bot: ''
                        },
                        searchParams
                      )
                    )
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
