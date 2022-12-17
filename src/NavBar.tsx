import { AppBar, Box, CssBaseline, IconButton, ThemeProvider, Toolbar, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
                The marketplace
                </Typography>
                <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                >
                <AccountCircleIcon />
            </IconButton>
          </Toolbar>
      </AppBar>
    )
}

export default NavBar