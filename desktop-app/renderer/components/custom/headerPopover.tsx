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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { Server, addServer, getServers, removeServer } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { DialogClose } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { Close } from '@radix-ui/react-popover'
import { Settings } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AllInputs from './selectedObject/inputs'

async function tryConnection(
  server: Server,
  toast: ReturnType<typeof useToast>['toast']
) {
  try {
    await connectKey(server.url, server.token)
    return true
  } catch (error) {
    toast({
      title: `Unable to connect to server: ${server.name}`,
      description: (
        <>
          You werent able to connect to {server.url}.
          <br />
          <br />
          Please check the URL and the API token and try again.
          <br />
          <br />
          If the problem persists, check if the server is running.
        </>
      )
    })
    return false
  }
}

export default function ServerPopover(): JSX.Element {
  const { toast } = useToast()
  const defaultServer: Omit<Server, 'id'> = {
    name: 'Localhost',
    url: 'http://localhost:8000',
    token: 'xxxxxxxx.xxxxxx.xxxxxxxxx'
  }

  const [servers, setServers] = useState(getServers())
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentURL = router.asPath
  const urlBase = currentURL.split('?')[0].split('/')[1]
  const urlId = currentURL.split('?')[0].split('/')[2]

  const [server, setServer] = useState(defaultServer)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'ghost'}>Servers</Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col items-center">
        <div className="flex flex-col items-stretch space-y-3">
          {Object.values(servers).map((server, index) => {
            return (
              <div key={index + 1} className="flex flex-row space-x-1">
                <Button
                  onClick={async () => {
                    if (!(await tryConnection(server, toast))) return
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
                    } else if (currentURL.startsWith('/servers')) {
                      router
                        .push(
                          standardUrlPartial(
                            `/servers/`,
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
                    } else if (currentURL.startsWith('/keys/')) {
                      if (searchParams.get('server') === server.id) {
                        document.getElementById('close-popover')?.click()
                        return
                      }
                      router
                        .push(
                          standardUrlPartial(
                            `/servers/`,
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
                  onClick={async () => {
                    if (!(await tryConnection(server, toast))) return
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
          <Dialog>
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
              <AllInputs
                inputs={[
                  {
                    label: 'Name',
                    key: 'name',
                    type: 'input'
                  },
                  {
                    label: 'URL',
                    key: 'url',
                    type: 'input'
                  },
                  {
                    label: 'API Token',
                    key: 'token',
                    type: 'input'
                  }
                ]}
                object={server}
                setObject={setServer}
                objectName="Server"
              />
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={async () => {
                    if (!(await tryConnection({ ...server, id: '' }, toast)))
                      return

                    const id = addServer(server.name, server.url, server.token)
                    if (!id && id !== 0) {
                      console.log('Unable to add server')
                      return
                    }
                    setServer(defaultServer)
                    setServers(getServers())
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
                    toast({
                      title: `Added new server: ${server.name}`,
                      description: `You are now able to connect to ${server.url}`,
                      action: (
                        <ToastAction
                          altText="Goto schedule to undo"
                          onClick={() => {
                            Object.values(getServers()).map((server) => {
                              if (server.id === id?.toString()) {
                                removeServer(server.id)
                              }
                            })
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
                    document.getElementById('close-button')?.click()
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
      <Close id="close-popover" />
    </Popover>
  )
}
