import { CssBaseline, ThemeProvider } from '@mui/material'

import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Cart from './Cart/Cart'
import Home from './Home'
import ItemDetails from './Item/ItemDetails'
import Login from './Login/Login'
import NavBar from './NavBar'
import { setupStore } from './redux/store'
import { theme } from './themes/main'
import Signup from './Login/Signup'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={setupStore()}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1>404: Not Found</h1>} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </div>
  )
}

export default App
