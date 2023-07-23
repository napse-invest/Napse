// React
import { FC } from 'react'

// Mui
import { Button, Stack } from '@mui/material'

interface Props {
  instances: {
    id: string
    name: string
  }[]
}

const InstancesList: FC<Props> = (props) => {
  const { instances } = props
  return (
    <Stack spacing={2}>
      {instances.map((instance) => (
        <Button key={instance.id} variant="contained" fullWidth>
          {instance.name}
        </Button>
      ))}
    </Stack>
  )
}

export default InstancesList
