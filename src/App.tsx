import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './themes/main'

import Home from './Home'
import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import ListingDetails from './ListingDetails'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
        </Routes>
      </ThemeProvider>
    </div>
  )
}

export default App
