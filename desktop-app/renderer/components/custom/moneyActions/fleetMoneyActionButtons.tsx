import {
  RetrievedFleet,
  fleetInvest,
  fleetPossibleInvestments,
  fleetPossibleWithdraws,
  fleetWithdraw
} from '@/api/fleets/fleets'
import OperationMoneyActionButton from '@/components/custom/moneyActions/moneyActionButtons'
import UnavailableMoneyActionButton from '@/components/custom/moneyActions/unavailableMoneyActionButton'
import * as z from 'zod'

const InvestmentSchema = z.object({
  ticker: z
    .string()
    .min(2, { message: 'You have to give an existing currency.' })
    .max(8, { message: 'You have to give an existing currency.' }),
  amount: z.number()
})

export default function FleetMoneyActionButtons({
  fleet
}: {
  fleet: RetrievedFleet
}): JSX.Element {
  return (
    <>
      {fleet.testing && (
        <OperationMoneyActionButton<RetrievedFleet>
          object={fleet}
          getPossibleInvestmentsCallback={fleetPossibleInvestments}
          postInvestmentCallback={fleetInvest}
          getPossibleWithdrawCallback={fleetPossibleWithdraws}
          postWithdrawCallback={fleetWithdraw}
        />
      )}
      {!fleet.testing && <UnavailableMoneyActionButton />}
    </>
  )
}
