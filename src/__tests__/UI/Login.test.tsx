import { vi } from 'vitest'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from '../../Login/Login'
import { render } from '../../utils/test-utils.js'

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
  })
  it('renders the Login form with errors', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()

    render(<Login onSubmit={mockSubmit} />)

    const loginButton = screen.getByRole('button', { name: /login/i })
    const usernameField = screen.getByLabelText('Username')
    const passwordField = screen.getByLabelText('Password')

    expect(loginButton).toHaveTextContent('Login')

    expect(usernameField).toHaveTextContent('')
    expect(passwordField).toHaveTextContent('')

    // Password is missing
    await user.type(usernameField, 'test')
    await user.click(loginButton)
    expect(mockSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Password is required!')).toBeInTheDocument()

    // Password too short
    await user.type(passwordField, 'tes')
    await user.click(loginButton)
    expect(mockSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('Password is too short!')).toBeInTheDocument()

    // Password too long
    await user.clear(passwordField)
    await user.type(
      passwordField,
      'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
    )
    await user.click(loginButton)
    expect(mockSubmit).not.toHaveBeenCalled()

    // Password correct length
    await user.clear(passwordField)
    await user.type(passwordField, 'test')
    await user.click(loginButton)
    expect(mockSubmit).toHaveBeenCalledWith({ name: 'test', password: 'test' })
  })
})
