import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import ListingCard from './ListingCard'

function Home() {
  return (
    <Grid container spacing={2} alignItems={'center'}>
      <Grid item>
        <ListingCard />
      </Grid>
      <Grid item>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          The marketplace
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          The marketplace
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Home
