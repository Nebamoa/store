import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ProductItem} from './productSlice'

interface CartSliceState {
    totalPrice: number;
    items: ProductItem[],
}
const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ProductItem>) {
            const findItem = state.items.find((obj: ProductItem) => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            }
            else {
                state.items.push({ ...action.payload, count: 1, }) }
        },
        minusItem(state, action: PayloadAction<number>){
            const findItem = state.items.find((obj: ProductItem) => obj.id === action.payload)
                if (findItem && findItem.count > 1) {
                findItem.count -= 1
            }            
        },
        removeItem(state, action: PayloadAction<number>) {
            const findItem = state.items.find((obj: ProductItem) => obj.id === action.payload)
            state.items = state.items.filter(obj => obj.id !== action.payload);



        }
    }
})

export const { addItem, minusItem, removeItem } = cartSlice.actions; 
export default cartSlice.reducer;