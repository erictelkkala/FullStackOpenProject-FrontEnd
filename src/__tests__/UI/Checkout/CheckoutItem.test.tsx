import { describe, it } from 'vitest'

import { screen } from '@testing-library/react'

import CheckoutItem from '../../../Checkout/CheckoutItem'
import { Categories, Item } from '../../../types'
import { render } from '../../../utils/test-utils'

describe('CheckoutItem', () => {
  const item: Item = {
    id: '1',
    listing_title: 'Cart item title',
    listing_description: 'This item is very much an item',
    listing_price: 100,
    listing_quantity: 0,
    listing_image: 'src\\assets\\react.svg',
    listing_category: Categories.Other
  }

  it('renders the item', () => {
    render(<CheckoutItem {...item} />, {
      preloadedState: {
        shoppingCart: {
          items: [item],
          quantity: [{ id: '1', quantity: 1 }]
        }
      }
    })

    expect(screen.getByRole('heading', { name: 'Name of the item' })).toHaveTextContent(
      'Cart item title'
    )
    expect(screen.getByRole('img', { name: 'Image of the item' })).toHaveAttribute(
      'src',
      'src\\assets\\react.svg'
    )
    expect(screen.getByRole('heading', { name: 'Quantity of the item' })).toHaveTextContent('1')
    expect(screen.getByRole('heading', { name: 'x' })).toHaveTextContent('x')
    expect(screen.getByRole('heading', { name: 'Price of the item' })).toHaveTextContent('100 €')
  })

  it('renders the item with another quantity than 1', () => {
    render(<CheckoutItem {...item} />, {
      preloadedState: {
        shoppingCart: {
          items: [item],
          quantity: [{ id: '1', quantity: 2 }]
        }
      }
    })

    expect(screen.getByRole('heading', { name: 'Name of the item' })).toHaveTextContent(
      'Cart item title'
    )
    // Text content shouldn't be 1 x 100 €, but 2 x 100 €
    expect(screen.getByRole('heading', { name: 'Quantity of the item' })).not.toHaveTextContent('1')
    expect(screen.getByRole('heading', { name: 'x' })).toHaveTextContent('x')
    expect(screen.getByRole('heading', { name: 'Quantity of the item' })).toHaveTextContent('2')
  })

  it('renders the quantity with an error color if the quantity is 0', () => {
    render(<CheckoutItem {...item} />, {
      preloadedState: {
        shoppingCart: {
          items: [item],
          quantity: [{ id: '1', quantity: 0 }]
        }
      }
    })

    expect(screen.getByRole('heading', { name: 'Name of the item' })).toHaveTextContent(
      'Cart item title'
    )
    expect(screen.getByRole('heading', { name: 'Quantity of the item' })).toHaveTextContent('0')
    expect(screen.getByRole('heading', { name: 'x' })).toHaveTextContent('x')
    expect(screen.getByRole('heading', { name: 'Price of the item' })).toHaveTextContent('100 €')
    // The color of the quantity should be error
    expect(screen.getByRole('heading', { name: 'Quantity of the item' })).toHaveStyle({
      color: 'rgb(244, 67, 54)'
    })
  })
})
