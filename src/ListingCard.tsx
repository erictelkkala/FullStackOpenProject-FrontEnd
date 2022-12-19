import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { CardHeader } from '@mui/material'
import { Container } from '@mui/system'

import { useNavigate } from 'react-router-dom'

import { Item } from './types'
import { useAppDispatch } from './redux/hooks'
import { addItem } from './redux/shoppingCart'

function ListingCard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const AddItemToCart = (item: Item) => {
    console.log('Add item to cart', item)
    if (item) {
      // Add the item to the cart
      dispatch(addItem(item))
      // Aedirect to the item's page
      return navigate(`/listing/${item.id}`)
    }
  }

  const mockItem: Item = {
    id: '1',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 2,
    image: 'srcassets\react.svg'
  }

  return (
    <Card raised sx={{ maxWidth: 345 }}>
      {/* Open the item's page when the car is clicked */}
      <Container onClick={() => AddItemToCart(mockItem)}>
        <CardHeader title="The react Logo" />
        <CardMedia component="img" height="300" src="src\assets\react.svg" alt="Listing image" />
      </Container>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This item is very much an item
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>In stock: 2</Typography>
        <IconButton color="primary" aria-label="Add to shopping cart" sx={{ marginLeft: 'auto' }}>
          {/* Show the add to cart button */}
          <AddShoppingCartIcon />
          {/* If the item is in car, also show the add and remove quantities buttons */}
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ListingCard
