import { screen } from '@testing-library/react'
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
    expect(screen.getByRole('button', { name: /login/i })).toHaveTextContent('Login')
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled()
  })
})
