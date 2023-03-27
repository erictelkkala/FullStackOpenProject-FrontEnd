import LoginIcon from '@mui/icons-material/Login'
import { Box, Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'
import { setCookie } from 'typescript-cookie'

import { User } from '../types'

function Login() {
  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Username is too short!')
      .max(20, 'Username is too long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Password is too short!')
      .max(20, 'Password is too long!')
      .required('Required')
  })

  const handleLogin = async (values: User) => {
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
    }
  }

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
          <Formik
            initialValues={{ name: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              handleLogin(values)
              setSubmitting(false)
            }}
          >
            {({ handleSubmit, errors, values }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="name"
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

                {/* Only show allow the user to click the submit button if there are no errors and the field are NOT empty */}
                {errors.name || errors.password || values.password === '' || values.name === '' ? (
                  <Button
                    variant="contained"
                    disabled
                    endIcon={<LoginIcon />}
                    sx={{ width: '100%', marginTop: 2 }}
                  >
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
