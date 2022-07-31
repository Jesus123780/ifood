import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export const Input = ({ children, ...props }) => {
    return (
        <InputView {...props}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange} />
    )
}

Input.propTypes = {
    children: PropTypes.node
}


const InputView = styled.input`
    ${({ lineHeight }) => { return lineHeight && css`line-height: ${lineHeight};` }}
    ${({ height }) => { return height && css`height: ${height};` }}
    ${({ zIndex }) => { return zIndex && css`z-index: ${zIndex};` }}
    ${({ minHeight }) => { return minHeight && css`min-height: ${minHeight};` }}
    ${({ minWidth }) => { return minWidth && css`min-width: ${minWidth};` }}
    ${({ width }) => { return width && css`width: ${width};` }}
    ${({ maxWidth }) => { return maxWidth && css`max-width: ${maxWidth};` }}
    ${({ padding }) => { return padding && css`padding: ${padding};` }}
    ${({ margin }) => { return margin && css`margin: ${margin};` }}
    ${({ align }) => { return align && css`text-align: ${align};` }}
    ${({ fontSize }) => { return fontSize && css`font-size: ${fontSize};` }}
    ${({ color }) => { return color && css`color: ${color};` }}
    ${({ fontFamily }) => { return fontFamily && css`font-family: ${fontFamily};` }}
    ${({ fontWeight }) => { return fontWeight && css`font-weight: ${fontWeight};` }}
    ${({ textDecoration }) => { return textDecoration && css`text-decoration: ${textDecoration};` }}
    ${({ textTransform }) => { return textTransform && css`text-transform: ${textTransform};` }}
    ${({ justifyContent }) => { return justifyContent && css`justify-content: ${justifyContent};` }}
    ${({ display }) => { return display && css`display: ${display};` }}
    ${({ flexDirection }) => { return flexDirection && css`flex-direction: ${flexDirection};` }}
    ${({ flexWrap }) => { return flexWrap && css`flex-wrap: ${flexWrap};` }}
    ${({ flexBasis }) => { return flexBasis && css`flex-basis: ${flexBasis};` }}
    ${({ flexGrow }) => { return flexGrow && css`flex-grow: ${flexGrow};` }}
    ${({ flexShrink }) => { return flexShrink && css`flex-shrink: ${flexShrink};` }}
    ${({ gridTemplateRows }) => { return gridTemplateRows && css`grid-template-rows: ${gridTemplateRows};` }}
    ${({ gridTemplateAreas }) => { return gridTemplateAreas && css`grid-template-areas: ${gridTemplateAreas};` }}
    ${({ gridTemplateColumns }) => { return gridTemplateColumns && css`grid-template-columns: ${gridTemplateColumns};` }}
    ${({ gridTemplate }) => { return gridTemplate && css`grid-template: ${gridTemplate};` }}
    ${({ gridGap }) => { return gridGap && css`gap: ${gridGap};` }}
    ${({ border }) => { return border && css`border: ${border};` }}
    ${({ textOverflow }) => { return textOverflow && css`text-overflow: ${textOverflow};` }}
    ${({ borderRadius }) => { return borderRadius && css`border-radius: ${borderRadius};` }}
    ${({ background }) => { return background && css`background: ${background};` }}
    ${({ backgroundColor }) => { return backgroundColor && css`background-color: ${backgroundColor};` }}
    ${({ backgroundImage }) => { return backgroundImage && css`background-image: ${backgroundImage};` }}
    ${({ position }) => { return position && css`position: ${position};` }}
    ${({ left }) => { return left && css`left: ${left};` }}
    ${({ top }) => { return top && css`top: ${top};` }}
    ${({ right }) => { return right && css`right: ${right};` }}
    ${({ bottom }) => { return bottom && css`bottom: ${bottom};` }}
    ${({ placeContent }) => { return placeContent && css`place-content: ${placeContent};` }}
    ${({ transition }) => { return transition && css`transition: ${transition};` }}
    ${({ gridArea }) => { return gridArea && css`grid-area: ${gridArea};` }}
    ${({ overflow }) => { return overflow && css`overflow: ${overflow};` }}
    ${({ maxHeight }) => { return maxHeight && css`max-height: ${maxHeight};` }}
    ${({ userSelect }) => { return userSelect && css`user-select: ${userSelect};` }}
    
`
