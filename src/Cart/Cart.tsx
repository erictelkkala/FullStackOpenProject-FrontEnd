import { useNavigate } from 'react-router-dom'

import { Chip, Container, Divider, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useCartItems } from '../redux/hooks'
import CartItem from './CartItem'

function Cart() {
  const items = useCartItems()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
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
            <Divider sx={{ paddingTop: 5 }}>
              <Chip label="Return to Home" color="primary" variant="filled" onClick={handleClick} />
            </Divider>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Cart
