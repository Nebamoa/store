import React, { useState } from "react";
import CartItem from "./CartItem";
import { ProductItem } from "../../redux/slices/productSlice";
import style from "./Cart.module.scss";
import cart from "../../assets/cart.svg";
import { useAppSelector } from "../../hooks";

const Cart: React.FC = () => {
  const [isCartVisible, setCartVisible] = useState<boolean>(false);
  const { items } = useAppSelector((state) => state.cart);
  const totalPrice = items.reduce((acc: number, item: ProductItem) => {
    return acc + item.count * item.price;
  }, 0);
  return (
    <div className={!isCartVisible ? style.cart : style.cart_active}>
      <button
        className={style.cart__button}
        onClick={() => {
          setCartVisible(!isCartVisible);
        }}
      >
        <img className={style.cart__img} src={cart} alt="" />
      </button>

      <aside className={style.cart__content}>
        <h1>Корзина</h1>
        {items.map((item: ProductItem) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className={style.cart__content__cost}>
          Общая цена:
          {totalPrice.toFixed(2)}
        </div>
        <button className={style.cart__content__buy}>Заказать</button>
      </aside>
    </div>
  );
};

export default Cart;
