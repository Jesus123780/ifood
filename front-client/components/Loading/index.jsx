import React from 'react'
import styled, { keyframes } from 'styled-components'
// import './style.css'
export const Loading = () => {
    return (
        <Container>
            <LsRipple>
                <div></div>
                <div></div>
            </LsRipple>
        </Container>
    )
}
export const SpinnerColor = () => {
    return (
        <Container>
            <LsRipple>
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </LsRipple>
        </Container>
    )
}
export const SpinnerColorJust = () => {
    return (
        <Container>
            <LsRipple>
                <svg className="spinner" width="50px" height="50px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </LsRipple>
        </Container>
    )
}

const AnimationRipple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`
/// Estilos loading
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #7777774e;
`
const LsRipple = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    & > div {
        position: absolute;
        border: 4px solid ${ ({ theme }) => theme.BGAColor };
        opacity: 1;
        border-radius: 50%;
        animation: ${ AnimationRipple } .1s cubic-bezier(0, 0.2, 0.8, 1)
            infinite;
    }
    & div:nth-child(2) {
        animation-delay: -0.5s;
    }
`