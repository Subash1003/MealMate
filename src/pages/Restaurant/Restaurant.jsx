import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Navbar from "../../components/Navbar/Navbar";
import { MdStars } from "react-icons/md";
import "./Restaurant.css";
import { Link } from 'react-router-dom';
import { resData } from '../../assets/mockData ';
import { resMenuData } from '../../assets/resMockData';
import HorizonScroll from '../../components/HorizonScroll/HorizonScroll';
import HomeShimmer from '../../components/Shimmer/HomeShimmer';
import { MEDIA_ASSETS_THUMB_URL } from '../../utils/constants';
import { filterRestaurantsByDish } from '../../utils/search';

const Restaurant = () => {

  let [data, setData] = useState(null)
  const menuSection = useRef(null);
  let [cardsData, setCardsData] = useState(null)

  const scrollRef = useRef(null);

  let img_url = MEDIA_ASSETS_THUMB_URL

  const searchText = useSelector((state) => state.search.text);

  // Real-time, case-insensitive filter: show restaurants whose menu contains
  // a dish matching the query. Memoised so it only recomputes on new input.
  const visibleRestaurants = useMemo(
    () => filterRestaurantsByDish(cardsData || [], resMenuData, searchText),
    [cardsData, searchText]
  );

  useEffect(() => {
    setTimeout(() => {
      setData(resData);
      setCardsData(resData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    });
  }, [])


  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  if (!data) {
    return ( <>
            <Navbar />
            <HomeShimmer />
        </>
        );
  }


  return (

    <div className='restaurant-page'>
      <Navbar />

      <div className="menu-wrapper">
        <div className="topmenuhead">
          <h2 id='menutopheader'>{data.data.cards[0].card.card.header.title}</h2>
          <div>
            <HorizonScroll
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
            />

          </div>
        </div>
        <div className="menutop" ref={scrollRef}>
          {data.data.cards[0].card.card.imageGridCards.info.map((element) => {
            return (<div className="top" key={element.id}>
              <img className='round' src={img_url + element.imageId}  />
            </div>


            )
          })}
        </div>

      </div>

      <h2 id='menuheader'>{data.data.cards[1].card.card.header.title}.!</h2>
      <div className="menu" ref={menuSection} >
        {searchText.trim() !== "" && visibleRestaurants.length === 0 ? (
          <p className="no-results">No restaurants found.</p>
        ) : (
          visibleRestaurants.map((element) => {
            return (<Link key={element.info.id}
              to={`/Restaurant/${element.info.id}`}
              className='RestaurantLink'>

              <div className="card">

                <div className="image-container">
                  <img src={img_url + element.info.cloudinaryImageId} />

                  <div className="offer">
                    {element.info.aggregatedDiscountInfoV3?.header}{" "}
                    {element.info.aggregatedDiscountInfoV3?.subHeader}
                  </div>
                </div>

                <h3>{element.info.name}</h3>

                <div className='rating'>
                  <span><MdStars id='star' /></span>
                  <span>{element.info.avgRating}</span>
                </div>

                  <div className='cardcuisines'>
                <p>{element.info?.cuisines[0]},</p>
                <p>{element.info?.cuisines[1]} </p>
                  </div>
                <p>{element.info.areaName}</p>

              </div>
            </Link>)
          })
        )}
      </div>

    </div >



  )
}

export default Restaurant
