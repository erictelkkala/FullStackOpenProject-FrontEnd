import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import { useItemQuantity } from '../redux/hooks'
import { Item } from '../types'

function CheckoutItem(item: Item) {
  const quantity = useItemQuantity(item.id)

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
          alt="Image of the item"
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
              aria-label="Quantity of the item"
              color={quantity > 0 ? 'text.secondary' : 'error'}
            >
              {quantity}
            </Typography>
            <Typography variant="h6" aria-label="x">
              {' x '}
            </Typography>
            <Typography variant="h6" aria-label="Price of the item" color={'text.secondary'}>
              {`${item.listing_price} €`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CheckoutItem
