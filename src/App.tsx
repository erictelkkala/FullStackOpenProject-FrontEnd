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

// Get the items from the server
async function getItems() {
  let url
  if (process.env.NODE_ENV !== 'production') {
    url = 'http://localhost:3001/api/items'
  } else {
    url = 'https://old-firefly-6762.fly.dev/items'
  }
  return await fetch(url)
    .then((res) => {
      if (!res.ok) {
        console.log(res)
        throw new Error('Network response was not OK')
      }
      return res.json()
    })
    .catch((e) => {
      console.error(e)
    })
}

const mockItems = await getItems()

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={setupStore()}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home mockItems={mockItems} />} />
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
