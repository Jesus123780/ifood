import { PColor, PLColor } from "public/colors";
import styled from "styled-components";

export const Select = styled.select`
    background-color: #fff;
    height: 40px;
    border: none;
    border-bottom: 1px solid #d3d3d3;
    font-weight: 500;
    font-size: 1.375rem;
    color: #3e3e3e;
    width: 100%;
font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #dcdcdc;
    padding: 13px 20px;
    height: 48px;

`
export const ItemStatus = styled.div`
    background-color: ${props => !props.active ? '#ebf6f1' : `${PColor}69`};
    padding: 13px 20px;
    font-weight: 800;
    border-radius: 8px;
    font-family: PFont-Bold;
    & span {
        color: ${props => !props.active ? `#11af7a` : PColor }!important;
    }
`
export const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`
export const Button = styled.button`
    color: ${PColor};
    & a {
        color: ${PColor}!important;
    }
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`