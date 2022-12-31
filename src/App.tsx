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
import { Item } from './types'

const mockItems: Item[] = [
  {
    id: '1',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'src\\assets\\react.svg'
  },
  {
    id: '2',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'src\\assets\\react.svg'
  },
  {
    id: '3',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'src\\assets\\react.svg'
  }
]

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
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
