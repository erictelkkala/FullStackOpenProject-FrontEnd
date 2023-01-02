import React, { ReactElement } from 'react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { cleanup, render, RenderOptions } from '@testing-library/react'

import { store } from '../redux/store'
import { theme } from '../themes/main'

afterEach(() => {
  cleanup()
})

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const initialEntries = ['/']
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
