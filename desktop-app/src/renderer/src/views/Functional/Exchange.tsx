// Mui
import { Button, Stack, TextField, Typography } from '@mui/material'

const Exchange = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Exchange</Typography>
      <TextField label="API key" type="password" />
      <Button>Save</Button>
    </Stack>
  )
}

export default Exchange
