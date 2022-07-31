import styled from 'styled-components'
import { PColor, SEGColor, BColor, SECColor } from 'public/colors'
import Link from 'next/link'

export const Span = styled.span`
    color: ${ props => props.active ? PColor : BColor };
    font-weight: 400;
    display: block;
    margin-left: 1em;
    font-size: 14px;
    font-family: PFont-Regular;
`
export const LinkOption = styled(Link)`
    display: block;
    text-decoration: none;
    font-size: 12px;
    padding: 5px 10px;
    padding-left: 10px;
    text-align: left;
    white-space: nowrap;
    margin: 0 30px;
`

export const SideBarLeft = styled.div`
    margin-left: ${ props => props.menu ? '0' : '-100%' };
    width: 280px;
    max-width: 280px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100%;
    transition: .3s;

    @media (min-width: 1024px) {
        position: static;
        width: 100%;
        margin-left: 0;
    }
`
export const BoxSideBar = styled.aside`
    width: 100%;
    height: 100%;
    /* background-image: linear-gradient(95deg, ${ SEGColor }, ${ PColor }); */
    background: ${ SEGColor };
    padding: .8em 0;
    overflow: auto;
`
export const MenuLeft = styled.button`
    width: 100%;
    white-space: nowrap;
    height: ${ ({ height }) => height ? height : 'auto' }px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border: none;
    outline: 0;
    position: relative;
    font-family: Poppins;
    background-color: transparent;
    background: #f2f2f2;
    background-image: ${ props => !!props.active && `linear-gradient(125deg, #ffffff, #7878783b)` };
    align-self: ${ ({ alignSelf }) => alignSelf || 'auto' };
    & > div:first-child { pointer-events: none; }
    transition: .4s;
    overflow: hidden;
    border-bottom: 1px solid ${ SEGColor }32;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    top: 0;
    z-index: 99;
    & a {
        color: ${SECColor};
    }
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 8px 5px;
    background-color: transparent;
    position: relative;
    z-index: 10;
`
export const OptionMenu = styled.div`
    width: 100%;
    display: block;
    overflow: auto;
    width: 100%;
    transform: translateY(${ ({ height }) => height }px);
    overflow: hidden;
    padding: 5px 0;
`
export const Box = styled.div`

`
export const BoxTitleNavBar = styled.div`
    padding: 5px 0 50px;
    text-align: center;
    width: 100%;
    /* background-image: linear-gradient(95deg, ${ SEGColor }, ${ PColor }); */
    background: ${ SEGColor };
`
export const Name = styled.h1`
    color: #FFFFFF;
    font-size: 1.25em;
    text-align: center;
`