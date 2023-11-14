import { RetrievedNapseSpace, retrieveSpace } from '@/api/spaces/spaces'
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
import { useToast } from '@/components/ui/use-toast'
import { standardUrlPartial } from '@/lib/queryParams'
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  EllipsisHorizontalIcon,
  TicketIcon
} from '@heroicons/react/24/outline'
import { AreaChart, Icon, Metric, Card as TremorCard } from '@tremor/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useEffect,
  useState
} from 'react'
import { fakeDashboardData } from './fakeDashboardData'

type KpiData = {
  name: string
  value: string | number
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined
      titleId?: string | undefined
    } & RefAttributes<SVGSVGElement>
  >
  color:
    | 'green'
    | 'blue'
    | 'orange'
    | 'gray'
    | 'slate'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'
    | undefined
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
  const toast = useToast()
  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await retrieveSpace(searchParams, spaceID)
        setSpace(response.data)
      } catch (error) {
        console.error(error)
        // go to the previous page
        router.push(
          standardUrlPartial('/spaces/', null, { space: '' }, searchParams)
        )
        toast.toast({
          // variant: 'destructive',
          title: 'Something went wrong...',
          description: 'There was a problem with this space'
        })
      }
    }
    if (searchParams.get('server')) {
      fetchSpace()
    }
  }, [spaceID, searchParams])

  console.log(space)

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={space ? space.name : ''}
        description={
          'Here is an overview of all your spaces. A space make it easy to manage your money.'
        }
      >
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="wallet" disabled>
              Wallet
            </TabsTrigger>
            <TabsTrigger value="operations" disabled>
              Operations
            </TabsTrigger>
            <TabsTrigger value="fleets" disabled>
              Fleets
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="grid grid-cols-3 gap-6">
            {/* Graph card */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
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
            <div className="grid grid-rows-3 gap-6">
              {Object.entries(space?.statistics || {}).map(
                ([key, value], index) => (
                  // <Card>
                  //   {/* 'text-2xl font-semibold leading-none tracking-tight' */}
                  //   <p className=" text-sm m-10 mb-0 text-muted-foreground">
                  //     {key}
                  //   </p>
                  //   <CardContent className="ml-10 p-0">test</CardContent>
                  // </Card>
                  <TremorCard
                    key={key}
                    decoration="top"
                    decorationColor={getKeyData(key, value).color}
                    className="flex flex-row justify-start gap-6 px-10"
                  >
                    {/* <Flex className="justify-start mx-6 my-2 text-sm text-muted-foreground"> */}

                    <Icon
                      icon={getKeyData(key, value).icon}
                      color={getKeyData(key, value).color}
                      variant="light"
                      // tooltip="Sum of Sales"
                      size="lg"
                      className="my-6"
                    />
                    <div className="flex flex-col mt-4">
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
        </Tabs>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
