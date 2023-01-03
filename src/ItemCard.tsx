import React from 'react'

import { Link } from 'react-router-dom'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  Typography
} from '@mui/material'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { addItem, increaseQuantity } from './redux/shoppingCart'
import { Item } from './types'

function ItemCard(item: Item) {
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
        <Link to={`/item/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <CardHeader title={item.name} />
          <CardMedia component="img" width={300} src={item.image} alt="Item image" />
        </Link>
      </Container>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>{item.price || 0} €</Typography>
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

export default ItemCard
