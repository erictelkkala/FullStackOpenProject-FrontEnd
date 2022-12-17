import { Box, Card, CssBaseline, Paper, styled, ThemeProvider, Typography } from '@mui/material'
import { theme } from './themes/main'
import Grid from '@mui/material/Grid'
import ListingCard from './ListingCard'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  )
}

export default App
