import PropTypes from 'prop-types'
import React, { useReducer, useRef } from 'react'
import { SliderItem, SliderContainer, SliderWrapper, Navigation, NavigationItem, ControlLeft, ControlRight, ContentList } from './styled'
import { CardCheckBox, Img } from '../styled'
import { PColor } from '../../../../public/colors'
import { IconArrowLeft, IconArrowRight } from '../../../../public/icons'

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
          currentIndex: state?.currentIndex + (1 % dataCategories?.length)

        }
      case 'PREV':
        return {
          ...state,
          currentIndex: state?.currentIndex - (1 % dataCategories?.features?.length)
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
  const div = useRef()
  return (
    <>

      <SliderContainer modal={modal} >
        <SliderWrapper
          // 500ms
          style={{
            transform: `translateX(${-(state?.currentIndex * div.current?.clientWidth)}px)`,
            transition: `transform ${duration} ease 0s`
          }}
        >
          {dataCategories && dataCategories?.map((i, index) => {
            return (
              <Slide
                dispatch={dispatch}
                div={div}
                handleChangeClick={handleChangeClick}
                index={index}
                item={i}
                key={i.caId}
              />
            )
          })}
        </SliderWrapper>
        <Navigation>
          {dataCategories && dataCategories.map((i, index) => {
            return (
              <NavigationItem
                active={index === state?.currentIndex}
                key={`nav${i.caId}`}
                onClick={() => {return dispatch({ type: 'GOTO', index })}}
              >
              </NavigationItem>
            )
          })}
        </Navigation>
        <div>
          <ControlLeft onClick={() => {return state?.currentIndex > 1 && dispatch({ type: 'PREV' })}} type='button'><IconArrowLeft color={PColor} size={'20px'} /></ControlLeft>
          <ControlRight onClick={() => {return state?.currentIndex < dataCategories?.length - 1 ? dispatch({ type: 'NEXT' }) : dispatch({ type: 'RESET' })}} type='button'><IconArrowRight color={PColor} size={'20px'} /></ControlRight>
        </div>
      </SliderContainer>
    </>
  )
}

SliderCategoryUpdate.propTypes = {
  dataCategories: PropTypes.shape({
    features: PropTypes.shape({
      length: PropTypes.any
    }),
    length: PropTypes.number,
    map: PropTypes.func
  }),
  duration: PropTypes.any,
  handleChangeClick: PropTypes.any,
  modal: PropTypes.any
}

const Slide = ({ item, div, handleChangeClick }) => {
  return (
    <SliderItem ref={div} >
      <Img alt={item?.cpImage} src={item?.cpImage} />
      <ContentList>
        <CardCheckBox
          id='cat'
          name='speciality'
          onChange={handleChangeClick}
          type='checkbox'
          value={item?.caId}
        />
        <i>{item.cpName} </i> &nbsp;
      </ContentList>
    </SliderItem>
  )
}
Slide.propTypes = {
  div: PropTypes.any,
  handleChangeClick: PropTypes.any,
  item: PropTypes.shape({
    caId: PropTypes.any,
    cpImage: PropTypes.any,
    cpName: PropTypes.any
  })
}
