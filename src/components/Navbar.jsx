import React, { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../App';
import '../styles/navbar.css'

const Navbar = () => {

  const [categories, setCategories] = useState([]);

  const {category, setCategory} = useContext(StoreContext);

  const fetchCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(response => {
        return response.json()
      })
      .then(data => {
        data.unshift("all");
        setCategories(data)
      })
  }

  const handleClick = (e) => {
    setCategory(e.target.getAttribute('value'));
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className='navbar'>
       <ul>
        { categories.length > 0 ? (
            categories.map(el => {
              return (<li key={el} value={el} className={el === category ? "active" : ""} onClick={handleClick} >{el}</li>)
            })
          ) : ''
        }
        </ul> 
    </div>
  )
}

export default Navbar