import { describe, expect, it } from 'vitest'

import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  shoppingCartReducer,
  ShoppingCartState
} from '../../redux/reducers/shoppingCart'
import { setupStore } from '../../redux/store'
import { Item } from '../../types'

describe('CartReducer', () => {
  it('initial state is empty', () => {
    const state = shoppingCartReducer(undefined, { type: 'unknown' })
    expect(state).toEqual({ items: [], quantity: [] })
  })

  it('addItem adds an item to the store', async () => {
    const store = setupStore()
    const dispatch = store.dispatch
    const item: Item = {
      id: '1',
      listing_title: 'The react Logo',
      listing_description: 'This item is very much an item',
      listing_price: 100,
      listing_quantity: 0,
      listing_image: 'src\\assets\\react.svg',
      listing_category: 'Other'
    }

    dispatch(addItem([item]))
    const state: ShoppingCartState = store.getState().shoppingCart
    expect(state).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [{ id: '1', quantity: 1 }]
    })
  })

  it('addItem adds multiple items to the store', async () => {
    const store = setupStore()
    const dispatch = store.dispatch
    const items: Item[] = [
      {
        id: '1',
        listing_title: 'The react Logo',
        listing_description: 'This item is very much an item',
        listing_price: 100,
        listing_quantity: 0,
        listing_image: 'src\\assets\\react.svg',
        listing_category: 'Other'
      },
      {
        id: '2',
        listing_title: 'The react Logo',
        listing_description: 'This item is very much an item',
        listing_price: 100,
        listing_quantity: 1,
        listing_image: 'src\\assets\\react.svg',
        listing_category: 'Other'
      }
    ]

    dispatch(addItem(items))
    const state: ShoppingCartState = store.getState().shoppingCart
    expect(state).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        },
        {
          id: '2',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 1,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [
        { id: '1', quantity: 1 },
        { id: '2', quantity: 1 }
      ]
    })
  })

  it('removeItem removes an item from the store', async () => {
    const store = setupStore({
      shoppingCart: {
        items: [
          {
            id: '1',
            listing_title: 'The react Logo',
            listing_description: 'This item is very much an item',
            listing_price: 100,
            listing_quantity: 0,
            listing_image: 'src\\assets\\react.svg',
            listing_category: 'Other'
          }
        ],
        quantity: [{ id: '1', quantity: 1 }]
      }
    })

    const dispatch = store.dispatch
    expect(store.getState().shoppingCart).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [{ id: '1', quantity: 1 }]
    })

    // Remove the item
    dispatch(removeItem('1'))
    // Get the state
    const state: ShoppingCartState = store.getState().shoppingCart
    // Check the state
    expect(state).toEqual({ items: [], quantity: [] })
  })

  it('increaseQuantity increases the quantity of an item', async () => {
    const store = setupStore({
      shoppingCart: {
        items: [
          {
            id: '1',
            listing_title: 'The react Logo',
            listing_description: 'This item is very much an item',
            listing_price: 100,
            listing_quantity: 0,
            listing_image: 'src\\assets\\react.svg',
            listing_category: 'Other'
          }
        ],
        quantity: [{ id: '1', quantity: 1 }]
      }
    })

    const dispatch = store.dispatch
    expect(store.getState().shoppingCart).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [{ id: '1', quantity: 1 }]
    })

    // Increase the quantity
    dispatch(increaseQuantity('1'))
    // Get the state
    const state: ShoppingCartState = store.getState().shoppingCart
    // Check the state
    expect(state).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [{ id: '1', quantity: 2 }]
    })
  })

  it('decreaseQuantity decreases the quantity of an item', async () => {
    const store = setupStore({
      shoppingCart: {
        items: [
          {
            id: '1',
            listing_title: 'The react Logo',
            listing_description: 'This item is very much an item',
            listing_price: 100,
            listing_quantity: 0,
            listing_image: 'src\\assets\\react.svg',
            listing_category: 'Other'
          }
        ],
        quantity: [{ id: '1', quantity: 2 }]
      }
    })

    const dispatch = store.dispatch
    expect(store.getState().shoppingCart).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [{ id: '1', quantity: 2 }]
    })

    // Increase the quantity
    dispatch(decreaseQuantity('1'))
    // Get the state
    const state: ShoppingCartState = store.getState().shoppingCart
    // Check the state
    expect(state).toEqual({
      items: [
        {
          id: '1',
          listing_title: 'The react Logo',
          listing_description: 'This item is very much an item',
          listing_price: 100,
          listing_quantity: 0,
          listing_image: 'src\\assets\\react.svg',
          listing_category: 'Other'
        }
      ],
      quantity: [{ id: '1', quantity: 1 }]
    })
  })
})
