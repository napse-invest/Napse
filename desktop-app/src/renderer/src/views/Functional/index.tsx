// Components
import Exchange from './Exchange'
import Instances from './Instances'
import Login from './Login'
import Server from './Server'
import Space from './Space'

// Mui
import { Divider, Stack } from '@mui/material'

const Functional = (): JSX.Element => {
  return (
    <Stack spacing={5}>
      <Login />
      <Divider />
      <Space />
      <Divider />
      <Exchange />
      <Divider />
      <Server />
      <Divider />
      <Instances />
    </Stack>
  )
}

export default Functional
