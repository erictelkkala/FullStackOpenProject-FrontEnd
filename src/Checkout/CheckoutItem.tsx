import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import { Item } from '../types'

function CheckoutItem(item: Item) {
  return (
    <Box sx={{ display: 'flex', width: '75%', alignSelf: 'center' }}>
      <Card
        raised
        sx={{ display: 'flex', flexDirection: 'row', borderRadius: 2, width: '100%' }}
        aria-label="cart-item"
        role="listitem"
      >
        <CardMedia
          component="img"
          sx={{ width: 75, height: 75, objectFit: 'contain', m: 2, borderRadius: 2 }}
          image={item.listing_image}
          alt="Image of the item"
        />

        {/* Title of the item and the quantity below it */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', mr: 'auto' }}>
          <Typography variant="h5">{item.listing_title}</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CheckoutItem
