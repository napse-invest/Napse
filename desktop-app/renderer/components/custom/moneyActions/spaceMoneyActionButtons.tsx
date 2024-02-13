import {
  Operation,
  RetrievedNapseSpace,
  spacePossibleInvestments
} from '@/api/spaces/spaces'
import OperationMoneyActionButton from '@/components/custom/moneyActions/moneyActionButtons'
import UnavailableMoneyActionButton from '@/components/custom/moneyActions/unavailableMoneyActionButton'
import { useToast } from '@/components/ui/use-toast'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as z from 'zod'

const InvestmentSchema = z.object({
  ticker: z
    .string()
    .min(2, { message: 'You have to give an existing currency.' })
    .max(8, { message: 'You have to give an existing currency.' }),
  amount: z.number()
})

export default function SpaceMoneyActionButtons({
  space
}: {
  space: RetrievedNapseSpace
}): JSX.Element {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [possibleInvestments, setPossibleInvestments] = useState<Operation[]>(
    []
  )
  const [selectedTicker, setSelectedTicker] = useState<string>('')

  useEffect(() => {
    const fetchPossibleInvestments = async () => {
      try {
        const response = await spacePossibleInvestments(searchParams, space)
        setPossibleInvestments(response.data)
      } catch (error) {
        console.error(error)
        setPossibleInvestments([])
      }
    }
    if (searchParams.get('server')) {
      fetchPossibleInvestments()
    }
  }, [searchParams, space])

  const PossibleInvestmentTickerSelection = possibleInvestments.reduce(
    (obj, item) => {
      obj[item.ticker] = item.ticker
      return obj
    },
    {} as { [key: string]: string }
  )

  return (
    <>
      {space.testing && <OperationMoneyActionButton />}
      {!space.testing && <UnavailableMoneyActionButton />}
    </>
  )
}
