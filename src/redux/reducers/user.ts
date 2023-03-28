import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  user: string
}

const initialState: UserState = {
  user: ''
} as UserState

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<string>) => {
      state.user = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export const userReducer = userSlice.reducer
