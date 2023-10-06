import ContextHeader from '@/components/layout/contextHeader'

import { Card, Metric, Text, Flex, BadgeDelta, Grid } from '@tremor/react'
import type { DeltaType } from '@tremor/react'

interface Category {
  title: string
  metric: string
  metricPrev: string
  delta: string
  deltaType: DeltaType
}

const categories: Category[] = [
  {
    title: 'Sales',
    metric: '$ 12,699',
    metricPrev: '$ 9,456',
    delta: '34.3%',
    deltaType: 'moderateIncrease'
  },
  {
    title: 'Profit',
    metric: '$ 40,598',
    metricPrev: '$ 45,564',
    delta: '10.9%',
    deltaType: 'moderateDecrease'
  },
  {
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856',
    delta: '25.3%',
    deltaType: 'moderateIncrease'
  }
]
export default function Bots(): JSX.Element {
  return (
    <ContextHeader isBot>
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
              <BadgeDelta
                className=" rounded-tremor-small"
                deltaType={item.deltaType}
              >
                {item.delta}
              </BadgeDelta>
            </Flex>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-3 truncate"
            >
              <Metric>{item.metric}</Metric>
              <Text className="truncate">from {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
    </ContextHeader>
  )
}
