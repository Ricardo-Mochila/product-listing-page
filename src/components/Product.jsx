import React, {useContext} from 'react'
import '../styles/products.css'
import { StoreContext } from '../App';

export const ProductSkeleton = () => {
  return (
    <div className='product skeleton'>
      <div className='image'></div>
      <div className='product-info'>
        <p className='category'>category</p>
        <p className='title'>title</p>
        <p className='price'>$00</p>
      </div>
      <div className="button">Add to Cart</div>
    </div>
  )
}

export const Product = ({info}) => {

  const {cart, setCart} = useContext(StoreContext);

  const addToCart = () => {
    const data = [...cart];
    data.push(info)
    setCart(data)
  }

  return (
    <div className='product'>
      <img src={info.image} alt={info.title} />
      <div className='product-info'>
        <p className='category'>{info.category}</p>
        <p className='title'>{info.title}</p>
        <p className='price'>${info.price}</p>
      </div>
      <button onClick={addToCart}><span>Add to Cart</span></button>
    </div>
  )
}