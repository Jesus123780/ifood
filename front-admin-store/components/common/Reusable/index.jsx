import styled, { css } from 'styled-components'

export const Overline = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: ${({ zIndex }) => {return zIndex || '99'}};
    background-color: ${({ bgColor }) => {return bgColor || 'transparent'}};
    ${props => {return props.show ? css`display: block` : css`display: none;`}};
    @media only screen and (min-width: 960px){
    }
  
`
