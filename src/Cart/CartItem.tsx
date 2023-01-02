import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  Typography
} from '@mui/material'

import { Item } from '../types'

function CartItem(item: Item) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box>
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
            <Button variant="contained" color="error" onClick={handleClickOpen}>
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog for deleting the item from the cart */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete item?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CartItem
