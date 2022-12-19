import { Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import ListingCard from './ListingCard'
import { Item } from './types'

const mockItem: Item = {
  id: '1',
  name: 'The react Logo',
  description: 'This item is very much an item',
  price: 100,
  quantity: 0,
  image: 'src\\assets\\react.svg'
}

function Home() {
  return (
    <Container>
      <Grid container spacing={6} rowSpacing={6} justifyContent={'center'}>
        <Grid item>
          <ListingCard {...mockItem} />
        </Grid>
        <Grid item>
          <ListingCard {...mockItem} />
        </Grid>
        <Grid item>
          <ListingCard {...mockItem} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
