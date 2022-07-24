import PropTypes from 'prop-types'
import { BGColor, PColor } from 'public/colors'
import React from 'react'
import styled, { keyframes } from 'styled-components'
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
export function LoadingClosed({ error }) {
  return (
    <Container>
      <Modal>
        <h3>{error ? 'A ocurrido un error' : 'Cerrando session'}</h3>
        <h2>{error ? ':(' : 'Tienes que regresar'}</h2>
        {/* <LoadingBabel color={PColor} size={'1090px'} speed={1} /> */}
      </Modal>
    </Container>
  )
}

LoadingClosed.propTypes = {
  error: PropTypes.bool
}
const Modal = styled.div`
  display: grid;
  border: 1px solid #ccc;
  background-color: ${BGColor};
  width: 300px;
  padding: 30px;
  height: 200px;
  border-radius: 10px;
  place-content: center;
  text-align: center;
  align-items: center;
  h2 {
    margin-top: 20px;
    line-height: 1.15;
    text-rendering: optimizeLegibility;
    font-size: 1rem;
    text-align: center;
    height: min-content;
    font-weight: 400;
    font-weight: 200;
    color: #3f3e3e;
  }
  h3 {
    line-height: 1.15;
    text-rendering: optimizeLegibility;
    font-size: 1.5rem;
    text-align: start;
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
    font-weight: 400;
    font-weight: 200;
    margin: 0;
    color: #3f3e3e;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    font-family: PFont-Light;
    word-break: break-word;
    text-align: center;
  }

`
export const SpinnerColor = () => {
  return (
    <Container>
      <LsRipple>
        <svg
          className='spinner'
          height='65px'
          viewBox='0 0 66 66'
          width='65px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            className='path'
            cx='33'
            cy='33'
            fill='none'
            r='30'
            strokeLinecap='round'
            strokeWidth='6'
          ></circle>
        </svg>
      </LsRipple>
    </Container>
  )
}
export const SpinnerColorJust = () => {
  return (
    <Container>
      <LsRipple>
        <svg
          className='spinner'
          height='50px'
          viewBox='0 0 66 66'
          width='50px'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            className='path'
            cx='33'
            cy='33'
            fill='none'
            r='30'
            strokeLinecap='round'
            strokeWidth='6'
          ></circle>
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
        border: 4px solid ${PColor};
        opacity: 1;
        border-radius: 50%;
        animation: ${AnimationRipple} .1s cubic-bezier(0, 0.2, 0.8, 1)
            infinite;
    }
    & div:nth-child(2) {
        animation-delay: -0.5s;
    }
`