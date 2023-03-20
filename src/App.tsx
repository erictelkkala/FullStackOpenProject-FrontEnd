import { CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'

import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Cart from './Cart/Cart'
import Home from './Home'
import ItemDetails from './Item/ItemDetails'
import Login from './Login/Login'
import NavBar from './NavBar'
import { setupStore } from './redux/store'
import { theme } from './themes/main'
import { Item } from './types.js'

// Get the items from the server
const url =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001/api/items'
    : 'https://withered-dawn-3663.fly.dev/api/items'
function App() {
  const [items, setItems] = useState<Item[]>([])

  // Fetch the data from the url when mounting
  // TODO: maybe convert to Redux instead of React state?
  useEffect(() => {
    const api = async () => {
      const data = await fetch(url, {
        method: 'GET'
      })
      return await data.json()
    }

    ;(async () => {
      const r = await api()
      setItems(r)
    })()
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={setupStore()}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home mockItems={items} />} />
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
