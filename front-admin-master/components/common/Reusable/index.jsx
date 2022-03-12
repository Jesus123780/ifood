import styled, { css } from 'styled-components'

export const Overline = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: ${({ zIndex }) => zIndex || '99'};
    background-color: ${({ bgColor }) => bgColor || 'transparent'};
    ${props => props.show ? css`display: block;` : css`display: none;`};
  
`
export const Container = styled.div`
    width: 100%;
    max-width: 1366px!important;
    padding: 30px;
    margin: 0 auto;
`
export const Form = styled.form`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`
