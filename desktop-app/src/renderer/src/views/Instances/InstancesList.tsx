// React
import React from 'react'

// Mui
import { Stack } from '@mui/material'

interface Props {
  instances: {
    id: string
    name: string
  }[]
}

const InstancesList: React.FC<Props> = (props) => {
  const { instances } = props
  return (
    <Stack spacing={2}>
      {instances.map((instance) => (
        <div key={instance.id}>{instance.name}</div>
      ))}
    </Stack>
  )
}

export default InstancesList
