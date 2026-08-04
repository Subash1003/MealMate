import React from 'react'
import "./About.css";
import Navbar1 from '../../components/navbar/Navbar1';
import bg3 from "../../assets/bg3.png";

const About = () => {
  return (


    <div className='outer'  style={{ backgroundImage: `url(${bg3})` }}>
      <Navbar1/>
 <div className="hero"  >
     

        <h1>Delicious Food Delivered to Your Doorstep</h1>

        <p>
          Order from your favorite restaurants and enjoy fast, reliable delivery.
          Explore a wide variety of cuisines, discover new places, and satisfy
          your cravings anytime, anywhere.
        </p>

        <div className="hero-btns">
          <button >Order Now</button>
          <button>Browse Restaurants</button>
        </div>
      </div>

    </div>
   
  )
}

export default About