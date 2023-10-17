import { connectKey } from '@/api/key/key'
import { Button } from '@/components/ui/button'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { addServer, getServers, removeServer } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { DialogClose } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { Settings } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ServerPopover(): JSX.Element {
  const { toast } = useToast()
  const defaultServerName = 'Localhost'
  const defaultServerURL = 'http://localhost:8000'
  const defaulAPIToken = 'xxxxxxxx.xxxxxx.xxxxxxxxx'
  const [newServerName, setNewServerName] = useState(defaultServerName)
  const [newServerURL, setNewServerURL] = useState(defaultServerURL)
  const [newServerToken, setNewServerToken] = useState(defaulAPIToken)
  const [servers, setServers] = useState(getServers())
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentURL = router.asPath
  const urlBase = currentURL.split('?')[0].split('/')[1]
  const urlId = currentURL.split('?')[0].split('/')[2]
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'}>Servers</Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col items-center">
        <div className="flex flex-col items-stretch space-y-3">
          {Object.entries(servers).map(([key, server], index) => {
            return (
              <div key={index + 1} className="flex flex-row space-x-1">
                <Button
                  onClick={() => {
                    if (currentURL === '/') {
                      router
                        .push(
                          standardUrlPartial(
                            '/exchangeAccounts/',
                            null,
                            {
                              server: server.id,
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
                    } else {
                      router
                        .push(
                          standardUrlPartial(
                            `/${urlBase}/`,
                            urlId,
                            {
                              server: server.id,
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
                  variant="ghost"
                  className="w-full space-x-5"
                >
                  {server.name}
                </Button>
                <Button
                  onClick={() => {
                    router
                      .push(
                        standardUrlPartial(
                          '/servers/',
                          server.id,
                          {
                            server: server.id,
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
                  variant="outline"
                >
                  <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
                </Button>
              </div>
            )
          })}
          <Dialog key={0}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon className="mr-2 h-5 w-5" />
                Add new
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a new Server</DialogTitle>
                <DialogDescription>
                  Adding a new server will allow you to connect to it. You just
                  have to provide the server name, the server URL and a valid
                  API key.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue={defaultServerName}
                    className="col-span-3"
                    onChange={(e) => {
                      setNewServerName(e.currentTarget.value)
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="url" className="text-right">
                    URL
                  </Label>
                  <Input
                    id="url"
                    defaultValue={defaultServerURL}
                    className="col-span-3"
                    onChange={(e) => {
                      setNewServerURL(e.currentTarget.value)
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="token" className="text-right">
                    API Token
                  </Label>
                  <Input
                    id="token"
                    defaultValue={defaulAPIToken}
                    className="col-span-3"
                    onChange={(e) => {
                      setNewServerToken(e.currentTarget.value)
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={async () => {
                    try {
                      await connectKey(newServerURL, newServerToken)
                    } catch (err) {
                      console.error(err)
                      toast({
                        title: `Unable Added new server: ${newServerName}`,
                        description: (
                          <>
                            You werent able to connect to {newServerURL} with
                            the API token {newServerToken}.
                            <br />
                            <br />
                            Please check the URL and the API token and try
                            again.
                            <br />
                            <br />
                            If the problem persists, check if the server is
                            running.
                          </>
                        )
                      })
                      return
                    }
                    const id = addServer(
                      newServerName,
                      newServerURL,
                      newServerToken
                    )
                    if (!id && id !== 0) {
                      console.log('Unable to add server')
                      return
                    }
                    setServers(getServers())
                    setNewServerName(defaultServerName)
                    setNewServerURL(defaultServerURL)
                    router
                      .push(
                        standardUrlPartial(
                          '/servers/',
                          id.toString(),
                          {
                            server: id.toString(),
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
                    document.getElementById('close-button')?.click()
                    toast({
                      title: `Added new server: ${newServerName}`,
                      description: `You are now able to connect to ${newServerURL}`,
                      action: (
                        <ToastAction
                          altText="Goto schedule to undo"
                          onClick={() => {
                            Object.entries(getServers()).map(
                              ([key, server]) => {
                                if (server.id === id?.toString()) {
                                  removeServer(server.id)
                                }
                              }
                            )
                            setServers(getServers())
                            router
                              .push(
                                standardUrlPartial(
                                  '/servers/',
                                  null,
                                  {
                                    server: '',
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
                          Remove
                        </ToastAction>
                      )
                    })
                  }}
                >
                  Connect
                </Button>
              </DialogFooter>
            </DialogContent>
            <DialogClose id="close-button" />
          </Dialog>
        </div>
      </PopoverContent>
    </Popover>
  )
}
