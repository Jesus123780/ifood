import styled, { css } from 'styled-components'
import { BGColor } from '../../../../public/colors'

export const Container = styled.div`
    display: flex;
    padding:  10px;
    display: flex;
    background-color: ${ ({ theme }) => {return theme.InvColor} };
    border-radius: 4px;
    overflow: hidden;
`
export const Card = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    margin: 10px;
    border-radius: 8px;
    background-color: ${ ({ theme }) => {return theme.InvColor} };
    border: 1px solid rgba(0,0,0,.1);
    width: ${ ({ width }) => {return width && css`width: ${ width };`} };
    ${ props => {return props.sticky && css`
        position: sticky;
        z-index: 0;
        top: 0px;
        `} };

    `
export const Text = styled.h2`
    font-size: ${ ({ size }) => {return size ? size : '24px'} };
    font-weight: 400;
    padding-bottom: 24px;
    padding-top: 30px;
    border-top: 1px solid #ccc;
    font-family: PFont-Light;
    word-break: break-word;

`
export const Title = styled.h1`
    padding: 0;
    margin-right: 15px;
    margin-bottom: 8px;
    font-size: 25px !important;
    color: rgba(0,0,0,.8);
    line-height: 1.18;
    padding-right: 10px;
    word-break: break-word;
    hyphens: auto;
    font-family: PFont-Regular;
    margin: 10px 0px;
`
export const Discount = styled.span`
    position: relative;
    width: fit-content;
    font-family: PFont-Light;
    color: rgba(0,0,0,.8);
    ${ props => {return props.discount &&css`
    &::after{
    position: absolute;
    display: block;
    top: 43%;
    width: 100%;
    height: 1px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    content: "";
    color: #18171773;
    z-index: 999;
}
`} }
`
export const StickyWrapper = styled.div`
    display: flex;
    padding:  0px 10px;
    display: flex;
    flex-direction: column;
    background-color: ${ BGColor };
    border-radius: 4px;
    overflow: hidden;
`
export const Price = styled.h2`
    padding: 0;
    margin-right: 15px;
    margin-bottom: 8px;
    font-size: 27px !important;
    line-height: 1.18;
    padding-right: 10px;
    word-break: break-word;
    font-family: PFont-Light;
    margin: 10px 0px;
    font-weight: 400;
`
export const Info = styled.span`
    color:${ ({ color }) => {return (color ? color : '#3483fa')} };
    font-size:${ ({ size }) => {return (size ? size : '13px')} };
    font-family: PFont-Light;
    margin: ${ ({ margin }) => {return margin ? margin : '15px 0px'} };
`
export const Button = styled.button`
 background-color: transparent !important;
 width: fit-content;
 `
export const Table = styled.table`
tbody tr:nth-child(2n) .andes-table:first-child,
tbody tr:nth-child(2n) .andes-table:first-child,
tbody tr:nth-child(odd),

tbody tr:nth-child(odd):hover {
    padding: 13px;
    background: #f5f5f5
}

tbody tr:nth-child(odd) .andes-table:first-child,
tbody tr:nth-child(odd) .andes-table:first-child {
    background: #ebebeb;
    padding: 13px;
}
`
export const Location = styled.div`
    display: flex;
    align-items: center;
/*     ${ props =>{return props.direction &&css`
    margin: 0px;
    flex-direction: column;
    align-items: flex-start;
    `} } */
`
export const BoxComponent = styled.div`
    border-top: 1px solid rgba(0,0,0,.1);
    padding: 24px 0px;
`
export const ContentRate = styled.div`
    display: flex;
    width: min-content;
`