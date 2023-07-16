// Styles
import { palette, Palette } from './palette'
import { typography, Typography } from './typography'

type Theme = {
  palette: Palette
  typography: Typography
}

export const getTheme = (mode: string): Theme => ({
  palette: palette(mode),
  typography: typography
})
