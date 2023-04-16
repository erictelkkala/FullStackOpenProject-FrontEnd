import { Link, useNavigate } from 'react-router-dom'
import { getCookie, removeCookie } from 'typescript-cookie'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import Badge from '@mui/material/Badge'

import { useAppDispatch, useAppSelector, useUser } from './redux/hooks'
import { setUser } from './redux/reducers/user'
import { RootState } from './redux/store'

function NavBar() {
  const selector = useAppSelector((state: RootState) => state.shoppingCart)
  const itemsInCart = selector.items.length
  const { user } = useUser()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Logout function
  function logout() {
    const token = getCookie('token')

    // If the token exists
    if (token) {
      // Remove the token cookie
      removeCookie('token')
      // Remove the user from the store
      dispatch(setUser(''))
      // Redirect to the home page
      navigate('/')
    } else {
      // Redirect to the home page
      navigate('/')
    }
  }

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
            <IconButton size="large" edge="end" aria-label="cart-icon-button">
              <Badge
                badgeContent={itemsInCart}
                color="secondary"
                role="status"
                aria-label="cart-icon-badge"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        )}
        {user === '' ? (
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: 'white' }}
            aria-label="user-icon-link"
          >
            <Button color="inherit" aria-label="login-button">
              Login
            </Button>
          </Link>
        ) : (
          <Button color="inherit" onClick={() => logout()}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
