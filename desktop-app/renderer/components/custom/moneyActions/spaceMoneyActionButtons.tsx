import {
  Investment,
  RetrievedNapseSpace,
  spaceInvest,
  spacePossibleInvestments
} from '@/api/spaces/spaces'
import UnavailableMoneyActionButton from '@/components/custom/moneyActions/unavailableMoneyActionButton'
import CustomForm from '@/components/custom/selectedObject/inputs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
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
  const [possibleInvestments, setPossibleInvestments] = useState<Investment[]>(
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
      {space.testing && (
        <div className="flex flex-row gap-4">
          <Dialog
            onOpenChange={() => {
              setSelectedTicker(' ')
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => {}}>
                        <ArrowDownOnSquareIcon
                          className="h-6 w-6"
                          strokeWidth={1.2}
                        />
                      </Button>
                    </DialogTrigger>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Deposit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invest on {space.name}</DialogTitle>
                <DialogDescription>
                  Allocate money of your exchange account to the space.
                </DialogDescription>
              </DialogHeader>

              <CustomForm<Investment>
                inputs={[
                  {
                    label: 'Ticker',
                    key: 'ticker',
                    type: 'select',
                    possibilities: PossibleInvestmentTickerSelection,
                    zod: z.string(),
                    placeholder: 'Select a ticker',
                    setter: setSelectedTicker
                  },
                  {
                    label: 'Amount',
                    key: 'amount',
                    type: 'input',
                    zod: z.number(),
                    // value: selectedAmount,
                    // setter: setSelectedAmount,
                    // placeholder: possibleInvestments.find(
                    //   (inv) => inv.ticker === selectedTicker
                    // )
                    //   ? `max: ${possibleInvestments.find(
                    //       (inv) => inv.ticker === selectedTicker
                    //     )?.amount} ${selectedTicker}`
                    //   : ' '
                    default: 0,
                    placeholder: 0
                  }
                ]}
                onSubmit={async (values) => {
                  const newInvestment: Investment = {
                    ticker: selectedTicker,
                    amount: values.amount
                  }
                  try {
                    const response = await spaceInvest(
                      searchParams,
                      space,
                      newInvestment
                    )
                    console.log('response::', response)
                    toast({
                      title: 'Investment',
                      description: 'You have invested money !'
                    })
                  } catch (error) {
                    console.error(error)
                    toast({
                      title: 'Investment',
                      description: 'You cannot invest money yet.',
                      variant: 'destructive'
                    })
                  }
                }}
                buttonDescription="Done"
              />

              <DialogDescription>
                {possibleInvestments.find(
                  (inv) => inv.ticker === selectedTicker
                )?.amount
                  ? `max: ${possibleInvestments.find(
                      (inv) => inv.ticker === selectedTicker
                    )?.amount} ${selectedTicker}`
                  : ''}
              </DialogDescription>
            </DialogContent>
          </Dialog>

          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => {}}>
                        <ArrowDownOnSquareIcon
                          className="h-6 w-6"
                          strokeWidth={1.2}
                        />
                      </Button>
                    </DialogTrigger>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Deposit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw from {space.name}</DialogTitle>
                <DialogDescription>
                  You deallocate money from the space. He won&apos;t be able to
                  manage it
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {!space.testing && <UnavailableMoneyActionButton />}
    </>
  )
}
