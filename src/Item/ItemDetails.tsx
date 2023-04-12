import React, { useEffect } from 'react'

import axios from 'axios'
import { useParams } from 'react-router-dom'

import { Box, Container, Typography } from '@mui/material'

import { Item } from '../types'

function ItemDetails() {
  const { id } = useParams()
  const [item, setItem] = React.useState<Item | null>(null)
  // Do not use the store to fetch the item data, since that requires setting the store in Home.tsx
  // Use the /api/items/:id endpoint to fetch the item data

  const url =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3001/api/items'
      : 'https://withered-dawn-3663.fly.dev/api/items'

  useEffect(() => {
    const fetchItem = async () => {
      await axios
        .get(`${url}/${id}`)
        .then((r) => setItem(r.data))
        .catch((e) => console.error(e))
    }
    fetchItem()
  }, [id, url])

  return (
    <Container>
      {item ? (
        <Box sx={{ display: 'flex' }}>
          <Box
            component={'img'}
            src={item.listing_image}
            alt={item.listing_title}
            sx={{ borderRadius: 2 }}
          />
          <Typography variant="body1"> Name: {item.listing_title} </Typography>
          <Typography variant="body1"> Price: {item.listing_price} </Typography>
        </Box>
      ) : (
        <Typography>No items to display</Typography>
      )}
    </Container>
  )
}

export default ItemDetails
