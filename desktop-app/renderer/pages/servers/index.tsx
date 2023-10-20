import { connectKey } from '@/api/key/key'
import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'

import { Server, getServers } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Servers(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [cards, setCards] = useState<JSX.Element[]>([])
  const [servers, setServers] = useState<Record<string, Server>>({})

  useEffect(() => {
    const fetchServers = async () => {
      setServers(getServers())
    }
    fetchServers()
  }, [])

  useEffect(() => {
    Promise.all(
      Object.values(servers).map(async (server, index) => {
        let response
        try {
          response = await connectKey(server.url, server.token)
        } catch (error) {}
        return (
          <InfoPanelCard
            key={index}
            title={server.name}
            textContent={server.url}
            badge={response?.status === 204 ? 'up' : 'down'}
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
        )
      })
    ).then(setCards)
  }, [servers, router, searchParams])

  return (
    <ContextHeader isServer>
      <DefaultPageLayout
        header={'Your Servers'}
        description={
          'Here is an overview of all your servers. Select one in order to start using Napse!'
        }
      >
        <div className="my-10 grid grid-cols-3 gap-6">{cards}</div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
