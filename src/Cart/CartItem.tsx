import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
  Button,
  FormControl,
  IconButton
} from '@mui/material'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

import { Item } from '../types'

function CartItem(item: Item) {
  return (
    <Card raised sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        // FIXME: temporary image
        image="https://material-ui.com/static/images/cards/live-from-space.jpg"
        alt="Live from space album cover"
      />

      {/* Title of the item and the quantity below it */}
      <CardContent sx={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
        <Typography variant="h5">{item.name}</Typography>
        <FormControl sx={{ flexDirection: 'row' }}>
          <IconButton>
            <RemoveIcon />
          </IconButton>
          <Typography variant="subtitle1" sx={{ alignSelf: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </FormControl>
      </CardContent>

      {/* Price of the item and the delete button */}
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* MarginBottom to make the delete button hit the "floor" of the box */}
        <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: 'auto' }}>
          <Typography variant="h5">{item.price} €</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CartItem
