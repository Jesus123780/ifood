import styled, { css } from "styled-components";
import { FadeDown } from "../../components/animations";
import { BColor, BGColor, EColor, PColor } from "../../public/colors";
import Link from 'next/link'

export const Text = styled.div`
    font-size: 1.7123rem;
`
export const Card = styled.div`
    padding: 30px;
    background-color: #dadada75;
`
export const ContentInfo = styled.div`
    /* border: 2px solid #ccc; */
    padding: 30px;
    background-color: ${BGColor};
    border-radius: 3px;

`
export const Body = styled.div`
    line-height: 1.15;
    margin: 0;
    overflow: hidden;
    height: 80vh;
    scroll-behavior: auto;
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
    display: grid;
    /* grid-template-columns: 50% 50%; */
    grid-column-gap: 20px;
    grid-template-columns: repeat( auto-fit, minmax(45%, 1fr) );
`