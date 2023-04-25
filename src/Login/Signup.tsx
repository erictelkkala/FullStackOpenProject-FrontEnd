import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
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
  TextField
} from '@mui/material'

import { ADD_USER } from '../graphql/userQueries'
import { User } from '../types'

function Signup() {
  const navigate = useNavigate()
  const [addUser, { loading, error, data }] = useMutation(ADD_USER)

  const SignupSchema: Yup.AnyObject = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Username is too short!')
      .max(20, 'Username is too long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Password is too short!')
      .max(20, 'Password is too long!')
      .required('Required'),
    passwordConfirmation: Yup.string()
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
      .required('Required')
  })

  const handleSignup = async (values: User) => {
    // Send the username and password to the server
    await addUser({
      variables: {
        name: values.name,
        password: values.password
      }
    })
      .catch(() => {
        console.log(error)
      })
      .then(() => {
        console.log(data)
        navigate('/')
      })
  }

  const formik = useFormik({
    initialValues: { name: '', password: '', passwordConfirmation: '' },
    validationSchema: SignupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      handleSignup(values)
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
        <CardHeader title={'Signup'} sx={{ textAlign: 'center' }} role={'heading'}></CardHeader>
        <CardContent>Enter your username and password to sign up</CardContent>
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

            <TextField
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              variant="filled"
              value={formik.values.passwordConfirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)
              }
              helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
              fullWidth
              sx={{ mt: 2 }}
            />

            {!loading ? (
              <Button
                type="submit"
                variant="contained"
                endIcon={<LoginIcon />}
                sx={{ width: '100%', mt: 2 }}
              >
                Sign up
              </Button>
            ) : (
              <Skeleton variant="rectangular" height={50} sx={{ width: '100%', mt: 2 }} />
            )}
          </form>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Signup
