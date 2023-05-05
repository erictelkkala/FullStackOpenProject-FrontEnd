import { gql } from '@apollo/client'

export const ADD_ORDER = gql`
  mutation addOrder(
    $user: String!
    $items: [ItemInput!]!
    $shippingAddress: ShippingAddressInput!
    $paymentMethod: String!
    $paymentResult: PaymentResultInput!
    $totalPrice: Float!
  ) {
    addOrder(
      user: $user
      items: $items
      shippingAddress: $shippingAddress
      paymentMethod: $paymentMethod
      paymentResult: $paymentResult
      totalPrice: $totalPrice
    ) {
      id
      user
      items {
        id
        listing_title
        listing_description
        listing_price
        listing_image
        listing_category
        listing_quantity
        quantity
      }
      shippingAddress {
        address
        city
        postalCode
        country
      }
      paymentMethod
      paymentResult {
        id
        paymentStatus
        paymentTime
      }
      totalPrice
    }
  }
`
