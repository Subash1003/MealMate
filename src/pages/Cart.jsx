import { useSelector } from "react-redux";
import "../pages/Cart.css"
import { assets } from "../assets/assets";
function Cart() {
  const cartItems = useSelector((store) => store.cart.items);

  let img = "https://media-assets.swiggy.com/swiggy/image/upload/"

  if (cartItems.length === 0) {
    return (
      <div>
        <h2 style={{ padding: '20px 20px', color:"grey" }}>Cart Empty</h2>
        <div className="empty-cart">
          <img src={assets.emptycart} alt="Empty Cart" />
          <p>Good food is always cooking!</p>
          <p>Go ahead, order some</p>
          <p>yummy items from the menu.</p>
        </div>

      </div>
    );
  }
  return (

    <div className="cart-page">

      <h2 style={{ paddingBottom: '10px' }}>Cart</h2>

      {cartItems.map((item) => {
        return (
          <div className="restaurant-info">
            <img
              src={img + item.card.info.imageId}
              alt="Restaurant"
              className="restaurant-img"
            />
            <div>
              <h2>{item.card.info.name}</h2>
              <p>{item.card.info.areaName}</p>
            </div>

            <div style={{ display: 'flex', gap: '3rem' }}>
              <span className="quant">{item.quantity}</span>

              <p>
                ₹
                {(Math.floor((item.card.info.price || item.card.info.defaultPrice) / 100)) *
                  item.quantity}
              </p>
            </div>
          </div>
        )
      })}



    </div>
  );
}

export default Cart;