import React, { useEffect, useState } from 'react'
import Nav from './Nav'; 

function Product() {
    // Define state variables
    const [cartCount, setCartCount] = useState(0); 
    const [products, setProducts] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [cartItems, setCartItems] = useState([]); 
    const [details, setDetails] = useState(false); 
    const [showDetails, setShowDetails] = useState([]); 
    const [showBuyModal, setShowBuyModal] = useState(false); 

    const API_URL = 'https://fakestoreapi.com/products'; 

    
    useEffect(() => {
        async function fetchData() {
           
            const response = await fetch(API_URL);
            const data = await response.json();
            setProducts(data); 
        }
        fetchData(); 
    }, []); 

    
    const handleAddToCart = (product) => {
        
        const isProductInCart = cartItems.some((item) => item.id === product.id);

        if (!isProductInCart) {
           
            setCartCount(cartCount + 1);
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        } else {
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        }
    };

    const handleShowDetails = (product) => {
       
        setDetails(true);
        setShowDetails(product);
    }

    
    const handleModalToggle = () => {
        if (cartItems.length > 0) {
            setShowModal(!showModal); 
        } else {
            alert("Your cart is empty")
        }
    };

    
    const handleModalClose = () => {
        setShowModal(false); 
    };

    
    const handleDeleteItem = (index) => {
        
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart); 
        setCartCount(cartCount - 1); 
    };

    const handleRemoveFromCart = (productId) => {
        const productToRemove = cartItems.find(item => item.id === productId);

        if (productToRemove) {
            
            const updatedCart = cartItems.filter(item => item.id !== productId);

            
            setCartItems(updatedCart);
            setCartCount(cartCount - 1);
        }
    };

   
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

   
    const handleBuy = () => {
        if (cartItems.length > 0) {
            setShowBuyModal(true);
        } else {
            alert("Your cart is empty");
        }
    };

   
    const handleCloseBuyModal = () => {
        setShowBuyModal(false);
    };


    return (
        <div className='relative'>
            {/* Render the Nav component, passing cartCount and handleModalToggle as props */}
            <Nav cartCount={cartCount} handleModalToggle={handleModalToggle} />

            {/* Products grid */}
            <div className='container grid grid-rows-1 grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto px-10'>
                {/* Map over the products array and display each product */}
                {products.map((product, index) => {
                    // Find if the product is in the cart and its quantity
                    const cartItem = cartItems.find(item => item.id === product.id);
                    const quantity = cartItem ? cartItem.quantity : 0;

                    return (
                        <div key={product.id} className='container p-5'>
                            <div className='border shadow-md rounded p-3 h-full'>
                                {/* Product image */}
                                <img className='h-52 mx-auto' src={product.image} alt={product.title} />

                                {/* Price and Add to Cart button */}
                                <div className='flex flex-wrap justify-center items-center font-semibold my-5 xl:px-5'>
                                    <p>₹&nbsp;{product.price}</p>

                                </div>
                                <div className='flex flex-wrap 2xl:justify-between justify-center gap-y-3 items-center font-medium my-5 xl:px-5 '>
                                    <button className='border bg-slate-700 hover:bg-slate-950 focus:bg-slate-950 text-white rounded p-2 cursor-pointer hover:scale-105' onClick={() => handleAddToCart(product)}>
                                        {/* Add Cart */}
                                        <p className='px-2'>Add to Cart</p>
                                    </button>
                                    <button className='border bg-slate-700 hover:bg-slate-950 focus:bg-slate-950 text-white rounded p-2 cursor-pointer hover:scale-105' onClick={() => handleShowDetails(product)}>
                                        {/* Product Details */}
                                        <p className='px-2'>Details</p>
                                    </button>
                                </div>

                                {/* Product title */}
                                <p className='flex text-wrap justify-center text-center'>{product.title}</p>

                                {/* product count */}
                                <div className={`flex justify-end items-center mt-5 text-sm ${quantity > 0 ? '' : 'hidden'}`}>
                                    <p className='flex font-semibold'>{quantity} in cart - </p>
                                    <button className='underline cursor-pointer' onClick={() => handleRemoveFromCart(product.id)} >Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Conditional rendering of cart modal */}
            {showModal && cartItems.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    {/* Modal content */}
                    <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-3/6 mx-2 sm:mx-5 md:mx-0 max-h-[500px] overflow-y-auto">
                        {/* Close button */}
                        <button className='border bg-red-500 rounded p-.5 px-2 text-white text-2xl flex ml-auto' onClick={handleModalClose}>
                            X
                        </button>
                        <h2 className="text-2xl mb-4 text-center">Your Cart</h2>



                        {/* Cart items list */}
                        <div className="flex justify-center flex-col">
                            {cartItems.map((item, index) => (
                                <div key={index} className='flex flex-wrap flex-row items-center justify-center gap-5 md:gap-10 shadow p-2 mb-4 w-full'>
                                    {/* Item image */}
                                    <img src={item.image} alt={item.title} className="h-20" />

                                    {/* Item title */}
                                    <p className='flex flex-wrap w-1/4'>{item.title}</p>

                                    {/* Item price */}
                                    <p>₹&nbsp;{item.price * item.quantity}</p>

                                    {/*  quantity */}
                                    <p className='flex gap-5 justify-center items-center'>
                                        {/* Button to increase the quantity of the item in the cart */}
                                        <button
                                            className='border rounded px-2 py-1 hover:bg-slate-100 focus:bg-slate-100 hover:scale-110 focus:scale-110'
                                            onClick={() => {
                                                // Update the cart items by incrementing the quantity of the selected item
                                                const updatedCart = cartItems.map((cartItem, i) =>
                                                    i === index // Check if the current item index matches the one being updated
                                                        ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increment quantity
                                                        : cartItem // Return the item unchanged
                                                );
                                                setCartItems(updatedCart); // Update the state with the new cart items
                                            }}
                                        >
                                            +
                                        </button>

                                        {/* Display the current quantity of the item */}
                                        {item.quantity}

                                        {/* Button to decrease the quantity of the item in the cart */}
                                        <button
                                            className='border rounded px-2 py-1 hover:bg-slate-100 focus:bg-slate-100 hover:scale-110 focus:scale-110'
                                            onClick={() => {
                                                // Only decrement if the quantity is greater than 1 to avoid zero or negative quantities
                                                if (item.quantity > 1) {
                                                    const updatedCart = cartItems.map((cartItem, i) =>
                                                        i === index // Check if the current item index matches the one being updated
                                                            ? { ...cartItem, quantity: cartItem.quantity - 1 } // Decrement quantity
                                                            : cartItem // Return the item unchanged
                                                    );
                                                    setCartItems(updatedCart); // Update the state with the new cart items
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                    </p>


                                    {/* Delete item button */}
                                    <button
                                        className='border py-2 px-4 rounded-md bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white hover:scale-105'
                                        onClick={() => handleDeleteItem(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                            }
                            <div className='flex justify-end items-center'>
                                <button className='border px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500 text-white' onClick={handleBuy}>Buy</button>
                            </div>
                        </div>

                    </div>

                </div>

            )}

            {details && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    {/* Modal content */}
                    <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-3/6 mx-2 sm:mx-5 md:mx-0 max-h-[500px] overflow-y-auto">
                        {/* Close button */}
                        <button className='border bg-red-500 rounded p-.5 px-2 text-white text-2xl flex ml-auto' onClick={() => setDetails(false)}>
                            X
                        </button>
                        <h2 className="text-2xl mb-4 text-center">Product Details</h2>
                        <div className='flex flex-wrap flex-col items-center justify-center gap-5 md:gap-10 shadow p-2 mb-4 w-full'>
                            {/* Item image */}
                            <img src={showDetails.image} alt={showDetails.title} className="h-64" />

                            {/* Item title */}
                            <p className='flex flex-wrap font-semibold text-2xl'>{showDetails.title}</p>

                            {/* {Item Price} */}
                            <p className='text-2xl'>₹&nbsp;{showDetails.price}</p>

                            {/* {Item Details} */}
                            <p className='px-5 text-justify'>{showDetails.description}</p>
                        </div>
                    </div>
                </div>
            )}

            {showBuyModal && (
                // Modal overlay that covers the entire screen
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    {/* Modal content container */}
                    <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-3/6 mx-2 sm:mx-5 md:mx-0 max-h-[300px]">
                        {/* Close button for the modal */}
                        <button
                            className='border bg-red-500 rounded p-.5 px-2 text-white text-2xl flex ml-auto'
                            onClick={handleCloseBuyModal} // Function to close the modal
                        >
                            X
                        </button>
                        {/* Modal title */}
                        <h2 className="text-2xl mb-4 text-center">Total Amount</h2>
                        {/* Display the original total amount with a strikethrough */}
                        <p className="text-center text-lg line-through">₹&nbsp;{calculateTotalAmount()}</p>
                        {/* Display the discount information */}
                        <p className="text-center text-xl my-3">10% discount</p>
                        {/* Calculate and display the discounted total amount */}
                        <p className='text-center text-xl font-semibold'>
                            ₹&nbsp;{(calculateTotalAmount() - (calculateTotalAmount() * 10 / 100)).toFixed(2)}
                        </p>
                        {/* Button to proceed to payment */}
                        <div className='flex justify-center mt-5'>
                            <button className='border px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-500 text-white'>
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Product;