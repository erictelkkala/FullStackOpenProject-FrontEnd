import { useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { Container, Skeleton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'

import { GET_ITEMS } from './graphql/itemQueries'
import ItemCard from './Item/ItemCard'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setItems } from './redux/reducers/items'
import { Item } from './types'

function Home() {
  const dispatch = useAppDispatch()
  const { loading, error, data } = useQuery(GET_ITEMS)

  // Fetch the data from the url and dispatch it to allItems
  useEffect(() => {
    if (data) {
      dispatch(setItems(data.allItems))
    } else if (error) {
      console.log(error)
    }
  }, [data, dispatch, error])

  const items: Item[] = useAppSelector((state) => state.allItems.items)

  // If loading is true, show a skeleton
  if (loading && items.length < 1) {
    return (
      <Container>
        <Grid container spacing={6} rowSpacing={6} justifyContent={'center'} pb={6}>
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
        <Grid container spacing={6} rowSpacing={6} justifyContent={'center'} pb={6}>
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
