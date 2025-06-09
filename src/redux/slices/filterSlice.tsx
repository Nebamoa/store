import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    SUCCES = 'succes',
    ERROR = 'error',
    COMPLETE = 'complete',
}

export enum CategoryProduct {
    FOOD = 'food',
}

export type SortType = {
    sortProperty: string,
    name: string,
}

interface FilterSliceState {
    categoryId: number,
    currentPage: number,
    sort: SortType,
}


const initialState: FilterSliceState= {
    categoryId: 0,
    currentPage: 1,
    sort: {
        sortProperty: 'name',
        name: 'По названию (А–Я)'
    }
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>){
            state.categoryId = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSort(state, action: PayloadAction<SortType>){
            state.sort = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>){
            state.currentPage = action.payload.currentPage;
            state.categoryId = action.payload.categoryId;
            state.sort = action.payload.sort;
        }
    }
})


export const { setCategoryId, setCurrentPage, setSort, setFilters } = filterSlice.actions

export default filterSlice.reducer
