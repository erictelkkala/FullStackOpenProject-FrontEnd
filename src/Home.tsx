import { Container } from '@mui/material'
import Grid from '@mui/material/Grid'
import ItemCard from './ItemCard'
import { Item } from './types'

const mockItems: Item[] = [
  {
    id: '1',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'src\\assets\\react.svg'
  },
  {
    id: '2',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'src\\assets\\react.svg'
  },
  {
    id: '3',
    name: 'The react Logo',
    description: 'This item is very much an item',
    price: 100,
    quantity: 0,
    image: 'src\\assets\\react.svg'
  }
]

function Home() {
  return (
    <Container>
      <Grid container spacing={6} rowSpacing={6} justifyContent={'center'}>
        {mockItems.map((item) => (
          <Grid item key={item.id}>
            <ItemCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
