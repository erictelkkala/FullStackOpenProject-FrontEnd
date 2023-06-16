import { gql } from '@apollo/client'

export const ADD_ORDER = gql`
  mutation addOrder(
    $user: String!
    $orderItems: [OrderItemInput!]!
    $shippingAddress: ShippingAddressInput!
    $paymentMethod: String!
    $paymentResult: PaymentResultInput!
    $totalPrice: Float!
  ) {
    addOrder(
      user: $user
      orderItems: $orderItems
      shippingAddress: $shippingAddress
      paymentMethod: $paymentMethod
      paymentResult: $paymentResult
      totalPrice: $totalPrice
    )
  }
`
