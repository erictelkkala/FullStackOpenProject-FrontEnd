import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { CardHeader } from '@mui/material'
import { Container } from '@mui/system'

import { Link } from 'react-router-dom'

import { Item } from './types'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { addItem, increaseQuantity } from './redux/shoppingCart'

import React from 'react'

function ListingCard(item: Item) {
  const dispatch = useAppDispatch()
  // Check if the item is already in the cart
  const initialState = useAppSelector((state) =>
    state.shoppingCart.items.find((i) => i.id === item.id)
  )
  const [quantity, setQuantity] = React.useState(initialState ? initialState.quantity : 0)

  const addItemToCart = (item: Item) => {
    console.log('Add item to cart', item)
    if (item && quantity == 0) {
      const itemWithQuantity = { ...item, quantity: 1 }
      // Add the item to the cart
      dispatch(addItem(itemWithQuantity))
      setQuantity(quantity + 1)
      console.log(quantity)
    } else if (item && quantity > 0) {
      // Increase the quantity of the item in the cart
      dispatch(increaseQuantity(item))
      setQuantity(quantity + 1)
    } else {
      console.log('Error adding item to cart')
    }
  }

  return (
    <Card raised sx={{ maxWidth: 400, minWidth: 300 }}>
      {/* Open the item's page when the car is clicked */}
      <Container>
        <Link to={`/listing/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardHeader title={item.name} />
          <CardMedia component="img" width={300} src="src\assets\react.svg" alt="Listing image" />
        </Link>
      </Container>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>In stock: 2</Typography>
        <IconButton
          color="primary"
          aria-label="Add to shopping cart"
          sx={{ marginLeft: 'auto' }}
          onClick={() => addItemToCart(item)}
        >
          {/* Show the add to cart button */}
          <AddShoppingCartIcon />
          {/* TODO: If the item is in car, also show the add and remove quantities buttons */}
          {quantity > 0 && <Typography>{quantity}</Typography>}
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ListingCard
