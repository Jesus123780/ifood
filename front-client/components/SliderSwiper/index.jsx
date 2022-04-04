import { PColor } from 'public/colors'
import { IconArrowLeft, IconArrowRight } from 'public/icons'
import React, { useRef } from 'react'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper } from 'swiper/react'
import { SlideBar, SwiperButton } from './styled'
// import { Swiper } from 'swiper/react'
// import { SlideBar, SwiperButton } from './styled'
// import { PColor } from 'public/colors'
// import { IconArrowLeft, IconArrowRight } from 'public/icons'

// Swiper Core Opciones
SwiperCore.use([Autoplay, Pagination, Navigation])

export const SliderSwiper = ({ square, loading, loadingComponent, children, spaceBetween, slidesPerView, slidesPerColumn, slidesPerGroup, autoplay, pagination, direction, breakpoints, keySwiper, onChangeIndex = () => undefined }) => {
    const prevRef = useRef(undefined)
    const nextRef = useRef(undefined)
    return (
        <div>
            <SlideBar>
                <Swiper
                    spaceBetween={spaceBetween || 0}
                    slidesPerView={slidesPerView || 1}
                    slidesPerColumn={slidesPerColumn || 1}
                    slidesPerGroup={slidesPerGroup || 4}
                    direction={direction || 'horizontal'}
                    pagination={pagination || { clickable: true }}
                    autoplay={autoplay}
                    breakpoints={breakpoints}
                    onInit={swiper => {
                        swiper.params.navigation.prevEl = prevRef.current
                        swiper.params.navigation.nextEl = nextRef.current
                        swiper.navigation.update()
                    }}

                    key={keySwiper}
                    onActiveIndexChange={onChangeIndex}
                >
                    {children}
                    {square
                        ? <>
                            <SwiperButton radius='8px' height='80px' width='50px' ref={prevRef} prev><IconArrowLeft size='20px' color={PColor} /></SwiperButton>
                            <SwiperButton radius='8px' height='80px' width='50px' ref={nextRef}><IconArrowRight size='20px' color={PColor} /></SwiperButton>
                        </>
                        : <>
                            <SwiperButton ref={prevRef} prev><IconArrowLeft size='20px' color={PColor} /></SwiperButton>
                            <SwiperButton ref={nextRef}><IconArrowRight size='20px' color={PColor} /></SwiperButton>
                        </>
                    }
                </Swiper>
            </SlideBar>
        </div >
    )
}