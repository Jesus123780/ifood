import React from 'react'
import styled, { css } from 'styled-components'

export const TextH2Main = ({ text, size, align, lineHeight, padding, margin, color, font, weight, ...props }) => {
  return <TextH2
    props={props}
    size={size}
    align={align}
    lineHeight={lineHeight}
    padding={padding}
    margin={margin}
    font={font}
    weight={weight}
    color={color}
  >{text}</TextH2>
}

const TextH2 = styled.h2`
  line-height: 1.15;
  
  text-rendering: optimizeLegibility;

    font-size: ${({ size }) => size || '1.5rem'};
    text-align:  ${({ align }) => align || 'start'};
    height: min-content;
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    font-weight: 400;
    ${({ weight }) => weight && css`font-weight: ${weight};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || '#3f3e3e   '};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Light'};
    word-break: break-word;
    /* font-family: PFont-Light; */
`