import React from "react";
import { ProductItem } from "../../redux/slices/productSlice";
import { addItem, minusItem, removeItem } from "../../redux/slices/cartSlice";

import style from "./Cart.module.scss";
import { useAppDispatch } from "../../hooks";

type CartItemProps = {
  item: ProductItem;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.cart__form}>
      <div className={style.cart__info}>
        <b>{item.name}</b>
        <b>{item.count}</b>
        <b>{(item.count * item.price).toFixed(2)}</b>
      </div>

      <div className={style.cart__buttons}>
        <button
          className={style.cart__button_plus}
          onClick={() => dispatch(addItem(item))}
        >
          +
        </button>
        <button
          className={
            item.count > 1
              ? `${style.cart__button_minus}`
              : `${style.cart__button_minus__disabled}`
          }
          onClick={() => dispatch(minusItem(item.id))}
        >
          -
        </button>
        <button
          className={style.cart__button_remove}
          onClick={() => dispatch(removeItem(item.id))}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;
