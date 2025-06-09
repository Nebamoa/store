import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { SortType } from "./filterSlice";



export const fetchProducts = createAsyncThunk<ProductItem[], SearchProductParams>(
    'products/fetchProducts',
    async (params, thunkAPI) => {
        const { categoryId, currentPage, sort } = params;
        const { data } = await api.getCategoryProducts({categoryId, currentPage, sort})
        if (data.data) {
            thunkAPI.dispatch(setLength(data.items))
            return data.data
        }
        thunkAPI.dispatch(setLength(data.length))
        return data;
    }
)

export type SearchProductParams = {
    categoryId: number,
    currentPage: number,
    sort: SortType,
}
export type ProductItem = {
    id: number;
    name: string;
    category: number;
    price: number;
    count: number;
}

interface ProductSliceState {
    items: ProductItem[],
    length: number,
}

const initialState: ProductSliceState = {
    items: [],
    length: 0,
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {   
        setLength(state, action: PayloadAction<number>) {
            state.length = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action)=> {
            state.items = action.payload;

        })
    }
})

const {setLength} = productSlice.actions

export default productSlice.reducer;