import styled, { css } from 'styled-components'

export const Overline = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: ${({ zIndex }) => zIndex || '99'};
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    ${props => props.show ? css`display: block` : css`display: none;`};
    @media only screen and (min-width: 960px){
    }
  
`
