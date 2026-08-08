import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItems, increaseQuantity, decreaseQuantity, } from "../../redux/CardSlice";

import { resMenuData } from "../../assets/resMockData";
import { useParams } from "react-router";
import { MdStars } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./RestaurantMenu.css"
// import Navbar from "../navbar/Navbar";
import HorizonScroll from "../HorizonScroll/HorizonScroll";
import { assets } from "../../assets/assets";
import Navbar1 from "../../components/navbar/Navbar1";

import Cart from "../../pages/Cart";
import RestaurantMenuShimmer from "../shimmer/RestaurantMenuShimmer";


const RestaurantMenu = () => {


    const restRef = useRef(null);
    const [menuData, setMenuData] = useState(null);

    const [openSections, setOpenSections] = useState([]);
    const [openCategories, setOpenCategories] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const { id } = useParams();

    useEffect(() => {
        const result = resMenuData.find(
            (element) => id === element.data.cards[2].card.card.info.id
        );

        console.log(result);
        setTimeout(() => {
            setMenuData(result);

            const data4 =
                result.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;

            setOpenSections(
                data4
                    .filter(item => item.card.card.itemCards || item.card.card.categories)
                    .map((_, index) => index)
            );

            setOpenCategories(
                data4.flatMap((item, parentIndex) =>
                    item.card.card.categories?.map(
                        (_, categoryIndex) => `${parentIndex}-${categoryIndex}`
                    ) || []
                )
            );

        }, 2000);
    }, [id]);


    if (!menuData) {
        return (
            <>
                <Navbar1 />
                <RestaurantMenuShimmer />
            </>
        );
    }

    const scrollLeft = () => {
        restRef.current.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        restRef.current.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    const toggleSection = (index) => {
        setOpenSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };


    const toggleSubSection = (index) => {
        setOpenCategories(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const toggleDescription = (id) => {
        setExpandedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const data0 = menuData.data.cards[0].card.card;
    const data1 = menuData.data.cards[1].card.card.tabs;
    const data2 = menuData.data.cards[2].card.card.info;
    const data3 = menuData.data.cards[3].card.card.gridElements.infoWithStyle.offers;
    const data4 = menuData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;

    const boxbg = menuData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card;

    const foot1 = data4[data4.length - 2];
    const foot2 = data4[data4.length - 1];



    let img = "https://media-assets.swiggy.com/swiggy/image/upload/"
    return (
        <div className="the-one">
            <Navbar1 />


            <div className="main">
                <div className="sub">
                    <h1>{data2.name}</h1>

                    <div className="box"
                        style={{
                            backgroundImage: ` linear-gradient(
                                to right,
                                rgb(0, 0, 0) 0%,
                                rgba(0, 0, 0, 0.79) 40%,
                                rgba(0, 0, 0, 0.12) 100%
                            ),url(${img + (boxbg.itemCards?.[0]?.card?.info?.imageId || boxbg.image)})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "150px"
                        }} >
                        <div className="ratingline">
                            <span><MdStars id='star' /></span>
                            <span>{data2.avgRating}</span>
                            <span>({data2.totalRatingsString})</span>
                            <span id="dot">•</span>
                            <span> {data2.costForTwoMessage}</span>
                        </div>
                        <div className="remaining">
                            <p id="cuisines">{data2.cuisines.join(" , ")}</p>
                            <div><span><b>Outlet</b> -- {data2.locality},</span> <span>{data2.city}</span></div>
                            <p><b>{data2.sla.slaString.toLowerCase()}</b></p>
                        </div>

                    </div>

                    <div className="Deals">
                        <div className="deals-header">
                            <h2>Deals for you..!</h2>

                            <HorizonScroll
                                scrollLeft={scrollLeft}
                                scrollRight={scrollRight}
                            />
                        </div>

                        <div className="deal-list" ref={restRef}>
                            {data3.map((element, index) => (
                                <div className="deal-card" key={index} >
                                    <img src={img + element.info.offerLogo} />

                                    <div className="deal-content">
                                        <span>{element.info.header}</span>
                                        <p>{element.info.couponCode}</p>
                                        <p>{element.info.description}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="recommended">
                        {data4.filter(item => item.card.card.itemCards || item.card.card.categories)
                            .map((element, index) => {
                                return (
                                    <div className="types" key={index}>

                                        <div className="type-header" onClick={() => {
                                            if (!element.card.card.categories) {
                                                toggleSection(index);
                                            }
                                        }}>
                                            <h3>{element.card.card.title}({element.card.card.itemCards ? element.card.card.itemCards.length : element.card.card.categories.length})</h3>
                                            {!element.card.card.categories && (
                                                <MdKeyboardArrowDown
                                                    className={`dropdown-icon ${openSections.includes(index) ? "open" : ""
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className="line"></div>

                                        {openSections.includes(index) && (
                                            <div className="items-list">
                                                {element.card.card.itemCards?.map((item, index) => {
                                                    const cartItem = cartItems.find(
                                                        (i) => i.card.info.id === item.card.info.id
                                                    );

                                                    const quantity = cartItem?.quantity || 0;
                                                    return (
                                                        <div className="item-card" key={item.card.info.id}>
                                                            <div className="item-details">
                                                                <h4>{item.card.info.name}</h4>
                                                                <p className="price"> ₹ {Math.floor((item.card.info.price || item.card.info.defaultPrice) / 100)}</p>
                                                                <div className="rating">
                                                                    <span><MdStars id='star' /></span>
                                                                    <span>{item.card.info.ratings?.aggregatedRating?.rating}</span>
                                                                    <span>({item.card.info.ratings?.aggregatedRating?.ratingCountV2})</span>
                                                                </div>
                                                                <p className="description">
                                                                    {expandedItems[item.card.info.id]
                                                                        ? item.card.info.description
                                                                        : item.card.info.description?.slice(0, 100)}

                                                                    {item.card.info.description?.length > 100 && (
                                                                        <>
                                                                            {!expandedItems[item.card.info.id] && "... "}
                                                                            <span
                                                                                className="more-btn"
                                                                                onClick={() => toggleDescription(item.card.info.id)}
                                                                            >
                                                                                {expandedItems[item.card.info.id] ? "Less" : "More"}
                                                                            </span>
                                                                        </>
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div className="image-wrapper">
                                                                <img className="item-image" src={item.card.info.imageId ? img + item.card.info.imageId : assets.noimage} />
                                                                {quantity === 0 ? (
                                                                    <button
                                                                        className="addButton" onClick={() => dispatch(addItems(item))}
                                                                    >
                                                                        ADD
                                                                    </button>
                                                                ) : (
                                                                    <div className="quantityBox">

                                                                        <button
                                                                            onClick={() =>
                                                                                dispatch(decreaseQuantity(item.card.info.id))
                                                                            }
                                                                        >
                                                                            −
                                                                        </button>

                                                                        <span>{quantity}</span>

                                                                        <button
                                                                            onClick={() =>
                                                                                dispatch(increaseQuantity(item.card.info.id))
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>

                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    )
                                                })}
                                                {
                                                    element.card.card.categories?.map((item, Cindex) => {
                                                        return (
                                                            <div key={item.categoryId}>
                                                                <div
                                                                    className="type-header"
                                                                    onClick={() => toggleSubSection(Cindex)}>
                                                                    <h4 style={{ paddingLeft: '3%' }}>{item.title}({item.itemCards.length})</h4>

                                                                    <MdKeyboardArrowDown
                                                                        className={`dropdown-icon ${openCategories.includes(Cindex) ? "open" : ""}`} />
                                                                </div>

                                                                {openCategories.includes(Cindex) &&
                                                                    item.itemCards.map((item, index) => {
                                                                        const cartItem = cartItems.find(
                                                                            (i) => i.card.info.id === item.card.info.id );

                                                                        const quantity = cartItem?.quantity || 0;

                                                                        return (
                                                                            <div className="item-card" key={item.card.info.id} style={{ paddingLeft: '3.5%' }}>
                                                                                <div className="item-details">
                                                                                    <h3>{item.card.info.name}</h3>
                                                                                    <p className="price"> ₹ {Math.floor((item.card.info.price || item.card.info.defaultPrice) / 100)}</p>
                                                                                    <div className="rating">
                                                                                        <span><MdStars id='star' /></span>
                                                                                        <span>{item.card.info.ratings.aggregatedRating.rating}</span>
                                                                                        <span>({item.card.info.ratings.aggregatedRating.ratingCountV2})</span>
                                                                                    </div>
                                                                                    <p className="description">
                                                                                        {expandedItems[item.card.info.id]
                                                                                            ? item.card.info.description
                                                                                            : item.card.info.description?.slice(0, 100)}

                                                                                        {item.card.info.description?.length > 100 && (
                                                                                            <>
                                                                                                {!expandedItems[item.card.info.id] && "... "}
                                                                                                <span
                                                                                                    className="more-btn"
                                                                                                    onClick={() => toggleDescription(item.card.info.id)}
                                                                                                >
                                                                                                    {expandedItems[item.card.info.id] ? "Less" : "More"}
                                                                                                </span>
                                                                                            </>
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                                <div className="image-wrapper">
                                                                                    <img className="item-image" src={item.card.info.imageId ? img + item.card.info.imageId : assets.noimage} />
                                                                                    {quantity === 0 ? (
                                                                                        <button
                                                                                            className="addButton"
                                                                                            onClick={() => dispatch(addItems(item))}
                                                                                        >
                                                                                            ADD
                                                                                        </button>
                                                                                    ) : (
                                                                                        <div className="quantityBox">

                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    dispatch(decreaseQuantity(item.card.info.id))
                                                                                                }
                                                                                            >
                                                                                                −
                                                                                            </button>

                                                                                            <span>{quantity}</span>

                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    dispatch(increaseQuantity(item.card.info.id))
                                                                                                }
                                                                                            >
                                                                                                +
                                                                                            </button>

                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>

                                                        )

                                                    })
                                                }

                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        }

                        {
                            <div className="restaurant-footer">
                                <div className="footer-brand">
                                    <img className="footer-logo" src={img + foot1.card.card.imageId} alt="" />
                                    <div className="footer-brand-text">{foot1.card.card.text}</div>
                                </div>
                                <hr />
                                <div className="footer-outlet">
                                    <div className="outlet-name">{foot2.card.card.name}</div>
                                    <div className="outlet-area"><b>Outlet : </b> {foot2.card.card.area.toLowerCase()}</div>
                                    <div className="address">
                                        <FaLocationDot className="locationicon" />
                                        <div className="outlet-address" >{foot2.card.card.completeAddress.toLowerCase()}</div>
                                    </div>
                                    <hr />
                                </div>

                            </div>
                        }




                    </div>



                </div>

            </div>

            {/* <div className="cart-box">

                            <Cart/>
                        </div> */}

        </div>
    );
};

export default RestaurantMenu;

