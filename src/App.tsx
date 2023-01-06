import { Provider } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import Cart from './Cart/Cart'
import Home from './Home'
import ItemDetails from './Item/ItemDetails'
import Login from './Login/Login'
import NavBar from './NavBar'
import { store } from './redux/store'
import { theme } from './themes/main'
import { Item } from './types'

const mockItems: Item[] = [
  {
    id: '1',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
  },
  {
    id: '2',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
  },
  {
    id: '3',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
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
