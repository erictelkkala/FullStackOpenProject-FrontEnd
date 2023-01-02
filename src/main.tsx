import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import App from './App'
import { theme } from './themes/main'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* Make sure that the theme applies correctly */}
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
)
