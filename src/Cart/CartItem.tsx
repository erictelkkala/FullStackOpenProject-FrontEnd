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

import { useAppDispatch } from '../redux/hooks'
import { decreaseQuantity, increaseQuantity, removeItem } from '../redux/reducers/shoppingCart'
import { Item } from '../types'

function CartItem(item: Item) {
  const [open, setOpen] = React.useState(false)
  const dispatch = useAppDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    // console.log('Delete item from cart')

    dispatch(removeItem(item.id))
    setOpen(false)
  }

  const handleIncrease = () => {
    // console.log('Increase quantity')

    dispatch(increaseQuantity(item.id))
  }

  const handleDecrease = () => {
    // console.log('Decrease quantity')

    // If the quantity is 1, open the dialog to delete the item
    if (item.quantity === 1) {
      return handleClickOpen()
    }
    dispatch(decreaseQuantity(item.id))
  }

  return (
    <Box>
      <Card raised sx={{ display: 'flex', borderRadius: 2 }} aria-label="cart-item" role="listitem">
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: 'contain', margin: 2, borderRadius: 2 }}
          image={item.listing_image}
          alt="Image of the item"
        />

        {/* Title of the item and the quantity below it */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column', marginRight: 'auto' }}>
          <Typography variant="h5">{item.listing_title}</Typography>
          <FormControl sx={{ flexDirection: 'row' }}>
            <IconButton role="button" onClick={handleDecrease} aria-label="item-quantity-decrease">
              <RemoveIcon />
            </IconButton>
            <Typography
              variant="subtitle1"
              sx={{ alignSelf: 'center', padding: 1 }}
              aria-label="item-quantity-count"
            >
              {item.quantity}
            </Typography>
            <IconButton role="button" onClick={handleIncrease} aria-label="item-quantity-increase">
              <AddIcon />
            </IconButton>
          </FormControl>
        </CardContent>

        {/* Price of the item and the delete button */}
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* MarginBottom to make the delete button hit the "floor" of the box */}
          <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: 'auto' }}>
            <Typography variant="h5">{item.listing_price} €</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained" color="error" onClick={handleClickOpen} aria-label="Delete">
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog for deleting the item from the cart */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-hidden={open ? 'false' : 'true'}
        aria-label="alert-dialog-title"
        role="dialog"
        className="Confirm"
      >
        <DialogTitle id="alert-dialog-title">{'Delete item?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure that you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus aria-label="item-delete-button-cancel">
            No
          </Button>
          <Button onClick={handleDelete} aria-label="item-delete-button-confirm">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CartItem
