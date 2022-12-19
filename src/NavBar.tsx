import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'

import { useAppSelector } from './redux/hooks'
import { RootState } from './redux/store'
import { Link } from 'react-router-dom'

function NavBar() {
  const selector = useAppSelector((state: RootState) => state.shoppingCart)
  const itemsInCart = selector.items.length

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', flexGrow: 1 }}>
          <Typography variant="h4" color="inherit">
            The marketplace
          </Typography>
        </Link>

        {itemsInCart > 0 && (
          <Link to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <IconButton size="large" edge="end" color="inherit" aria-label="shopping cart">
              <Badge badgeContent={itemsInCart} color="info">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        )}
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
