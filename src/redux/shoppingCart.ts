import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item } from '../types'

export interface ShoppingCartState {
  items: Item[]
}

const initialState: ShoppingCartState = {
  items: []
}

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action: PayloadAction<Item['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<Item['id']>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity++
      }
    },
    decreaseQuantity: (state, action: PayloadAction<Item['id']>) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity--
      }
    }
  }
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = shoppingCartSlice.actions
export const shoppingCartReducer = shoppingCartSlice.reducer
