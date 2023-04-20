import { describe, it } from 'vitest'

import { screen, within } from '@testing-library/react'

import NavBar from '../../NavBar.js'
import { render } from '../../utils/test-utils.js'

describe('Navbar', () => {
  it('renders all the buttons when no items in cart', () => {
    render(<NavBar />)

    const navbar = screen.getByRole('banner', { name: 'Navigation bar' })

    expect(navbar).toBeInTheDocument()
    expect(
      within(navbar).getByRole('link', { name: 'Navigation bar title link' })
    ).toBeInTheDocument()
    expect(within(navbar).getByRole('heading', { name: 'Title of the website' })).toBeVisible()
    expect(within(navbar).getByRole('heading', { name: 'Title of the website' })).toHaveTextContent(
      'The marketplace'
    )
    expect(within(navbar).getByRole('link', { name: 'Link to the login page' })).toBeVisible()

    // Should be invisible
    expect(within(navbar).queryByRole('link', { name: 'Link to the cart' })).not.toBeInTheDocument()
    expect(
      within(navbar).queryByRole('status', { name: '0 items in the cart' })
    ).not.toBeInTheDocument()
  })
  it('renders all the buttons when there are items in cart', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        },
        {
          id: '2',
          listing_title: 'The react Logo number 2',
          listing_description: 'This item is very much an item as well',
          listing_price: 99,
          listing_quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Sports'
        }
      ],
      quantity: [
        { id: '1', quantity: 1 },
        { id: '2', quantity: 1 }
      ]
    }
    render(<NavBar />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    const navbar = screen.getByRole('banner', { name: 'Navigation bar' })

    expect(navbar).toBeInTheDocument()
    expect(
      within(navbar).getByRole('link', { name: 'Navigation bar title link' })
    ).toBeInTheDocument()
    expect(within(navbar).getByRole('heading', { name: 'Title of the website' })).toBeVisible()
    expect(within(navbar).getByRole('heading', { name: 'Title of the website' })).toHaveTextContent(
      'The marketplace'
    )
    expect(within(navbar).getByRole('link', { name: 'Link to the login page' })).toBeInTheDocument()
    expect(within(navbar).getByRole('link', { name: 'Link to the cart' })).toBeInTheDocument()
    expect(within(navbar).getByRole('status', { name: '2 items in the cart' })).toBeVisible()
    expect(
      within(navbar).getByRole('status', { name: '2 items in the cart' })
    ).not.toHaveTextContent('1')
    expect(within(navbar).getByRole('status', { name: '2 items in the cart' })).toHaveTextContent(
      '2'
    )
  })
})
