import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './themes/main'

import Home from './Home'
import ItemDetails from './ItemDetails'
import NavBar from './NavBar'

import { Routes, Route } from 'react-router-dom'

import { store } from './redux/store'
import { Provider } from 'react-redux'
import Cart from './Cart/Cart'

import Login from './Login/Login'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </div>
  )
}

export default App
