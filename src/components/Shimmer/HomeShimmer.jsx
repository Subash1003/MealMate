import React from "react";
import "./HomeShimmer.css";

const HomeShimmer = () => {
  return (
    <div className="home-shimmer">

      {/* Top Categories */}
      <div className="shimmer-top-header shimmer"></div>

      <div className="shimmer-top-scroll">
        {[1,2,3,4,5,6,7].map((item)=>(
          <div className="shimmer-circle" key={item}>
            <div className="circle shimmer"></div>
          </div>
        ))}
      </div>

      {/* Restaurant Heading */}
      <div className="shimmer-heading shimmer"></div>

      {/* Restaurant Cards */}

      <div className="shimmer-grid">
        {[1,2,3,4,5,6,7,8].map((item)=>(
          <div className="shimmer-card" key={item}>

            <div className="card-image shimmer"></div>

            <div className="line title shimmer"></div>

            <div className="line small shimmer"></div>

            <div className="line medium shimmer"></div>

            <div className="line tiny shimmer"></div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default HomeShimmer;