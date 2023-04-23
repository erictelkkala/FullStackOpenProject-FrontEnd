import { PropsWithChildren, ReactElement } from 'react'

import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { afterEach } from 'vitest'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { PreloadedState } from '@reduxjs/toolkit'
import { cleanup, render, RenderOptions } from '@testing-library/react'

import { AppStore, RootState, setupStore } from '../redux/store'
import { theme } from '../themes/main'

afterEach(() => {
  cleanup()
})

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
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
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'
export { renderWithProviders as render }
