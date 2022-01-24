import Link from 'next/link'
import styled, { css } from 'styled-components';
import { APColor, BGColor, EColor, PColor, PVColor } from '../../public/colors';

export const ContentTeam = styled.div`
    width: 100%;
    ${({ border }) => border ? css`
        border: 2px solid ${APColor};
        box-shadow: ${`${APColor}82`} 0px 0px 2px 0px;
    ` : css`
        border: 3px solid #ccc;
    `};
    border-radius: 5px;
    cursor: pointer;
    display: grid;
    place-content: center;
    padding: 5px;
    grid-template-columns: 1fr 1fr;
    align-items: center;
   
`
export const CtnAdd = styled.div`
    display: flex;
    place-content: center;
    align-items: center;
`
export const User = styled.div`
    height: 50px;
    width: 50px;
    background-color: rebeccapurple;
    border-radius: 50%;
    display: grid;
    place-content: center;
    color: #fff;
`
export const Content = styled.div`
    width: 100%;
@media only screen and (min-width: 960px){
    width: 100%;
    margin: auto;
    flex: wrap;
    width: 100%;
    position: relative;
    height: 100%;
    margin: auto;
}

`
export const Form = styled.form`
    border-radius: 8px;
    padding: 36px;
    display: block;
    margin: auto;
    background-color: ${BGColor };
    overflow: hidden;
    align-self: center;
    width: 100%;
    `

export const Text = styled.h2`
@media only screen and (min-width: 960px){
    margin: 0 0 42px;
    text-align: center;
    font-size: ${({ size }) => size ? size : '1.5rem'};
}
    font-weight: initial;
    font-family: PFont-Regular;
    color: ${({ color }) => color ? color : '#717171'};
    margin: 0 0 22px;
    ${props => props.cursor && css`cursor: pointer;`}
`