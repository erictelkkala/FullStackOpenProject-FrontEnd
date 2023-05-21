import { useFormik } from 'formik'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setCookie } from 'typescript-cookie'
import * as Yup from 'yup'

import { useMutation } from '@apollo/client'
import LoginIcon from '@mui/icons-material/Login'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  TextField
} from '@mui/material'

import { LOGIN_USER } from '../graphql/userQueries'
import { User } from '../types'

// The Login component accepts an optional onSubmit prop
function Login({ onSubmit: onSubmit }: { onSubmit?: (values: User) => void }) {
  const [login, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => handleLoginResponse(data)
  })
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

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

  const handleLogin = async (values: User): Promise<void> => {
    // If the onSubmit prop is passed, call it instead of the default
    if (onSubmit) {
      onSubmit(values)
    } else {
      // Send the username and password to the server
      await login({
        variables: {
          name: values.name,
          password: values.password
        }
      })
    }
  }

  const handleLoginResponse = (data: { login: { token: string } }): void => {
    // If the server returns a token, store it in a cookie
    if (data.login.token) {
      setCookie('token', data.login.token)
      // If the server returns a redirect path, navigate to it
      if (searchParams.has('redirect')) {
        navigate('/' + searchParams.get('redirect'))
      } else {
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
          mb: 6
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
              sx={{ mt: 2 }}
            />

            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                variant="contained"
                sx={{ mr: 1, width: 125 }}
                onClick={() => navigate('/signup')} // Navigate to the signup page
              >
                Signup
              </Button>

              {!loading ? (
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<LoginIcon />}
                  sx={{ width: 125 }}
                >
                  Login
                </Button>
              ) : (
                <Skeleton variant="rectangular" width={125} height={40} />
              )}
            </Stack>
          </form>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login
