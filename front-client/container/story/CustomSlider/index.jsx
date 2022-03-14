import { PColor } from 'public/colors';
import { IconArrowLeft, IconArrowRight } from 'public/icons';
import React, { useEffect, useRef, useState } from 'react';
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled';

export const CustomSlider = props => {
    const {
        state,
        dispatch,
        duration,
        autoPlayTime,
        data,
        handleAddFeature } = props
    const div = useRef();
    const [activeArrow, setActiveArrow] = useState({})
    useEffect(() => {
        const timer = setTimeout(() => {
            if (state?.currentIndex < data?.length - 1) {
                dispatch({ type: 'NEXT' });
            } else {
                dispatch({ type: 'RESET' });
            }
        }, autoPlayTime);
        return () => clearTimeout(timer);
    }, [state]);
    return (
        <>

            <SliderContainer onMouseOut={() => setActiveArrow(true)} onMouseOver={() => setActiveArrow(false)}>
                <SliderWrapper
                    // 500ms
                    style={{
                        transform: `translateX(${ -(state?.currentIndex * div.current?.clientWidth) }px)`,
                        transition: `transform ${ duration } ease 0s`,
                    }}
                >
                    {data && data?.map((i, index) => {
                        return (
                            <Slide
                                div={div}
                                key={i.fId}
                                index={index}
                                item={i}
                                dispatch={dispatch}
                            />
                        );
                    })}
                </SliderWrapper>
                <Navigation>
                    {data && data.map((i, index) => {
                        return (
                            <NavigationItem
                                active={index === state?.currentIndex}
                                onClick={() => dispatch({ type: 'GOTO', index })} key={`nav${ i.fId }`} >
                            </NavigationItem>
                        );
                    })}
                </Navigation>
                <div>
                    <ControlLeft display={activeArrow} onClick={() => state?.currentIndex > 1 && dispatch({ type: 'PREV' })}><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
                    <ControlRight display={activeArrow} onClick={() => state?.currentIndex < data?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
                </div>
            </SliderContainer>
        </>
    );
};

const Slide = ({ item, div }) => {
    console.log(item)
    return (
        <>
            <SliderItem ref={div}>
                <ContentList>
                    <i>{'item.typeFeature.thpName'} </i> &nbsp;
                    <i>{'item.hpqrQuestion'}</i>
                </ContentList>
            </SliderItem>
        </>
    );
};