import React from "react";
import "./Contact.css";
import Navbar1 from "../../components/navbar/Navbar1";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <Navbar1 />

      <div className="contact-page">

        {/* Hero */}

        <section className="contact-hero">
          <h1>Contact Us</h1>

          <p>
            We'd love to hear from you. Whether you have a question,
            feedback, or need support, our team is always ready to help.
          </p>
        </section>

        {/* Contact Content */}

        <section className="contact-container">

          {/* Left */}

          <div className="contact-info">

            <h2>Get in Touch</h2>

            <div className="info-box">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h3>Address</h3>
                <p>Coimbatore, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="info-box">
              <FaPhoneAlt className="contact-icon" />
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-box">
              <FaEnvelope className="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>support@mealmate.com</p>
              </div>
            </div>

            <div className="info-box">
              <FaClock className="contact-icon" />
              <div>
                <h3>Working Hours</h3>
                <p>09:00 AM - 10:00 PM</p>
              </div>
            </div>

          </div>

          {/* Right */}

          <div className="contact-form">

            <h2>Send us a Message</h2>

            <form>

              <input
                type="text"
                placeholder="Your Name"
              />

              <input
                type="email"
                placeholder="Email Address"
              />

              <input
                type="tel"
                placeholder="Phone Number"
              />

              <textarea
                rows="6"
                placeholder="Type your message..."
              ></textarea>

              <button type="submit">
                Send Message
              </button>

            </form>

          </div>

        </section>

        {/* Google Map */}

        <section className="map-section">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Coimbatore&output=embed"
            loading="lazy"
          ></iframe>

        </section>

      </div>
    </>
  );
};

export default Contact;