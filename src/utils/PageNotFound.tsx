import { useNavigate } from 'react-router-dom'

import { Box, Chip, Divider, Typography } from '@mui/material'

function PageNotFound() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        Page not found
      </Typography>
      <Divider sx={{ pt: 5 }}>
        <Chip label="Return to Home" color="primary" variant="filled" onClick={handleClick} />
      </Divider>
    </Box>
  )
}

export default PageNotFound
