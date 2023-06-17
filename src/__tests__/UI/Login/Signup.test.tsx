import { describe, expect, it, vi } from 'vitest'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Signup from '../../../Login/Signup'
import { render } from '../../../utils/test-utils.js'

describe('Signup', async () => {
  const user = userEvent.setup()
  const mockSubmit = vi.fn()

  afterEach(() => {
    mockSubmit.mockClear()
  })

  it('renders signup component', () => {
    render(<Signup />)
    expect(screen.getByRole('heading')).toHaveTextContent('Signup')
    expect(screen.getByText('Enter your username and password to sign up')).toBeInTheDocument()
  })
  it('renders the Signup form', () => {
    render(<Signup />)
    const signupButton = screen.getByRole('button', { name: 'Sign up' })
    const usernameField = screen.getByLabelText('Username')
    const passwordField = screen.getByLabelText('Password')
    const confirmPasswordField = screen.getByLabelText('Confirm Password')

    expect(usernameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(confirmPasswordField).toBeInTheDocument()
    expect(signupButton).toHaveTextContent('Sign up')

    expect(usernameField).toHaveTextContent('')
    expect(passwordField).toHaveTextContent('')
    expect(confirmPasswordField).toHaveTextContent('')
  })
  describe('gives an error when', async () => {
    it('username is missing', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })

      // Username is missing
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Username is required!')).toBeInTheDocument()
    })
    it('password is missing', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })

      // Password is missing
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Password is required!')).toBeInTheDocument()
    })
    it('passwordConfirmation is missing', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })

      // PasswordConfirmation is missing
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Password confirmation is required!')).toBeInTheDocument()
    })

    it('username is too short', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const usernameField = screen.getByLabelText('Username')

      // Username too short
      await user.type(usernameField, 'tes')
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Username is too short!')).toBeInTheDocument()
    })
    it('password is too short', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const passwordField = screen.getByLabelText('Password')

      // Password too short
      await user.type(passwordField, 'tes')
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Password is too short!')).toBeInTheDocument()
    })
    it('confirmPassword is too short', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const confirmPasswordField = screen.getByLabelText('Confirm Password')

      // ConfirmPassword too short
      await user.type(confirmPasswordField, 'tes')
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Password confirmation is too short!')).toBeInTheDocument()
    })

    it('username is too long', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const usernameField = screen.getByLabelText('Username')

      // Username too long
      await user.type(
        usernameField,
        'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
      )
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Username is too long!')).toBeInTheDocument()
    })
    it('password is too long', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const passwordField = screen.getByLabelText('Password')

      // Password too long
      await user.type(
        passwordField,
        'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
      )
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Password is too long!')).toBeInTheDocument()
    })
    it('confirmPassword is too long', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const confirmPasswordField = screen.getByLabelText('Confirm Password')

      // Password too long
      await user.type(
        confirmPasswordField,
        'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
      )
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Password confirmation is too long!')).toBeInTheDocument()
    })

    it('passwords do not match', async () => {
      render(<Signup onSubmit={mockSubmit} />)
      const signupButton = screen.getByRole('button', { name: 'Sign up' })
      const passwordField = screen.getByLabelText('Password')
      const confirmPasswordField = screen.getByLabelText('Confirm Password')

      // Passwords do not match
      await user.type(passwordField, 'test')
      await user.type(confirmPasswordField, 'test1')
      await user.click(signupButton)
      expect(mockSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Passwords do not match!')).toBeInTheDocument()
    })
  })
  it('accepts a submit with valid inputs', async () => {
    render(<Signup onSubmit={mockSubmit} />)
    const signupButton = screen.getByRole('button', { name: 'Sign up' })
    const usernameField = screen.getByLabelText('Username')
    const passwordField = screen.getByLabelText('Password')
    const confirmPasswordField = screen.getByLabelText('Confirm Password')

    // Correct details
    await user.type(usernameField, 'test')
    await user.type(passwordField, 'test')
    await user.type(confirmPasswordField, 'test')
    await user.click(signupButton)
    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'test',
      password: 'test',
      passwordConfirmation: 'test'
    })
  })
})
