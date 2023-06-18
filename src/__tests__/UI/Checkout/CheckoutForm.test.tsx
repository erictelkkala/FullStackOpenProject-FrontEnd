import { describe, vi } from 'vitest'

import { screen } from '@testing-library/react'

import CheckoutForm from '../../../Checkout/CheckoutForm'
import { ME } from '../../../graphql/userQueries'
import { Categories } from '../../../types'
import { render } from '../../../utils/test-utils'

describe('CheckoutForm', () => {
  const preloadedState = {
    shoppingCart: {
      items: [
        {
          id: '1',
          listing_title: 'test',
          listing_price: 1,
          listing_quantity: 1,
          listing_description: 'test',
          listing_image: 'test',
          listing_category: Categories.Other
        }
      ],
      quantity: [{ id: '1', quantity: 1 }]
    }
  }

  const mocks = [
    {
      request: {
        query: ME
      },
      result: {
        data: {
          me: {
            id: '1',
            name: 'test'
          }
        }
      }
    }
  ]

  const mockedHandleOrderSubmit = vi.fn()
  const mockedLoading = false

  it('should render the form', () => {
    render(<CheckoutForm handleOrderSubmit={mockedHandleOrderSubmit} loading={mockedLoading} />, {
      preloadedState: preloadedState,
      mocks: mocks
    })

    // Form header
    expect(screen.getByRole('form', { name: 'Payment detail form' })).toBeInTheDocument()

    // Form details
    expect(screen.getByRole('textbox', { name: 'Address' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Postal Code' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Country' })).toBeInTheDocument()

    // Form payment details
    expect(screen.getByRole('radiogroup', { name: 'Payment method selection' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'PayPal' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Credit or debit card' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Stripe' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Klarna' })).toBeInTheDocument()

    // Form submit button
    expect(screen.getByRole('button', { name: 'Complete order button' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Complete order button' })).toBeEnabled()
  })
})
