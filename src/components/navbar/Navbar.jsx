import React from 'react'
import { useState , useEffect } from 'react';
import logo from "../../assets/chef_logo_1.svg"
import "./Navbar.css";
import { FaHome } from "react-icons/fa";
import navbarbg from "../../assets/navbarbg.png";
const Navbar = () => {

  const [svgSrc, setSvgSrc] = useState(logo);
  useEffect(() =>{

    const replayAnimation = setInterval(() => {
      setSvgSrc(`${logo}?t=${Date.now()}`);
    },8000);
  },[]);

  return (

    <div className="navbar">
      <div className="top1">
        <div className="navleft">
          <img src={svgSrc}  />
          <div className='logo'><h1>Mealmate</h1></div>
        </div>
        <div className="navright">
          <a>Home</a>
          <a href='/About'> About</a>
          <a >Sign in</a>
          <a> Cart</a>
        </div>

      </div>
    </div>


  )
}

export default Navbar