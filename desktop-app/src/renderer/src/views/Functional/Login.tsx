// React
import { useState } from 'react'

// Mui
import { Button, Stack, TextField, Typography } from '@mui/material'

const Login = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <Stack spacing={2}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e): void => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
      />
      <Button>Login</Button>
    </Stack>
  )
}

export default Login
