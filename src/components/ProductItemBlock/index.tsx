import React from "react";
import { ProductItem } from "../../redux/slices/productSlice";
import { categories } from "../Categories/Categories";
import style from "./ProductItemBlock.module.scss";
import { addItem } from "../../redux/slices/cartSlice";
import { useAppDispatch } from "../../hooks";

type ProductItemBlockProps = {
  productItem: ProductItem;
};

const ProductItemBlock: React.FC<ProductItemBlockProps> = ({ productItem }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.content__item}>
      <h4 className={style.content__name}>{productItem.name}</h4>
      <h4 className={style.content__name}>
        {categories[productItem.category]}
      </h4>
      <h4 className={style.content__name}>{productItem.price}</h4>

      <button
        className={style.content__button}
        onClick={() => {
          dispatch(addItem(productItem));
        }}
      >
        Добавить
      </button>
    </div>
  );
};

export default ProductItemBlock;
