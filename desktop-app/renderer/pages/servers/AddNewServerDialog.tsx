'use client'
import { connectKey } from '@/api/key/key'
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
import { useToast } from '@/components/ui/use-toast'
import { Server, addServer, getServers } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { DialogClose } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { z } from 'zod'

const defaultServer: Omit<Server, 'id'> = {
  name: 'Localhost',
  url: 'http://localhost:8000',
  token: 'xxxxxxxx.xxxxxx.xxxxxxxxx'
}
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
        <div className="flex flex-col items-start space-y-4">
          You werent able to connect to {server.url}.
          <br />
          <br />
          Please check the URL and the API token and try again.
          <br />
          <br />
          If the problem persists, check if the server is running.
        </div>
      )
    })
    return false
  }
}
export default function AddNewServerDialog({
  servers,
  setServers,
  disabledButton
}: {
  servers: Record<string, Server>
  setServers: React.Dispatch<React.SetStateAction<Record<string, Server>>>
  disabledButton?: boolean
}): JSX.Element {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const router = useRouter()
  const forbiddenNames = Object.keys(servers || [])
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
          <DialogTitle>Add a new server</DialogTitle>
          <DialogDescription>
            This will allow you to connect to it. You just have to provide the
            server name and the server URL.
          </DialogDescription>
        </DialogHeader>
        <CustomForm<Server>
          inputs={[
            {
              label: 'Name',
              key: 'name',
              type: 'input',
              zod: z.string().refine((value) => {
                return !forbiddenNames.includes(value)
              }, 'Watch out, this name is already used !'),
              default: defaultServer.name
            },
            {
              label: 'URL',
              key: 'url',
              type: 'input',
              zod: z.string(),
              default: defaultServer.url
            },
            {
              label: 'Token',
              key: 'token',
              type: 'input',
              zod: z.string(),
              default: defaultServer.token
            }
          ]}
          onSubmit={async (values) => {
            try {
              if (
                !(await tryConnection(
                  { name: values.name, url: values.url, token: values.token },
                  toast
                ))
              )
                return
              addServer(values.name, values.url, values.token)
              setServers(getServers())
              router
                .push(
                  standardUrlPartial(
                    '/servers/',
                    values.name,
                    {
                      server: values.name,
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
