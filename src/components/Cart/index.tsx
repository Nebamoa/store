import React, { useState } from 'react'
import CartItem from '../CartItem'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { ProductItem } from '../../redux/slices/productSlice'
import style from './Cart.module.scss'
import cart from '../../assets/cart.svg'


const Cart:React.FC = () => {
  const [isCartVisible, setCartVisible] = useState<boolean>(false)
      const { items } = useSelector((state: RootState) => state.cart)
      const totalPrice = items.reduce((acc: number, item: ProductItem)=> {
          return acc + (item.count * item.price)
      }, 0)
  return (
    <div className={!isCartVisible ? 'cart' : 'cart_active'}>
      <button className='cart__button' onClick={()=> {setCartVisible(!isCartVisible)}}>
        <img className='cart__img' src={cart} alt="" />
      
      </button>

      <aside className={'cart__content'}>

        <h1>Корзина</h1>
          { items.map((item: ProductItem) => (
          <CartItem item={item} />
          ))}
        <div className='cart__content__cost'>Общая цена:
        {
          totalPrice.toFixed(2)
        }
        
      </div>
      <button className='cart__content__buy'>Заказать</button>
      </aside> 
    </div>
  )
}

export default Cart
