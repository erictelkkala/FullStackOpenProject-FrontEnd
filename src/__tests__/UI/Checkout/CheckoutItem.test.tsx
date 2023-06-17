import { describe } from 'vitest'

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
    expect(
      screen.getByRole('heading', { name: 'Quantity and price of the item' })
    ).toHaveTextContent('1 x 100 €')
  })
})
