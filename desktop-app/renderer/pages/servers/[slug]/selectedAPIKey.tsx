import { Key, getKey, listKey } from '@/api/key/key'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Server } from '@/lib/localStorage'
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

export default function SelectedAPIKey({
  server
}: {
  server: Server
}): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [key, setKey] = useState<Key>(defaultKey)
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
  }, [server, searchParams])
  const [isAdminView, setIsAdminView] = useState<boolean>(false)
  const [allKeys, setAllKeys] = useState<Key[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Key[]> = await listKey(searchParams)
        setAllKeys(response.data)
      } catch (error) {
        console.error(error)
        setAllKeys([])
      }
    }
    if (server.token) {
      fetchData()
    }
  }, [server, searchParams])
  return (
    <Card className="flex min-w-[450px] flex-col ">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>{isAdminView ? 'Admin View:' : 'Your key:'}</CardTitle>
          {key.is_master_key && (
            <HoverCard>
              <HoverCardTrigger>
                <Switch
                  checked={isAdminView}
                  onClick={() => {
                    setIsAdminView(!isAdminView)
                  }}
                />
              </HoverCardTrigger>
              <HoverCardContent className=" text-muted-foreground w-40 text-sm">
                {isAdminView ? 'Disable Admin View' : 'Enable Admin View'}
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <CardDescription>
          {isAdminView
            ? 'You manage all distributed API keys here.'
            : 'You can view your API key properties here.'}
        </CardDescription>
      </CardHeader>
      <div className="flex flex-1 flex-col justify-between">
        <CardContent>
          {isAdminView ? (
            <div className="max-h-52 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-background">
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Master</TableHead>
                    <TableHead className="text-right">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allKeys.map((key) => (
                    <TableRow
                      key={key.name}
                      onClick={() => {
                        router
                          .push(
                            standardUrlPartial(
                              '/keys/',
                              key.prefix,
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
                      <TableCell>{key.name}</TableCell>
                      <TableCell className="font-medium">
                        {key.prefix}
                      </TableCell>
                      <TableCell>
                        {key.revoked ? 'Revoked' : 'Active'}
                      </TableCell>
                      <TableCell>{key.is_master_key ? 'Yes' : 'No'}</TableCell>
                      <TableCell className="text-right">
                        {key.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input key={key.name} id="name" value={key.name} disabled />
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
                <Label htmlFor="framework">Master Key ?</Label>
                <Input
                  key={key.prefix}
                  id="prefix"
                  value={key.is_master_key ? 'Yes' : 'No'}
                  disabled
                />
              </div>
              {key.permissions.length > 0 && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Permissions</Label>
                  <div className="flex flex-row space-x-2">
                    {key.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        {isAdminView && <AdminFooter />}
      </div>
    </Card>
  )
}
