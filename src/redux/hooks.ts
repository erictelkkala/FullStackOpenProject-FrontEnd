import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useCartItems = () => {
  return useAppSelector((state) => state.shoppingCart.items)
}

export const useCartQuantity = () => {
  return useAppSelector((state) => state.shoppingCart.quantity)
}

export const useError = () => {
  return useAppSelector((state) => state.error.errorMessage)
}
