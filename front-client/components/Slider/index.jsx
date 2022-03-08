import React from 'react'
import styled, { css } from 'styled-components'
import Slider from 'react-slick'
import { BGColor, PColor } from '../../public/colors'
import { IconArrowLeft, IconArrowRight } from '../../public/icons'
// import PropTypes from 'prop-types'

const CustomSlider = ({ children, spaceBetween, slidesToShow, touchMove = true, autoplay = false, dots = false, centerMode, infinite, arrows, vertical, direction  }) => (
    <Slider
        dots={dots}
        autoplay={autoplay}
        speed={600}
        // fade={true}
        vertical={vertical}
        direction={direction}
        slidesToShow={slidesToShow}
        infinite={infinite || false}
        pauseOnHover
        touchMove={touchMove}
        prevArrow={<CustomArrow icon={<IconArrowLeft size='20px' color={ PColor } />} next />}
        nextArrow={<CustomArrow icon={<IconArrowRight size='20px' color={ PColor} />} />}
        swipeToSlide={true}
        responsive={[
            { breakpoint: 920,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            { breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
        ]}
    >
        { children }
    </Slider>
)

// CustomSlider.propTypes = {

// }

const CustomArrow = ({ onClick, next, icon }) => (
    !!onClick && <IconNext onClick={onClick} next={next}>{icon}</IconNext>
)

const IconNext = styled.div`
    background: ${BGColor};
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    ${ ({ next }) => next ? css`left: -15px;` : css`right: -15px;` }
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
        ${ ({ next }) => next ? css`left: 0px;` : css`right: 0px;` }
    }

`

export default CustomSlider