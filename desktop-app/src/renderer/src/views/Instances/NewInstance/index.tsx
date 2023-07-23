// React
import { FC, useState } from 'react'

// Mui
import { Button, Stack, Typography } from '@mui/material'

// Components
import Input from 'src/renderer/src/components/TextFields/Input'

const PageNewInstance: FC = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = (): void => {
    console.log('PDO230I')
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Add new instance</Typography>
      <Input label="Name" value={name} onChange={(e): void => setName(e.target.value)} />
      <Input label="Type" value={type} onChange={(e): void => setType(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Stack>
  )
}

export default PageNewInstance
