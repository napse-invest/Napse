import AllInputs from '@/components/custom/selectedObject/inputs'
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
import { RetreivedExchangeAccount } from 'api/exchangeAccounts/exchangeAccount'
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
  exchange_account: 'BINANCE'
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
    RetreivedExchangeAccount[]
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Space</DialogTitle>
          <DialogDescription>
            Add a new space will allow you to manage your money. You just have
            to provide the name and the exchange account.
          </DialogDescription>
        </DialogHeader>
        <AllInputs
          inputs={[
            {
              label: 'Name',
              key: 'name',
              type: 'input',
              zod: z.string(),
              default: ''
            },
            {
              label: 'Description',
              key: 'description',
              type: 'input',
              zod: z.string(),
              default: ''
            },
            {
              label: 'Exchange Account',
              key: 'exchange_account',
              type: 'input',
              zod: z.string(),
              default: ''
            }
          ]}
          object={space}
          setObject={setSpace}
          objectName="Space"
        />
        <div className="flex flex-col items-end">
          <Button
            className=""
            type="submit"
            size="default"
            onClick={async () => {
              try {
                const response = await createSpace(searchParams, {
                  ...space
                })
                setSpaces([...spaces, response.data])
                document.getElementById('close-button')?.click()
              } catch (error) {
                console.log(error)
              }
            }}
          >
            Create
          </Button>
        </div>
      </DialogContent>
      <DialogClose id="close-button" />
    </Dialog>
  )
}
