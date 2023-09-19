import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useQuery } from '@apollo/client'
import { Box, Typography } from '@mui/material'

import { GET_ORDER_BY_ID } from '../graphql/orderQueries'
import { setError } from '../redux/reducers/errors'
import { OrderItem } from '../types'
import OrderItemCard from './OrderItemCard'

type OrderData = {
  getOrder: {
    id: string
    orderItems: OrderItem[]
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
      <Box>
        <Typography variant="h4">Order</Typography>
        {orderItems.map((orderItem) => (
          <OrderItemCard key={orderItem.item.id} orderItem={orderItem} />
        ))}
      </Box>
    </div>
  )
}

export default ShowOrder
