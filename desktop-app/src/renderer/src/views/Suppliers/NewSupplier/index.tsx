// React
import { FC, useState } from 'react'

// Mui
import { Button, Stack, Typography } from '@mui/material'

// Components
import Input from 'src/renderer/src/components/TextFields/Input'
import Password from 'src/renderer/src/components/TextFields/Password'

const PageNewSuppliers: FC = () => {
  const [name, setName] = useState('')
  const [apiKey, setApiKey] = useState('')

  const handleSubmit = (): void => {
    console.log('JKD092JD0293')
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Add new supplier</Typography>
      <Input label="Name" value={name} onChange={(e): void => setName(e.target.value)} />
      <Password label="API key" value={apiKey} onChange={(e): void => setApiKey(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Stack>
  )
}

export default PageNewSuppliers
