import { screen } from '@testing-library/react'
import Login from '../../Login/Login'
import { render } from '../../utils/test-utils.js'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

describe('Login', () => {
  it('renders Login component', () => {
    render(<Login />)
    expect(screen.getByRole('heading')).toHaveTextContent('Login')
    expect(screen.getByText('Enter your username and password to log in')).toBeInTheDocument()
  })
  it('renders the Login form', () => {
    render(<Login />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /signup/i })).toHaveTextContent('Signup')
    expect(screen.getByRole('button', { name: /login/i })).toHaveTextContent('Login')
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled()
  })
  it('renders the Login form with errors', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()

    render(<Login onSubmit={mockSubmit} />)

    const loginButton = screen.getByRole('button', { name: /login/i })
    const usernameField = screen.getByLabelText('Username')
    const passwordField = screen.getByLabelText('Password')

    expect(loginButton).toBeDisabled()
    expect(loginButton).toHaveTextContent('Login')

    expect(usernameField).toHaveTextContent('')
    expect(passwordField).toHaveTextContent('')

    await user.type(usernameField, 'test')
    expect(loginButton).toBeDisabled()

    // Password too short
    await user.type(passwordField, 'tes')
    expect(loginButton).toBeDisabled()

    // Password too long
    await user.clear(passwordField)
    await user.type(
      passwordField,
      'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
    )
    expect(loginButton).toBeDisabled()

    // Password correct length
    await user.clear(passwordField)
    await user.type(passwordField, 'test')
    expect(loginButton).toBeEnabled()
  })
})
