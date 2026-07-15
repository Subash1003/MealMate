import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar1.css";
import logo from "../../assets/chef_logo_1.svg"
import { GoHome, GoInfo } from "react-icons/go";
import { RiServiceBellLine } from "react-icons/ri";
import { LuContactRound } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from 'react-redux';

const Navbar1 = () => {
    const ab = useSelector((state) => state.cart.items)
    return (
        <div className="restaurant-navbar">

            <div className="restaurant-left-section">
                <div className="restaurant-navbar-logo">
                    <Link to="/" className='logo-link'>
                    <img src={logo} /><h1>Mealmate</h1></Link>
                </div>
            </div>

            <div className="restaurant-right-section">
                <ul className="restaurant-nav-links">
                    <li><a href="/"><GoHome />Home</a></li>
                    <li><a href="/About"><GoInfo />About</a></li>
                    <li><a><RiServiceBellLine />Service</a></li>
                    <li><a><LuContactRound />Contact</a></li>
                    <li><Link to="/Cart"><BsCart3 />Cart({ab.length})</Link></li>
                </ul>
            </div>
        </div>

    )
}

export default Navbar1