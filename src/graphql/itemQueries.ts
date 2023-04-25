import { gql } from '@apollo/client'

export const GET_ITEMS = gql`
  query allItems {
    allItems {
      id
      listing_title
      listing_description
      listing_price
      listing_image
      listing_category
      listing_quantity
    }
  }
`

export const ADD_ITEM = gql`
  mutation addItem(
    $listing_title: String!
    $listing_description: String!
    $listing_price: Float!
    $listing_image: String!
    $listing_category: Categories!
    $listing_quantity: Int!
  ) {
    addItem(
      listing_title: $listing_title
      listing_description: $listing_description
      listing_price: $listing_price
      listing_image: $listing_image
      listing_category: $listing_category
      listing_quantity: $listing_quantity
    ) {
      id
      listing_title
      listing_description
      listing_price
      listing_image
      listing_category
      listing_quantity
    }
  }
`

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`

export const GET_ITEM = gql`
  query getItem($id: ID!) {
    item(id: $id) {
      id
      listing_title
      listing_description
      listing_price
      listing_image
      listing_category
      listing_quantity
    }
  }
`
