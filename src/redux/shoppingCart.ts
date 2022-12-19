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
    removeItem: (state, action: PayloadAction<Item>) => {
      state.items = state.items.filter((item) => item !== action.payload)
    }
  }
})

export const { addItem, removeItem } = shoppingCartSlice.actions
export const shoppingCartReducer = shoppingCartSlice.reducer
