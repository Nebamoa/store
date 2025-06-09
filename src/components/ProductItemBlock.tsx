import React from 'react'
import { ProductItem } from '../redux/slices/productSlice'
import { categories } from './Categories'


type ProductItemBlockProps = {
  ProductItem: ProductItem,
  addCartItem: (item: ProductItem) => void,
}

const ProductItemBlock: React.FC<ProductItemBlockProps> = ({ProductItem, addCartItem }) => {
  
  return (
    <div className='content__item'>
    <h4 className='content__name'>{ProductItem.name}</h4>
    <h4 className='content__name'>{categories[ProductItem.category]}</h4>
    <h4 className='content__name'>{ProductItem.price}</h4>


        <button className='content__button' onClick={() => {

          addCartItem(ProductItem)}
          } >Добавить</button>

    </div>
  )
}

export default ProductItemBlock
