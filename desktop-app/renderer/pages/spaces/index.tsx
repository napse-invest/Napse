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
import { useEffect } from 'react'

export default function Spaces(): JSX.Element {
  const spaces = [
    {
      name: 'Space Jam',
      bots: 3,
      value: 1.01,
      change: 20.6,
      tooltip: 'test'
    },
    {
      name: 'Space Mountain',
      bots: 152,
      value: 152163231.89,
      change: 0,
      tooltip: 'test'
    },
    {
      name: 'Zero Space',
      bots: 8,
      value: 45621.89,
      change: -6.468,
      tooltip: 'test'
    }
  ]
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
            change={space.change}
            tooltip={space.tooltip}
            onClick={() => {
              router.push(`/spaces/${space.name}`).catch((err) => {
                console.error(err)
              })
              dispatch(SET_CONTAINER_STATE(true))
              dispatch(SET_TAB('Spaces'))
              dispatch(SET_NAME(space.name))
            }}
            badge={space.bots + ' bots'}
          />
        ))}
      </div>
    </ContextHeader>
  )
}
