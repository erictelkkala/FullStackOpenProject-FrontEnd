import { useEffect, useState } from 'react'

import axios, { AxiosError } from 'axios'

import { Container, Skeleton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import ItemCard from './Item/ItemCard'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setItems } from './redux/reducers/items'
import { Item } from './types'

// Get the items from the server
let url: string
switch (process.env.NODE_ENV) {
  case 'development':
    url = 'http://localhost:3001/api/items'
    break
  case 'production':
    url = 'https://withered-dawn-3663.fly.dev/api/items'
    break
  default:
    url = ''
}

function Home() {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

  // Fetch the data from the url and dispatch it to allItems
  useEffect(() => {
    // Only fetch data if in production or development
    // Test environment will use mock data

    const api = async () => {
      try {
        return (await axios.get(url)).data as Item[]
      } catch (e) {
        throw new Error(e as string)
      }
    }

    api()
      .then((r) => dispatch(setItems(r as Item[])))
      // If there is an error, log it to the console
      .catch((e: AxiosError) => console.error(e.message))
      // Set loading to false
      .finally(() => setLoading(false))
  }, [dispatch])

  const items: Item[] = useAppSelector((state) => state.allItems.items)
  // If loading is true, show a skeleton
  if (loading && items.length < 1) {
    return (
      <Container>
        <Grid container spacing={6} rowSpacing={6} justifyContent={'center'} paddingBottom={6}>
          <Grid item>
            <Skeleton variant="rounded">
              <ItemCard {...items[0]} />
            </Skeleton>
          </Grid>
          <Grid item>
            <Skeleton variant="rounded">
              <ItemCard {...items[0]} />
            </Skeleton>
          </Grid>
          <Grid item>
            <Skeleton variant="rounded">
              <ItemCard {...items[0]} />
            </Skeleton>
          </Grid>
        </Grid>
      </Container>
    )

    // If there are items, show them
  } else if (!loading && items.length > 0) {
    return (
      <Container>
        <Grid container spacing={6} rowSpacing={6} justifyContent={'center'} paddingBottom={6}>
          {items.map((item) => (
            <Grid item key={item.id}>
              <ItemCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
    // If there are no items, show a message
  } else {
    return (
      <Container>
        <Typography variant="h4" align="center" color="textSecondary" paragraph>
          No items to show
        </Typography>
      </Container>
    )
  }
}

export default Home
