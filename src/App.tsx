import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';

// Ping the server
// function ping() {
//   fetch('http://localhost:3001/ping')
//     .then((res) => res.json())
// }

function App() {
  // ping();
  return (
    <>
    <Navbar />
    <Grid container>
      <Grid xs={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={logo}
            className="App-logo"
            alt="logo" />
        </Box>
      </Grid>
    </Grid>
    </>
  );
}

export default App;
