import React from 'react'
import "./HorizonScroll.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HorizonScroll = ({scrollLeft,scrollRight}) => {
  return (
    <div className='scrollbtn'>
        <button onClick={scrollLeft}><FaChevronLeft/></button>
        <button onClick={scrollRight}><FaChevronRight/></button>
    </div>
  )
}

export default HorizonScroll