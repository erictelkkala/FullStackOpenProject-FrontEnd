import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import Cart from './Cart/Cart'
import Checkout from './Checkout/Checkout'
import Home from './Home'
import ItemDetails from './Item/ItemDetails'
import Login from './Login/Login'
import Signup from './Login/Signup'
import NavBar from './NavBar'
import { setupStore } from './redux/store'
import { theme } from './themes/main'
import PageNotFound from './utils/PageNotFound'
import ErrorSnackbar from './utils/ErrorSnackbar'
import ShowAllOrders from './Orders/ShowAllOrders'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={setupStore()}>
        <ErrorSnackbar>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<ShowAllOrders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ErrorSnackbar>
      </Provider>
    </ThemeProvider>
  )
}

export default App
