import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ListingDetails from './ListingDetails'
import NavBar from './NavBar'
import { theme } from './themes/main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/listing/:id',
    element: <ListingDetails />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* Make sure that the theme applies correctly */}
      <CssBaseline />
      <NavBar />
      {/* Router: do not declare App component here again */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
