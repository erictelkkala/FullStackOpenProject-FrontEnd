import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { shoppingCartReducer } from './shoppingCart'

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
