import { PColor, BGColor } from "public/colors"
import styled, { css } from "styled-components"

export const ColumnList = styled.div`
    display: grid;
    grid-template-columns: .5fr 1fr 1fr 1fr 1fr 1fr 1fr .5fr 1fr;
    height: auto;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 auto;
    padding: 10px 0;
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    }
    &:nth-of-type(odd), .thead-default th {
        background-color: rgba(0, 0, 0, 0.03);
    }
`
export const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: ${BGColor};
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
    form{
        display: flex;
    width: 100%;
    flex-wrap: wrap;
    }
    margin-bottom: 100px;
`
export const HeaderStatic = styled.div`
  position: sticky;
    left: 0;
    height: min-content;
    z-index: 999;
    background-color: ${BGColor};
    top: -26px;
    padding: 10px;

`
export const Card = styled.div`
margin: ${({ margin }) => margin &&css`margin: ${margin};`};
    width: ${({ width }) => width ? width : '70%'};
    display: ${({ display }) => display || 'block'};
    ${props => props.align && css`
    align-items: flex-start;
    margin: auto;
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
    place-content: space-between;
    gap: 5px;
    ${({ margin }) => margin && css`margin: ${margin};`}

    @media only screen and (max-width: 760px){
        grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    }

`
export const CardProduct = styled(Card)`
    grid-template-columns: 1fr 60%;
    grid-gap: 15px;
    min-width: 290px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
    border-radius: 4px;
    position: relative;
    display: grid;
    min-height: 190px;
    width: 100%;
    height: 147px;
    background-color: ${BGColor};
    padding: 10px;
    text-decoration: none;
    overflow: hidden;
    .price_text {
        font-weight: 400;
        color: #3e3e3e;
        font-size: .76rem;
    }
    .description {
        font-family: SulSans, Helvetica, sans-serif;
    list-style: none;
    cursor: pointer;
    font-weight: lighter;
    color: rgb(113, 113, 113);
    word-break: break-word;
    margin-bottom: 10px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
    .col {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .title {
        cursor: pointer;
        box-sizing: border-box;
        color: #3e3e3e;
        font-weight: 400;
        margin-top: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
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