import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Item } from '../../types'

export interface AllItemsState {
  items: Item[]
}

const initialState: AllItemsState = {
  items: []
} as AllItemsState

export const allItemsSlice = createSlice({
  name: 'allItems',
  initialState,
  reducers: {
    setItems: (state: AllItemsState, action: PayloadAction<Item[]>) => {
      state.items = action.payload
    }
  }
})

export const { setItems } = allItemsSlice.actions
export const allItemsReducer = allItemsSlice.reducer
