import { describe, expect } from 'vitest'

import { screen } from '@testing-library/react'

import OrderTableRow from '../../../Orders/OrderTableRow'
import { Order } from '../../../types'
import { render } from '../../../utils/test-utils.js'

const mockOrder: Order = {
  id: '1',
  createdAt: 1695478268000,
  orderItems: [],
  paymentResult: {
    paymentStatus: 'Paid',
    id: '123',
    paymentTime: '1695478268000'
  },
  totalPrice: 100,
  user: '',
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: ''
  },
  paymentMethod: ''
}

describe('OrderTableRow', () => {
  it('renders the order details', () => {
    render(<OrderTableRow order={mockOrder} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('23/09/2023')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('100 €')).toBeInTheDocument()
  })
})
