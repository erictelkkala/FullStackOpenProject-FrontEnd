import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartQuantity, Item } from '../../types'

export interface ShoppingCartState {
  items: Item[]
  quantity: CartQuantity[]
}

const initialState: ShoppingCartState = {
  items: [],
  quantity: []
} as ShoppingCartState

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state: ShoppingCartState, action) => {
      state.items.push(action.payload)
      state.quantity.push({ id: action.payload.id, quantity: 1 })
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
