import { BGColor, PColor } from 'public/colors'
import styled, { css } from 'styled-components'

export const flexCenter = css`
    display: flex;
    align-items: center;
`
export const Anchor = styled.div`
    width: 100%;
    padding: 10px;
    ${flexCenter}
    &.active {
        border-left: 2px solid ${PColor};
        color: ${PColor};
        padding-left: 10px;
        background: #f7f7f7;
    }
    & > svg {
        padding-right: 10px;
        display: inline-block;

    }

`
export const CicleUser = styled.div`
    width: 40px;
    width: 40px;
    height: 40px;
    height: 40px;
    border: solid 1px #e6e6e6;
    border-radius: 50px;
    place-content: center;

    ${flexCenter}
`
export const NavHeaderMenuMobileContent = styled.div`
    padding: 18px 24px;
    height: auto;
    display: none;
    background-color: ${BGColor};
    @media only screen and (max-width: 960px) {
        display: block;
    }
    .nav-header-menu-mobile {
        position: relative;
    background: #fff;
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 16px 0;
    border-bottom: solid 1px #e6e6e6;
    font-size: 14px;
    }
`