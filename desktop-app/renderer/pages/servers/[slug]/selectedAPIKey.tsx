import { Key, getKey, listKey } from '@/api/key/key'
import CustomTable from '@/components/custom/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Server, getServer } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AdminFooter from './adminFooter'

const defaultKey: Key = {
  name: '',
  prefix: '',
  permissions: [],
  is_master_key: false,
  revoked: false,
  description: ''
}

function tableColumns() {
  return [
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Prefix',
      accessorKey: 'prefix'
    },
    {
      header: 'Status',
      accessorKey: 'revoked'
    },
    {
      header: 'Master',
      accessorKey: 'is_master_key'
    },
    {
      header: 'Description',
      accessorKey: 'description'
    }
  ]
}

export default function SelectedAPIKey({
  server
}: {
  server: Server
}): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [key, setKey] = useState<Key>(defaultKey)
  const [isAdminView, setIsAdminView] = useState<boolean>(false)
  const [allKeys, setAllKeys] = useState<Key[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Key> = await getKey(
          searchParams,
          server.token.split('.')[0]
        )
        setKey(response.data)
      } catch (error) {
        console.error(error)
        setKey(defaultKey)
      }
    }

    if (server.token) {
      fetchData()
    }
    setIsAdminView(false)
  }, [server, searchParams])

  useEffect(() => {
    async function getKeysFromDB() {
      try {
        const response: AxiosResponse<Key[]> = await listKey(searchParams)
        setAllKeys(response.data)
      } catch (error) {
        console.error(error)
        setAllKeys([])
      }
    }

    const server = getServer(searchParams.get('server') || '')
    if (
      server.token &&
      server.token.split('.')[0] === key.prefix &&
      key.is_master_key
    ) {
      getKeysFromDB()
    }
  }, [server, searchParams, key])

  return (
    <Card className="flex min-w-[450px] flex-col ">
      <CardHeader>
        <CardTitle>{isAdminView ? 'Admin View:' : 'Your key:'}</CardTitle>
        <CardDescription>
          {isAdminView
            ? 'You manage all distributed API keys here.'
            : 'You can view your API key properties here.'}
        </CardDescription>
        {key.is_master_key && (
          <div className="flex flex-row space-x-2">
            <div className="text-muted-foreground font-medium">
              Admin View :
            </div>
            <Switch
              checked={isAdminView}
              onClick={() => {
                setIsAdminView(!isAdminView)
              }}
            />
          </div>
        )}
      </CardHeader>
      <div className="flex flex-1 flex-col justify-between">
        <CardContent>
          {isAdminView ? (
            <ScrollArea className="rounded-md border">
              <CustomTable
                className="h-52"
                data={allKeys}
                columns={tableColumns()}
                clickCallback={(row) => {
                  router
                    .push(
                      standardUrlPartial(
                        '/keys/',
                        row.getValue('prefix'),
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
              />
            </ScrollArea>
          ) : (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input key={key.prefix} id="name" value={key.name} disabled />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Prefix</Label>
                <Input
                  key={key.prefix}
                  id="prefix"
                  value={key.prefix}
                  disabled
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Master Key</Label>
                <Switch checked={key.is_master_key} disabled />
              </div>
            </div>
          )}
        </CardContent>
        {isAdminView && <AdminFooter setAllKeys={setAllKeys} />}
      </div>
    </Card>
  )
}
