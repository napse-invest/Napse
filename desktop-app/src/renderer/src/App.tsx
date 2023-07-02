// Mui
import { Stack, Button } from '@mui/material'

// Components
import MainLayout from './layouts/MainLayout'
import BasicCard from './components/Cards/BasicCard'

// Intl
import { useIntl } from 'react-intl'

function App(): JSX.Element {
  const intl = useIntl()
  return (
    <MainLayout>
      <BasicCard
        title={
          <Stack direction="row" justifyContent="space-between">
            {intl.formatMessage({
              id: 'global.my-environments',
              defaultMessage: 'My environments'
            })}
            <Button variant="contained">Create environment</Button>
          </Stack>
        }
        body={<></>}
      />
    </MainLayout>
  )
}

export default App
