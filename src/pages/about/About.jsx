import React from "react";
import "./About.css";
import Navbar1 from "../../components/navbar/Navbar1";
import {
  FaMotorcycle,
  FaUtensils,
  FaSmile,
  FaLeaf,
} from "react-icons/fa";

const About = () => {
  return (
    <>
      <Navbar1 />

      <div className="about">

        {/* Hero Section */}
        <section className="about-hero">
          <h1>About MealMate</h1>

          <p>
            Bringing your favorite restaurants closer to you with
            fast delivery, fresh meals, and an effortless ordering
            experience.
          </p>

          <button>Order Now</button>
        </section>

        {/* About Content */}

        <section className="about-content">

          <div className="about-left">

            <h2>Who We Are</h2>

            <p>
              MealMate is a modern online food ordering platform that
              connects food lovers with the best restaurants nearby.
              Whether you're craving pizza, biryani, burgers, desserts,
              or healthy meals, MealMate makes ordering food simple,
              quick, and enjoyable.
            </p>

            <p>
              Our mission is to deliver delicious food quickly while
              providing a smooth and secure experience for every customer.
            </p>

          </div>

          <div className="about-right">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
              alt="Food"
            />

          </div>

        </section>

        {/* Features */}

        <section className="features">

          <h2>Why Choose MealMate?</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <FaMotorcycle className="feature-icon" />
              <h3>Fast Delivery</h3>
              <p>
                Lightning-fast food delivery to your doorstep.
              </p>
            </div>

            <div className="feature-card">
              <FaUtensils className="feature-icon" />
              <h3>Best Restaurants</h3>
              <p>
                Discover hundreds of top-rated restaurants nearby.
              </p>
            </div>

            <div className="feature-card">
              <FaSmile className="feature-icon" />
              <h3>Happy Customers</h3>
              <p>
                Thousands of satisfied customers trust MealMate.
              </p>
            </div>

            <div className="feature-card">
              <FaLeaf className="feature-icon" />
              <h3>Fresh Food</h3>
              <p>
                Prepared with fresh ingredients and delivered safely.
              </p>
            </div>

          </div>

        </section>

        {/* Stats */}

        <section className="stats">

          <div className="stat">
            <h2>500+</h2>
            <span>Restaurants</span>
          </div>

          <div className="stat">
            <h2>50K+</h2>
            <span>Happy Customers</span>
          </div>

          <div className="stat">
            <h2>30 min</h2>
            <span>Average Delivery</span>
          </div>

          <div className="stat">
            <h2>4.8★</h2>
            <span>Customer Rating</span>
          </div>

        </section>

      </div>
    </>
  );
};

export default About;