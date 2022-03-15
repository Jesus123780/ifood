import styled, { css } from 'styled-components'

export const SlideBar = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
`
export const SwiperButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - 20px);
    z-index: 99;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    opacity: .5;
    transition: .2s;
    display: none;
    background-color: #ffffff;
    box-shadow: 0 7px 16px 0 rgba(0,0,0,.2), 0 1px 3px 0 rgba(0,0,0,.1);
    ${ props => props.prev ? css`
        left: 0;
    ` : css `
        right: 0;
    `}
    &:hover {
        opacity: 1;
    }
    @media(min-width: 768px) {
        height: 64px;
        width: 64px;
        display: flex;
    }
`