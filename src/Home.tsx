import { Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useEffect } from 'react'

import ItemCard from './Item/ItemCard'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setItems } from './redux/reducers/items'
import { Item } from './types'
import axios from 'axios'

// Get the items from the server
const url =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001/api/items'
    : 'https://withered-dawn-3663.fly.dev/api/items'

function Home() {
  const dispatch = useAppDispatch()

  // Fetch the data from the url and dispatch it to allItems
  useEffect(() => {
    // Only fetch data if in production or development
    // Test environment will use mock data
    if (process.env.NODE_ENV !== 'test') {
      const api = async () => {
        return (await axios.get(url)).data
      }

      try {
        api().then((r) => dispatch(setItems(r)))
      } catch (e) {
        console.error(e)
      }
    }
  }, [dispatch])

  const items: Item[] = useAppSelector((state) => state.allItems.items)
  return (
    <Container>
      {/* Check for empty array of items */}
      {items.length > 0 ? (
        <Grid container spacing={6} rowSpacing={6} justifyContent={'center'} paddingBottom={6}>
          {items.map((item) => (
            <Grid item key={item.id}>
              <ItemCard {...item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No items to display</Typography>
      )}
    </Container>
  )
}

export default Home
