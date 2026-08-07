import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar1 from "../components/navbar/Navbar1";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItems,
  clearCart,
} from "../redux/CardSlice";

import "./Cart.css";
import { assets } from "../assets/assets";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const img_url =
    "https://media-assets.swiggy.com/swiggy/image/upload/";

  // Bill Calculation
  const subtotal = cartItems.reduce((total, item) => {
    const price =
      (item.card.info.price || item.card.info.defaultPrice) / 100;

    return total + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 299 ? 0 : 40;

  const gst = Math.round(subtotal * 0.05);

  const grandTotal = subtotal + deliveryFee + gst;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar1 />

        <div className="empty-cart">

          <img
            src={assets.emptycart}
            alt="Empty Cart"
          />

          <h2>Your Cart is Empty</h2>

          <p>
            Good food is always cooking!
            <br />
            Go ahead, order some yummy items from the menu.
          </p>

          <Link to="/">
            <button>Browse Restaurants</button>
          </Link>

        </div>
      </>
    );
  }

  return (
    <>
      <Navbar1 />

      <div className="cart-page">

        <h1>Cart</h1>

        <div className="cart-container">

          {/* Left Side */}

          <div className="cart-left">

            {cartItems.map((item) => {

              const price =
                (item.card.info.price ||
                  item.card.info.defaultPrice) / 100;

              return (

                <div
                  className="restaurant-info"
                  key={item.card.info.id}
                >

                  <div className="cart-item-left">

                    <img
                      src={img_url + item.card.info.imageId}
                      className="restaurant-img"
                      alt=""
                    />

                    <div className="item-info">

                      <h2>{item.card.info.name}</h2>

                      <p>
                        {item.card.info.description
                          ?.slice(0, 70)}
                        ...
                      </p>

                      <div className="item-price">
                        ₹{price}
                      </div>

                    </div>

                  </div>

                  <div className="cart-controls">

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          dispatch(
                            decreaseQuantity(
                              item.card.info.id
                            )
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(
                            increaseQuantity(
                              item.card.info.id
                            )
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <div className="total-price">
                      ₹{price * item.quantity}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch(
                          removeItems(item.card.info.id)
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              );
            })}
          </div>

          {/* Right Side */}

          <div className="cart-right">

            <div className="bill-box">

              <h2>Bill Details</h2>

              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="bill-row">
                <span>Delivery Fee</span>

                <span>
                  {deliveryFee === 0
                    ? "FREE"
                    : `₹${deliveryFee}`}
                </span>

              </div>

              <div className="bill-row">
                <span>GST (5%)</span>
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

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Cart;