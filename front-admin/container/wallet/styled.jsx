import { PColor, BGColor } from "public/colors"
import styled, { css } from "styled-components"

export const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: ${BGColor};
    flex-wrap: wrap;
    justify-content: space-around;
    /* max-width: 1366px; */
    margin: 0 auto;
    form{
        display: flex;
    width: 100%;
    flex-wrap: wrap;
    }
`
export const Card = styled.div`
    width: ${({ width }) => width ? width : '70%'};
    display: ${({ display }) => display || 'block'};
    ${props => props.align && css`
    align-items: flex-start;
    `}
    ${props => props.sticky && css`
    position: sticky;
    top: 0;
    left: 0;
    height: min-content;
    `}
    `
export const OrganiceProduct = styled(Card)`
    display: grid;
    grid-template-columns: repeat(auto-fit, 50%) 50%;
    width: 100%;
    place-content: center;
    gap: 20px;
    ${({ margin }) => margin && css`margin: ${margin};`}

    @media only screen and (max-width: 760px){
        grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    }

`
export const CardProduct = styled(Card)`
    grid-template-columns: 1fr 146px;
    grid-gap: 15px;
    padding: 15px;
    min-width: 320px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
    border-radius: 4px;
    position: relative;
    display: grid;
    min-height: 190px;
    width: 100%;
    height: 147px;
    background: #fff;
    padding: 20px;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: .2s;
    transition: .2s;
    overflow: hidden;
    .description {
        font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    margin-bottom: 10px;
    font-size: .875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    }
    .col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .title {
        list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    color: #3e3e3e;
    font-weight: 400;
    margin-top: 0;
    font-size: 1.125rem;
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;

    }
    /* height: 100%; */
`
export const Item = styled.div`
    padding: 5px;
`
export const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`