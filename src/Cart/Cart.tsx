import { useNavigate } from 'react-router-dom'

import { AppBar, Chip, Container, Divider, Stack, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useCartItems } from '../redux/hooks'
import CartItem from './CartItem'

function Cart() {
  const items = useCartItems()
  const navigate = useNavigate()

  const handleEmptyCart = () => {
    navigate('/')
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <Container>
      <Stack direction="column" justifyContent="center" spacing={2}>
        {items.length ? (
          items.map((item) => <CartItem key={item.id} {...item} />)
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4">Your cart is empty</Typography>
            </Box>
            <Divider sx={{ pt: 5 }}>
              <Chip
                label="Return to Home"
                color="primary"
                variant="filled"
                onClick={handleEmptyCart}
              />
            </Divider>
          </>
        )}
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }} aria-label="navbar">
          <Toolbar>
            <Typography variant="h5" color="inherit" aria-label="bottombar-total-amount">
              Total:{' '}
              {items.reduce((prevValue, currValue) => prevValue + currValue.listing_price, 0)} €
            </Typography>
            {/* Button on the right */}
            <Box sx={{ flexGrow: 1 }} />
            {items.length > 0 ? (
              <Chip label="Checkout" color="primary" variant="filled" onClick={handleCheckout} />
            ) : (
              <Chip disabled label="Checkout" color="primary" variant="filled" />
            )}
          </Toolbar>
        </AppBar>
      </Stack>
    </Container>
  )
}

export default Cart
