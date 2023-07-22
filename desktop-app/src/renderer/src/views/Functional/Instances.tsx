// Mui
import { Button, Stack, TextField, Typography } from '@mui/material'

const Instances = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Instances</Typography>
      <TextField label="API key" type="password" />
      <Button variant="contained">Save</Button>
    </Stack>
  )
}

export default Instances
