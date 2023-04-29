import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'

import { errorReducer } from './reducers/errors'
import { allItemsReducer } from './reducers/items'
import { shoppingCartReducer } from './reducers/shoppingCart'
import { userReducer } from './reducers/user'

// Create the root reducer separately, so we can extract the RootState type
const rootReducer = combineReducers({
  shoppingCart: shoppingCartReducer,
  allItems: allItemsReducer,
  user: userReducer,
  error: errorReducer
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
