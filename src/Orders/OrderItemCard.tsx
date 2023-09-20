import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import { Item, OrderItem } from '../types'

function OrderItemCard({ orderItem: orderItem }: { orderItem: OrderItem }) {
  const item = orderItem.item as Item
  const quantity = orderItem.quantity
  console.log(item)

  return (
    <Box sx={{ display: 'flex', width: '75%', alignSelf: 'center' }}>
      <Card
        raised
        sx={{ display: 'flex', borderRadius: 2, width: '100%', flexDirection: 'row' }}
        aria-label="A card element for an item"
        role="listitem"
      >
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: 'contain', m: 2, borderRadius: 2 }}
          image={item.listing_image}
          alt={`Image of ${item.listing_title}`}
          aria-label="Image of the item"
        />

        {/* Title of the item and the quantity below it */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', mr: 'auto' }}>
          <Typography variant="h5" aria-label="Name of the item">
            {item.listing_title}
          </Typography>
        </CardContent>

        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Typography
              variant="h6"
              aria-label="Quantity and the price of the item"
              color={'text.secondary'}
            >
              {`${quantity} x ${item.listing_price} €`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default OrderItemCard
