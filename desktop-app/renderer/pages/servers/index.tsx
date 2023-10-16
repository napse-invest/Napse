import MinimalistPanelCard from '@/components/custom/panel/minimalistPanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'

import { getServers } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export default function Servers(): JSX.Element {
  const router = useRouter()
  const servers = getServers()
  const searchParams = useSearchParams()
  return (
    <ContextHeader isServer>
      <DefaultPageLayout
        header={'Your Servers'}
        description={
          'Here is an overview of all your servers. Select one in order to start using Napse!'
        }
      >
        <div className="my-10 grid gap-6 grid-cols-3">
          {Object.entries(servers).map(([id, server], index) => (
            <MinimalistPanelCard
              key={index}
              title={server.name}
              tooltip={server.url}
              onClick={() => {
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
            />
          ))}
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
