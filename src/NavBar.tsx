import { Link, useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from 'typescript-cookie'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import Badge from '@mui/material/Badge'

import { useAppSelector } from './redux/hooks'
import { RootState } from './redux/store'

function NavBar() {
  const selector = useAppSelector((state: RootState) => state.shoppingCart)
  const itemsInCart = selector.items.length
  const token = getCookie('token')

  const navigate = useNavigate()

  // Logout function
  function logout() {
    // If the token exists
    if (token) {
      // Remove the token cookie
      removeCookie('token')
      // Redirect to the home page
      navigate('/')
    } else {
      // Redirect to the home page
      navigate('/')
    }
  }

  // Return a string with the amount of items in the cart
  function accessibleAmount(amount: number) {
    return amount === 1 ? '1 item in the cart' : `${amount} items in the cart`
  }

  return (
    // The AppBar has some interesting behavior with the p, making it go on top of the content
    <AppBar position="sticky" sx={{ bottom: 'auto', top: 0, mb: 10 }} aria-label="Navigation bar">
      <Toolbar>
        <Link
          to="/"
          style={{ textDecoration: 'none', color: 'white' }}
          aria-label="Navigation bar title link"
        >
          <Typography variant="h4" color="inherit" aria-label="Title of the website">
            The marketplace
          </Typography>
        </Link>

        {/* Empty box to not make the whole navbar a link */}
        <Box sx={{ flexGrow: 1 }} aria-hidden />

        {itemsInCart > 0 && (
          <Link
            to="/cart"
            style={{ textDecoration: 'none', color: 'white' }}
            aria-label="Link to the cart"
          >
            <IconButton size="large" edge="end">
              <Badge
                badgeContent={itemsInCart}
                color="secondary"
                role="status"
                aria-label={accessibleAmount(itemsInCart)}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        )}
        {!token ? (
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: 'white' }}
            aria-label="Link to the login page"
          >
            <Button color="inherit">Login</Button>
          </Link>
        ) : (
          <Button color="inherit" onClick={() => logout()} aria-label="Button to log out">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
