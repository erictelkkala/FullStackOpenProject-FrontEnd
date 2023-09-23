import { TableCell, TableRow } from '@mui/material'

import { Item, OrderItem } from '../types'

function OrderItemTableRow({ orderItem: orderItem }: { orderItem: OrderItem }) {
  const item = orderItem.item as Item
  const quantity = orderItem.quantity

  return (
    <TableRow key={orderItem.id}>
      <TableCell align="left">{item.listing_title}</TableCell>
      <TableCell align="right">{quantity}</TableCell>
      <TableCell align="right">{item.listing_price}</TableCell>
      <TableCell align="right">{item.listing_price * quantity} €</TableCell>
    </TableRow>
  )
}

export default OrderItemTableRow
