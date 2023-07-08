import { Box, Skeleton } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useQuery } from '@apollo/client'
import { GET_ALL_ORDERS_BY_USER } from '../graphql/orderQueries'
import { Item } from '../types'

function ShowAllOrders() {
  const { loading, error, data } = useQuery(GET_ALL_ORDERS_BY_USER)

  if (loading) return showSkeleton()
  if (error) return <p>Error :(</p>

  return (
    <Box>
      <h1>Orders</h1>
      <Grid container spacing={2}>
        {data.allItems.map((item: Item) => (
          <Grid item key={item.id}>
            <h1>{item.listing_title}</h1>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

function showSkeleton() {
  return (
    <Skeleton>
      <Box>
        <h1>Orders</h1>
        <Grid container spacing={2}></Grid>
      </Box>
    </Skeleton>
  )
}

export default ShowAllOrders
