import '../styles/header.css'
import React, { useContext } from 'react'
import {LuShoppingBag} from 'react-icons/lu'
import { StoreContext } from '../App';

const Header = () => {
  const {cart} = useContext(StoreContext);

  return (
      <header>
        E-Commerce Store
        <div className='cart-button'>
          <LuShoppingBag/>
          {
            cart.length > 0 ? <span>{cart.length}</span> : ''
          }
        </div>
      </header>
  )
}

export default Header