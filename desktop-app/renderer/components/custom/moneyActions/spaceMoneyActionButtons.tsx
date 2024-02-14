import {
  RetrievedNapseSpace,
  spaceInvest,
  spacePossibleInvestments,
  spacePossibleWithdraws,
  spaceWithdraw
} from '@/api/spaces/spaces'
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

export default function SpaceMoneyActionButtons({
  space
}: {
  space: RetrievedNapseSpace
}): JSX.Element {
  return (
    <>
      {space.testing && (
        <OperationMoneyActionButton<RetrievedNapseSpace>
          object={space}
          getPossibleInvestmentsCallback={spacePossibleInvestments}
          postInvestmentCallback={spaceInvest}
          getPossibleWithdrawCallback={spacePossibleWithdraws}
          postWithdrawCallback={spaceWithdraw}
        />
      )}
      {!space.testing && <UnavailableMoneyActionButton />}
    </>
  )
}
