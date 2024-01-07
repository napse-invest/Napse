import { RetrievedFleet, retrieveFleet } from '@/api/fleets/fleets'
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
import { getKeyData } from '@/lib/dataManagement'
import { standardUrlPartial } from '@/lib/queryParams'
import { AreaChart, Icon, Metric, Card as TremorCard } from '@tremor/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import MoneyActionButtons from '../../../components/custom/moneyActionButtons'
import { fakeDashboardData } from '../../../lib/fakeDashboardData'

export default function Fleet(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const fleetID: string = searchParams.get('fleet') || ''
  const [fleet, setFleet] = useState<RetrievedFleet>()

  useEffect(() => {
    async function fetchFleet() {
      try {
        const response = await retrieveFleet(searchParams, fleetID)
        setFleet(response.data)
      } catch (error) {
        console.error(error)
        // go to the previous page
        router.push(
          standardUrlPartial('/fleets/', null, { fleet: '' }, searchParams)
        )
      }
    }

    if (searchParams.get('server')) {
      fetchFleet()
    }
  }, [fleetID, searchParams, router])

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Retrieved fleet'}
        description={
          'Here is an overview of all your fleets. A fleet fully manages the bots it owns.'
        }
      >
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex flex-row justify-between">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="fleets">Bots</TabsTrigger>
            </TabsList>
            <MoneyActionButtons />
          </div>
          <TabsContent value="dashboard" className="mt-8 flex flex-row gap-6">
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
              {Object.entries(fleet?.statistics || {}).map(
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
          <TabsContent value="fleets" className="mt-0">
            <div className="my-10 grid max-w-screen-xl grid-cols-3 gap-6">
              {fleet?.bots.map((bot, index) => (
                <ValuePanelCard
                  key={index}
                  title={bot.name}
                  value={bot.value}
                  delta={bot.delta}
                  onClick={() => {
                    router.push(
                      standardUrlPartial(
                        '/bots/',
                        bot.uuid,
                        {
                          bot: bot.uuid
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
