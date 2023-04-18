import { useNavigate } from 'react-router-dom'

import { Box, Chip, Container, Divider, Stack, Typography } from '@mui/material'

import { useCartItems } from '../redux/hooks'
import CheckoutItem from './CheckoutItem'

function Checkout() {
  const items = useCartItems()
  const navigate = useNavigate()

  return (
    <Container>
      <Stack direction="column" justifyContent="center" spacing={2}>
        {items.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* Input the payment details to the left side of the screen */}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 3 }}>
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Payment Details
              </Typography>

              {/* TODO: Add the form for payments using Formik */}
            </Box>
            {/* Fill the gap between the form and the cart preview */}
            <Box sx={{ flexGrow: 2 }} />

            {/* Map the items to the preview */}
            {items.map((item) => (
              <CheckoutItem key={item.id} {...item} />
            ))}
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4">No items to checkout</Typography>
            </Box>
            <Divider sx={{ pt: 5 }}>
              <Chip
                label="Return to Home"
                color="primary"
                variant="filled"
                onClick={() => navigate('/')}
              />
            </Divider>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default Checkout
