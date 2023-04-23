import axios, { AxiosError } from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { screen, waitFor } from '@testing-library/react'

import Home from '../../Home.js'
import { render } from '../../utils/test-utils.js'

describe('Home', async () => {
  const mockAxios = vi.spyOn(axios, 'get').mockRejectedValue(new AxiosError('Error'))

  it('renders the home page', async () => {
    const mockItems = {
      items: [
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

    // Render with mock data
    render(<Home />, { preloadedState: { allItems: mockItems } })

    const logo = await screen.findByText('The react Logo')
    const description = await screen.findByText('This item is very much an item')
    const price = await screen.findByText('100 €')

    expect(mockAxios).toHaveBeenCalled()

    await waitFor(() => expect(logo).toBeInTheDocument())
    await waitFor(() => expect(description).toBeInTheDocument())
    await waitFor(() => expect(price).toBeInTheDocument())
  })

  it('should render a message if there are no items', async () => {
    render(<Home />)
    const message = await screen.findByText('No items to show')
    expect(message).toBeInTheDocument()
  })
})
