import { Toolbar, AppBar, Typography, Box } from '@mui/material';

export default function Navbar() {
    return (
        <AppBar position='sticky' color='primary'>
            <Toolbar>
                <Box sx={{flexGrow: 1}}>
                    <Typography variant='h6'>
                    React App
                    </Typography>
                </Box>
                <Box sx={{flexGrow:6}}>
                    <Typography variant='h6'>
                    React App
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}