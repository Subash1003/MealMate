import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";
// import logo from "../../assets/chef_logo_1.svg"
import logo from "../../assets/chef_logo_orange.svg"
import { GoHome, GoInfo } from "react-icons/go";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { setSearchText, clearSearchText } from '../../redux/searchSlice';

const Navbar = () => {
    const [index, setIndex] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)

    const texts = [
        '" Feeling hungry..? Order your food now..! "',
        "🍛 Craving Biryani?",
        "🍕 Looking for Pizza?",
        "🍔 Hungry for Burgers?",
        "🥗 Healthy Salads Available",
        "🍗 Try Our Grilled Chicken",
        "🍜 Explore Delicious Noodles",
        "🍨 Treat Yourself to Desserts",
        "☕ Fresh Coffee & Beverages",
        "🔥 Discover Today's Specials",
        "⭐ Find Customer Favorites",
        "👨‍🍳 Taste Chef's Signature Dishes",
        "🚚 Order Food Delivered Fast"

    ];
     useEffect(() => {
        const interval = setInterval(() => {
          setIndex(prev => (prev + 1) % texts.length);
        }, 2500);
    
        return () => clearInterval(interval);
      }, []);

    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.search.text);

    // The search box is shared across pages via this Navbar. Reset the query
    // whenever the Navbar unmounts (i.e. on route change) so each page starts
    // with an empty search and the input stays in sync with the store.
    useEffect(() => {
        return () => {
            dispatch(clearSearchText());
        };
    }, [dispatch]);

    const ab = useSelector((state) => state.cart.items)

    return (
        <div className="restaurant-navbar">

            <div className="restaurant-left-section">
                <div className="restaurant-navbar-logo">
                    <Link to="/" className='logo-link'>
                        <img src={logo} alt="Mealmate logo" />
                        <h1>Mealmate</h1>
                    </Link>
                </div>
            </div>

            <div className="top2">
                <div className="search-container">
                    <FaSearch className='search-icon' />
                    <input
                        id="searchbox"
                        type="text"
                        placeholder={texts[index]}
                        value={searchText}
                        onChange={(e) => dispatch(setSearchText(e.target.value))}
                    />
                </div>
            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className="restaurant-right-section">
                <ul className={`restaurant-nav-links ${menuOpen ? "active" : ""}`}>
                   <li>
  <Link to="/" onClick={() => setMenuOpen(false)}>
    <GoHome />
    Home
  </Link>
</li>

<li>
  <Link to="/Restaurant" onClick={() => setMenuOpen(false)}>
    <MdOutlineRestaurantMenu />
    Restaurant
  </Link>
</li>

<li>
  <Link to="/About" onClick={() => setMenuOpen(false)}>
    <GoInfo />
    About
  </Link>
</li>

<li>
  <Link to="/Cart" onClick={() => setMenuOpen(false)}>
    <BsCart3 />
    Cart({ab.length})
  </Link>
</li>
                </ul>
            </div>
        </div>

    )
}

export default Navbar