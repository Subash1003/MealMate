import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../../components/Navbar/Navbar";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaHeadset,
  FaComments,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaCheckCircle,
} from "react-icons/fa";

const contactCards = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Visit Us",
    lines: ["Coimbatore, Tamil Nadu, India"],
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    lines: ["+91 98765 43210"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    lines: ["support@mealmate.com"],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Mon – Sun", "09:00 AM – 10:00 PM"],
  },
];

const Contact = () => {
  const [sent, setSent] = useState(false);

  // UI-only: no backend. Just acknowledge and reset the form fields.
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">

        {/* ===== Hero ===== */}
        <section className="ct-hero">
          <div className="ct-hero__inner">
            <span className="ct-badge">💬 We usually reply in minutes</span>
            <h1>How can we help?</h1>
            <p>
              Whether it's a question about an order, feedback, or a partnership
              idea — our customer support team is always ready to help.
            </p>

            
          </div>
        </section>

        {/* ===== Info cards ===== */}
        <section className="ct-cards">
          {contactCards.map((c, i) => (
            <article
              className="ct-card"
              key={c.title}
              style={{ animationDelay: `${0.08 * i}s` }}
            >
              <div className="ct-card__icon">{c.icon}</div>
              <h3>{c.title}</h3>
              {c.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </article>
          ))}
        </section>

        {/* ===== Support + Form ===== */}
        <section className="ct-main">
          <aside className="ct-support">
            <span className="ct-kicker">Customer Support</span>
            <h2>Real people, real help</h2>
            <p>
              Our support crew handles everything from missing items to refund
              questions and delivery updates. Reach out any time — day or night.
            </p>

            <div className="ct-support__row">
              <FaHeadset />
              <div>
                <strong>Priority helpline</strong>
                <span>+91 98765 43210 · toll-free</span>
              </div>
            </div>
            <div className="ct-support__row">
              <FaEnvelope />
              <div>
                <strong>Order &amp; refund queries</strong>
                <span>support@mealmate.com</span>
              </div>
            </div>

            <div className="ct-social">
              <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><FaInstagram /></a>
              <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}><FaFacebookF /></a>
              <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}><FaTwitter /></a>
            </div>
          </aside>

          <div className="ct-form-card">
            <h2>Send us a message</h2>
            <p className="ct-form-card__sub">We'll get back to you as soon as we can.</p>

            {sent && (
              <div className="ct-success" role="status">
                <FaCheckCircle /> Thanks! Your message has been noted.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="ct-field">
                <input type="text" required placeholder=" " id="ct-name" />
                <label htmlFor="ct-name">Your Name</label>
              </div>

              <div className="ct-field">
                <input type="email" required placeholder=" " id="ct-email" />
                <label htmlFor="ct-email">Email Address</label>
              </div>

              <div className="ct-field">
                <input type="tel" placeholder=" " id="ct-phone" />
                <label htmlFor="ct-phone">Phone Number</label>
              </div>

              <div className="ct-field">
                <textarea rows="5" required placeholder=" " id="ct-msg" />
                <label htmlFor="ct-msg">Type your message...</label>
              </div>

              <button type="submit" className="ct-submit">
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* ===== Map ===== */}
        <section className="ct-map">
          <div className="ct-map__head">
            <FaMapMarkerAlt />
            <div>
              <strong>Find us on the map</strong>
              <span>Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
          <div className="ct-map__frame">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Coimbatore&output=embed"
              loading="lazy"
            />
          </div>
        </section>

      </div>
    </>
  );
};

export default Contact;
