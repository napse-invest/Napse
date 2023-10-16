import { Key, createKey, deleteKey, listKey } from '@/api/key/key'
import CopyButton from '@/components/custom/copyButton'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { DialogClose } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'

export default function AdminFooter({
  setAllKeys
}: {
  setAllKeys: Dispatch<SetStateAction<Key[]>>
}): JSX.Element {
  async function getKeysFromDB() {
    try {
      const response: AxiosResponse<Key[]> = await listKey(searchParams)
      setAllKeys(response.data)
    } catch (error) {
      console.error(error)
      setAllKeys([])
    }
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultAPIKeyName = 'My API Key'
  const defaultAPIKeyDescription = 'My API Key Description'
  const [APIKeyName, setAPIKeyName] = useState(defaultAPIKeyName)
  const [APIKeyDescription, setAPIKeyDescription] = useState(
    defaultAPIKeyDescription
  )
  const [fullAPIKey, setFullAPIKey] = useState('')
  const [hasCopied, setHasCopied] = useState(false)
  return (
    <CardFooter className="flex justify-between">
      <Dialog
        key={0}
        onOpenChange={async (open) => {
          if (!open && !hasCopied && fullAPIKey) {
            try {
              await deleteKey(searchParams, fullAPIKey.split('.')[0])
              setFullAPIKey('')
              await getKeysFromDB()
            } catch (err) {
              console.error(err)
            }
          }
        }}
      >
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
                    copyTrigger={() => {
                      setHasCopied(true)
                    }}
                  />
                </div>
              </div>
            </>
          )}
          <DialogFooter>
            <div className="flex flex-1 flex-row justify-between">
              {!fullAPIKey && (
                <Button
                  onClick={async () => {
                    try {
                      const response = await createKey(
                        searchParams,
                        APIKeyName,
                        APIKeyDescription
                      )
                      setFullAPIKey(response.data.key)
                      await getKeysFromDB()
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                >
                  Create
                </Button>
              )}

              {fullAPIKey && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      onClick={() => {
                        if (hasCopied) {
                          router
                            .push(
                              standardUrlPartial(
                                '/keys/',
                                fullAPIKey.split('.')[0],
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
                        }
                      }}
                    >
                      Go to key
                    </Button>
                  </AlertDialogTrigger>
                  {!hasCopied && (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You have not copied your API key. If you leave this
                          page without copying it, it will be deleted, and you
                          will need to create a new one.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className={buttonVariants({
                            variant: 'destructive'
                          })}
                          onClick={() => {
                            document.getElementById('close-button')?.click()
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
        <DialogClose id="close-button" />
      </Dialog>
    </CardFooter>
  )
}
