import styled, { css, keyframes } from "styled-components";
import { FadeDown } from "../../components/animations";
import { BColor, BGColor, EColor, PColor } from "../../public/colors";
import Link from 'next/link'

export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const AnimationLeft = keyframes`
0% {
    transform: translateX(-50vw);
    opacity: 0;
}

100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const ContainerAnimation = styled.div`
${props => props.active === 1 ? css`animation: ${AnimationRight} 200ms;` : css`animation: ${AnimationRight} 200ms;`}

`
export const ContainerAnimationTow = styled.div`
${props => props.active === 2 ? css`animation: ${AnimationLeft} 200ms;` : css`animation: ${AnimationLeft} 200ms;`}

`
export const Anchor = styled.div`
    text-decoration: underline;
    color: ${PColor};
    cursor: pointer;
    text-align-last: end;
    font-size: 12px;
`
export const Text = styled.div`
    font-size: ${({ size }) => size || '1.7123rem'};
    text-align: ${({ align }) => align || 'start'};
    color: ${({ color }) => color};
`
export const Card = styled.div`
    padding: 30px;
`
export const CardPro = styled(Card)`
    box-shadow: 0 0.75rem 2rem #bdbdbdbd;
    margin-top: 75px;
`
export const flex = css`
    display: flex;
`
export const Column = css`
    flex-direction: column;
`
export const Wrapper = styled.div`
    border: ${({ border }) =>  border && `1px solid ${PColor}`};
    border-radius: 5px;
    ${props => props.styles && props.styles}
    padding: 32px;
`

export const ContentInfo = styled.div`
    /* border: 2px solid #ccc; */
    padding: 30px 0;
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