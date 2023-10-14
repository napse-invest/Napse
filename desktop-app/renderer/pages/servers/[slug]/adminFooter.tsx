import { createKey } from '@/api/key/key'
import CopyButton from '@/components/custom/copyButton'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { standardUrlPartial } from '@/lib/queryParams'
import { PlusIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AdminFooter({}): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultAPIKeyName = 'My API Key'
  const defaultAPIKeyDescription = 'My API Key Description'
  const [APIKeyName, setAPIKeyName] = useState(defaultAPIKeyName)
  const [APIKeyDescription, setAPIKeyDescription] = useState(
    defaultAPIKeyDescription
  )
  const [fullAPIKey, setFullAPIKey] = useState('')
  return (
    <CardFooter className="flex justify-between">
      <Dialog key={0}>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon></PlusIcon>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>
              An API key is a unique identifier used to interact with the
              server. You can create a new API key by providing a name and
              description. Before you can use it, you then need to give it
              Space-Specific permissions. Be careful who you give your API key
              to.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={defaultAPIKeyName}
                className="col-span-3"
                onChange={(e) => {
                  setAPIKeyName(e.currentTarget.value)
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                defaultValue={defaultAPIKeyDescription}
                className="col-span-3"
                onChange={(e) => {
                  setAPIKeyDescription(e.currentTarget.value)
                }}
              />
            </div>
          </div>
          {fullAPIKey && (
            <>
              <DialogDescription>
                Here is the API key you just created. You can copy it and use it
                to interact with the server. If you lose it, or leave this page
                without copying it, you will need to create a new one.
              </DialogDescription>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="API Key" className="text-right">
                  API Key
                </Label>
                <div className="col-span-3 flex flex-row items-center space-x-3">
                  <Input
                    id="description"
                    value={fullAPIKey}
                    disabled
                    onChange={(e) => {
                      setAPIKeyDescription(e.currentTarget.value)
                    }}
                  />
                  <CopyButton
                    className="h-7 w-8 rounded-full"
                    value={fullAPIKey}
                  />
                </div>
              </div>
            </>
          )}
          <DialogFooter>
            <div className="flex flex-1 flex-row justify-between">
              <Button
                onClick={async () => {
                  try {
                    const response = await createKey(
                      searchParams,
                      APIKeyName,
                      APIKeyDescription
                    )
                    setFullAPIKey(response.data.key)
                  } catch (err) {
                    console.error(err)
                  }
                }}
              >
                Create
              </Button>
              {fullAPIKey && (
                <Button
                  onClick={() => {
                    router
                      .push(
                        standardUrlPartial(
                          '/keys/',
                          fullAPIKey,
                          {
                            exchangeAccount: '',
                            space: '',
                            fleet: '',
                            bot: ''
                          },
                          searchParams
                        )
                      )
                      .catch((err) => {
                        console.error(err)
                      })
                  }}
                >
                  Go to key
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardFooter>
  )
}
