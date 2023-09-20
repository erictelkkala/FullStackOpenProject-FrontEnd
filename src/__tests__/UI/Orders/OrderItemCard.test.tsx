import { render, screen } from '@testing-library/react'

import OrderItemCard from '../../../Orders/OrderItemCard'
import { Categories, OrderItem } from '../../../types'

const orderItem: OrderItem = {
  item: {
    id: '1',
    listing_title: 'Item 1',
    listing_price: 10,
    listing_image: 'https://example.com/item1.jpg',
    listing_quantity: 0,
    listing_description: '',
    listing_category: Categories.Electronics
  },
  quantity: 2
}

describe('OrderItemCard', () => {
  it('renders item details', () => {
    render(<OrderItemCard orderItem={orderItem} />)

    const itemName = screen.getByLabelText('Name of the item')
    expect(itemName).toHaveTextContent('Item 1')

    const itemQuantity = screen.getByLabelText('Quantity and the price of the item')
    expect(itemQuantity).toHaveTextContent('2 x 10 €')
  })

  it('renders item image', () => {
    render(<OrderItemCard orderItem={orderItem} />)

    const itemImage = screen.getByAltText('Image of Item 1')
    expect(itemImage).toHaveAttribute('src', 'https://example.com/item1.jpg')
  })
})
