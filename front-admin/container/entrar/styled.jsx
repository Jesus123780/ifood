import Link from 'next/link'
import styled, { css } from 'styled-components'
import { BGColor, EColor, PColor } from '../../public/colors'

export const Content = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    overflow: hidden;
@media only screen and (min-width: 960px){
    width: 100%;
    margin: auto;
    flex: wrap;
    width: 100%;
    margin: auto;
}

`
export const Form = styled.form`
box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    border-radius: 8px;
    padding: 36px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    align-self: center;
    width: 600px;
    `
export const ContainerSliderForm = styled.form`
    @media (min-width: 768px) {
        position: absolute;
        width: 100%;
        top: 0;
        padding: 36px 50px;
        margin: auto;
        height: 100%;
        background-color: ${BGColor};
        left: 0;
        transform: ${props => {return props.activeLogin ? 'translateX(0px)' : 'translateX(900px)'}};
        transition: all 0.6s ease;
    }
`
export const Iconos = styled.div`
    color: ${({ color }) => {return (color ? color : EColor)}};
    margin: ${({ margin }) => {return (margin ? margin : '0px 7px')}};
    ${({ size }) => {return size &&
        css`
            font-size: ${size};
        `} }
`
export const ButtonSubmit = styled.button`
    background-color: ${({ color, theme }) => {return color === '1'
    ? ' #4065b4'
    : color === '2'
      ? `${BGColor}`
      : theme.SFAColor}};
    outline: none;
    border: none;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    font-family:  PFont-Regular;
    cursor: pointer;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: ${({ content }) => {return content ? content : 'space-between'}};
    font-size: ${({ size }) => {return (size ? size : '1rem')}};
    color: ${({ colorFont }) => {return (colorFont ? colorFont : `${BGColor}`)}};
    line-height: 1.5;
    border-radius: 0.3rem;
    text-align: center;
    width: 100%;
    margin: 10px 7px;
    ${props => {return props.hoverColor &&
        css`
            &:hover {
                color: ${BGColor};
                background-color:${PColor};
            }
        `} };
    ${props => {return props.colorPrimary &&
        css`
            {
                color: ${BGColor};
                background-color:${PColor};
            }
        `} };
`
export const Card = styled.div`
    font-size: 16px;
    position: relative;
    justify-content: center;
    display: flex;
    width: 50%;
    height: 100vh;
    @media only screen and (min-width: 960px) {
        &::before {
            right: 0;
            bottom: unset;
            left: auto;
            min-width: 130vh;
            min-height: 135vh;
            max-width: 80vw;
            max-height: 80vw;
            width: 80vw;
            height: 80vw;
            -webkit-transform: translate(15vw,-23%);
            transform: translate(15vw,-23%);
        }
    }
    &:before {
    content: "";
        min-width: 130vh;
        min-height: 135vh;
        width: 130vw;
        height: 130vw;
        z-index: -1;
        position: absolute;
        background-color: #fdedee;
        border-radius: 0 100% 100%;
        left: 50%;
        transform: translate(-70%);
        bottom: -70px;
    }

`

export const GoBack = styled.div`
    display: flex;
    margin-bottom: 40px;
    & > span {
            font-family: PFont-Light;
            font-size: 14px;
            text-align: center;
            width: 100%;
            color: ${ ({ theme }) => {return `${ theme.PColor }`} };
        }
`
export const Text = styled.h2`
@media only screen and (min-width: 960px){
    margin: 0 0 42px;
    text-align: center;
    font-size: ${({ size }) => {return size ? size : '1.5rem'}};
}
    font-weight: initial;
    font-family: PFont-Regular;
    color: ${({ color }) => {return color ? color : '#717171'}};
    margin: 0 0 22px;
    ${props => {return props.cursor && css`cursor: pointer;`}}
`