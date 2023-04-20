import React from 'react'

import { Link } from 'react-router-dom'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addItem, increaseQuantity } from '../redux/reducers/shoppingCart'
import { Item } from '../types'

function ItemCard(item: Item) {
  const dispatch = useAppDispatch()
  // Check if the item is already in the cart to get the quantity
  const initialState = useAppSelector((state) =>
    state.shoppingCart.quantity.find((i) => i.id === item.id)
  )
  const [quantity, setQuantity] = React.useState(initialState ? initialState.quantity : 0)

  const addItemToCart = (item: Item) => {
    console.log('Add item to cart', item)
    if (item && quantity == 0) {
      // Add the item to the cart as an array
      dispatch(addItem([item]))
      setQuantity(quantity + 1)
    } else if (item && quantity > 0) {
      // Increase the quantity of the item in the cart
      dispatch(increaseQuantity(item.id))
      setQuantity(quantity + 1)
    } else {
      console.log('Error adding item to cart')
    }
  }

  return (
    <Card
      raised
      sx={{ maxWidth: 400, minWidth: 300, borderRadius: 2 }}
      aria-label={`A card for an item called ${item.listing_title}`}
    >
      {/* Open the item's page when the car is clicked */}

      <Link
        to={`/item/${item.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
        aria-label={`A link to open details for ${item.listing_title}`}
      >
        <CardHeader title={item.listing_title} aria-label={`Header for ${item.listing_title}`} />
        <CardMedia
          component="img"
          aria-label={`Image of ${item.listing_title}`}
          width={300}
          src={item.listing_image}
          alt="Item image"
        />
      </Link>

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          aria-label={`Description for for ${item.listing_title}`}
        >
          {item.listing_description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography aria-label={`Price for ${item.listing_title}`}>
          {item.listing_price || 0} €
        </Typography>
        <IconButton
          color="primary"
          aria-label={`Add ${item.listing_title} to the shopping cart`}
          sx={{ ml: 'auto' }} // Align to the right
          onClick={() => addItemToCart(item)}
        >
          {/* Show the add to cart button */}
          <AddShoppingCartIcon />
          {/* TODO: If the item is in cart, also show the add and remove quantities buttons */}
          {quantity > 0 && <Typography>{quantity}</Typography>}
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ItemCard
