import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar1.css";
import logo from "../../assets/chef_logo_1.svg"
import { GoHome, GoInfo } from "react-icons/go";
import { RiServiceBellLine } from "react-icons/ri";
import { LuContactRound } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
// import Home from '../../pages/home/Home';

const Navbar1 = () => {
    const [index, setIndex] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false)  

    const [svgSrc, setSvgSrc] = useState(logo);
      useEffect(() =>{
    
        const replayAnimation = setInterval(() => {
          setSvgSrc(`${logo}?t=${Date.now()}`);
        },8000);
      },[]);
   

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

    // NOTE: this still references `data`, `setCardsData` and `menuSection`,
    // which are state/refs that live in Home.jsx, not here.
    // As written this will throw a ReferenceError when triggered from the navbar.
    // See the message below for how to wire this up correctly.
    let filterCards = () => {
        let a = document.getElementById("searchbox").value;
        let result = data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.filter((element, index) => {
            return element.info.name.toLowerCase().includes(a.toLowerCase())
        })
        setCardsData(result)
        setTimeout(() => {
            menuSection.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 200)
    }

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
                    <FaSearch onClick={filterCards} className='search-icon' />
                    <input id="searchbox" type="text" placeholder={texts[index]} />
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
  <Link to="/About" onClick={() => setMenuOpen(false)}>
    <GoInfo />
    About
  </Link>
</li>

<li>
  <Link to="/Contact" onClick={() => setMenuOpen(false)}>
    <LuContactRound />
    Contact
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

export default Navbar1