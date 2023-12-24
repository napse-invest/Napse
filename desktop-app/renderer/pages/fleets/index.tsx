import { Fleet, listFleets } from '@/api/fleets/fleets'
import { Key, getCurrentKey } from '@/api/key/key'
import ContextHeader from '@/components/layout/contextHeader'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Fleets(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [Fleets, setFleets] = useState<Fleet[]>([])
  const [currentKey, setCurrentKey] = useState<Key>()

  useEffect(() => {
    async function fetchFleets() {
      try {
        const response = await listFleets(searchParams)
        setFleets(response.data)
      } catch (error) {
        console.error(error)
        setFleets([])
      }
    }
    const fetchCurrentKey = async () => {
      try {
        const response = await getCurrentKey(searchParams)
        setCurrentKey(response)
      } catch (error) {
        console.error(error)
        setCurrentKey(undefined)
      }
    }
    if (searchParams.get('server')) {
      fetchFleets()
      fetchCurrentKey()
    }
  }, [searchParams])
  console.log(Fleets)
  return (
    <ContextHeader isBot>
      <></>
    </ContextHeader>
  )
}
