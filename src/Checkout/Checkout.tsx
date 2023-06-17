import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useMutation, useQuery } from '@apollo/client'
import { Box, Chip, Divider, Stack, Typography } from '@mui/material'

import { ADD_ORDER } from '../graphql/orderQueries'
import { ME } from '../graphql/userQueries'
import { useCart } from '../redux/hooks'
import { setError } from '../redux/reducers/errors'
import { NewOrderValues } from '../types'
import CheckoutForm from './CheckoutForm'
import CheckoutItem from './CheckoutItem'

function Checkout({ onSubmit: onSubmit }: { onSubmit?: (values: NewOrderValues) => void }) {
  const cart = useCart()
  const items = cart.items
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [submitOrder, { loading, error, data }] = useMutation(ADD_ORDER)
  const { error: userError, data: userData } = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  // If the user is not logged in, redirect to the login page
  if (userError?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
    console.debug('User is not logged in')
    navigate('/login?redirect=checkout')
  } else if (userError) dispatch(setError(userError.message))

  const handleOrderSubmit = async (values: NewOrderValues) => {
    // Hardcode the payment result for now
    const paymentResult = {
      id: '123',
      paymentStatus: 'paid',
      paymentTime: '2021-10-10'
    }

    if (onSubmit) {
      onSubmit(values)
    } else {
      await submitOrder({
        variables: {
          user: userData.me.id,
          orderItems: values.orderItems,
          shippingAddress: values.shippingAddress,
          paymentMethod: values.paymentMethod,
          paymentResult: paymentResult,
          totalPrice: values.totalPrice
        }
      })
        .catch(() => {
          if (error) dispatch(setError(error.message))
        })
        .then(() => {
          console.log(data)
          navigate(`/order/${data.newOrder?.id}`)
        })
      // TODO: create the order page
    }
  }

  return (
    <Box sx={{ mx: 20 }}>
      <Stack direction="column" justifyContent="center" spacing={2} aria-label="Checkout section">
        {items.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {/* Input the payment details to the left side of the screen */}
            <Box
              sx={{
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%'
              }}
            >
              <Typography
                variant="h4"
                sx={{ textAlign: 'center', pb: 5 }}
                aria-label="Payment details"
              >
                Payment Details
              </Typography>

              <CheckoutForm
                items={items}
                quantities={cart.quantity}
                handleOrderSubmit={handleOrderSubmit}
                loading={loading}
              />
            </Box>

            {/* write a condition to remove the divider and summary when the viewport gets too small */}
            {/* Maybe use MeduaQuery here? https://dev.to/christensenjoe/using-breakpoints-in-materialui-5gj0 */}

            <Divider orientation="vertical" flexItem sx={{ mx: 10 }} aria-label="Divider" />

            {/* Map the items to the preview */}
            <Box
              aria-label="Summary of the items you are about to order"
              sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Typography
                variant="h4"
                sx={{ textAlign: 'center', pb: 5 }}
                aria-label="Order summary"
              >
                Order Summary
              </Typography>
              {items.map((item) => (
                <CheckoutItem key={item.id} {...item} />
              ))}
            </Box>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4">No items to checkout</Typography>
            </Box>
            <Divider sx={{ pt: 5 }}>
              <Chip
                label="Return to Home"
                aria-label="Return to Home"
                color="primary"
                variant="filled"
                onClick={() => navigate('/')}
              />
            </Divider>
          </>
        )}
      </Stack>
    </Box>
  )
}

export default Checkout
