import { Key, deleteKey, getKey, updateKey } from '@/api/key/key'
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
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { standardUrlPartial } from '@/lib/queryParams'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const defaultKey: Key = {
  name: '',
  prefix: '',
  permissions: [],
  is_master_key: false,
  revoked: false,
  description: ''
}

export default function KeyGeneralAttributes(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [key, setKey] = useState<Key>(defaultKey)
  const [revoked, setRevoked] = useState<boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Key> = await getKey(
          searchParams,
          router.query.slug as string
        )
        setKey(response.data)
        setRevoked(response.data.revoked)
      } catch (error) {
        console.log(error)
        setKey(defaultKey)
      }
    }
    if (searchParams.get('server')) {
      fetchData()
    }
  }, [searchParams, router])

  return (
    <Card className="flex w-[500px] flex-col ">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Your key:</CardTitle>
        </div>
        <CardDescription>
          You can view your API key properties here.
        </CardDescription>
      </CardHeader>
      <div className="flex flex-1 flex-col justify-between">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  key={key.prefix}
                  id="name"
                  value={key.name}
                  onChange={(e) => {
                    setKey({ ...key, name: e.currentTarget.value })
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  key={key.prefix}
                  id="description"
                  defaultValue={key.description}
                  onChange={(e) => {
                    setKey({ ...key, description: e.currentTarget.value })
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="prefix">Prefix</Label>
                <Input
                  key={key.prefix}
                  id="prefix"
                  value={key.prefix}
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="master">Master Key</Label>
                <Switch checked={key.is_master_key} disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="active">Active</Label>
                <Switch
                  checked={!key.revoked}
                  disabled={revoked}
                  onClick={() => {
                    setKey({ ...key, revoked: !key.revoked })
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={async () => {
              try {
                await updateKey(
                  searchParams,
                  router.query.slug as string,
                  key.name,
                  key.description,
                  key.revoked,
                  undefined,
                  undefined
                )
              } catch (error) {
                console.log(error)
              }
              toast({
                title: `Successfully updated key !`,
                description: `${key.name} updated`
              })
            }}
          >
            Save
          </Button>
          <Button
            variant="destructive"
            disabled={key.is_master_key}
            onClick={async () => {
              try {
                await deleteKey(searchParams, router.query.slug as string)
              } catch (error) {
                console.log(error)
              }
              router
                .push(
                  standardUrlPartial(
                    '/servers/',
                    searchParams.get('server'),
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
              toast({
                title: `Successfully deleted key !`,
                description: `${key.name} deleted`
              })
            }}
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
