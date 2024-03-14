import { ExchangeAccount } from '@/api/exchangeAccounts/exchangeAccount'
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
import { PlusIcon } from '@radix-ui/react-icons'
import {
  BaseNapseSpace,
  NapseSpace,
  createSpace,
  getPossibleExchangeAccounts
} from 'api/spaces/spaces'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as z from 'zod'

const defaultSpace: BaseNapseSpace = {
  name: 'My Space',
  description: 'My Space Description',
  exchangeAccount: '7bdd866e-f2a2-4ea9-a01e-02ddb77a80fe',
  testing: true
}

export default function CreateSpaceDialog({
  spaces,
  setSpaces,
  disabledButton
}: {
  spaces: NapseSpace[]
  setSpaces: React.Dispatch<React.SetStateAction<NapseSpace[]>>
  disabledButton?: boolean
}): JSX.Element {
  const searchParams = useSearchParams()
  const [possibleExchangeAccounts, setPossibleExchangeAccounts] = useState<
    ExchangeAccount[]
  >([])
  const [space, setSpace] = useState<BaseNapseSpace>(defaultSpace)

  useEffect(() => {
    const fetchPossibleExchangesAccount = async () => {
      try {
        const response = await getPossibleExchangeAccounts(searchParams)
        setPossibleExchangeAccounts(response.data)
      } catch (error) {
        console.error(error)
        setPossibleExchangeAccounts([])
      }
    }
    if (searchParams.get('server')) {
      fetchPossibleExchangesAccount()
    }
  }, [searchParams])

  const ExchangeAccountPossibilitiesSelection = possibleExchangeAccounts.reduce(
    (obj, item) => {
      obj[item.uuid] = item.name
      return obj
    },
    {} as { [key: string]: string }
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={'h-32 w-80'}
          disabled={disabledButton}
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add a new Space</DialogTitle>
          <DialogDescription>
            Add a new space will allow you to manage your money. You just have
            to provide the name and the exchange account.
          </DialogDescription>
        </DialogHeader>
        <CustomForm<BaseNapseSpace>
          inputs={[
            {
              label: 'Name',
              key: 'name',
              type: 'input',
              zod: z.string(),
              default: defaultSpace.name
            },
            {
              label: 'Description',
              key: 'description',
              type: 'input',
              zod: z.string(),
              default: defaultSpace.description
            },
            {
              label: 'Exchange',
              key: 'exchangeAccount',
              type: 'select',
              possibilities: ExchangeAccountPossibilitiesSelection,
              zod: z.string(),
              default: Object.keys(ExchangeAccountPossibilitiesSelection)[0]
            }
          ]}
          onSubmit={async (values) => {
            try {
              const response = await createSpace(searchParams, {
                ...defaultSpace,
                ...values
              })
              setSpaces([...spaces, response.data])
              document.getElementById('close-button')?.click()
            } catch (error) {
              console.log(error)
            }
          }}
          buttonDescription="Create"
        />
      </DialogContent>
      <DialogClose id="close-button" />
    </Dialog>
  )
}
