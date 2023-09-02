import React from 'react'
import ContextHeader from '@/components/layout/contextHeader'
import MinimalistPanelCard from '@/components/custom/panel/minimalistPanelCard'
import {
  SET_SERVER_NAME,
  SET_SERVER_URL
} from '@/redux/reducers/serverStateSlice'
import { useDispatch } from 'react-redux'

const servers = [
  { name: 'localhost', url: 'http://localhost:8000/api' },
  {
    name: 'AWStest',
    url: 'http://ec2-3-142-69-135.us-east-2.compute.amazonaws.com:8000/api'
  }
]

export default function Servers(): JSX.Element {
  const dispatch = useDispatch()

  return (
    <ContextHeader isBot>
      <div className="mx-auto my-10 grid max-w-screen-xl gap-6 px-24 lg:grid-cols-3">
        {servers.map((server, index) => (
          <MinimalistPanelCard
            key={index}
            title={server.name}
            tooltip={server.url}
            onClick={() => {
              dispatch(SET_SERVER_NAME(server.name)),
                dispatch(SET_SERVER_URL(server.url))
            }}
          />
        ))}
      </div>
    </ContextHeader>
  )
}
