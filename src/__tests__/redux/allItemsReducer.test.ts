import { describe, expect, it } from 'vitest'

import { allItemsReducer, AllItemsState, setItems } from '../../redux/reducers/items.js'
import { setupStore } from '../../redux/store.js'

describe('ItemReducer', () => {
  it('initial state is empty', () => {
    const state = allItemsReducer(undefined, { type: 'unknown' })
    expect(state).toEqual({ items: [] })
  })

  it('setItems adds an item to the store', async () => {
    const store = setupStore()
    const dispatch = store.dispatch
    const item = {
      id: '1',
      listing_title: 'The react Logo',
      listing_description: 'This item is very much an item',
      listing_price: 100,
      listing_quantity: 0,
      listing_image: 'src\\assets\\react.svg',
      listing_category: 'Other'
    }

    // Dispatch the action
    dispatch(setItems([item]))
    // Get the state
    const state: AllItemsState = store.getState().allItems
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
      ]
    })
  })

  // Do the same for multiple items
  it('setItems adds multiple items to the store', async () => {
    const store = setupStore()
    const dispatch = store.dispatch
    const items = [
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

    dispatch(setItems(items))
    const state: AllItemsState = store.getState().allItems
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
      ]
    })
  })
})
