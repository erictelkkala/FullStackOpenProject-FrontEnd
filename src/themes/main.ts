import { PaletteMode } from '@mui/material'
import { createTheme, PaletteColorOptions } from '@mui/material/styles'
import {
  ColorPartial,
  CommonColors,
  PaletteTonalOffset,
  TypeAction,
  TypeBackground,
  TypeText
} from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    primary?: PaletteColorOptions
    secondary?: PaletteColorOptions
    neutral?: PaletteColorOptions
    error?: PaletteColorOptions
    warning?: PaletteColorOptions
    info?: PaletteColorOptions
    success?: PaletteColorOptions
    mode?: PaletteMode
    tonalOffset?: PaletteTonalOffset
    contrastThreshold?: number
    common?: Partial<CommonColors>
    grey?: ColorPartial
    text?: Partial<TypeText>
    divider?: string
    action?: Partial<TypeAction>
    background?: Partial<TypeBackground>
    getContrastText?: (background: string) => string
  }
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffafd6',
      light: '#4c5a7b',
      dark: '#3d4967'
    },
    secondary: {
      main: '#e3a5f7'
    },
    neutral: {
      main: '#978e91',
      light: '#4c5a7b',
      dark: '#3d4967'
    },
    background: {
      default: '#1f1a1c'
    },
    contrastThreshold: 4.5
  },
  shape: {
    borderRadius: 4
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})
