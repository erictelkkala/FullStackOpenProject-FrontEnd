import LoginIcon from '@mui/icons-material/Login'
import { Box, Button, Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import * as Yup from 'yup'

import { User } from '../types'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const SignupSchema: Yup.AnyObject = Yup.object().shape({
    name: Yup.string()
      .min(4, 'Username is too short!')
      .max(20, 'Username is too long!')
      .required('Required'),
    password: Yup.string()
      .min(4, 'Password is too short!')
      .max(20, 'Password is too long!')
      .required('Required'),
    passwordConfirmation: Yup.string().test(
      'passwords-match',
      'Passwords must match',
      function (value) {
        return this.parent.password === value
      }
    )
  })

  const handleSignup = async (values: User) => {
    // Send the username and password to the server
    const res = await fetch('http://localhost:3001/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    // If the status is 200, redirect to login
    if (res.status === 200) {
      navigate('/login')
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
        <CardHeader title={'Signup'} sx={{ textAlign: 'center' }} role={'heading'}></CardHeader>
        <CardContent>Enter your username and password to sign up</CardContent>
        <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <Formik
            initialValues={{ name: '', password: '', passwordConfirmation: '' }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting }) => {
              handleSignup(values)
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

                <Field
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  component={TextField}
                  variant="filled"
                  fullWidth
                  sx={{ marginTop: 2 }}
                />

                {/*
                 * Only show allow the user to click the submit button if there are no errors and the fields are NOT empty
                 * Also check that the password and password confirmation match
                 */}
                {errors.name ||
                errors.password ||
                errors.passwordConfirmation ||
                values.password === '' ||
                values.name === '' ||
                values.passwordConfirmation === '' ||
                values.password !== values.passwordConfirmation ? (
                  <Button
                    variant="contained"
                    disabled
                    endIcon={<LoginIcon />}
                    sx={{ width: '100%', marginTop: 2 }}
                  >
                    Sign up
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<LoginIcon />}
                    sx={{ width: '100%', marginTop: 2 }}
                  >
                    Sign up
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

export default Signup
