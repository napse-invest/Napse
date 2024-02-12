import { Fleet, listFleet } from '@/api/fleets/fleets'
import { Key, getCurrentKey } from '@/api/key/key'
import { RetrievedNapseSpace, retrieveSpace } from '@/api/spaces/spaces'
import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
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
import CreateFleetDialog from '@/pages/fleets/createFleetDialog'
import { AreaChart, Icon, Metric, Card as TremorCard } from '@tremor/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import WalletBoard from '../../../components/custom/board/walletBoard'
import OperationDataTable from '../../../components/custom/data-table/operationDataTable'
import SpaceMoneyActionButtons from '../../../components/custom/moneyActions/spaceMoneyActionButtons'
import { fakeDashboardData } from '../../../lib/fakeDashboardData'

import { format } from 'date-fns'
import { ReadonlyURLSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

async function fetchCurrentKey({
  setCurrentKey,
  searchParams
}: {
  setCurrentKey: Dispatch<SetStateAction<Key | undefined>>
  searchParams: ReadonlyURLSearchParams
}) {
  try {
    const response = await getCurrentKey(searchParams)
    setCurrentKey(response)
  } catch (error) {
    console.error(error)
    setCurrentKey(undefined)
  }
}
const formattedFakeDashboardData = fakeDashboardData.map((item) => {
  return { ...item, date: format(item.date, 'd MMM yy') }
})

export default function Space(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const spaceID: string = searchParams.get('space') || ''
  // const spaceID: string = 'wrongSpaceUUID'
  const [currentKey, setCurrentKey] = useState<Key>()

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
      fetchCurrentKey({ setCurrentKey, searchParams })
    }
  }, [spaceID, searchParams, router])

  if (!space) {
    // TODO: setup a squeleton or a loader
    return <></>
  } else {
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
            <SpaceMoneyActionButtons space={space} />
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
                  data={formattedFakeDashboardData}
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
            <div className="my-10 grid max-w-screen-xl grid-cols-3 gap-6">
              {fleets.map((fleet, index) => (
                <ValuePanelCard
                  key={index}
                  title={fleet.name}
                  value={fleet.value}
                  delta={fleet.delta}
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
              <InfoPanelCard
                cardType={
                  currentKey?.is_master_key ? 'button' : 'disabledButton'
                }
                tooltip={
                  !currentKey?.is_master_key &&
                  // 'You do not have the permission to create an exchange account.'
                  `currentKey.is_master_key: ${currentKey?.is_master_key}`
                }
                textContent={
                  <CreateFleetDialog
                    fleets={fleets}
                    setFleets={setFleets}
                    disabledButton={currentKey?.is_master_key ? false : true}
                  />
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
