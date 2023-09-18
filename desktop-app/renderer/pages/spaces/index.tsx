import ContextHeader from '@/components/layout/contextHeader'
import ValuePanelCard from '@/components/custom/panel/valuePanelCard'
import {
  SET_SPACE_NAMES,
  SET_TAB,
  SET_NAME,
  SET_CONTAINER_STATE
} from '@/redux/reducers/headerStateSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from '@/api/axios'
import { AxiosResponse } from 'axios'

interface Space {
  name: string
  id: number
  value: number
  fleet_count: number
  delta?: number
}

export default function Spaces(): JSX.Element {
  const [spaces, setSpaces] = useState<Space[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<Space[]> = await axios.get('/space/')
        setSpaces(response.data)
      } catch (error) {
        console.error(error)
        setSpaces([])
      }
    }
    fetchData()
  }, [])

  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    dispatch(SET_SPACE_NAMES(spaces.map((space) => space.name)))
  }, [])
  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {spaces.map((space, index) => (
          <ValuePanelCard
            key={index}
            title={space.name}
            value={space.value}
            delta={space.delta}
            // tooltip={space.tooltip}
            onClick={() => {
              router.push(`/spaces/${space.name}`).catch((err) => {
                console.error(err)
              })
              dispatch(SET_CONTAINER_STATE(true))
              dispatch(SET_TAB('Spaces'))
              dispatch(SET_NAME(space.name))
            }}
            badge={String(space.fleet_count) + ' fleets'}
          />
        ))}
      </div>
    </ContextHeader>
  )
}
