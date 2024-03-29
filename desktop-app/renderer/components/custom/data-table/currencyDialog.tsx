import { RetrievedNapseSpace } from '@/api/spaces/spaces'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Currency } from 'api/wallets/wallets'
import { ReactNode } from 'react'
import CurrencyDataTable, { currencyColumns } from './currencyDataTable'

export default function CurrencyDataDialog({
  trigger,
  space
}: {
  trigger: ReactNode
  space: RetrievedNapseSpace
}): JSX.Element {
  const currencies: Currency[] = space ? space['wallet']['currencies'] : []
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="container">
        <DialogHeader>
          <DialogTitle>Currencies</DialogTitle>

          <DialogDescription>List of all currencies</DialogDescription>
        </DialogHeader>
        <CurrencyDataTable data={currencies} columns={currencyColumns} />
      </DialogContent>
    </Dialog>
  )
}
