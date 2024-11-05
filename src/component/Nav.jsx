import { BsCart } from "react-icons/bs"; // Importing the cart icon from react-icons library
import { NavLink, useLocation } from "react-router-dom";

function Nav({ cartCount, handleModalToggle }) {

    const location = useLocation();

    return (
        <nav className='border-b-2 shadow flex flex-wrap justify-around items-center p-6 text-2xl'>
            {/* Logo section */}
            <div className="font-semibold text-3xl">Cart Task</div>

            <ul className="text-2xl flex flex-row flex-wrap justify-between items-center gap-5">
                {/* create a nav bar for Home, Product, About */}
                <li><NavLink to="/" className='text-xl hover:text-gray-800'>Home</NavLink></li>
                <li><NavLink to="/Product" className='text-xl hover:text-gray-800'>Product</NavLink></li>
                <li><NavLink to="/About" className='text-xl hover:text-gray-800'>About</NavLink></li>

            </ul>

            {/* Conditionally render Cart section only on the Product page */}
            {location.pathname === "/Product" && (
                <div className='flex justify-center hover:scale-105' onClick={handleModalToggle}>
                    {/* Cart icon */}
                    <BsCart className='text-3xl' />

                    {/* Cart count badge */}
                    <span className='border h-4 w-4 flex justify-center items-center rounded-full text-[10px] bg-red-400 hover:bg-red-500 focus:bg-red-500 text-white -ms-3'>
                        {cartCount} {/* Display the number of items in the cart */}
                    </span>
                </div>
            )}
        </nav>
    );
}

export default Nav;