import ContextHeader from '@/components/layout/contextHeader'
import axios from '@/api/axios'
import { AxiosResponse } from 'axios'
import InfoPanelCard from '@/components/custom/panel/infoPanelCard'
import React, { useEffect, useState } from 'react'

interface ExchangeAccount {
  id: number
  exchange_name: string
  name: string
  testing: boolean
}

export default function ExchangeAccounts(): JSX.Element {
  const [exchangeAccounts, setExchangeAccounts] = useState<ExchangeAccount[]>(
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ExchangeAccount[]> =
          await axios.get('/exchange_account/')
        setExchangeAccounts(response.data)
      } catch (error) {
        console.error(error)
        setExchangeAccounts([])
      }
    }

    fetchData()
  }, [])

  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {exchangeAccounts.map((exchangeAccount, index) => (
          <InfoPanelCard
            key={index}
            title={exchangeAccount.name}
            category={exchangeAccount.exchange_name.toLowerCase()}
            badge={exchangeAccount.testing ? 'testing' : ''}
          />
        ))}
      </div>
    </ContextHeader>
  )
}
