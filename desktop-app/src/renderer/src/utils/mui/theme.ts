// Styles
import { palette } from './palette'
import { typography } from './typography'

export const getTheme = (mode: string) => ({
  palette: palette(mode),
  typography: typography
})
