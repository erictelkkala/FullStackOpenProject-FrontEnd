import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { setCookie } from 'typescript-cookie'
import * as Yup from 'yup'

import LoginIcon from '@mui/icons-material/Login'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField
} from '@mui/material'

import { useAppDispatch } from '../redux/hooks'
import { setUser } from '../redux/reducers/user'
import { User } from '../types'

// The Login component accepts an optional onSubmit prop
function Login({ onSubmit: onSubmit }: { onSubmit?: (values: User) => void }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const LoginSchema: Yup.AnyObject = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Username is too short!')
      .max(20, 'Username is too long!')
      .required('Username is required!'),
    password: Yup.string()
      .min(4, 'Password is too short!')
      .max(20, 'Password is too long!')
      .required('Password is required!')
  })

  const handleLogin = async (values: User) => {
    // If the onSubmit prop is passed, call it instead of the default
    if (onSubmit) {
      onSubmit(values)
    } else {
      // Send the username and password to the server
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      // If the status is 200, set the token cookie
      if (res.status === 200) {
        // Parse the token from the body of the response
        const token = JSON.parse(await res.text()).token
        // Set the token cookie, expiry and sameSite
        setCookie('token', token, { expires: 1, sameSite: 'strict' })
        // Dispatch the token to the redux store
        dispatch(setUser(token))
        // Redirect to the home page
        navigate('/')
      }
    }
  }

  const formik = useFormik({
    initialValues: { name: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      handleLogin(values)
      setSubmitting(false)
    }
  })

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        raised
        sx={{
          maxWidth: 500,
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 6
        }}
      >
        <CardHeader title={'Login'} sx={{ textAlign: 'center' }} role={'heading'}></CardHeader>
        <CardContent>Enter your username and password to log in</CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="name"
              label="Username"
              type="text"
              variant="filled"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
            />

            <TextField
              name="password"
              label="Password"
              type="password"
              variant="filled"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              sx={{ marginTop: 2 }}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant="contained"
                sx={{ marginRight: 1, width: 125 }}
                onClick={() => navigate('/signup')} // Navigate to the signup page
              >
                Signup
              </Button>

              <Button type="submit" variant="contained" endIcon={<LoginIcon />} sx={{ width: 125 }}>
                Login
              </Button>
            </Stack>
          </form>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login
