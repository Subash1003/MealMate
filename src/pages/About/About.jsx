import React from "react";
import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
// import aboutHeroVideo from "../../assets/about-hero.mp4";
import homeHeroVideo from "../../assets/home-hero.mp4";
import {
  FaMotorcycle,
  FaUtensils,
  FaSmile,
  FaLeaf,
  FaClock,
  FaTags,
  FaHeadset,
  FaShieldAlt,
  FaStar,
  FaMapMarkedAlt,
} from "react-icons/fa";

const offerings = [
  {
    icon: <FaUtensils />,
    title: "Endless Choices",
    text: "Thousands of restaurants and cuisines, from street food to fine dining, all in one place.",
  },
  {
    icon: <FaMotorcycle />,
    title: "Lightning Delivery",
    text: "Hot, fresh meals brought to your door by our fleet — most orders arrive in under 30 minutes.",
  },
  {
    icon: <FaTags />,
    title: "Everyday Offers",
    text: "Handpicked deals, combo savings and coupons that make every order lighter on your wallet.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Live Order Updates",
    text: "Follow your food in real time — from the kitchen to your table — with clear status at every step.",
  },
];

const reasons = [
  {
    icon: <FaMotorcycle />,
    title: "Fast Delivery",
    text: "Lightning-fast food delivery to your doorstep, every single time.",
  },
  {
    icon: <FaUtensils />,
    title: "Best Restaurants",
    text: "Discover hundreds of top-rated restaurants and hidden gems nearby.",
  },
  {
    icon: <FaSmile />,
    title: "Happy Customers",
    text: "Thousands of satisfied foodies trust MealMate with their cravings.",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Food",
    text: "Prepared with fresh ingredients and delivered safely and hygienically.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Ordering",
    text: "A smooth, protected checkout experience you can rely on.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    text: "Real people ready to help you whenever something needs a hand.",
  },
];

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page">

        {/* ===== Hero ===== */}
        <section className="ab-hero">

          <video
            className="ab-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={homeHeroVideo} type="video/mp4" />
          </video>

          <div className="ab-hero__inner">
            {/* <span className="ab-badge">Food, delivered with love</span> */}
            <h1>
               <span>MealMate</span>
            </h1>
            <p>
              Bringing your favourite restaurants closer to you with fast
              delivery, fresh meals and an effortless ordering experience —
              crafted for people who love good food.
            </p>
            <Link to="/" className="ab-btn ab-btn--solid">
              Order Now
            </Link>
          </div>

        </section>

        {/* ===== Who We Are ===== */}
        <section className="ab-who">
          <div className="ab-who__text">
            <span className="ab-kicker">Who We Are</span>
            <h2>Your neighbourhood kitchen, reimagined</h2>
            <p>
              MealMate is a modern online food ordering platform that connects
              food lovers with the best restaurants nearby. Whether you're
              craving pizza, biryani, burgers, desserts or a wholesome healthy
              bowl, MealMate makes ordering simple, quick and genuinely enjoyable.
            </p>
            <p>
              Our mission is to deliver delicious food fast while giving every
              customer a smooth, secure and delightful experience — from the
              first tap to the last bite.
            </p>

            <div className="ab-who__pills">
              <span><FaClock /> Under 30 min</span>
              <span><FaLeaf /> Fresh &amp; hygienic</span>
              <span><FaStar /> Top-rated partners</span>
            </div>
          </div>

          <div className="ab-who__art" aria-hidden="true">
            <div className="ab-who__card ab-who__card--a">
              <FaMotorcycle />
              <p>On the way</p>
              <small>Arriving in 12 min</small>
            </div>
            <div className="ab-who__card ab-who__card--b">
              <span className="ab-dot" /> Live tracking
            </div>
            <div className="ab-who__blob" />
          </div>
        </section>

        {/* ===== What We Offer ===== */}
        <section className="ab-section">
          <div className="ab-section__head">
            <span className="ab-kicker">What We Offer</span>
            <h2>Everything you need for a great meal</h2>
          </div>

          <div className="ab-grid ab-grid--offer">
            {offerings.map((o, i) => (
              <article
                className="ab-card"
                key={o.title}
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="ab-card__icon">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ===== Why Choose Us ===== */}
        <section className="ab-section ab-section--tint">
          <div className="ab-section__head">
            <span className="ab-kicker">Why Choose Us</span>
            <h2>Reasons foodies stick with MealMate</h2>
          </div>

          <div className="ab-grid ab-grid--why">
            {reasons.map((r, i) => (
              <article
                className="ab-card ab-card--why"
                key={r.title}
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="ab-card__icon ab-card__icon--sm">{r.icon}</div>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* ===== CTA ===== */}
        <section className="ab-cta">
          <div className="ab-cta__inner">
            <h2>Hungry yet?</h2>
            <p>Your next favourite meal is just a few taps away.</p>
            <Link to="/" className="ab-btn ab-btn--solid">
              Explore Restaurants
            </Link>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
