import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProductListing from './components/ProductListing';
import { createContext, useState } from 'react';

export const StoreContext = createContext({
  category: 'all',
  setCategory: () => {},
  cart: [],
  setCart: () => {}
});

function App() {

  const [category, setCategory] = useState("all"); 
  const [cart, setCart] = useState([]); 
  const data = {category, setCategory, cart, setCart};

  return (

    <StoreContext.Provider value={data}>
      <div className="App">
        <Header/>
        <main>
          <Navbar/>
          <ProductListing/>
        </main>
      </div>
    </StoreContext.Provider>

  );
}

export default App;
