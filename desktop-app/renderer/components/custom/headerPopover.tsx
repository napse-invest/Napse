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
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ServerPopover(): JSX.Element {
  const { toast } = useToast()
  const defaultServerName = 'Localhost'
  const defaultServerURL = 'http://localhost:8000'
  const [newServerName, setNewServerName] = useState(defaultServerName)
  const [newServerURL, setNewServerURL] = useState(defaultServerURL)
  const [servers, setServers] = useState(getServers())
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'ghost'}>Servers</Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-80 flex-col items-center">
          <div className="flex flex-col items-stretch space-y-3">
            {Object.entries(servers).map(([key, server], index) => {
              return (
                <div key={index + 1} className="flex flex-row space-x-5">
                  <Button
                    onClick={() => {
                      router.push(
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
                    }}
                    variant="ghost"
                    className="w-full"
                  >
                    {server.name}
                  </Button>
                  <Button
                    onClick={() => {
                      removeServer(key)
                      setServers(getServers())
                    }}
                    variant="default"
                  >
                    <div className="flex flex-row ">
                      {/* <MinusCircledIcon className="mr-2 h-5 w-5" /> */}
                      <div>Remove</div>
                    </div>
                  </Button>
                </div>
              )
            })}
            <Dialog key={0}>
              <DialogTrigger asChild>
                <Button variant="outline" className="">
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Add new
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Server</DialogTitle>
                  <DialogDescription>
                    Add a new server will allow you to connect to it. You just
                    have to provide the server name and the server URL.
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
                    <Label htmlFor="username" className="text-right">
                      URL
                    </Label>
                    <Input
                      id="username"
                      defaultValue={defaultServerURL}
                      className="col-span-3"
                      onChange={(e) => {
                        setNewServerURL(e.currentTarget.value)
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => {
                      const id = addServer(newServerName, newServerURL)
                      setServers(getServers())
                      setNewServerName(defaultServerName)
                      setNewServerURL(defaultServerURL)
                      toast({
                        title: `Added new server: ${newServerName}`,
                        description: `You are now able to connect to ${newServerURL}`,
                        action: (
                          <ToastAction
                            altText="Goto schedule to undo"
                            onClick={() => {
                              Object.entries(getServers()).map(
                                ([key, server]) => {
                                  console.log(server.id, id?.toString())
                                  if (server.id === id?.toString()) {
                                    removeServer(server.id)
                                    console.log('removed')
                                  }
                                }
                              )
                              setServers(getServers())
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
            </Dialog>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
