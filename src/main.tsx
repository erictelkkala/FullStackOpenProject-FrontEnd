import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import NavBar from './NavBar'
import { theme } from './themes/main'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    {/* Make sure that the theme applies correctly */}
      <CssBaseline />
      <NavBar />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
