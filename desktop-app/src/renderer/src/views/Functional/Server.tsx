// Mui
import { Button, Stack, TextField, Typography } from '@mui/material'

const Server = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Server</Typography>
      <TextField label="API key" type="password" />
      <Button>Save</Button>
    </Stack>
  )
}

export default Server
