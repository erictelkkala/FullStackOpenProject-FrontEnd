import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useMutation, useQuery } from '@apollo/client'
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { ADD_ORDER } from '../graphql/orderQueries'
import { ME } from '../graphql/userQueries'
import { useCartItems } from '../redux/hooks'
import { setError } from '../redux/reducers/errors'
import { NewOrderValues } from '../types'
import CheckoutItem from './CheckoutItem'

function Checkout() {
  const items = useCartItems()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [submitOrder, { loading, error, data }] = useMutation(ADD_ORDER)
  const { error: userError, data: userData } = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  const OrderSchema: Yup.AnyObject = Yup.object().shape({
    orderItems: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required('Required'),
          listing_title: Yup.string().required('Required'),
          listing_price: Yup.number().min(0).max(1000000).required('Required'),
          listing_quantity: Yup.number().required('Required'),
          quantity: Yup.number().required('Required')
        })
      )
      .required('Required'),
    shippingAddress: Yup.object()
      .shape({
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        postalCode: Yup.string().required('Required'),
        country: Yup.string().required('Required')
      })
      .required('Required'),
    paymentMethod: Yup.string().required('Required'),
    totalPrice: Yup.number().min(0).max(1000000).required('Required')
  })

  const formik = useFormik({
    initialValues: {
      orderItems: items,
      shippingAddress: { address: '', city: '', postalCode: '', country: '' },
      paymentMethod: '',
      totalPrice: 0
    },
    validationSchema: OrderSchema,
    onSubmit: async (values, { setSubmitting }) => {
      handleOrderSubmit(values)
      setSubmitting(false)
    }
  })

  // If the user is not logged in, redirect to the login page
  if (userError?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
    console.log('User is not logged in')
    navigate('/login')
  } else if (userError) dispatch(setError(userError.message))

  const handleOrderSubmit = async (values: NewOrderValues) => {
    // console.log('Order submitted')
    // console.log(values)
    await submitOrder({
      variables: {
        user: userData.me.id,
        items: values.orderItems,
        shippingAddress: values.shippingAddress,
        paymentMethod: values.paymentMethod,
        totalPrice: values.totalPrice
      }
    })

    if (error) dispatch(setError(error.message))

    // TODO: create the order page
    if (data) navigate(`/order/${data.id}`)
  }

  return (
    <Box sx={{ mx: 20 }}>
      <Stack direction="column" justifyContent="center" spacing={2} aria-label="Checkout section">
        {items.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '75%' }}>
            {/* Input the payment details to the left side of the screen */}
            <Box
              sx={{
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Payment Details
              </Typography>

              <form onSubmit={formik.handleSubmit} aria-label="Payment detail form">
                <TextField
                  name="address"
                  label="Address"
                  aria-label="Address section"
                  type="text"
                  variant="filled"
                  value={formik.values.shippingAddress.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingAddress?.address &&
                    Boolean(formik.errors.shippingAddress?.address)
                  }
                  helperText={
                    formik.touched.shippingAddress?.address &&
                    formik.errors.shippingAddress?.address
                  }
                  fullWidth
                />

                <TextField
                  name="city"
                  label="City"
                  aria-label="City section"
                  type="text"
                  variant="filled"
                  value={formik.values.shippingAddress.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingAddress?.city &&
                    Boolean(formik.errors.shippingAddress?.city)
                  }
                  helperText={
                    formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city
                  }
                  fullWidth
                  sx={{ mt: 2 }}
                />

                <TextField
                  name="postalCode"
                  label="Postal Code"
                  aria-label="Postal code section"
                  type="text"
                  variant="filled"
                  value={formik.values.shippingAddress.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingAddress?.postalCode &&
                    Boolean(formik.errors.shippingAddress?.postalCode)
                  }
                  helperText={
                    formik.touched.shippingAddress?.postalCode &&
                    formik.errors.shippingAddress?.postalCode
                  }
                  fullWidth
                  sx={{ mt: 2 }}
                />

                <TextField
                  name="country"
                  label="Country"
                  aria-label="Country section"
                  type="text"
                  variant="filled"
                  value={formik.values.shippingAddress.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.shippingAddress?.country &&
                    Boolean(formik.errors.shippingAddress?.country)
                  }
                  helperText={
                    formik.touched.shippingAddress?.country &&
                    formik.errors.shippingAddress?.country
                  }
                  fullWidth
                  sx={{ mt: 2 }}
                />

                <FormControl aria-label="Payment method section" sx={{ mt: 2 }}>
                  <FormLabel>Payment Method</FormLabel>
                  <RadioGroup
                    row
                    name="paymentMethod"
                    aria-label="Payment method selection"
                    value={formik.values.paymentMethod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <FormControlLabel
                      value="PayPal"
                      control={<Radio />}
                      label="PayPal"
                      aria-label="PayPal"
                    />
                    <FormControlLabel
                      value="Stripe"
                      control={<Radio />}
                      label="Stripe"
                      aria-label="Stripe"
                    />
                    <FormControlLabel
                      value="Credit/Debit Card"
                      control={<Radio />}
                      label="CreditDebit"
                      aria-label="Credit or debit card"
                    />
                    <FormControlLabel
                      value="Klarna"
                      control={<Radio />}
                      label="Klarna"
                      aria-label="Klarna"
                    />
                  </RadioGroup>
                </FormControl>

                {/* Render a loading animation on the button if the submit is loading */}
                {!loading ? (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: '100%', mt: 2 }}
                    aria-label="Button to submit an order"
                  >
                    Complete order
                  </Button>
                ) : (
                  <Skeleton>
                    <Button />
                  </Skeleton>
                )}
              </form>
            </Box>

            {/* Fill the gap between the form and the cart preview */}

            <Divider orientation="vertical" flexItem sx={{ mx: 10 }} aria-label="Divider" />

            {/* Map the items to the preview */}
            <Box aria-label="Summary of the items you are about to order">
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
