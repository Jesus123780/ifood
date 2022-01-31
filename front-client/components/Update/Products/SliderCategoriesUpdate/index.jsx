import React, { useReducer, useRef } from 'react';
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled';
import { CardCheckBox, Img } from '../styled';
import { PColor } from '../../../../public/colors';
import { IconArrowLeft, IconArrowRight } from '../../../../public/icons';

export const SliderCategoryUpdate = props => {
    const {
        duration,
        modal,
        dataCategories,
        handleChangeClick
    } = props
    function reducer(state, action) {
        switch (action?.type) {
        case 'NEXT':
            return {
                ...state,
                currentIndex: state?.currentIndex + (1 % dataCategories?.length),

            };
        case 'PREV':
            return {
                ...state,
                currentIndex: state?.currentIndex - (1 % dataCategories?.features?.length)
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
    const div = useRef();
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
                    {dataCategories && dataCategories?.map((i, index) => {
                        return (
                            <Slide
                                div={div}
                                key={i.caId}
                                index={index}
                                item={i}
                                dispatch={dispatch}
                                handleChangeClick={handleChangeClick}
                            />
                        );
                    })}
                </SliderWrapper>
                <Navigation>
                    {dataCategories && dataCategories.map((i, index) => {
                        return (
                            <NavigationItem
                                active={index === state?.currentIndex}
                                onClick={() => dispatch({ type: 'GOTO', index })} key={`nav${ i.caId }`} >
                            </NavigationItem>
                        );
                    })}
                </Navigation>
                <div>
                    <ControlLeft type='button' onClick={() => state?.currentIndex > 1 && dispatch({ type: 'PREV' })}><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
                    <ControlRight type='button' onClick={() => state?.currentIndex < dataCategories?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
                </div>
            </SliderContainer>
        </>
    );
};

const Slide = ({ item, div, handleChangeClick }) => {
    return (
        <SliderItem ref={div} >
            <Img src={item?.cpImage} alt={item?.cpImage}/>
            <ContentList>
                <CardCheckBox name='speciality' value={item?.caId} type="checkbox" id="cat" onChange={handleChangeClick} />
                <i>{item.cpName} </i> &nbsp;
            </ContentList>
        </SliderItem>
    );
};