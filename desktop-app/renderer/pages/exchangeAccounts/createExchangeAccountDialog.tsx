import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { DialogClose } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import {
  RetreivedExchangeAccount,
  createExchangeAccount,
  getPossibleExchanges
} from 'api/exchangeAccounts/exchangeAccount'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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
        <Button variant="ghost" className="h-32 w-80">
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
        <form>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={defaultExchangeAccountName}
                className="col-span-3"
                onChange={(e) => {
                  setNewExchangeAccountName(e.currentTarget.value)
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={defaultExchangeAccountDescription}
                className="col-span-3"
                onChange={(e) => {
                  setNewExchangeAccountDescription(e.currentTarget.value)
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="exchange" className="text-right">
                Exchange
              </Label>
              <Select
                onValueChange={(exchange) => {
                  setSelectedExchange(exchange)
                }}
                defaultValue={possibleExchanges[0]}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select - Exchange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Space</SelectLabel>
                    {possibleExchanges.map((exchange, index) => (
                      <SelectItem key={index} value={exchange}>
                        {exchange}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="testing" className="text-right">
                Testing
              </Label>
              <Switch
                id="testing"
                checked={newExchangeAccountTesting}
                onClick={() => {
                  setNewExchangeAccountTesting(!newExchangeAccountTesting)
                }}
              />
            </div>
          </div>
        </form>
        <div className="flex flex-col items-end">
          <Button
            className=""
            type="submit"
            size="default"
            onClick={async () => {
              try {
                const response = await createExchangeAccount(searchParams, {
                  name: newExchangeAccountName,
                  description: newExchangeAccountDescription,
                  testing: newExchangeAccountTesting,
                  exchange: selectedExchange
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
