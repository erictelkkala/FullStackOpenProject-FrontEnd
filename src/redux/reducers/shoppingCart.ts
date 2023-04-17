import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartQuantity, Item } from '../../types'

export interface ShoppingCartState {
  items: Item[]
  quantity: CartQuantity[]
}

interface AddItemAction {
  type: string
  payload: Item[]
}

const initialState: ShoppingCartState = {
  items: [],
  quantity: []
} as ShoppingCartState

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state: ShoppingCartState, action: AddItemAction) => {
      // For each item in the payload
      action.payload.forEach((item: Item) => {
        // check if it is already in the cart
        if (!state.items.find((cartItem) => cartItem.id === item.id)) {
          state.items.push(item)
          state.quantity.push({ id: item.id, quantity: 1 })
          // Else increase the quantity of the item
        } else {
          const cartItem = state.quantity.find((cartItem) => cartItem.id === item.id)
          if (cartItem) {
            cartItem.quantity += 1
          }
        }
      })
    },
    removeItem: (state: ShoppingCartState, action: PayloadAction<Item['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.quantity = state.quantity.filter((item) => item.id !== action.payload)
    },
    increaseQuantity: (state: ShoppingCartState, action: PayloadAction<Item['id']>) => {
      const item = state.quantity.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state: ShoppingCartState, action: PayloadAction<Item['id']>) => {
      const item = state.quantity.find((item) => item.id === action.payload)
      if (item) {
        item.quantity -= 1
      }
    }
  }
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = shoppingCartSlice.actions
export const shoppingCartReducer = shoppingCartSlice.reducer
