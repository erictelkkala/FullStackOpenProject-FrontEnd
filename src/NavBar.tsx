import { Link } from 'react-router-dom'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import Badge from '@mui/material/Badge'

import { useAppSelector } from './redux/hooks'
import { RootState } from './redux/store'

function NavBar() {
  const selector = useAppSelector((state: RootState) => state.shoppingCart)
  const itemsInCart = selector.items.length

  return (
    // The AppBar has some interesting behavior with the padding, making it go on top of the content
    <AppBar position="sticky" sx={{ marginBottom: 10 }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h4" color="inherit">
            The marketplace
          </Typography>
        </Link>

        {/* Empty box to not make the whole navbar a link */}
        <Box sx={{ flexGrow: 1 }} />

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
