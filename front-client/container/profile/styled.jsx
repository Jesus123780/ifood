import styled, { css, keyframes } from "styled-components";
import { FadeDown } from "../../components/animations";
import { BColor, BGColor, EColor, PColor, SECColor } from "../../public/colors";
import Link from 'next/link'


export const Text = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: ${SECColor};
`
export const Section = styled.section`
line-height: 1.15;
margin: 0;
font-family: SulSans,Helvetica,sans-serif;
overflow: hidden;
font-size: 16px;
height: 100%;
scroll-behavior: auto;

${ ({ bg }) => bg && css`background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 350 90"  height="200px"><text x="0" y="60%" font-size="3rem" font-weight="800" font-family="Roobert,Helvetica Neue,Helvetica,Arial,sans-serif" fill="red" opacity="0.1"> ${ bg } </text></svg>');` }

`
export const Content = styled.div`
    width: 100%;
    margin: auto;
    max-width: 450px;
    padding: 0 20px;
    height: auto;
    box-shadow: 0px 0px 6px #0000003e;

    background-color: ${BGColor};
    form {
        padding: 20px;
    }
    `
export const Container = styled.div`
    font-family: PFont-Regular;
    height: 100%;
    position: relative;
    padding: 30px;
    width: 100%;
    display: flex;
    width: 100%;
    overflow: hidden;
    max-width: 1366px;
    padding: 0 30px;
    margin: auto;
    height: 87vh;
`

export const LabelInput = styled.span`
    position: absolute;
    text-align: left;
    font-size: ${ ({ value }) => value ? '16px' : '16px' };
    top: ${ ({ value }) => value ? '5px' : '10px' };
    left: 15px;;
    left: ${ ({ left }) => left ? left : '17px' };
    transition: .2s;
    background-color: ${ BGColor };
    color:  #CCC;
    pointer-events: none;
    font-family: PFont-Light;
    user-select: none;
`
export const Input = styled.input`
    padding: 20px 10px;
    margin: 10px 0;
    outline: 0;
    border: 1px solid #eee;
    font-weight: 500;
    font-size: 15px;
    width: 100%;
    border-radius: 5px;
    font-family: PFont-Light;  
    &:focus ~ ${ LabelInput } {
        font-size: 16px;
        color: #CCC;
        padding: 0px 5px ;
    }  
    &::selection{
        background-color: red;
        color: ${ BGColor }
    }
    &:disabled{
        color: #808080;
    }
`
export const BoxInput = styled.div`
    position: relative;
    padding: ${ ({ padding }) => padding ? padding : '10px 5px' };
    width: ${ ({ width }) => width ? width : '100%' };
`
export const Title = styled.h1`
font-size: 1.625rem;
    color: ${ PColor };
    margin: 20px 0;
    text-align: center;
    font-weight: 500; 
    font-family:  PFont-Medium;
`
export const Paragraph = styled.p`
    font-weight: 300;
    line-height: 29px;
    text-align: justify;
    list-style: initial;
    color: #717171;
    font-family:  PFont-Light;
    margin: 7px 0px;
    font-size: 14px;

`
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
${ props=> props.active === 1 ? css`animation: ${ AnimationRight } 200ms;` : css`animation: ${ AnimationRight } 200ms;` }

`
export const ContainerAnimationTow = styled.div`
${ props=> props.active === 2 ? css`animation: ${ AnimationLeft } 200ms;` : css`animation: ${ AnimationLeft } 200ms;` }

`
export const CardDevice = styled.button`
    align-items: center;
    display: flex;
    min-height: 69px;
    padding: 0.9375rem 1.25rem;
    position: relative;
    text-align: left;
    background: none;
    border: 0;
    border: 1px solid #ccc;
    width: 100%;
    .device__icon{
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    font-family: Sul Sans,sans-serif;
    }
    .device__info{
      margin-left: 1.3125rem;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
    box-sizing: border-box;
    font-family: Sul Sans,sans-serif;
    }
    .device__description-wrapper{
      align-items: baseline;
      display: flex;
    }
    .device__description{
      color: #3e3e3e;
    margin-right: 0.5rem;
    font-size: 1rem;
    line-height: 1.375rem;
    }
    .device__current{
      color: #50a773;
      font-size: .75rem;
    line-height: 1rem;
    font-weight: 500;
    }
    .device__localization {
      color: #717171;
      font-size: .875rem;
    line-height: 1.25rem;
    }
`