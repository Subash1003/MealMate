import React from "react";
import "./RestaurantMenuShimmer.css";

const RestaurantMenuShimmer = () => {
  return (
    <div className="shimmer-page">

      {/* Restaurant title */}
      <div className="shimmer-title shimmer"></div>

      {/* Restaurant Info */}
      <div className="shimmer-banner shimmer"></div>

      {/* Deals */}
      <div className="shimmer-heading shimmer"></div>

      <div className="shimmer-deals">
        {[1,2,3,4].map((item)=>(
          <div className="shimmer-deal shimmer" key={item}></div>
        ))}
      </div>

      {/* Menu */}
      {[1,2,3,4,5].map((item)=>(
        <div className="shimmer-item" key={item}>

          <div className="shimmer-left">
            <div className="shimmer-line shimmer short"></div>
            <div className="shimmer-line shimmer small"></div>
            <div className="shimmer-line shimmer medium"></div>
            <div className="shimmer-line shimmer"></div>
          </div>

          <div className="shimmer-right">
            <div className="shimmer-image shimmer"></div>
            <div className="shimmer-button shimmer"></div>
          </div>

        </div>
      ))}

    </div>
  );
};

export default RestaurantMenuShimmer;