// Mui
import { Button, Stack } from '@mui/material'

// Components
import BasicCard from './components/Cards/BasicCard'
import MainLayout from './layouts/MainLayout'

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
            <Button variant="contained">
              {intl.formatMessage({
                id: 'global.create-environment',
                defaultMessage: 'Create environment'
              })}
            </Button>
          </Stack>
        }
        body={<></>}
      />
    </MainLayout>
  )
}

export default App
