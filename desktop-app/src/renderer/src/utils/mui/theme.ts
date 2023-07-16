// Styles
import { palette } from './palette'

export const getTheme = (mode: string) => ({
  palette: palette(mode)
})
