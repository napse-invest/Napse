import SelectedObject from '@/components/custom/selectedObject/selectedObject'
import TabsLayout from '@/components/custom/selectedObject/tabs'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import {
  Server,
  getServer,
  removeServer,
  updateServer
} from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as z from 'zod'
import SelectedAPIKey from './selectedAPIKey'
export default function Servers(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [server, setServer] = useState<Server>(
    getServer(searchParams.get('server') || '')
  )
  useEffect(
    () => setServer(getServer(searchParams.get('server') || '')),
    [searchParams]
  )

  return (
    <ContextHeader isBot isBreadcrumb={false}>
      <DefaultPageLayout
        header={'Server'}
        description={'Here is where you can manage your server.'}
      >
        <TabsLayout
          settingsTab={
            <div className="flex flex-row space-x-10">
              <SelectedObject
                objectName="Server"
                objectIdentifier="name"
                object={server}
                setObject={setServer}
                updateOnClick={() => {
                  updateServer(server)
                }}
                deleteOnClick={() => {
                  removeServer(server.id)
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
                inputs={[
                  {
                    label: 'Name',
                    key: 'name',
                    type: 'input',
                    zod: z.string(),
                    value: server.name
                  },
                  {
                    label: 'URL',
                    key: 'url',
                    type: 'input',
                    zod: z.string(),
                    value: server.url
                  },
                  {
                    label: 'API Token',
                    key: 'token',
                    type: 'input',
                    zod: z.string(),
                    value: server.token
                  }
                ]}
              />

              <SelectedAPIKey server={server} />
            </div>
          }
        />
      </DefaultPageLayout>
    </ContextHeader>
  )
}
