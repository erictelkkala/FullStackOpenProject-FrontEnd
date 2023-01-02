import React, { ReactElement } from 'react'

import { MemoryRouter } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { render, RenderOptions } from '@testing-library/react'

import { theme } from '../src/themes/main'

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const initialEntries = ['/']
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
