import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { addItems, increaseQuantity, decreaseQuantity, } from "../../redux/cartSlice";

import { resMenuData } from "../../assets/resMockData";
import { MdStars } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./RestaurantMenu.css"
import HorizonScroll from "../../components/HorizonScroll/HorizonScroll";
import { assets } from "../../assets/assets";
import Navbar from "../../components/Navbar/Navbar";
import CartIndicator from "../../components/CartIndicator/CartIndicator";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import RestaurantMenuShimmer from "../../components/Shimmer/RestaurantMenuShimmer";
import { MEDIA_ASSETS_URL } from "../../utils/constants";
import { filterMenuGroupCards } from "../../utils/search";


const RestaurantMenu = () => {


    const restRef = useRef(null);
    const [menuData, setMenuData] = useState(null);

    const [openSections, setOpenSections] = useState([]);
    const [openCategories, setOpenCategories] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const searchText = useSelector((state) => state.search.text);

    const { id } = useParams();

    useEffect(() => {
        const result = resMenuData.find(
            (element) => id === element.data.cards[2].card.card.info.id
        );

        setTimeout(() => {
            setMenuData(result);

            const data4 =
                result.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;

            // Open every section and every nested sub-category by default,
            // keyed the same way the render checks them (section index, and
            // `${sectionIndex}-${categoryIndex}` for nested categories).
            const sections = data4.filter(
                (item) => item.card.card.itemCards || item.card.card.categories
            );

            setOpenSections(sections.map((_, index) => index));

            setOpenCategories(
                sections.flatMap((item, sectionIndex) =>
                    item.card.card.categories?.map(
                        (_, categoryIndex) => `${sectionIndex}-${categoryIndex}`
                    ) || []
                )
            );

        }, 2000);
    }, [id]);


    if (!menuData) {
        return (
            <>
                <Navbar />
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
    const data2 = menuData.data.cards[2].card.card.info;
    const data3 = menuData.data.cards[3].card.card.gridElements.infoWithStyle.offers;
    const data4 = menuData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;

    const boxbg = menuData.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card;

    const foot1 = data4[data4.length - 2];
    const foot2 = data4[data4.length - 1];

    // Real-time, case-insensitive menu filtering. When searching, sections and
    // sub-categories are force-expanded so matches are visible; an empty query
    // falls back to the untouched menu.
    const menuQuery = searchText.trim().toLowerCase();
    const displayGroupCards = menuQuery
        ? filterMenuGroupCards(data4, menuQuery)
        : data4;
    const menuSections = displayGroupCards.filter(
        (item) => item.card.card.itemCards || item.card.card.categories
    );
    const noDishMatches = menuQuery.length > 0 && menuSections.length === 0;



    let img = MEDIA_ASSETS_URL
    return (
        <div className="the-one">
            <Navbar />
            <CartIndicator />
            <ScrollToTop />


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
                        {noDishMatches ? (
                            <div className="no-results">No dishes found.</div>
                        ) : (
                            menuSections.map((element, index) => {
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
                                                    className={`dropdown-icon ${(menuQuery || openSections.includes(index)) ? "open" : ""
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <div className="line"></div>

                                        {(menuQuery || openSections.includes(index)) && (
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
                                                        const catKey = `${index}-${Cindex}`;
                                                        return (
                                                            <div key={item.categoryId}>
                                                                <div
                                                                    className="type-header"
                                                                    onClick={() => toggleSubSection(catKey)}>
                                                                    <h4 style={{ paddingLeft: '3%' }}>{item.title}({item.itemCards.length})</h4>

                                                                    <MdKeyboardArrowDown
                                                                        className={`dropdown-icon ${(menuQuery || openCategories.includes(catKey)) ? "open" : ""}`} />
                                                                </div>

                                                                {(menuQuery || openCategories.includes(catKey)) &&
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
                        )}

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

        </div>
    );
};

export default RestaurantMenu;

