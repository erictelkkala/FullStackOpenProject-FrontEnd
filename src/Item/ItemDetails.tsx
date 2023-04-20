import React, { useEffect } from 'react'

import axios from 'axios'
import { useParams } from 'react-router-dom'

import { Button, Card, CardMedia, Container, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { useAppSelector } from '../redux/hooks'
import { Item } from '../types'

function ItemDetails() {
  const { id } = useParams()
  const [item, setItem] = React.useState<Item | null>(null)
  // Do not ONLY use the store to fetch the item data, since that requires setting the store in Home.tsx
  // Use the /api/items/:id endpoint to fetch the item data if the item is not in the store
  const itemInStore = useAppSelector((state) => state.allItems.items.find((i) => i.id === id))

  const url =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3001/api/items'
      : 'https://withered-dawn-3663.fly.dev/api/items'

  useEffect(() => {
    // If the item is in the store, set the item state to the item in the store
    if (itemInStore) {
      setItem(itemInStore)
      // Else fetch the item from the /api/items/:id endpoint
    } else {
      const fetchItem = async () => {
        await axios
          .get(`${url}/${id}`)
          .then((r) => setItem(r.data))
          .catch((e) => console.error(e))
      }
      fetchItem()
    }
  }, [id, itemInStore, url])

  return (
    <Container maxWidth="xl">
      {item ? (
        <Card
          raised
          sx={{ display: 'flex', p: 2, borderRadius: 2 }}
          aria-label="A card element for the item"
        >
          <CardMedia
            component={'img'}
            src={item.listing_image}
            alt={item.listing_title}
            sx={{ borderRadius: 2, width: 200, height: 200 }}
            aria-label="Image of the item"
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="h4" sx={{ p: 2 }} aria-label="Name of the item">
                {item.listing_title}
              </Typography>
              <Typography variant="h5" sx={{ p: 2, ml: 'auto' }} aria-label="Price of the item">
                {item.listing_price} €
              </Typography>
            </Box>

            {item.listing_quantity > 0 ? (
              <Button variant="contained" sx={{ ml: 'auto' }} aria-label="Buy the item">
                Buy
              </Button>
            ) : (
              <Button variant="contained" sx={{ ml: 'auto' }} disabled aria-disabled>
                Out of stock
              </Button>
            )}
          </Box>
        </Card>
      ) : (
        <Typography aria-label="No items in the cart">No items to display</Typography>
      )}
    </Container>
  )
}

export default ItemDetails
