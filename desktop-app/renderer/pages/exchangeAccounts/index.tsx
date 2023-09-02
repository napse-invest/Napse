import React from 'react'
import ContextHeader from '@/components/layout/contextHeader'
import axios from '@/api/axios'

export default function ExchangeAccounts(): JSX.Element {
  console.log('Test')
  const getData = async () => {
    try {
      const response = await axios.get('/exchange_account/') // Replace with your API endpoint
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  const data = getData()
  return (
    <ContextHeader isBot>
      <></>
    </ContextHeader>
  )
}
