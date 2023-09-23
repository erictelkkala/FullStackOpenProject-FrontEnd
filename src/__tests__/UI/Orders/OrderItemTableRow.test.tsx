import { render, screen } from '@testing-library/react'

import OrderItemTableRow from '../../../Orders/OrderItemTableRow'
import { Categories, OrderItem } from '../../../types'

const orderItem: OrderItem = {
  id: '1',
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
  it('renders the order item details', () => {
    render(<OrderItemTableRow orderItem={orderItem} />)

    expect(screen.getByText('Item 1')).toBeInTheDocument()
    // Quantity
    expect(screen.getByText('2')).toBeInTheDocument()
    // Unit price
    expect(screen.getByText('10')).toBeInTheDocument()
    // Total price
    expect(screen.getByText('20 €')).toBeInTheDocument()
  })
})
