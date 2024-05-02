import { connectKey } from '@/api/key/key'
import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import fs from 'fs'
import path from 'path'

import { Server, getServers, updateServer } from '@/lib/localStorage'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AddNewServerDialog from './AddNewServerDialog'

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
                    server.name,
                    {
                      server: server.name,
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

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const rootPath = process.env.HOME || process.env.USERPROFILE
    if (!rootPath) throw new Error('No root path found')

    const filePath = path.join(rootPath, '.napse-dev', 'api-keys.json')
    const dirPath = path.dirname(filePath)
    if (!fs.existsSync(dirPath)) {
      return
    }
    const file = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(file)
    // iterate over keys and values
    Object.keys(data).forEach((key) => {
      const server = data[key]
      updateServer({ name: key, url: server.url, token: server.token })
    })
  }, [])

  return (
    <ContextHeader isServer>
      <DefaultPageLayout
        header={'Your Servers'}
        description={
          'Here is an overview of all your servers. Select one in order to start using Napse!'
        }
      >
        <div className="my-10 grid grid-cols-3 gap-6">
          <>
            {cards}
            <InfoPanelCard
              cardType={'button'}
              tooltip={'Add a new server'}
              textContent={
                <AddNewServerDialog servers={servers} setServers={setServers} />
              }
            />
          </>
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
