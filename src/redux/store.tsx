import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import product from './slices/productSlice'
import cart from './slices/cartSlice'

import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        filter,
        product,
        cart,
    },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>()