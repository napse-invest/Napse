// React
import { FC, useState } from 'react'

// Router
import { useNavigate } from 'react-router-dom'

// Components
import Input from '../../../components/TextFields/Input'
import Password from '../../../components/TextFields/Password'

// Mui
import { Button, Stack } from '@mui/material'

const PageLogin: FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (): void => {
    console.log('submit')
    localStorage.setItem('is-logged', 'true')
    navigate('/dashboard')
  }

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
      <Button onClick={handleSubmit} variant="contained" fullWidth>
        Login
      </Button>
    </Stack>
  )
}

export default PageLogin
