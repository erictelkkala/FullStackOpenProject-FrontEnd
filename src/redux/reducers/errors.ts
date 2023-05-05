import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  errorMessage: string
}

const initialState: ErrorState = {
  errorMessage: ''
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state: ErrorState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    }
  }
})

export const { setError } = errorSlice.actions
export const errorReducer = errorSlice.reducer
