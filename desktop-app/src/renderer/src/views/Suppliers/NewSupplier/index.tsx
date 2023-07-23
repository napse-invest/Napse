// React
import { FC } from 'react'

// Mui
import { Button, Stack, Typography } from '@mui/material'

// Components
import Input from 'src/renderer/src/components/TextFields/Input'
import Password from 'src/renderer/src/components/TextFields/Password'

const PageNewSuppliers: FC = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Add new supplier</Typography>
      <Input label="Name" />
      <Password label="API key" />
      <Button variant="contained">Add</Button>
    </Stack>
  )
}

export default PageNewSuppliers
