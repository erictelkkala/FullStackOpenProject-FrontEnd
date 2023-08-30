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

export const GET_ORDER_BY_ID = gql`
  query getOrderById($id: ID!) {
    getOrder(id: $id) {
      id
      orderItems {
        _id
        listing_category
        listing_description
        listing_image
        listing_price
        listing_quantity
        listing_title
      }
      paymentMethod
      paymentResult {
        id
        paymentStatus
        paymentTime
      }
      shippingAddress {
        address
        city
        country
        postalCode
      }
      totalPrice
      user
    }
  }
`

export const GET_ALL_ORDERS_BY_USER = gql`
  query getAllOrdersByUser {
    getAllOrdersByUser {
      id
      orderItems {
        id
        listing_category
        listing_description
        listing_image
        listing_price
        listing_quantity
        listing_title
      }
      paymentMethod
      paymentResult {
        id
        paymentStatus
        paymentTime
      }
      shippingAddress {
        address
        city
        country
        postalCode
      }
      totalPrice
      user
    }
  }
`
