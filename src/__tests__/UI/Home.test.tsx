import { describe, expect, it } from 'vitest'

import { screen, waitFor } from '@testing-library/react'

import { GET_ITEMS } from '../../graphql/itemQueries.js'
import Home from '../../Home.js'
import { render } from '../../utils/test-utils.js'

describe('Home', async () => {
  it('renders the home page', async () => {
    const mockItems = [
      {
        request: { query: GET_ITEMS },
        result: {
          data: {
            allItems: [
              {
                id: '1',
                listing_title: 'The react Logo',
                listing_description: 'This item is very much an item',
                listing_price: 100,
                listing_quantity: 0,
                listing_image: 'src\\assets\\react.svg',
                listing_category: 'Other'
              }
            ]
          }
        }
      }
    ]

    // Render with mock data
    render(<Home />, { mocks: mockItems })

    const logo = await screen.findByText('The react Logo')
    const description = await screen.findByText('This item is very much an item')
    const price = await screen.findByText('100 €')

    await waitFor(() => expect(logo).toBeInTheDocument())
    await waitFor(() => expect(description).toBeInTheDocument())
    await waitFor(() => expect(price).toBeInTheDocument())
  })

  it('should render a message if there are no items', async () => {
    const mockItems = [
      {
        request: { query: GET_ITEMS },
        result: {
          data: {
            allItems: []
          }
        }
      }
    ]

    render(<Home />, { mocks: mockItems })
    const message = await screen.findByText('No items to show')
    expect(message).toBeInTheDocument()
  })
})
