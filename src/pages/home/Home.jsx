import { useState, useEffect, useRef } from 'react';
import Navbar1 from "../../components/navbar/Navbar1";
import { assets } from '../../assets/assets';
import logo1 from '../../assets/chef_logo_1.svg'
import { MdStars } from "react-icons/md";
import "./Home.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { resData } from '../../assets/mockData ';
import HorizonScroll from '../../components/HorizonScroll/HorizonScroll';
import HomeShimmer from '../../components/shimmer/HomeShimmer';

const Home = () => {

  let [data, setData] = useState(null)
  let [cardsData, setCardsData] = useState(null)
  const menuSection = useRef(null);

  const scrollRef = useRef(null);

  let img_url = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"

  // function getData() {
  //   let a = fetch(("https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.01020&lng=76.97010&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"))
  //   a.then((x) => x.json())
  //     .then((y) => {
  //       setData(y)
  //       setCardsData(y.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
  //     });
  // }


  useEffect(() => {
    setTimeout(() => {
      setData(resData);
      setCardsData(resData.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
    });
    console.log(resData);
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
            <Navbar1 />
            <HomeShimmer />
        </>
        );
  }


  return (

    <div className='home-main'>
      <Navbar1 />

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
          {data.data.cards[0].card.card.imageGridCards.info.map((element, index) => {
            return (<div className="top" key={element.id}>
              <img src={img_url + element.imageId} style={{ width: '130px' }} />
            </div>

            )
          })}
        </div>

      </div>

      <h2 id='menuheader'>{data.data.cards[1].card.card.header.title}.!</h2>
      <div className="menu" ref={menuSection} >
        {
          cardsData.map((element, index) => {
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
        }
      </div>

    </div >



  )
}

export default Home
