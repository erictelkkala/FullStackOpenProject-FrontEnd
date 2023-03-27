import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import Badge from '@mui/material/Badge'
import { Link } from 'react-router-dom'

import { useAppSelector } from './redux/hooks'
import { RootState } from './redux/store'

function NavBar() {
  const selector = useAppSelector((state: RootState) => state.shoppingCart)
  const itemsInCart = selector.items.length

  return (
    // The AppBar has some interesting behavior with the padding, making it go on top of the content
    <AppBar position="sticky" sx={{ marginBottom: 10 }} aria-label="navbar">
      <Toolbar>
        <Link
          to="/"
          style={{ textDecoration: 'none', color: 'white' }}
          aria-label="navbar-title-link"
        >
          <Typography variant="h4" color="inherit" aria-label="navbar-title-text">
            The marketplace
          </Typography>
        </Link>

        {/* Empty box to not make the whole navbar a link */}
        <Box sx={{ flexGrow: 1 }} />

        {itemsInCart > 0 && (
          <Link
            to="/cart"
            style={{ textDecoration: 'none', color: 'white' }}
            aria-label="cart-icon-link"
          >
            <IconButton size="large" edge="end" color="inherit" aria-label="cart-icon-button">
              <Badge
                badgeContent={itemsInCart}
                color="info"
                role="status"
                aria-label="cart-icon-badge"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        )}
        <Link
          to="/login"
          style={{ textDecoration: 'none', color: 'white' }}
          aria-label="user-icon-link"
        >
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="user-icon"
            aria-controls="menu-appbar"
          >
            <AccountCircleIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
