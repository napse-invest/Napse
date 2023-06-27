// Mui
import { Stack, Button, Typography } from '@mui/material'

// Components
import MainLayout from './layouts/MainLayout'
import BasicCard from './components/Cards/BasicCard'

function App(): JSX.Element {
  return (
    <MainLayout>
      <BasicCard
        title={
          <Stack direction="row" justifyContent="space-between">
            My environments
            <Button variant="contained">Create environment</Button>
          </Stack>
        }
        body={<></>}
      />
    </MainLayout>
  )
}

export default App
