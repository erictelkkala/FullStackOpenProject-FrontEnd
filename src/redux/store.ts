import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'

import { shoppingCartReducer } from './shoppingCart'

// Create the root reducer separately, so we can extract the RootState type
const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
