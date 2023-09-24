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
      orderItems {
        item {
          id
          listing_category
          listing_description
          listing_image
          listing_price
          listing_quantity
          listing_title
        }
        quantity
      }
      totalPrice
      paymentMethod
      shippingAddress {
        city
        address
        country
        postalCode
      }
    }
  }
`

export const GET_ALL_ORDERS_BY_USER = gql`
  query getAllOrdersByUser {
    getAllOrdersByUser {
      id
      orderItems {
        item {
          id
          listing_title
          listing_description
          listing_price
          listing_image
          listing_category
          listing_quantity
        }
        quantity
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
        postalCode
        country
      }
      totalPrice
      user
      createdAt
    }
  }
`
