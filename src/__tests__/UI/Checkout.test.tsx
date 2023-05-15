import { describe, expect, it } from 'vitest'

import { screen } from '@testing-library/react'

import Checkout from '../../Checkout/Checkout.js'
import { ME } from '../../graphql/userQueries.js'
import { render } from '../../utils/test-utils.js'

describe('Checkout', () => {
  const preloadedState = {
    shoppingCart: {
      items: [
        {
          id: '1',
          listing_title: 'test',
          listing_price: 1,
          listing_quantity: 1,
          listing_description: 'test',
          listing_image: 'test'
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

  it('renders checkout component', () => {
    render(<Checkout />, {
      preloadedState: preloadedState,
      mocks: mocks
    })
    expect(screen.getByRole('heading', { name: 'Payment details' })).toHaveTextContent(
      'Payment Details'
    )
    expect(screen.getByRole('textbox', { name: 'Address' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Postal Code' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Country' })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: 'Payment method selection' })).toBeInTheDocument()
  })
})
