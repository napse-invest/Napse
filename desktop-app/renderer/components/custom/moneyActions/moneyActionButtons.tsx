import { Operation } from '@/api/spaces/spaces'
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
import { DialogClose } from '@radix-ui/react-dialog'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'
import { AxiosResponse } from 'axios'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as z from 'zod'
import { useOperationContext } from './operationContext'

const OperationSchema = z.object({
  ticker: z
    .string()
    .min(2, { message: 'You have to give an existing currency.' })
    .max(8, { message: 'You have to give an existing currency.' }),
  amount: z.number()
})

interface ObjectWithName extends Object {
  name: string
}

type getCallbackType<T> = (
  searchParams: ReadonlyURLSearchParams,
  object: T
) => Promise<AxiosResponse<Operation[], any>>
type postCallbackType<T> = (
  searchParams: ReadonlyURLSearchParams,
  object: T,
  investment: Operation
) => Promise<AxiosResponse<Operation, any>>

export function InvestMoneyActionButton<T extends ObjectWithName>({
  object,
  getPossibleInvestmentsCallback,
  postInvestmentCallback
}: {
  object: T
  getPossibleInvestmentsCallback: getCallbackType<T>
  postInvestmentCallback: postCallbackType<T>
}): JSX.Element {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [possibleInvestments, setPossibleInvestments] = useState<Operation[]>(
    []
  )
  const [selectedTicker, setSelectedTicker] = useState<string>('')
  const { setTriggerRefresh } = useOperationContext()

  useEffect(() => {
    const fetchPossibleInvestments = async () => {
      try {
        const response = await getPossibleInvestmentsCallback(
          searchParams,
          object
        )
        setPossibleInvestments(response.data)
      } catch (error) {
        console.error(error)
        setPossibleInvestments([])
      }
    }
    if (searchParams.get('server')) {
      fetchPossibleInvestments()
    }
  }, [searchParams, object, getPossibleInvestmentsCallback])

  const PossibleInvestmentTickerSelection = possibleInvestments.reduce(
    (obj, item) => {
      obj[item.ticker] = item.ticker
      return obj
    },
    {} as { [key: string]: string }
  )

  return (
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
          <DialogTitle>Invest on {object.name}</DialogTitle>
          <DialogDescription>
            Allocate money of your exchange account to the space.
          </DialogDescription>
        </DialogHeader>

        <CustomForm<Operation>
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
              default: 0,
              placeholder: 0
            }
          ]}
          onSubmit={async (values) => {
            const newInvestment: Operation = {
              ticker: selectedTicker,
              amount: values.amount
            }
            try {
              const response = await postInvestmentCallback(
                searchParams,
                object,
                newInvestment
              )
              console.log('response::', response)
              if (response.status === 200) {
                // Trigger space refresh
                setTriggerRefresh((prev) => !prev)
              }

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
            document.getElementById('close-invest-button')?.click()
          }}
          buttonDescription="Done"
        />

        <DialogDescription>
          {possibleInvestments.find((inv) => inv.ticker === selectedTicker)
            ?.amount
            ? `max: ${possibleInvestments.find(
                (inv) => inv.ticker === selectedTicker
              )?.amount} ${selectedTicker}`
            : ''}
        </DialogDescription>
      </DialogContent>
      <DialogClose id="close-invest-button" />
    </Dialog>
  )
}

export function WithdrawMoneyActionButton<T extends ObjectWithName>({
  object,
  getPossibleWithdrawCallback,
  postWithdrawCallback
}: {
  object: T
  getPossibleWithdrawCallback: getCallbackType<T>
  postWithdrawCallback: postCallbackType<T>
}): JSX.Element {
  return (
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
          <DialogTitle>Withdraw from {object.name}</DialogTitle>
          <DialogDescription>
            You deallocate money from the space. He won&apos;t be able to manage
            it
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default function OperationMoneyActionButton<T extends ObjectWithName>({
  object,
  getPossibleInvestmentsCallback,
  postInvestmentCallback,
  getPossibleWithdrawCallback,
  postWithdrawCallback
}: {
  object: T
  getPossibleInvestmentsCallback: getCallbackType<T>
  postInvestmentCallback: postCallbackType<T>
  getPossibleWithdrawCallback: getCallbackType<T>
  postWithdrawCallback: postCallbackType<T>
}): JSX.Element {
  return (
    <div className="flex flex-row gap-4">
      <InvestMoneyActionButton
        object={object}
        getPossibleInvestmentsCallback={getPossibleInvestmentsCallback}
        postInvestmentCallback={postInvestmentCallback}
      />
      <WithdrawMoneyActionButton
        object={object}
        getPossibleWithdrawCallback={getPossibleWithdrawCallback}
        postWithdrawCallback={postWithdrawCallback}
      />
    </div>
  )
}
