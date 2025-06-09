import React from 'react'
import '../scss/app.scss'
import { Categories } from '../components/Categories'
import { RootState, useAppDispatch } from '../redux/store';
import { fetchProducts, ProductItem } from '../redux/slices/productSlice';
import { useSelector } from 'react-redux';
import ProductItemBlock from '../components/ProductItemBlock';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Pagination from '../components/Pagination';
import { addItem } from '../redux/slices/cartSlice'
import Cart from '../components/Cart';
import Sort from '../components/Sort';
import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';
import { SortTypes } from './../components/Sort/index';



export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { items, length } = useSelector((state: RootState) => state.product)
    const { categoryId, currentPage, sort  } = useSelector((state: RootState) => state.filter)
    


    React.useEffect(() => {
      if (window.location.search)
      {
        const params = QueryString.parse(window.location.search.slice(1,))
        const sort = SortTypes.find(el => el.sortProperty === params.sortProperty)
        dispatch(setFilters({
          currentPage: Number(params.currentPage),
          categoryId: Number(params.categoryId),
          sort: sort || SortTypes[0],
      }))
     }
    }, [])

    const onClickCategory = React.useCallback((id: number) =>{
      dispatch(setCategoryId(id))
    }, []);
    const refreshCurrentPage = React.useCallback((i: number) => {
      dispatch(setCurrentPage(i))
    }, []);
    
    React.useEffect(() => {
      if (isMounted.current) {
        const queryString = QueryString.stringify({
          categoryId, 
          currentPage, 
          sortProperty: sort.sortProperty})
          navigate(`?${queryString}`)
      }
    isMounted.current = true;
    }, [categoryId, currentPage, sort])



    const getProducts = async () => {
      dispatch(fetchProducts({categoryId, currentPage, sort}))
    };
    React.useEffect(() => {
      window.scrollTo(0, 0);
      if (!isSearch.current) {
        getProducts();
      };
      isSearch.current = false;
    }, [categoryId, currentPage, sort]);
    const addCartItem = (item: ProductItem)=>{
      dispatch(addItem(item))
    };
    React.useEffect(() => {
      
    });
  const products = () => {

    return items.map((item: any)=> <ProductItemBlock addCartItem={addCartItem} key={item.id} ProductItem = {item}/>)
  }
  const handlePageClick = (i: number) => {
    dispatch(setCurrentPage(i))
  }
  return (
    <div className="container">
      <div className='nav'>
        <Categories refreshCurrentPage={refreshCurrentPage} setValue={onClickCategory} value={categoryId} />
        <Sort />
      </div>
        <div className='content'>{products()}</div>
        <Pagination currentPage={currentPage} length={length} handlePageClick={handlePageClick} />
        <Cart />
    </div>
  )
}
