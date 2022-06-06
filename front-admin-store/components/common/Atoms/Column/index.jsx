import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Column = ({ children, ...props }) => {
    return (
        <View {...props}>
            {children}
        </View>
    )
}

Column.propTypes = {}


export default Column

export const View = styled.div`
    ${({ lineHeight }) => {return lineHeight && css`line-height: ${lineHeight};`}}
    ${({ height }) => {return height && css`height: ${height};`}}
    ${({ zIndex }) => {return zIndex && css`z-index: ${zIndex};`}}
    ${({ minHeight }) => {return minHeight && css`min-height: ${minHeight};`}}
    ${({ minWidth }) => {return minWidth && css`min-width: ${minWidth};`}}
    ${({ width }) => {return width && css`width: ${width};`}}
    ${({ maxWidth }) => {return maxWidth && css`max-width: ${maxWidth};`}}
    ${({ padding }) => {return padding && css`padding: ${padding};`}}
    ${({ margin }) => {return margin && css`margin: ${margin};`}}
    ${({ align }) => {return align && css`text-align: ${align};`}}
    ${({ fontSize }) => {return fontSize && css`font-size: ${fontSize};`}}
    ${({ color }) => {return color && css`color: ${color};`}}
    ${({ fontFamily }) => {return fontFamily && css`font-family: ${fontFamily};`}}
    ${({ fontWeight }) => {return fontWeight && css`font-weight: ${fontWeight};`}}
    ${({ textDecoration }) => {return textDecoration && css`text-decoration: ${textDecoration};`}}
    ${({ textTransform }) => {return textTransform && css`text-transform: ${textTransform};`}}
    ${({ justifyContent }) => {return justifyContent && css`justify-content: ${justifyContent};`}}
    ${({ display }) => {return display && css`display: ${display};`}}
    ${({ flexDirection }) => {return flexDirection && css`flex-direction: ${flexDirection};`}}
    ${({ flexWrap }) => {return flexWrap && css`flex-wrap: ${flexWrap};`}}
    ${({ flexBasis }) => {return flexBasis && css`flex-basis: ${flexBasis};`}}
    ${({ flexGrow }) => {return flexGrow && css`flex-grow: ${flexGrow};`}}
    ${({ flexShrink }) => {return flexShrink && css`flex-shrink: ${flexShrink};`}}
    ${({ gridTemplateRows }) => {return gridTemplateRows && css`grid-template-rows: ${gridTemplateRows};`}}
    ${({ gridTemplateAreas }) => {return gridTemplateAreas && css`grid-template-areas: ${gridTemplateAreas};`}}
    ${({ gridTemplateColumns }) => {return gridTemplateColumns && css`grid-template-columns: ${gridTemplateColumns};`}}
    ${({ gridGap }) => {return gridGap && css`gap: ${gridGap};`}}
    ${({ Border }) => {return Border && css`border: ${Border};`}}
    ${({ BorderRadius }) => {return BorderRadius && css`border-radius: ${Border};`}}
    ${({ background }) => {return background && css`background: ${background};`}}
    ${({ backgroundColor }) => {return backgroundColor && css`background-color: ${backgroundColor};`}}
    ${({ backgroundImage }) => {return backgroundImage && css`background-image: ${backgroundImage};`}}
    ${({ position }) => {return position && css`position: ${position};`}}
`
