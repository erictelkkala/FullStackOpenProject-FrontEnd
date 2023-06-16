import { useFormik } from 'formik'
import * as Yup from 'yup'

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

import { CartQuantity, Item, NewOrderValues } from '../types'

function CheckoutForm({
  items,
  quantities,
  handleOrderSubmit,
  loading
}: {
  items: Item[]
  quantities: CartQuantity[]
  handleOrderSubmit: (values: NewOrderValues) => Promise<void>
  loading: boolean
}) {
  const OrderSchema: Yup.AnyObject = Yup.object().shape({
    orderItems: Yup.array()
      .of(
        Yup.object().shape({
          item: Yup.string().required('Required'),
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

  const itemsWithQuantities = items.map((item: Item) => {
    const quantity = quantities.find((q) => q.id === item.id)?.quantity || 0
    return { id: item.id, quantity }
  })

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
    validationSchema: OrderSchema,
    onSubmit: async (values: NewOrderValues) => {
      await handleOrderSubmit(values)
    }
  })

  console.debug(formik.values)

  return (
    <form onSubmit={formik.handleSubmit} aria-label="Payment detail form">
      <TextField
        name="shippingAddress.address"
        label="Address"
        aria-label="Address section"
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
        aria-label="City section"
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
          formik.touched.shippingAddress?.postalCode && formik.errors.shippingAddress?.postalCode
        }
        fullWidth
        sx={{ mt: 2 }}
      />

      <TextField
        name="shippingAddress.country"
        label="Country"
        aria-label="Country section"
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
            value="Credit/Debit Card"
            control={<Radio />}
            label="CreditDebit"
            aria-label="Credit or debit card"
          />
          <FormControlLabel value="Klarna" control={<Radio />} label="Klarna" aria-label="Klarna" />
        </RadioGroup>
      </FormControl>

      {/* Render a loading animation on the button if the submit is loading */}
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
        <Skeleton>
          <Button />
        </Skeleton>
      )}
    </form>
  )
}

export default CheckoutForm
