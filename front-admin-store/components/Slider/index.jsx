import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import Slider from 'react-slick'
import { BGColor, PColor } from '../../public/colors'
import { IconArrowLeft, IconArrowRight } from '../../public/icons'
const CustomSlider = ({ children, responsive, pagination, pauseOnDotsHover, slidesToShow, touchMove = true, autoplay = false, dots = false, infinite, vertical, direction }) => {return (

  <Slider
    autoplay={autoplay}
    direction={direction}
    dots={dots}
    focusOnSelect={true}
    // rows={false || 2}
    infinite={infinite || false}
    // fade={true}
    lazyLoad={'progressive'}
    nextArrow={<CustomArrow icon={<IconArrowRight color={PColor} size='20px' />} />}
    pagination={pagination || { clickable: true }}
    pauseOnDotsHover={pauseOnDotsHover || false}
    pauseOnHover
    prevArrow={<CustomArrow icon={<IconArrowLeft color={PColor} size='20px' />} next />}
    responsive={responsive ? responsive : [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false
        }
      }
    ]}
    slidesPerColumn={1}
    slidesPerView={3}
    // spaceBetween={spaceBetween || 0}
    // slidesPerView={1}
        
    slidesToShow={slidesToShow}
    // slidesPerGroup={4}
    // direction={direction || 'horizontal'}
    spaceBetween={30}
    // autoplay={autoplay}
    // breakpoints={breakpoints}
    speed={600}
    swipeToSlide={true}
    touchMove={touchMove}
    vertical={vertical}
  >
    {children}
  </Slider>
)}

CustomSlider.propTypes = {
  arrows: PropTypes.any,
  autoplay: PropTypes.bool,
  centerMode: PropTypes.any,
  children: PropTypes.any,
  direction: PropTypes.any,
  dots: PropTypes.bool,
  infinite: PropTypes.bool,
  pagination: PropTypes.shape({
    clickable: PropTypes.bool
  }),
  pauseOnDotsHover: PropTypes.bool,
  responsive: PropTypes.any,
  slidesToShow: PropTypes.any,
  spaceBetween: PropTypes.any,
  touchMove: PropTypes.bool,
  vertical: PropTypes.any
}

// CustomSlider.propTypes = {

// }

export const CustomArrow = ({ onClick, next, icon }) => {return (
  !!onClick && <IconNext next={next} onClick={onClick}>{icon}</IconNext>
)}

CustomArrow.propTypes = {
  icon: PropTypes.any,
  next: PropTypes.any,
  onClick: PropTypes.any
}

const IconNext = styled.div`
    background: ${BGColor};
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    ${({ next }) => {return next ? css`left: -15px;` : css`right: -15px;`}}
    display: flex;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.19);
    align-items: center;
    justify-content: center;
    padding: 0;
    z-index: 99;
    border-radius: 100%;
    width: 40px;
    height: 40px;
    cursor: pointer;
   
    @media(min-width: 768px){
        width: 64px;
        height: 64px;
        ${({ next }) => {return next ? css`left: 0px;` : css`right: 0px;`}}
    }

`

export default CustomSlider