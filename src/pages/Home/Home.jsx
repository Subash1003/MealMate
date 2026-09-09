import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { MdStars } from "react-icons/md";
// import homeHeroVideo from "../../assets/home-hero.mp4";
import aboutHeroVideo from "../../assets/about-hero.mp4";
import { resData } from "../../assets/mockData ";
import { MEDIA_ASSETS_THUMB_URL } from "../../utils/constants";
import "./Home.css";

const Home = () => {
  const img = MEDIA_ASSETS_THUMB_URL;
  const featured =
    resData?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.slice(
      0,
      6
    ) || [];

  return (
    <div className="landing-page">
      <Navbar />

      {/* ===== Hero ===== */}
      <section className="lp-hero">
        <video
          className="lp-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={aboutHeroVideo} type="video/mp4" />
        </video>

        <div className="lp-hero__inner">

          <h1>
            Crave it. <span>Order it.</span>
          </h1>
          <p>
            MealMate brings your favourite restaurants and dishes straight to
            your door — hot, fresh and lightning quick.
          </p>
          <div className="lp-hero__cta">
            <Link to="/Restaurant" className="lp-btn lp-btn--solid">
              Explore Restaurants
            </Link>
            <Link to="/About" className="lp-btn lp-btn--ghost">
              Learn More
            </Link>
          </div>

        </div>
      </section>

      {/* ===== How it works ===== */}

      {/* ===== Popular categories ===== */}
  

      {/* ===== Featured restaurants ===== */}
      {featured.length > 0 && (
        <section className="lp-section">
          <div className="lp-head">
            <span className="lp-kicker">Handpicked for you</span>
            <h2>Featured restaurants</h2>
            <Link to="/Restaurant" className="lp-seeall">
              See all
            </Link>
          </div>

          <div className="lp-rest-grid">
            {featured.map((el) => (
              <Link
                to={`/Restaurant/${el.info.id}`}
                className="lp-rest-card"
                key={el.info.id}
              >
                <div className="lp-rest-card__img">
                  <img src={img + el.info.cloudinaryImageId} alt={el.info.name} />
                  <span className="lp-rest-card__offer">
                    {el.info.aggregatedDiscountInfoV3?.header}{" "}
                    {el.info.aggregatedDiscountInfoV3?.subHeader}
                  </span>
                </div>
                <h3>{el.info.name}</h3>
                <div className="lp-rest-card__meta">
                  <span className="lp-rating">
                    <MdStars /> {el.info.avgRating}
                  </span>
                  <span>{el.info.sla?.slaString}</span>
                </div>
                <p>{el.info.cuisines?.slice(0, 2).join(", ")}</p>
                <p className="lp-rest-card__area">{el.info.areaName}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== CTA band ===== */}
    
    </div>
  );
};

export default Home;
