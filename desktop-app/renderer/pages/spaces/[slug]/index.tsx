import { RetrievedNapseSpace, retrieveSpace } from '@/api/spaces/spaces'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { standardUrlPartial } from '@/lib/queryParams'
import { AreaChart } from '@tremor/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fakeDashboardData } from './fakeDashboardData'

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

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={space ? space.name : ''}
        description={
          'Here is an overview of all your spaces. A space make it easy to manage your money.'
        }
      >
        <Tabs defaultValue="dashboard" className="w-[400px]">
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
          <TabsContent
            value="dashboard"
            className="flex flex-col bg-red-800 w-full"
          >
            <Card className="flex flex-col bg-red-300 w-full">
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <AreaChart
                  className="mt-4 h-80"
                  data={fakeDashboardData}
                  categories={['value']}
                  index="date"
                  colors={['indigo', 'fuchsia']}
                  yAxisWidth={60}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
