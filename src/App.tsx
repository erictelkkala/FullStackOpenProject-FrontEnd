import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './themes/main'

import Home from './Home'
import ListingDetails from './ListingDetails'
import NavBar from './NavBar'

import { Routes, Route } from 'react-router-dom'

import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </div>
  )
}

export default App
