import axios from "axios"
import { SearchProductParams } from "../redux/slices/productSlice";


export const api = {
  getCategoryProducts({categoryId, currentPage, sort}: SearchProductParams) {
    if (categoryId === 0)
    {
      return instance.get(`?_page=${currentPage}&_per_page=6&_sort=${sort.sortProperty}`) 
    }
    return instance.get(`?category=${categoryId}&_page=${currentPage}&_per_page=6&_sort=${sort.sortProperty}`)
  }
}

const instance = axios.create({
    baseURL: 'http://localhost:3001/products',
});