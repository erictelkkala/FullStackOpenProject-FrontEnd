import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'

import { GET_ORDER_BY_ID } from '../graphql/orderQueries'
import { setError } from '../redux/reducers/errors'
import { OrderItem } from '../types'
import OrderItemTableRow from './OrderItemTableRow'

type OrderData = {
  getOrder: {
    id: string
    orderItems: OrderItem[]
    totalPrice: number
    paymentMethod: string
    shippingAddress: {
      address: string
      city: string
      postalCode: string
      country: string
    }
  } | null
}

function ShowOrder() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, { variables: { id } })
  const response = data as OrderData
  const dispatch = useDispatch()

  if (error) dispatch(setError(error.message))

  // TODO: Show a skeleton while loading
  if (loading) return <p>Loading...</p>

  const orderItems = response?.getOrder?.orderItems || []
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'row', mx: 10 }}>
        {mapOrderItems(orderItems, response?.getOrder?.totalPrice || 0)}
        <Divider orientation="vertical" flexItem sx={{ mx: 5 }} aria-label="Divider" />
        {showPaymentDetails(response)}
      </Box>
    </div>
  )
}

export default ShowOrder

function showPaymentDetails(data: OrderData) {
  const shippingAddress =
    data?.getOrder?.shippingAddress.address +
    ', ' +
    data?.getOrder?.shippingAddress.city +
    ', ' +
    data?.getOrder?.shippingAddress.postalCode +
    ', ' +
    data?.getOrder?.shippingAddress.country
  return (
    <Box
      sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 5 }} aria-label="Payment details">
        Payment Details
      </Typography>
      <Typography variant="h5" sx={{ textAlign: 'center' }} aria-label="Payment method">
        Payment method: {data?.getOrder?.paymentMethod}
      </Typography>
      <Divider sx={{ my: 5 }} />
      <Typography variant="h5" sx={{ textAlign: 'center' }} aria-label="Shipping address">
        Shipping address: {shippingAddress}
      </Typography>
    </Box>
  )
}

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`
}

function mapOrderItems(orderItems: OrderItem[], orderTotalPrice: number) {
  const orderTaxes = orderTotalPrice * 0.24
  const orderTotalPriveWithoutTaxes = orderTotalPrice - orderTaxes
  return (
    <Box
      aria-label="Summary of the items you are about to order"
      sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 5 }} aria-label="Order header">
        Order
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Details
              </TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right" size="medium">
                Qty.
              </TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Sum</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((orderItem) => (
              <OrderItemTableRow key={orderItem.item.id} orderItem={orderItem} />
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>Subtotal without tax</TableCell>
              <TableCell align="right">{ccyFormat(orderTotalPriveWithoutTaxes)} €</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">24 %</TableCell>
              <TableCell align="right">{ccyFormat(orderTaxes)} €</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(orderTotalPrice)} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
