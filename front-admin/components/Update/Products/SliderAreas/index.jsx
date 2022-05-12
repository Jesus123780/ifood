import PropTypes from 'prop-types'
import React, { useEffect, useReducer, useRef } from 'react'
import { PColor } from '../../../../public/colors'
import { IconArrowLeft, IconArrowRight } from '../../../../public/icons'
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled'

export const SliderAreas = props => {
  const {
    duration,
    autoPlayTime,
    modal,
    finalDataAreas,
    handleAddFeature } = props
  const div = useRef()
  function reducer(state, action) {
    switch (action?.type) {
      case 'NEXT':
        return {
          ...state,
          currentIndex: state?.currentIndex + (1 % finalDataAreas?.length)

        }
      case 'PREV':
        return {
          ...state,
          currentIndex: state?.currentIndex - (1 % finalDataAreas?.length)
        }
      case 'GOTO':
        return {
          ...state,
          currentIndex: action?.index
        }
      case 'RESET':
        return { ...state, currentIndex: 0, currentPosition: 0 }

      default:
        return { state }
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0
  })
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state?.currentIndex < finalDataAreas?.length - 1) {
        dispatch({ type: 'NEXT' })
      } else {
        dispatch({ type: 'RESET' })
      }
    }, autoPlayTime)
    return () => {return clearTimeout(timer)}
  }, [autoPlayTime, finalDataAreas?.length, state])
  return (
    <>

      <SliderContainer modal={modal} >
        <SliderWrapper
          // 500ms
          style={{
            transform: `translateX(${ -(state?.currentIndex * div.current?.clientWidth) }px)`,
            transition: `transform ${ duration } ease 0s`
          }}
        >
          {finalDataAreas && finalDataAreas?.map((i, index) => {
            return (
              <Slide
                dispatch={dispatch}
                div={div}
                handleAddFeature={handleAddFeature}
                index={index}
                item={i}
                key={i.aId}
              />
            )
          })}
        </SliderWrapper>
        <Navigation>
          {finalDataAreas && finalDataAreas.map((i, index) => {
            return (
              <NavigationItem
                active={index === state?.currentIndex}
                key={`nav${ i.aId }`}
                onClick={() => {return dispatch({ type: 'GOTO', index })}}
              >
              </NavigationItem>
            )
          })}
        </Navigation>
        <div>
          <ControlLeft onClick={() => {return state?.currentIndex > 1 && dispatch({ type: 'PREV' })}}><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
          <ControlRight onClick={() => {return state?.currentIndex < finalDataAreas?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}}><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
        </div>
      </SliderContainer>
    </>
  )
}

SliderAreas.propTypes = {
  autoPlayTime: PropTypes.any,
  duration: PropTypes.any,
  finalDataAreas: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  handleAddFeature: PropTypes.any,
  modal: PropTypes.any
}

const Slide = ({ item, div, handleAddFeature }) => {
  return (
    <SliderItem onClick={() => {return handleAddFeature(item.fId)}} ref={div}>
      <ContentList>
        <i>{item.aName} </i> &nbsp;
      </ContentList>
    </SliderItem>
  )
}

Slide.propTypes = {
  div: PropTypes.any,
  handleAddFeature: PropTypes.func,
  item: PropTypes.shape({
    aName: PropTypes.any,
    fId: PropTypes.any
  })
}
