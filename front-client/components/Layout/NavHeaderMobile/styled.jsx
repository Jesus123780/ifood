import { BGColor, PColor, SECBGColor } from 'public/colors'
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
        background: ${SECBGColor};
    }
    & > svg {
        padding-right: 10px;
        display: inline-block;

    }

`
export const CicleUser = styled.div`
    width: 40px;
    height: 40px;
    border: solid 1px #e6e6e6;
    border-radius: 50px;
    place-content: center;

    ${flexCenter}
`
export const NavHeaderMenuMobileContent = styled.div`
    display: none;
    background-color: ${BGColor};
    @media only screen and (max-width: 960px) {
        display: block;
    }
    .nav-header-menu-mobile {
        position: relative;
        background: #fff;
        border-bottom: solid 1px #e6e6e6;
        font-size: 14px;
        list-style: none;
        margin: 0;
        padding: 16px 0;
        width: 100%;
    }
    padding: 0 24px;
    ${({ height }) => { return height && css`height: ${height};` }}
    overflow: hidden;
    transition: height .2s ease-in-out;

`