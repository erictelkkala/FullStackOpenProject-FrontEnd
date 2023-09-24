import { describe, expect, it } from 'vitest'

import { fireEvent, screen } from '@testing-library/react'

import CartItem from '../../../Cart/CartItem'
import { ShoppingCartState } from '../../../redux/reducers/shoppingCart'
import { Categories } from '../../../types'
import { render } from '../../../utils/test-utils'

describe('CartItem', () => {
  const initialCart: ShoppingCartState = {
    items: [
      {
        id: '1',
        listing_title: 'Cart item title',
        listing_description: 'This item is very much an item',
        listing_price: 100,
        listing_quantity: 0,
        listing_image: 'src\\assets\\react.svg',
        listing_category: Categories.Other
      }
    ],
    quantity: [{ id: '1', quantity: 1 }]
  }

  it('renders the cart item', () => {
    render(<CartItem {...initialCart.items[0]} />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    // Information about the item itself
    expect(screen.getByRole('heading', { name: 'Name of the item' })).toHaveTextContent(
      'Cart item title'
    )
    expect(screen.getByRole('img', { name: 'Image of the item' })).toHaveAttribute(
      'src',
      'src\\assets\\react.svg'
    )
    expect(screen.getByRole('heading', { name: 'Price of the item' })).toHaveTextContent('100 €')
    // Quantity of the item in the cart
    expect(
      screen.getByRole('heading', { name: 'Quantity of the item in the cart' })
    ).toHaveTextContent('1')
  })

  it('opens a dialog for deleting the item', () => {
    render(<CartItem {...initialCart.items[0]} />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    // Click the delete button
    fireEvent.click(screen.getByRole('button', { name: 'Delete item from the cart' }))
    // See that the alert dialog opens
    expect(screen.getByRole('dialog', { name: 'Alert dialog' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Delete item?' })).toHaveTextContent('Delete item?')
    expect(screen.getByRole('button', { name: 'Cancel button for deletion' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm button for deletion' })).toBeInTheDocument()
  })
  it('closes the dialog window when cancelling the deletion', () => {
    render(<CartItem {...initialCart.items[0]} />, {
      preloadedState: {
        shoppingCart: initialCart
      }
    })

    // Click the delete button
    fireEvent.click(screen.getByRole('button', { name: 'Delete item from the cart' }))
    // See that the alert dialog opens
    expect(screen.getByRole('dialog', { name: 'Alert dialog' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Delete item?' })).toHaveTextContent('Delete item?')
    expect(screen.getByRole('button', { name: 'Cancel button for deletion' })).toBeInTheDocument()
    // Click the cancel button
    fireEvent.click(screen.getByRole('button', { name: 'Cancel button for deletion' }))
    expect(screen.queryByRole('dialog', { name: 'Alert dialog' })).not.toBeInTheDocument()
  })
})
