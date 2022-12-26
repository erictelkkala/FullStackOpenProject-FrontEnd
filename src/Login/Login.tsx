import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material'

function Login() {
  const handleLogin = () => {
    console.log('Login')
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card raised sx={{ maxWidth: 500, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title={'Login'} sx={{ textAlign: 'center' }}></CardHeader>
        <CardContent>Enter your username and password to log in</CardContent>
        <CardActions>
          <FormControl fullWidth sx={{ margin: 1 }}>
            <InputLabel htmlFor="username-input"> Username </InputLabel>
            <OutlinedInput id="username-input" label="Username" required />
          </FormControl>
          <FormControl fullWidth sx={{ margin: 1 }}>
            <InputLabel htmlFor="password-input"> Password </InputLabel>
            <OutlinedInput id="password-input" label="Password" required />
          </FormControl>
          <Button variant="contained" onClick={handleLogin} sx={{ margin: 1 }}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login
