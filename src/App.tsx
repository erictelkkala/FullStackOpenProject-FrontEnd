import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './themes/main'

import Home from './Home'
import ListingDetails from './ListingDetails'
import NavBar from './NavBar'

import { Routes, Route } from 'react-router-dom'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Cart from './Cart/Cart'

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
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </div>
  )
}

export default App
