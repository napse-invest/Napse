import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Server, removeServer, updateServer } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'

import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

export default function SelectedServer({
  server,
  setServer
}: {
  server: Server
  setServer: Dispatch<SetStateAction<Server>>
}): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  if (!server) {
    return <></>
  }
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Selected Server: {server?.name}</CardTitle>
        <CardDescription>
          You can view/edit your server properties here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                key={server?.id}
                id="name"
                defaultValue={server?.name}
                onChange={(e) => {
                  setServer({ ...server, name: e.currentTarget.value })
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">URL</Label>
              <Input
                key={server?.id}
                id="url"
                defaultValue={server?.url}
                onChange={(e) => {
                  setServer({ ...server, url: e.currentTarget.value })
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="token">API Token</Label>
              <Input
                key={server?.id}
                id="token"
                defaultValue={server?.token}
                onChange={(e) => {
                  setServer({ ...server, token: e.currentTarget.value })
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => {
            updateServer(server)
            setServer({ ...server })
            toast({
              title: `Successfully edited server !`,
              description: `${server?.name} updated`
            })
          }}
        >
          Save
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            removeServer(server?.id)
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
            toast({
              title: `Successfully deleted server !`,
              description: `${server?.name} deleted`
            })
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
