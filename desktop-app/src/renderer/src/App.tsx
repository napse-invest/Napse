// Components
import Functional from './views/Functional'

// Theme
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { getTheme } from './utils/mui/theme'

// Fonts
import Font from 'react-font'

function App(): JSX.Element {
  const theme = createTheme(getTheme('light'))
  return (
    <ThemeProvider theme={theme}>
      <Font family={theme.typography.fontFamily || 'Roboto'}>
        <Functional />
      </Font>
    </ThemeProvider>
  )
}

export default App
