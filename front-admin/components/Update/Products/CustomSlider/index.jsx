import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { PColor } from '../../../../public/colors'
// import { PColor } from '../../../../assets/colors';
import { IconArrowLeft, IconArrowRight } from '../../../../public/icons'
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled'

export const CustomSlider = props => {
  const {
    state,
    dispatch,
    duration,
    autoPlayTime,
    modal,
    datafatures,
    handleAddFeature } = props
  const div = useRef()
  const [activeArrow, setActiveArrow] = useState({})
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state?.currentIndex < datafatures?.length - 1) {
        dispatch({ type: 'NEXT' })
      } else {
        dispatch({ type: 'RESET' })
      }
    }, autoPlayTime)
    return () => {return clearTimeout(timer)}
  }, [autoPlayTime, datafatures?.length, dispatch, state])
  return (
    <>

      <SliderContainer
        modal={modal}
        onMouseOut={() => {return setActiveArrow(true)}}
        onMouseOver={() => {return setActiveArrow(false)}}
      >
        <SliderWrapper
          // 500ms
          style={{
            transform: `translateX(${ -(state?.currentIndex * div.current?.clientWidth) }px)`,
            transition: `transform ${ duration } ease 0s`
          }}
        >
          {datafatures && datafatures?.map((i, index) => {
            return (
              <Slide
                dispatch={dispatch}
                div={div}
                handleAddFeature={handleAddFeature}
                index={index}
                item={i}
                key={i.fId}
              />
            )
          })}
        </SliderWrapper>
        <Navigation>
          {datafatures && datafatures.map((i, index) => {
            return (
              <NavigationItem
                active={index === state?.currentIndex}
                key={`nav${ i.fId }`}
                onClick={() => {return dispatch({ type: 'GOTO', index })}}
              >
              </NavigationItem>
            )
          })}
        </Navigation>
        <div>
          <ControlLeft display={activeArrow} onClick={() => {return state?.currentIndex > 1 && dispatch({ type: 'PREV' })}}><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
          <ControlRight display={activeArrow} onClick={() => {return state?.currentIndex < datafatures?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
        </div>
      </SliderContainer>
    </>
  )
}

CustomSlider.propTypes = {
  autoPlayTime: PropTypes.any,
  datafatures: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  dispatch: PropTypes.func,
  duration: PropTypes.any,
  handleAddFeature: PropTypes.any,
  modal: PropTypes.any,
  state: PropTypes.shape({
    currentIndex: PropTypes.number
  })
}

const Slide = ({ item, div, handleAddFeature }) => {
  return (
    <>
      <SliderItem onClick={() => {return handleAddFeature(item.fId)}} ref={div}>
        <ContentList>
          <i>{item.typeFeature.thpName} </i> &nbsp;
          <i>{item.hpqrQuestion}</i>
        </ContentList>
      </SliderItem>
    </>
  )
}
Slide.propTypes = {
  div: PropTypes.any,
  handleAddFeature: PropTypes.func,
  item: PropTypes.shape({
    fId: PropTypes.any,
    hpqrQuestion: PropTypes.any,
    typeFeature: PropTypes.shape({
      thpName: PropTypes.any
    })
  })
}
