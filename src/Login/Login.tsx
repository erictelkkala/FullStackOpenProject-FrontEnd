import LoginIcon from '@mui/icons-material/Login'
import { Box, Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'

import { User } from '../types'

function Login() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Username is too short!')
      .max(20, 'Username is too long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Password is too short!')
      .max(20, 'Password is too long!')
      .required('Required')
  })

  const handleLogin = (values: User) => {
    console.log('Login', values)
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card raised sx={{ maxWidth: 500, minWidth: 300, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title={'Login'} sx={{ textAlign: 'center' }}></CardHeader>
        <CardContent>Enter your username and password to log in</CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              // TODO: Replace this with a call to the API and remove the setTimeout
              setTimeout(() => {
                handleLogin(values)
                setSubmitting(false)
              }, 2000)
            }}
          >
            {({ handleSubmit, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="username"
                  label="Username"
                  type="text"
                  component={TextField}
                  variant="filled"
                  fullWidth
                />

                <Field
                  name="password"
                  label="Password"
                  type="password"
                  component={TextField}
                  variant="filled"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />

                {/* Only show allow the user to click the submit button if there are no errors */}
                {errors.username || errors.password ? (
                  <Button variant="contained" disabled sx={{ width: '100%', marginTop: 2 }}>
                    Login
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<LoginIcon />}
                    sx={{ width: '100%', marginTop: 2 }}
                  >
                    Login
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Login
