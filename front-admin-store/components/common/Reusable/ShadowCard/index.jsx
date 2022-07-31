import PropTypes from 'prop-types'
import { TextH2Main } from 'components/common/h2'
import React from 'react'
import { ShadowCardContainer } from './styles'

export const MainCard = ({ children, title, noneShadow, display, width, weight, size }) => {
  return (
    <div style={{ display: display, width: width }}>
      <TextH2Main
        size={size}
        text={title}
        weight={weight}
      />
      {/* <HeadCard>{title}</HeadCard> */}
      <ShadowCardContainer noneShadow={noneShadow}>
        <div>
          {children}
        </div>
      </ShadowCardContainer>
    </div>
  )
}
MainCard.propTypes = {
  children: PropTypes.any,
  display: PropTypes.any,
  noneShadow: PropTypes.any,
  size: PropTypes.any,
  title: PropTypes.any,
  weight: PropTypes.any,
  width: PropTypes.any
}
