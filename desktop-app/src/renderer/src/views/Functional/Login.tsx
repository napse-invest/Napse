// Mui
import { Button, Stack, TextField, Typography } from '@mui/material'

const Login = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Username" />
      <TextField label="Password" type="password" />
      <Button>Login</Button>
    </Stack>
  )
}

export default Login
