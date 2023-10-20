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
import {
  ExchangeAccount,
  RetreivedExchangeAccount,
  createExchangeAccount,
  getPossibleExchanges
} from 'api/exchangeAccounts/exchangeAccount'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const defaultExchangeAccount: ExchangeAccount = {
  name: 'My Exchange Account',
  description: 'My Exchange Account Description',
  testing: true,
  exchange: 'BINANCE'
}

export default function CreateExchangeAccountDialog({
  exchangeAccounts,
  setExchangeAccounts
}: {
  exchangeAccounts: RetreivedExchangeAccount[]
  setExchangeAccounts: React.Dispatch<
    React.SetStateAction<RetreivedExchangeAccount[]>
  >
}): JSX.Element {
  const searchParams = useSearchParams()
  const defaultExchangeAccountName = 'My Exchange Account'
  const defaultExchangeAccountDescription = 'My Exchange Account Description'
  const [newExchangeAccountName, setNewExchangeAccountName] = useState(
    defaultExchangeAccountName
  )
  const [newExchangeAccountDescription, setNewExchangeAccountDescription] =
    useState(defaultExchangeAccountDescription)

  const [newExchangeAccountTesting, setNewExchangeAccountTesting] =
    useState(true)

  const [possibleExchanges, setPossibleExchanges] = useState<string[]>([])
  const [selectedExchange, setSelectedExchange] = useState<string>('')
  const [exchangeAccount, setExchangeAccount] = useState<ExchangeAccount>(
    defaultExchangeAccount
  )
  useEffect(() => {
    const fetchPossibleExchanges = async () => {
      try {
        const response = await getPossibleExchanges(searchParams)
        setPossibleExchanges(response.data)
        setSelectedExchange(response.data[0])
      } catch (error) {
        console.error(error)
        setPossibleExchanges([])
      }
    }

    if (searchParams.get('server')) {
      fetchPossibleExchanges()
    }
  }, [searchParams])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-32 w-72">
          <PlusIcon className="mr-2 h-5 w-5" />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Exchange Account</DialogTitle>
          <DialogDescription>
            Add a new server will allow you to connect to it. You just have to
            provide the server name and the server URL.
          </DialogDescription>
        </DialogHeader>
        <AllInputs
          inputs={[
            {
              label: 'Name',
              key: 'name',
              type: 'input'
            },
            {
              label: 'Description',
              key: 'description',
              type: 'input'
            },
            {
              label: 'Exchange',
              key: 'exchange',
              type: 'select',
              possibilities: possibleExchanges
            },
            {
              label: 'Testing',
              key: 'testing',
              type: 'switch'
            }
          ]}
          object={exchangeAccount}
          setObject={setExchangeAccount}
          objectName="Exchange Account"
        />
        <div className="flex flex-col items-end">
          <Button
            className=""
            type="submit"
            size="default"
            onClick={async () => {
              try {
                const response = await createExchangeAccount(searchParams, {
                  ...exchangeAccount
                })
                setExchangeAccounts([...exchangeAccounts, response.data])
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
