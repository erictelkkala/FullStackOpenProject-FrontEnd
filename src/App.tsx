import { useState } from 'react'
import { AppBar, Box, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { appTheme } from './themes/main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
      </AppBar>
    </Box>
  </ThemeProvider>
  )
}

export default App
