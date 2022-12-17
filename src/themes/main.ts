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
  spacing: 4,
  palette: {
    mode: 'dark'
  }
})
