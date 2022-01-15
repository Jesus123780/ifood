import React, { useEffect, useReducer, useRef } from 'react';
import { PColor } from '../../../../public/colors';
// import { PColor } from '../../../../assets/colors';
import { IconArrowLeft, IconArrowRight } from '../../../../public/icons';
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled';

export const SliderAreas = props => {
    const {
        duration,
        autoPlayTime,
        modal,
        finalDataAreas,
        handleAddFeature } = props
    const div = useRef();
    function reducer(state, action) {
        switch (action?.type) {
        case 'NEXT':
            return {
                ...state,
                currentIndex: state?.currentIndex + (1 % finalDataAreas?.length),

            };
        case 'PREV':
            return {
                ...state,
                currentIndex: state?.currentIndex - (1 % finalDataAreas?.length)
            };
        case 'GOTO':
            return {
                ...state,
                currentIndex: action?.index
            };
        case 'RESET':
            return { ...state, currentIndex: 0, currentPosition: 0, };

        default:
            return { state };
        }
    }
    const [state, dispatch] = useReducer(reducer, {
        currentIndex: 0,
    })
    useEffect(() => {
        const timer = setTimeout(() => {
            if (state?.currentIndex < finalDataAreas?.length - 1) {
                dispatch({ type: 'NEXT' });
            } else {
                dispatch({ type: 'RESET' });
            }
        }, autoPlayTime);
        return () => clearTimeout(timer);
    }, [state]);
    return (
        <>

            <SliderContainer modal={modal} >
                <SliderWrapper
                    // 500ms
                    style={{
                        transform: `translateX(${ -(state?.currentIndex * div.current?.clientWidth) }px)`,
                        transition: `transform ${ duration } ease 0s`,
                    }}
                >
                    {finalDataAreas && finalDataAreas?.map((i, index) => {
                        return (
                            <Slide
                                div={div}
                                key={i.aId}
                                index={index}
                                item={i}
                                dispatch={dispatch}
                                handleAddFeature={handleAddFeature}
                            />
                        );
                    })}
                </SliderWrapper>
                <Navigation>
                    {finalDataAreas && finalDataAreas.map((i, index) => {
                        return (
                            <NavigationItem
                                active={index === state?.currentIndex}
                                onClick={() => dispatch({ type: 'GOTO', index })} key={`nav${ i.aId }`} >
                            </NavigationItem>
                        );
                    })}
                </Navigation>
                <div>
                    <ControlLeft onClick={() => state?.currentIndex > 1 && dispatch({ type: 'PREV' })}><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
                    <ControlRight onClick={() => state?.currentIndex < finalDataAreas?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
                </div>
            </SliderContainer>
        </>
    );
};

const Slide = ({ item, div, handleAddFeature }) => {
    return (
        <SliderItem ref={div} onClick={() => handleAddFeature(item.fId)}>
            <ContentList>
                <i>{item.aName} </i> &nbsp;
            </ContentList>
        </SliderItem>
    );
};