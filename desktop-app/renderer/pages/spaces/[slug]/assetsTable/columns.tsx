'use client'

import { Button } from '@/components/ui/button'
import { toast, useToast } from '@/components/ui/use-toast'
import { ColumnDef } from '@tanstack/react-table'

export type Currency = {
  ticker: string
  amount: number
}

function currencyDeleteAlert() {}

export function getAssetColumns(
  toastFunction: typeof toast // TODO: remove this toastFunction
): ColumnDef<Currency>[] {
  return [
    {
      accessorKey: 'ticker',
      header: 'Ticker'
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
      }
    },
    {
      accessorKey: 'delete',
      header: () => <div className="text-right">Delete</div>,
      cell: ({ row }) => {
        const ticker = row.original.ticker
        const { toast } = useToast()

        return (
          <div className="text-right">
            <Button
              className=""
              variant="outline"
              size="icon"
              onClick={() => {
                console.log(row)
                toast({
                  // description: ticker + "have been deleted"
                  description: (
                    <div>
                      <span className="font-bold">{ticker}</span> currency have
                      been deleted.
                    </div>
                  )
                })
              }}
            >
              D
            </Button>
          </div>
        )
      }
    }
  ]
}

export default function Todo(): JSX.Element {
  // TODO: implement or move this file
  return <></>
}
