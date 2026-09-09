import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItems,
  clearCart,
} from "../../redux/cartSlice";
import {
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShieldAlt,
  FaTag,
  FaMotorcycle,
} from "react-icons/fa";

import "./Cart.css";
import { assets } from "../../assets/assets";
import { MEDIA_ASSETS_URL } from "../../utils/constants";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  // UI-only: lets a row play its exit animation before it leaves the list.
  const [removingId, setRemovingId] = useState(null);

  const img_url = MEDIA_ASSETS_URL;

  const handleRemove = (id) => {
    if (removingId) return;
    setRemovingId(id);
    setTimeout(() => {
      dispatch(removeItems(id));
      setRemovingId(null);
    }, 280);
  };

  // Bill Calculation
  const subtotal = cartItems.reduce((total, item) => {
    const price =
      (item.card.info.price || item.card.info.defaultPrice) / 100;

    return total + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 299 ? 0 : 40;

  const gst = Math.round(subtotal * 0.05);

  const grandTotal = subtotal + deliveryFee + gst;

  // Visual-only: progress toward the free-delivery threshold.
  const freeDeliveryTarget = 299;
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryTarget) * 100);
  const amountToFreeDelivery = Math.max(0, Math.ceil(freeDeliveryTarget - subtotal));

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />

        <div className="cart-page cart-page--empty">
          <div className="empty-cart">
            <div className="empty-cart__art">
              <span className="empty-cart__ring" aria-hidden="true" />
              <img src={assets.emptycart} alt="Empty Cart" />
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Good food is always cooking!
              <br />
              Go ahead, order some yummy items from the menu.
            </p>

            <Link to="/Restaurant" className="empty-cart__btn">
              Browse Restaurants
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="cart-page">

        <div className="cart-head">
          <div>
            <h1>Your Cart</h1>
            <p className="cart-head__count">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link to="/" className="cart-head__back">
            <FaArrowLeft /> Add more items
          </Link>
        </div>

        <div className="cart-container">

          {/* ===== Left: items ===== */}
          <div className="cart-left">

            <div className="cart-progress">
              <div className="cart-progress__label">
                <FaMotorcycle />
                {deliveryFee === 0 ? (
                  <span>You've unlocked <strong>free delivery!</strong></span>
                ) : (
                  <span>Add items worth <strong>₹{amountToFreeDelivery}</strong> more for free delivery</span>
                )}
              </div>
              <div className="cart-progress__track">
                <div
                  className="cart-progress__fill"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {cartItems.map((item) => {

              const price =
                (item.card.info.price ||
                  item.card.info.defaultPrice) / 100;

              return (

                <div
                  className={`cart-item${removingId === item.card.info.id ? " cart-item--removing" : ""}`}
                  key={item.card.info.id}
                >

                  <img
                    src={img_url + item.card.info.imageId}
                    className="cart-item__img"
                    alt=""
                  />

                  <div className="cart-item__body">
                    <h2>{item.card.info.name}</h2>

                    <p className="cart-item__desc">
                      {item.card.info.description
                        ?.slice(0, 70)}
                      ...
                    </p>

                    <div className="cart-item__price">₹{price}</div>
                  </div>

                  <div className="cart-item__controls">
                    <div className="cart-quantity">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          dispatch(
                            decreaseQuantity(
                              item.card.info.id
                            )
                          )
                        }
                      >
                        <FaMinus />
                      </button>

                      <span key={item.quantity} className="cart-quantity__value">
                        {item.quantity}
                      </span>

                      <button
                        aria-label="Increase quantity"
                        onClick={() =>
                          dispatch(
                            increaseQuantity(
                              item.card.info.id
                            )
                          )
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="cart-item__total">
                      ₹{price * item.quantity}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.card.info.id)}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>

                </div>

              );
            })}
          </div>

          {/* ===== Right: summary ===== */}
          <div className="cart-right">

            <div className="bill-box">

              <h2>Bill Details</h2>

              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="bill-row">
                <span>
                  <FaMotorcycle className="bill-row__ic" /> Delivery Fee
                </span>
                <span className={deliveryFee === 0 ? "bill-row__free" : ""}>
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="bill-row">
                <span>
                  <FaTag className="bill-row__ic" /> GST (5%)
                </span>
                <span>₹{gst}</span>
              </div>

              <hr />

              <div className="bill-row total">
                <span>To Pay</span>
                <span>₹{grandTotal}</span>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout
              </button>

              <button
                className="clear-btn"
                onClick={() =>
                  dispatch(clearCart())
                }
              >
                Clear Cart
              </button>

              <div className="bill-box__note">
                <FaShieldAlt /> Safe and secure checkout
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Cart;
