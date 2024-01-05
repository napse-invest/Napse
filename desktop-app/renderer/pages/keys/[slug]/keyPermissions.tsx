import { Key, getKey, possiblePermissions, updateKey } from '@/api/key/key'
import { NapseSpace, listSpace } from '@/api/spaces/spaces'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
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

export default function KeyPermissions(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [key, setKey] = useState<Key>(defaultKey)
  const [permissionArray, setPermissionArray] = useState<string[]>([])
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([])

  const [spaces, setSpaces] = useState<NapseSpace[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<NapseSpace[]> =
          await listSpace(searchParams)
        setSpaces(response.data)
        const response2: AxiosResponse<string[]> =
          await possiblePermissions(searchParams)
        setPermissionArray(response2.data)
      } catch (error) {
        console.log(error)
        setSpaces([])
      }
    }
    if (searchParams.get('server')) {
      fetchData()
    }
  }, [searchParams, router])
  const [selectedSpace, setSelectedSpace] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSpace) {
        return
      }
      try {
        const response: AxiosResponse<Key> = await getKey(
          searchParams,
          router.query.slug as string,
          selectedSpace
        )
        setCurrentPermissions(response.data.permissions)
        setKey(response.data)
      } catch (error) {
        console.log(error)
        setSelectedSpace('')
      }
    }
    fetchData()
  }, [selectedSpace, router, searchParams])
  return (
    <Card className="flex w-[500px] flex-col ">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Key Permissions:</CardTitle>
        </div>
        <CardDescription>
          You can view your API key permissions here. Please select a space to
          view permissions.
        </CardDescription>
        <Select
          onValueChange={(space) => {
            setSelectedSpace(space)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select - Space" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Space</SelectLabel>
              {spaces.map((space, index) => (
                <SelectItem key={index} value={space.uuid}>
                  {space.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <div className="flex flex-1 flex-col justify-between">
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {selectedSpace && (
              <>
                <Label htmlFor="permissions">Permissions</Label>
                {permissionArray.map((permission, index) => (
                  <div key={index} className="flex flex-row space-x-3">
                    <Switch
                      checked={
                        currentPermissions.includes(permission) ||
                        key.is_master_key
                      }
                      onClick={() => {
                        if (key.is_master_key) {
                          return
                        }
                        if (currentPermissions.includes(permission)) {
                          setCurrentPermissions(
                            currentPermissions.filter(
                              (item) => item !== permission
                            )
                          )
                          return
                        }
                        setCurrentPermissions([
                          ...currentPermissions,
                          permission
                        ])
                      }}
                    />
                    <p>{permission}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            disabled={!selectedSpace || key.is_master_key}
            onClick={async () => {
              try {
                await updateKey(
                  searchParams,
                  router.query.slug as string,
                  undefined,
                  undefined,
                  undefined,
                  currentPermissions,
                  selectedSpace
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
            Update Permissions
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
