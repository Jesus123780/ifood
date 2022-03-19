import styled, { css } from "styled-components";
import { BGColor, EColor, PLAColor, PLVColor, PSColor, PVColor, SECColor } from "../../public/colors";

export const Action = styled.div`
    background-color: ${BGColor};
    /* border-top: 1px solid #ccc;
    padding: 10px;
    margin: 15px 0;
    bottom: 0; */
    /* top: 0; */
    /* position: fixed; */
`
export const CtnList = styled.div`
    overflow: hidden auto;
    height: calc(100vh - 80px);
    /* border: 1px solid ; */
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    button {
        background-color: transparent;
    }

`
export const Content = styled.div`
    /* height: 100vh; */
    display: block;
    position: sticky;
    top: 0;
    background-color: ${BGColor};
    .items {
    background-color: #FFFFFF;
    padding: 10px;
    margin: 15px 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    gap: 20px;

    cursor: pointer;
    }
`
export const CardContent = styled.div`
    padding: 20px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    /* position: sticky; */
    top: 0;
    font-size:  12px;
    border-bottom: 1px solid #ccc;
    z-index: 99;
`