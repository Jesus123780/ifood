import { BGColor, PColor } from "public/colors";
import styled from "styled-components";

export const ContainerContextMessage = styled.div`
    position: fixed;
    /* background-color: red; */
    right: 0;
    bottom: 0;
    width: 380px;
    height: calc(100vh - 80px);
`
export const BoxChat = styled.div`
        display: block;
        /* position: absolute; */
    /* background-color: red; */
    /* right: 0; */
    /* bottom: 0; */
    /* transform: translateY(-63px); */
    bottom: 0px;
    position: fixed;
    right: 40px;
    width: min-content;
`
export const CircleStore = styled.div`
    height: 70px;
    width: 70px;
    border-radius: 50px;
    border: 1px solid ${PColor};

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
    height: 455px;
    max-height: calc(100vh - 56px - 10px);
`
export const ContentAction = styled.div`
    position: absolute;
    bottom: 0;
    
    input {
        padding: 10px;
        outline: none;   
    }
`
export const WrapperChat = styled.form`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    font-size: .9375rem;
    border: 1px solid ${PColor};
    height: 455px;
    max-height: calc(100vh - 56px - 10px);
    background-color: ${BGColor};
    width: 328px;
    position: absolute;
    bottom: 0;
    left: -85px;
`