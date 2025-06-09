import React from 'react'
import { ProductItem } from '../redux/slices/productSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'


import { addItem, minusItem, removeItem } from '../redux/slices/cartSlice'
import { useDispatch } from 'react-redux'

type CartItemProps = {
    item: ProductItem,
}


const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch()
  return (
    <div className='cart__form'>
      <div className='cart__info'>
        <b>{item.name}</b> 
        <b>{item.count}</b>
        <b>{(item.count * item.price).toFixed(2)}</b>
      </div>

      

      
      <div className='cart__buttons'>
        <button className='cart__button-plus' onClick={()=> dispatch(addItem(item))}>+</button>
        <button className={ item.count > 1 ? `cart__button-minus` : `cart__button-minus--disabled`} onClick={()=> dispatch(minusItem(item.id))}>-</button>
        <button className='cart__button-remove' onClick={()=> dispatch(removeItem(item.id))}>Удалить</button>
    
      </div>
</div>
  )
}

export default CartItem
