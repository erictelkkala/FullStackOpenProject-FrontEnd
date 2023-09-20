import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { Box, Divider, Typography } from '@mui/material'

import { GET_ORDER_BY_ID } from '../graphql/orderQueries'
import { setError } from '../redux/reducers/errors'
import { OrderItem } from '../types'
import OrderItemCard from './OrderItemCard'

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
        <Divider orientation="vertical" flexItem sx={{ mx: 10 }} aria-label="Divider" />
        {showPaymentDetails()}
      </Box>
    </div>
  )
}

export default ShowOrder

function showPaymentDetails() {
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
    </Box>
  )
}

function mapOrderItems(orderItems: OrderItem[], orderTotalPrice: number) {
  return (
    <Box
      aria-label="Summary of the items you are about to order"
      sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 5 }} aria-label="Order header">
        Order
      </Typography>
      {orderItems.map((orderItem) => (
        <OrderItemCard key={orderItem.item.id} orderItem={orderItem} />
      ))}
      <Divider sx={{ pt: 5 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 5 }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }} aria-label="Total price">
          Total: {orderTotalPrice} €
        </Typography>
      </Box>
    </Box>
  )
}
