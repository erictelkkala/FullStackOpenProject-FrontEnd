import { useQuery } from '@apollo/client'
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { GET_ALL_ORDERS_BY_USER } from '../graphql/orderQueries'
import { Order } from '../types'
import OrderTableRow from './OrderTableRow'

function ShowAllOrders() {
  const { loading, error, data } = useQuery(GET_ALL_ORDERS_BY_USER)

  if (loading) return showSkeleton()
  if (error) return <p>Error :(</p>

  const orderItems = data.getAllOrdersByUser as Order[]

  return (
    <Box>
      <h1>Orders</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="Table of orders">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="right">Nr. of items</TableCell>
              <TableCell align="right">Payment status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((order: Order) => (
              <OrderTableRow order={order} key={order.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
