import {Product, ProductSkeleton} from './Product';
import '../styles/product-listing.css';
import React, { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../App';

const ProductListing = () => {

  const productStep = 6;
  const productLoading = [];

  for(let i = 0; i < productStep; i++) {
    productLoading.push(<ProductSkeleton key={i}/>)
  }

  const {category} = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [limit, setLimit] = useState(productStep);
  const [search, setSearch] = useState('');

  const fetchProducts = () => {
    console.log("update")

    setIsLoading(true);

    let url = `https://fakestoreapi.com/products/category/${category}`;

    if(category === 'all')
      url = `https://fakestoreapi.com/products`

    fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {

      if(search !== "")
        data = data.filter(el => el.title.toLowerCase().includes(search.toLowerCase()))

      data = data.slice(0, limit);

      setProducts(data)
      setIsLoading(false)
    })
    
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
  
      if (scrollTop + clientHeight >= scrollHeight  && !isLoading) {
        setLimit(limit + productStep)
        setShouldUpdate(true);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line 
  }, [isLoading])


  useEffect(() => {
    setLimit(productStep);    
    
    document.querySelector('input').value = "";
    setSearch("");

    setShouldUpdate(true);

  }, [category])

  useEffect(() => {
    setLimit(productStep);
    setShouldUpdate(true);

  }, [search])

  useEffect(() => {
    if(shouldUpdate)
      fetchProducts();

    return setShouldUpdate(false);
    // eslint-disable-next-line 
  }, [shouldUpdate])


  return (
    <div className='plp'>
      <div className='input'>
        <input placeholder='Search' onChange={(e) => setSearch(e.target.value)}></input>
      </div>

      <div className='product-listing'>
        {
          isLoading ? productLoading.map(el => el) : 
            products.length === 0 ? <h2>No products found</h2> : (
              products.map(el => (<Product key={el.id} info={el}/>))
          )
        }

      </div>
    </div>
  )
}

export default ProductListing