import styled, { keyframes } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'


const bounceInDown = keyframes`
    from, 60%, 75%, 90%, to {
        -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0) scaleY(3);
        transform: translate3d(0, -3000px, 0) scaleY(3);
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0) scaleY(0.9);
        transform: translate3d(0, 25px, 0) scaleY(0.9);
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0) scaleY(0.95);
        transform: translate3d(0, -10px, 0) scaleY(0.95);
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0) scaleY(0.985);
        transform: translate3d(0, 5px, 0) scaleY(0.985);
    }
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
`
const bounceOutUp = keyframes`
    20% {
        -webkit-transform: translate3d(0, -10px, 0) scaleY(0.985);
        transform: translate3d(0, -10px, 0) scaleY(0.985);
    }

    40%,
    45% {
        opacity: 1;
        -webkit-transform: translate3d(0, 20px, 0) scaleY(0.9);
        transform: translate3d(0, 20px, 0) scaleY(0.9);
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, -2000px, 0) scaleY(3);
        transform: translate3d(0, -2000px, 0) scaleY(3);
    }
`
export const Container = styled.div`
    animation: ${ ({ error, closed }) => error && (closed ? bounceOutUp : bounceInDown) } 1s forwards;
    padding: ${ props => props.error ? '10px' : 0 };
    top: 0;
    position: fixed;
    margin: auto;
    text-align: center;
    width: 100%;
    background-color: ${ props => props.color || PColor };
    color: #fff;
    font-size: 18px;
    z-index: 99999;
`