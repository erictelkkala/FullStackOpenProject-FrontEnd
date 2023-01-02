import { Container } from '@mui/material'
import Grid from '@mui/material/Grid'

import ItemCard from './ItemCard'
import { Item } from './types'

function Home({ mockItems }: { mockItems: Item[] }) {
  // console.log(mockItems)
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
