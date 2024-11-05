import { useState } from "react";
import Product from "./component/Product"
import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import About from "./component/About";


function App() {

  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  }


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Product cartCount={cartCount} handleAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>

    </>
  )
}

export default App