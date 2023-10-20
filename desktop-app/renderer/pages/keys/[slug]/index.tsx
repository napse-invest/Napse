import { Key, deleteKey, getKey, updateKey } from '@/api/key/key'
import SelectedObject from '@/components/custom/selectedObject/selectedObject'
import TabsLayout from '@/components/custom/selectedObject/tabs'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { standardUrlPartial } from '@/lib/queryParams'
import { AxiosResponse } from 'axios'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import KeyPermissions from './keyPermissions'

const defaultKey: Key = {
  name: '',
  prefix: '',
  permissions: [],
  is_master_key: false,
  revoked: false,
  description: ''
}

export default function Key(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [key, setKey] = useState<Key>(defaultKey)
  const [revoked, setRevoked] = useState<boolean>(false)
  useEffect(() => {
    const fetchKey = async () => {
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
      fetchKey()
    }
  }, [searchParams, router])
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Settings - Key'}
        description={'Here is where you can manage your distibuted API keys.'}
      >
        <TabsLayout
          settingsTab={
            <div className="flex flex-row space-x-10">
              <SelectedObject
                objectName="Key"
                objectIdentifier="name"
                object={key}
                setObject={setKey}
                noAutoRouteOnDelete
                updateOnClick={() => {
                  updateKey(
                    searchParams,
                    router.query.slug as string,
                    key.name,
                    key.description,
                    key.revoked,
                    undefined,
                    undefined
                  )
                }}
                deleteOnClick={async () => {
                  await deleteKey(searchParams, router.query.slug as string)
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
                }}
                inputs={[
                  { label: 'Name', key: 'name', type: 'input' },
                  {
                    label: 'Description',
                    key: 'description',
                    type: 'input'
                  },
                  {
                    label: 'Prefix',
                    key: 'prefix',
                    type: 'input',
                    disabled: true
                  },
                  {
                    label: 'Master Key',
                    key: 'is_master_key',
                    type: 'switch',
                    disabled: true
                  },
                  {
                    label: 'Revoked',
                    key: 'revoked',
                    type: 'switch',
                    disabled: key.is_master_key || revoked
                  }
                ]}
              />
              <KeyPermissions />
            </div>
          }
        />
      </DefaultPageLayout>
    </ContextHeader>
  )
}
