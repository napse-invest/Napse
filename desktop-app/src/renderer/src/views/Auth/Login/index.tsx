// React
import { FC, useState } from 'react'

// Components
import Input from '../../../components/TextFields/Input'
import Password from '../../../components/TextFields/Password'

// Mui
import { Button, Stack } from '@mui/material'

const PageLogin: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <Stack spacing={2}>
      <Input
        label="Email"
        value={email}
        onChange={(e): void => setEmail(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Password
        label="Password"
        value={password}
        onChange={(e): void => setPassword(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Button variant="contained" fullWidth>
        Login
      </Button>
    </Stack>
  )
}

export default PageLogin
