import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

export const TextH2Main = ({ text, size, align, lineHeight, padding, margin, color, font, weight, ...props }) => {
  return <TextH2
    align={align}
    color={color}
    font={font}
    lineHeight={lineHeight}
    margin={margin}
    padding={padding}
    props={props}
    size={size}
    weight={weight}
  >{text}</TextH2>
}

TextH2Main.propTypes = {
  align: PropTypes.any,
  color: PropTypes.any,
  font: PropTypes.any,
  lineHeight: PropTypes.any,
  margin: PropTypes.any,
  padding: PropTypes.any,
  size: PropTypes.any,
  text: PropTypes.any,
  weight: PropTypes.any
}

const TextH2 = styled.h2`
  line-height: 1.15;
  text-rendering: optimizeLegibility;
    font-size: ${({ size }) => {return size || '1.5rem'}};
    text-align:  ${({ align }) => {return align || 'start'}};
    height: min-content;
    ${({ lineHeight }) => {return lineHeight && css`line-height: ${lineHeight};`}}
    font-weight: 400;
    ${({ weight }) => {return weight && css`font-weight: ${weight};`}}
    ${({ padding }) => {return padding && css`padding: ${padding};`}}
    margin: ${({ margin }) => {return margin || '0'}};
    color: ${({ color }) => {return color || '#3f3e3e   '}};
    display: flex;
    font-family: ${({ font }) => {return font || 'PFont-Light'}};
    word-break: break-word;
    /* font-family: PFont-Light; */
`