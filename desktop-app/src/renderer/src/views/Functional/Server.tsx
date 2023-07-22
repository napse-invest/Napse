// React
import { useEffect, useState } from 'react'

// Mui
import { Button, Stack, TextField, Typography } from '@mui/material'

const Server = (): JSX.Element => {
  const [apiKey, setApiKey] = useState<string>(
    localStorage.getItem(`api-key-server-${localStorage.getItem('current-space') || 'space-1'}`) ||
      ''
  )
  const onSave = (): void => {
    localStorage.setItem(
      `api-key-server-${localStorage.getItem('current-space') || 'space-1'}`,
      apiKey
    )
  }

  useEffect(() => {
    window.addEventListener('space-changed', () => {
      setTimeout(() => {
        setApiKey(
          localStorage.getItem(
            `api-key-server-${localStorage.getItem('current-space') || 'space-1'}`
          ) || ''
        )
      }, 100)
    })
  }, [])

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Server</Typography>
      <TextField
        label="API key"
        type="password"
        value={apiKey}
        onChange={(e): void => setApiKey(e.target.value)}
      />
      <Button onClick={onSave}>Save</Button>
    </Stack>
  )
}

export default Server
