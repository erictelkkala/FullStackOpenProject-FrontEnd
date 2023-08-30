import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useMutation, useQuery } from '@apollo/client'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Skeleton,
  TextField
} from '@mui/material'

import { ADD_ORDER } from '../graphql/orderQueries'
import { ME } from '../graphql/userQueries'
import { useCartItems, useCartQuantity } from '../redux/hooks'
import { setError } from '../redux/reducers/errors'
import { Item, NewOrderValues } from '../types'

function CheckoutForm({ onSubmit }: { onSubmit?: (values: NewOrderValues) => void }) {
  const [submitOrder, { loading, error, data }] = useMutation(ADD_ORDER)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const items = useCartItems()
  const quantities = useCartQuantity()
  const orderValidationSchema: Yup.AnyObject = Yup.object().shape({
    orderItems: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string().required('Required'),
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
    paymentMethod: Yup.string().required('Required')
  })

  const { error: userError, data: userData } = useQuery(ME, {
    fetchPolicy: 'network-only'
  })

  // If the user is not logged in, redirect to the login page
  if (userError?.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
    console.debug('User is not logged in')
    navigate('/login?redirect=checkout')
  } else if (userError) dispatch(setError(userError.message))

  const itemsWithQuantities = items.map((item: Item) => {
    const quantity = quantities.find((q) => q.id === item.id)?.quantity || 0
    return { id: item.id, quantity }
  })

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
          navigate(`/order/${data.addOrder}`)
        })
    }
  }

  const formik = useFormik({
    initialValues: {
      orderItems: itemsWithQuantities,
      shippingAddress: { address: '', city: '', postalCode: '', country: '' },
      paymentMethod: '',
      totalPrice: items.reduce(
        (acc, item) =>
          acc + item.listing_price * (quantities.find((q) => q.id === item.id)?.quantity || 0),
        0
      )
    },
    validationSchema: orderValidationSchema,
    onSubmit: async (values: NewOrderValues) => {
      await handleOrderSubmit(values)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} aria-label="Payment detail form">
      <TextField
        name="shippingAddress.address"
        label="Address"
        aria-label="Address text field"
        type="text"
        variant="filled"
        value={formik.values.shippingAddress.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.shippingAddress?.address && Boolean(formik.errors.shippingAddress?.address)
        }
        helperText={
          formik.touched.shippingAddress?.address && formik.errors.shippingAddress?.address
        }
        fullWidth
      />

      <TextField
        name="shippingAddress.city"
        label="City"
        aria-label="City text field"
        type="text"
        variant="filled"
        value={formik.values.shippingAddress.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.shippingAddress?.city && Boolean(formik.errors.shippingAddress?.city)}
        helperText={formik.touched.shippingAddress?.city && formik.errors.shippingAddress?.city}
        fullWidth
        sx={{ mt: 2 }}
      />

      <TextField
        name="shippingAddress.postalCode"
        label="Postal Code"
        aria-label="Postal code text field"
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
          formik.touched.shippingAddress?.postalCode && formik.errors.shippingAddress?.postalCode
        }
        fullWidth
        sx={{ mt: 2 }}
      />

      <TextField
        name="shippingAddress.country"
        label="Country"
        aria-label="Country text field"
        type="text"
        variant="filled"
        value={formik.values.shippingAddress.country}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.shippingAddress?.country && Boolean(formik.errors.shippingAddress?.country)
        }
        helperText={
          formik.touched.shippingAddress?.country && formik.errors.shippingAddress?.country
        }
        fullWidth
        sx={{ mt: 2 }}
      />

      {/* TODO: convert to formal HTML radio components */}
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
          <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" aria-label="PayPal" />
          <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" aria-label="Stripe" />
          <FormControlLabel
            value="Credit/Debit"
            control={<Radio />}
            label="Credit/Debit Card"
            aria-label="Credit or debit card"
          />
          <FormControlLabel value="Klarna" control={<Radio />} label="Klarna" aria-label="Klarna" />
        </RadioGroup>
      </FormControl>

      {/* Render a loading animation on the button if to submit is loading */}
      {!loading ? (
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '100%', mt: 2 }}
          aria-label="Complete order button"
        >
          Complete order
        </Button>
      ) : (
        <Skeleton aria-busy={true}>
          <Button sx={{ width: '100%', mt: 2 }} />
        </Skeleton>
      )}
    </form>
  )
}

export default CheckoutForm
