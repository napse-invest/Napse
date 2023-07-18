// Mui
import { Button, Stack } from '@mui/material'

// Components
import BasicCard from './components/Cards/BasicCard'
import MainLayout from './layouts/MainLayout'

// Intl
import { useIntl } from 'react-intl'

// Theme
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { getTheme } from './utils/mui/theme'

// Fonts
import Font from 'react-font'

function App(): JSX.Element {
  const intl = useIntl()
  const theme = createTheme(getTheme('light'))
  return (
    <ThemeProvider theme={theme}>
      <Font family={theme.typography.fontFamily || 'Roboto'}>
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
      </Font>
    </ThemeProvider>
  )
}

export default App
