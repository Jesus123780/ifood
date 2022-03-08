import styled, { css } from 'styled-components';
import { PColor } from '../../public/colors';
// import { PColor } from '../../assets/colors';

export const Line = styled.div`
    width: calc(100% - 0.1px);
    height: 48px;
    background: rgba(0, 0, 0, 0.9);
`
export const Number = styled.div`
    position: absolute;
    bottom: -85px;
`
export const CreditCard = styled.div`
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwOCIgdmlld0JveD0iMCAwIDMzNSAyMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjMzNSIgaGVpZ2h0PSIyMDgiPgo8cmVjdCB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwOCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMCkiPgo8cmVjdCB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwOCIgcng9IjEwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB3aWR0aD0iMjcwLjc2OSIgaGVpZ2h0PSI2OTguMTk3IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjgzODg1OSAwLjU0NDM0OCAtMC40NDg4NTcgMC44OTM2MDQgMzUxLjM5MSAtMjE0LjgyKSIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjE2OCIgeTE9IjI2NS45NjciIHgyPSIzNTYuNzc1IiB5Mj0iLTI2LjkzNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMzIzNDEiIHN0b3AtY29sb3I9IiNFQTFEMkMiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkUzNzQ2Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhciIgeDE9IjI5Ljk4NDEiIHkxPSIyODMuNTg5IiB4Mj0iMTQ4LjExOCIgeTI9IjM1NS44MzgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3AvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3Atb3BhY2l0eT0iMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=');
    border: 1px solid;
    height: 470px;
    margin: 0px auto;
    box-shadow: rgb(0 0 0 / 8%) 0px 4px 10px;
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    backface-visibility: hidden;
    transition: all 1s ease-out 0s;
    background-size: cover;
    width: 335px;
    height: 208px;
    /* ${props => props.backChild &&css`
   
    `} */
`
export const Card = styled.div`
@media (min-width: 768px) {
    margin: auto;
    min-width: 600px;
    width: auto;
    align-self: center;
    display: grid;
    grid-template-columns: auto 445px;
    grid-template-rows: initial;
    position: relative;
    height: 60vh;
    /* overflow: hidden; */
}
`
export const Container = styled.div`
    width: 100%;
    margin: auto;
    padding: 0 30px;
    max-width: 900px;  
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