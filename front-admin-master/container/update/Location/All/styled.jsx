import { BGColor } from 'public/colors';
import styled, { css } from 'styled-components';
// import { BGColor, PColor } from '../../../../public/colors';

export const Content = styled.div`
@media only screen and (min-width: 960px){
    width: 100%;
    display: flex;
    margin: auto;
    flex: wrap;
    padding: 0 30px;
    grid-template-rows: unset;
    max-width: 1366px !important;
    margin: auto;
}

`
export const Form = styled.form`
`
export const Iconos = styled.div`
    color: ${ ({ color, theme }) => (color ? color : theme.PLColor) };
    margin: ${ ({ margin }) => (margin ? margin : '0px 7px') };
    ${ ({ size }) => size &&
        css`
            font-size: ${ size };
        ` }
`
export const ButtonSubmit = styled.button`
    background-color: red;
    outline: none;
    border: none;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    font-family:  PFont-Regular;
    cursor: pointer;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${ ({ size }) => (size ? size : '1rem') };
    color: ${ ({ colorFont }) => (colorFont ? colorFont : `${ BGColor }`) };
    line-height: 1.5;
    border-radius: 0.3rem;
    text-align: center;
    width: 100%;
    margin: 10px 7px;
    ${ props => props.hoverColor &&
        css`
            &:hover {
                color: ${ BGColor };
                background-color:${ PColor };
            }
        ` };
`
export const Card = styled.div`
    right: 0;
    bottom: unset;
    left: auto;
    width: 80vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
`
export const Text = styled.h2`
@media only screen and (min-width: 960px){
    font-size: 1.5rem;
    margin: 0 0 42px;
    text-align: center;
}
    font-size: 1rem;
    font-weight: initial;
    color: #717171;
    margin: 0 0 22px;
`