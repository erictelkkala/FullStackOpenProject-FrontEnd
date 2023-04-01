import { fireEvent, screen, within } from '@testing-library/react'

import Cart from '../../Cart/Cart.js'
import { render } from '../../utils/test-utils.js'

describe('Cart', () => {
  it('renders the cart page when empty', () => {
    render(<Cart />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('renders the cart page with an item', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ]
    }
    render(<Cart />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })
    expect(screen.getByText('The react Logo')).toBeInTheDocument()
  })

  it('renders the cart page with multiple items', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        },
        {
          id: '2',
          listing_title: 'The react Logo number 2',
          listing_description: 'This item is very much an item as well',
          listing_price: 99,
          quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Sports'
        }
      ]
    }
    render(<Cart />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })
    expect(screen.getByText('The react Logo')).toBeInTheDocument()
    expect(screen.getByText('The react Logo number 2')).toBeInTheDocument()
  })

  it('renders the cart page with multiple items and removes one', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        },
        {
          id: '2',
          listing_title: 'The react Logo number 2',
          listing_description: 'This item is very much an item as well',
          listing_price: 99,
          quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Sports'
        }
      ]
    }
    render(<Cart />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    // Use queryAllByRole, since the item containers are hidden
    const items = screen.queryAllByRole('listitem', { name: 'cart-item' })
    expect(items.length).toBe(2)

    const removeButtons = screen.getAllByRole('button', { name: 'Delete' })

    fireEvent.click(removeButtons[0])

    expect(screen.getByText('Are you sure that you want to delete this item?')).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'item-delete-button-confirm' }))

    expect(screen.queryByText('The react Logo')).not.toBeInTheDocument()
  })

  it('renders the cart page with multiple items and removes one and cancels', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        },
        {
          id: '2',
          listing_title: 'The react Logo number 2',
          listing_description: 'This item is very much an item as well',
          listing_price: 99,
          quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Sports'
        }
      ]
    }
    render(<Cart />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    // Use queryAllByRole, since the item containers are hidden
    const items = screen.queryAllByRole('listitem', { name: 'cart-item' })
    expect(items.length).toBe(2)

    const removeButtons = screen.getAllByRole('button', { name: 'Delete' })

    fireEvent.click(removeButtons[0])

    expect(screen.getByText('Are you sure that you want to delete this item?')).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'item-delete-button-cancel' }))

    expect(screen.getByText('The react Logo')).toBeInTheDocument()
  })

  it('renders the cart page with an item and increments and decrements it', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ]
    }
    render(<Cart />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    const incrementButton = screen.getByRole('button', { name: 'item-quantity-increase' })
    expect(incrementButton).toBeInTheDocument()
    const decrementButton = screen.getByRole('button', { name: 'item-quantity-decrease' })
    expect(decrementButton).toBeInTheDocument()

    const initialQuantity = screen.getByRole('heading', { name: 'item-quantity-count' })
    expect(within(initialQuantity).getByText('1')).toBeVisible()

    fireEvent.click(incrementButton)
    const incrementedQuantity = screen.getByRole('heading', {
      name: 'item-quantity-count'
    })
    expect(within(incrementedQuantity).getByText('2')).toBeVisible()

    fireEvent.click(decrementButton)
    const decrementedQuantity = screen.getByRole('heading', { name: 'item-quantity-count' })
    expect(within(decrementedQuantity).getByText('1')).toBeVisible()
  })
  it('renders the delete dialog when decremented from quantity of 1', () => {
    const initialCart = {
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ]
    }

    render(<Cart />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    const decrementButton = screen.getByRole('button', { name: 'item-quantity-decrease' })
    expect(decrementButton).toBeInTheDocument()

    fireEvent.click(decrementButton)

    expect(screen.getByText('Are you sure that you want to delete this item?')).toBeVisible()
  })
})
