import { BGColor, PColor, PLVColor } from "public/colors";
import styled, { css } from "styled-components";

export const ContainerContextMessage = styled.div`
    /* position: fixed; */
    /* background-color: red; */
    /* right: 0;
    bottom: 0;
    z-index: 999999999;
    width: 380px; */
    /* height: calc(100vh - 80px); */
`
export const BoxChat = styled.div`
        /* display: block; */
        /* position: absolute; */
    /* background-color: red; */
    /* right: 0; */
    /* bottom: 0; */
    /* transform: translateY(-63px); */
    /* bottom: 20px; */
    /* position: fixed; */
    /* right: 40px; */
    /* width: min-content; */
`
export const ItemMessage = styled.div`
    position: absolute;
    background-color: ${PColor};
    width: 20px;
    height: 20px;
    left: 0px;
    border-radius: 50%;
    z-index: 9;
    color: ${BGColor};
    text-align: center;
    top: -5px;
`
export const CircleStore = styled.div`
    height: 70px;
    width: 70px;
    border-radius: 50px;
    border: 1px solid ${PColor};
    position: relative;
    margin: auto;
    img {
        border-radius: 50px;
        width: 100%;
        height: 100%;
    }
`
export const Message = styled.div`
    /* height: 100%; */
    /* overflow: hidden; */
    
`
export const Chat = styled.div`
    overflow: hidden scroll;
    height: 382px;
    max-height: 382px;
`
export const ContentAction = styled.div`
    position: absolute;
    bottom: 0;
    
    input {
        padding: 10px;
        
        outline: none;   
    }
    .header-chat {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        align-items: self-start;
    }
`
export const TextMessage = styled.span`
    background-color: ${ ({ messageUser, user }) => messageUser === user ? PColor : PLVColor };
    width: fit-content;
    border-radius: 5px;
    padding: 5px;

`
export const ContentMessage = styled.div`
    width: 100%;
    padding-left: 9%;
    padding-right: 5%;
    padding-top: 1%;
    display: flex;
    position: relative;
    justify-content: ${ ({ messageUser, user }) => messageUser === user ? 'flex-end' : 'flex-start' };
    /* width: 100%; */
    /* padding: 5px; */
    font-family: PFont-Light;
    border-radius: 5px;
    color: ${BGColor};
`
export const WrapperChat = styled.form`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    font-size: .9375rem;
    border-top: 1px solid ${PColor};
    border-left: 1px solid ${PColor};
    border-right: 1px solid ${PColor};
    height: 455px;
    max-height: calc(100vh - 56px - 10px);
    background-color: ${BGColor};
    width: 328px;
    position: absolute;
    transition: 1s ease forwards;
    transition: all 200ms ease 0s;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    bottom: 0;
    left: -85px;
    button {
        background-color: transparent;
    }
    ${props => props.show ? css`
        transform: translateY(425px);
        
        ` : css`
        transform: translateY(0px);
    
    `}
`