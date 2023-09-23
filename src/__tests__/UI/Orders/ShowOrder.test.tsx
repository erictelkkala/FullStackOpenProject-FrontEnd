import { MockedProvider } from '@apollo/client/testing'
import { screen } from '@testing-library/react'

import { GET_ORDER_BY_ID } from '../../../graphql/orderQueries'
import ShowOrder from '../../../Orders/ShowOrder'
import { render } from '../../../utils/test-utils.js'

const mocks = [
  {
    request: {
      query: GET_ORDER_BY_ID
    },
    result: {
      data: {
        getOrder: {
          orderItems: [
            {
              item: {
                id: '123',
                listing_category: 'Electronics',
                listing_description: 'Test description',
                listing_image: 'https://picsum.photos/200',
                listing_price: 100,
                listing_quantity: 10,
                listing_title: 'Item 1'
              },
              quantity: 1
            },
            {
              item: {
                id: '123',
                listing_category: 'Electronics',
                listing_description: 'Test description',
                listing_image: 'https://picsum.photos/200',
                listing_price: 100,
                listing_quantity: 10,
                listing_title: 'Item 2'
              },
              quantity: 1
            }
          ],
          totalPrice: 200,
          paymentMethod: 'Credit/Debit',
          shippingAddress: {
            address: '123 Main St',
            city: 'Anytown',
            postalCode: '12345',
            country: 'USA'
          }
        }
      }
    }
  }
]

describe('ShowOrder', () => {
  it('renders order items', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ShowOrder />
      </MockedProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    const orderItem1 = await screen.findByText('Item 1')
    expect(orderItem1).toBeInTheDocument()

    const orderItem2 = await screen.findByText('Item 2')
    expect(orderItem2).toBeInTheDocument()
  })

  it('renders total price and payment method', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ShowOrder />
      </MockedProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    const totalPrice = await screen.findByText('Total: 200 €')
    expect(totalPrice).toBeInTheDocument()

    const paymentMethod = await screen.findByText('Payment method: Credit/Debit')
    expect(paymentMethod).toBeInTheDocument()
  })

  it('renders shipping address', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ShowOrder />
      </MockedProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    expect(await screen.findByLabelText('Payment details')).toBeInTheDocument()
    expect(await screen.findByLabelText('Payment method')).toHaveTextContent(
      'Payment method: Credit/Debit'
    )
    expect(await screen.findByLabelText('Shipping address')).toHaveTextContent(
      'Shipping address: 123 Main St, Anytown, 12345, USA'
    )
  })
})
