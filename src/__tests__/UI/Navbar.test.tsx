import { screen, within } from '@testing-library/react'
import NavBar from '../../NavBar.js'
import { render } from '../../utils/test-utils.js'

describe('Navbar', () => {
  it('renders all the buttons when no items in cart', () => {
    render(<NavBar />)

    const navbar = screen.getByRole('banner', { name: 'navbar' })

    expect(navbar).toBeInTheDocument()
    expect(within(navbar).getByRole('link', { name: 'navbar-title-link' })).toBeInTheDocument()
    expect(within(navbar).getByRole('heading', { name: 'navbar-title-text' })).toBeVisible()
    expect(within(navbar).getByRole('heading', { name: 'navbar-title-text' })).toHaveTextContent(
      'The marketplace'
    )
    expect(within(navbar).getByRole('button', { name: 'user-icon' })).toBeVisible()

    // Should be invisible
    expect(
      within(navbar).queryByRole('button', { name: 'cart-icon-button' })
    ).not.toBeInTheDocument()
    expect(
      within(navbar).queryByRole('status', { name: 'cart-icon-badge' })
    ).not.toBeInTheDocument()
  })
  it('renders all the buttons when there are items in cart', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          name: 'The react Logo',
          description: 'This item is very much an item',
          price: 100,
          quantity: 0,
          image: 'src\\assets\\react.svg',
          category: 'Other'
        },
        {
          id: '2',
          name: 'The react Logo number 2',
          description: 'This item is very much an item as well',
          price: 99,
          quantity: 1,
          image: 'src\\assets\\react.svg',
          category: 'Sports'
        }
      ]
    }
    render(<NavBar />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    const navbar = screen.getByRole('banner', { name: 'navbar' })

    expect(navbar).toBeInTheDocument()
    expect(within(navbar).getByRole('link', { name: 'navbar-title-link' })).toBeInTheDocument()
    expect(within(navbar).getByRole('heading', { name: 'navbar-title-text' })).toBeVisible()
    expect(within(navbar).getByRole('heading', { name: 'navbar-title-text' })).toHaveTextContent(
      'The marketplace'
    )
    expect(within(navbar).getByRole('button', { name: 'user-icon' })).toBeVisible()
    expect(within(navbar).getByRole('button', { name: 'cart-icon-button' })).toBeVisible()
    expect(within(navbar).getByRole('status', { name: 'cart-icon-badge' })).toBeVisible()
    expect(within(navbar).getByRole('status', { name: 'cart-icon-badge' })).not.toHaveTextContent(
      '1'
    )
    expect(within(navbar).getByRole('status', { name: 'cart-icon-badge' })).toHaveTextContent('2')
  })
})
