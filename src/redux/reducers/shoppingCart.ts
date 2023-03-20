import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item } from '../../types'

export interface ShoppingCartState {
  items: Item[]
}

const initialState: ShoppingCartState = {
  items: []
} as ShoppingCartState

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state: ShoppingCartState, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state: ShoppingCartState, action: PayloadAction<Item['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    increaseQuantity: (state: ShoppingCartState, action: PayloadAction<Item['id']>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state: ShoppingCartState, action: PayloadAction<Item['id']>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity -= 1
      }
    }
  }
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = shoppingCartSlice.actions
export const shoppingCartReducer = shoppingCartSlice.reducer
