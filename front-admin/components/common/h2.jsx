import { BColor } from 'public/colors'
import React from 'react'
import styled, { css } from 'styled-components'

export const TextH2Main = ({ text }) => {
    return <TextH2>{text}</TextH2>
}

const TextH2 = styled.div`
line-height: 1.15;
  font-size: ${({ size }) => size || '1.5rem'};
    text-align:  ${({ align }) => align || 'start'};
    height: min-content;
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || '#3f3e3e   '};
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
    word-break: break-word;
`