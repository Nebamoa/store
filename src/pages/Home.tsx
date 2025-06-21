import React from "react";
import { Categories } from "../components/Categories/Categories";
import { fetchProducts, ProductItem } from "../redux/slices/productSlice";
import ProductItemBlock from "../components/ProductItemBlock";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import Pagination from "../components/Pagination";
import Cart from "../components/Cart";
import Sort from "../components/Sort";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";
import { SortTypes } from "./../components/Sort/index";
import style from "../scss/app.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, length } = useAppSelector((state) => state.product);
  const { categoryId, currentPage, sort } = useAppSelector(
    (state) => state.filter,
  );

  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.slice(1));
      const sort = SortTypes.find(
        (el) => el.sortProperty === params.sortProperty,
      );
      dispatch(
        setFilters({
          currentPage: Number(params.currentPage),
          categoryId: Number(params.categoryId),
          sort: sort || SortTypes[0],
        }),
      );
    }
  }, []);

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const refreshCurrentPage = (i: number) => {
    dispatch(setCurrentPage(i));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        categoryId,
        currentPage,
        sortProperty: sort.sortProperty,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sort]);

  const getProducts = async () => {
    dispatch(fetchProducts({ categoryId, currentPage, sort }));
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getProducts();
    }
    isSearch.current = false;
  }, [categoryId, currentPage, sort]);

  React.useEffect(() => {});
  const products = () => {
    return items.map((item: ProductItem) => (
      <ProductItemBlock key={item.id} productItem={item} />
    ));
  };
  const handlePageClick = (i: number) => {
    dispatch(setCurrentPage(i));
  };
  return (
    <div className={style.container}>
      <div>
        <Categories
          refreshCurrentPage={refreshCurrentPage}
          setValue={onClickCategory}
          value={categoryId}
        />
        <Sort />
      </div>
      <div className={style.content}>{products()}</div>
      <Pagination
        currentPage={currentPage}
        length={length}
        handlePageClick={handlePageClick}
      />
      <Cart />
    </div>
  );
};
