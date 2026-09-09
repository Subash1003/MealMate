import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./CartIndicator.css";

/**
 * Cart indicator shown once an item is added. It only READS the existing
 * cart state (store.cart.items) — no new cart logic.
 *   - mobile : a fixed bottom bar (Swiggy/Zomato style) while the cart has items
 *   - desktop: a small bottom-centre popup that auto-hides ~3s after an add
 */
const CartIndicator = () => {
  const items = useSelector((state) => state.cart.items);
  const count = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const prevCount = useRef(count);
  const hideTimer = useRef(null);
  const [showToast, setShowToast] = useState(false);

  // Desktop popup: appears only when the count goes up, then hides itself.
  useEffect(() => {
    if (count > prevCount.current) {
      setShowToast(true);
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowToast(false), 3000);
    }
    prevCount.current = count;
    return () => clearTimeout(hideTimer.current);
  }, [count]);

  // Mobile: reserve space so the fixed bar never hides page content.
  useEffect(() => {
    document.body.classList.toggle("cart-bar-open", count > 0);
    return () => document.body.classList.remove("cart-bar-open");
  }, [count]);

  if (count === 0) return null;

  const noun = count === 1 ? "Item" : "Items";

  return (
    <>
      {/* Mobile: persistent bottom bar */}
      <Link to="/Cart" className="cart-indicator-bar">
        <span className="cart-indicator-bar__info">
          <FaShoppingCart />
          {count} {noun} Added to Cart
        </span>
        <span className="cart-indicator-bar__cta">View Cart</span>
      </Link>

      {/* Desktop: transient bottom-centre popup */}
      <div
        className={`cart-indicator-toast${showToast ? " is-visible" : ""}`}
        role="status"
      >
        <FaShoppingCart />
        <span>
          {count} {noun} added to cart
        </span>
        <Link to="/Cart" className="cart-indicator-toast__link">
          View Cart
        </Link>
      </div>
    </>
  );
};

export default CartIndicator;
