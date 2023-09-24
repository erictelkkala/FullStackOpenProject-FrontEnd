import { useNavigate } from 'react-router-dom'

import { TableCell, TableRow } from '@mui/material'

import { Order } from '../types'

function OrderTableRow({ order }: { order: Order }) {
  const epoch = Number.parseInt(order.createdAt.toString())
  const date = new Date(epoch).toLocaleDateString()
  const numberOfItems = order.orderItems.length
  const navigate = useNavigate()

  function navigateToOrderDetails(orderId: string) {
    navigate(`/order/${orderId}`)
  }

  return (
    <TableRow key={order.id}>
      <TableCell onClick={() => navigateToOrderDetails(order.id)} component="th" scope="row">
        {order.id}
      </TableCell>
      <TableCell align="left">{date}</TableCell>
      <TableCell align="right">{numberOfItems}</TableCell>
      <TableCell align="right">{order.paymentResult.paymentStatus}</TableCell>
      <TableCell align="right">{order.totalPrice} €</TableCell>
    </TableRow>
  )
}

export default OrderTableRow
