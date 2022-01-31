import React, { useEffect, useRef, useState } from 'react';
import { PColor } from '../../../../public/colors';
// import { PColor } from '../../../../assets/colors';
import { IconArrowLeft, IconArrowRight } from '../../../../public/icons';
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled';

export const CustomSlider = props => {
    const {
        state,
        dispatch,
        duration,
        autoPlayTime,
        modal,
        datafatures,
        handleAddFeature } = props
    const div = useRef();
    const [activeArrow, setActiveArrow] = useState({})
    useEffect(() => {
        const timer = setTimeout(() => {
            if (state?.currentIndex < datafatures?.length - 1) {
                dispatch({ type: 'NEXT' });
            } else {
                dispatch({ type: 'RESET' });
            }
        }, autoPlayTime);
        return () => clearTimeout(timer);
    }, [state]);
    return (
        <>

            <SliderContainer modal={modal} onMouseOut={() => setActiveArrow(true)} onMouseOver={() => setActiveArrow(false)}>
                <SliderWrapper
                    // 500ms
                    style={{
                        transform: `translateX(${ -(state?.currentIndex * div.current?.clientWidth) }px)`,
                        transition: `transform ${ duration } ease 0s`,
                    }}
                >
                    {datafatures && datafatures?.map((i, index) => {
                        return (
                            <Slide
                                div={div}
                                key={i.fId}
                                index={index}
                                item={i}
                                dispatch={dispatch}
                                handleAddFeature={handleAddFeature}
                            />
                        );
                    })}
                </SliderWrapper>
                <Navigation>
                    {datafatures && datafatures.map((i, index) => {
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
                    <ControlRight display={activeArrow} onClick={() => state?.currentIndex < datafatures?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
                </div>
            </SliderContainer>
        </>
    );
};

const Slide = ({ item, div, handleAddFeature }) => {
    return (
        <>
            <SliderItem ref={div} onClick={() => handleAddFeature(item.fId)}>
                <ContentList>
                    <i>{item.typeFeature.thpName} </i> &nbsp;
                    <i>{item.hpqrQuestion}</i>
                </ContentList>
            </SliderItem>
        </>
    );
};