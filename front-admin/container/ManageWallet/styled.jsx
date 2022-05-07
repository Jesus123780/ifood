import styled, { css, keyframes } from 'styled-components'
import { BGColor, EColor, PColor, PLAColor, PLVColor, PSColor, PVColor, SECColor, SFVColor } from '../../public/colors'

export const Action = styled.div`
    background-color: ${BGColor};
    /* border-top: 1px solid #ccc;
    padding: 10px;
    margin: 15px 0;
    bottom: 0; */
    /* top: 0; */
    /* position: fixed; */
`
export const CtnList = styled.div`
    overflow: hidden auto;
    height: calc(100vh - 80px);
    /* border: 1px solid ; */
    min-height: calc(100vh - 80px);
    max-height: calc(100vh - 80px);
    button {
        background-color: transparent;
    }

`
export const SubTitle = styled.div`
        color: #3e3e3e;
    font-weight: 500;
    font-size: ${({ size }) => {return size ? size : '1.5rem'}};
    margin: ${({ margin }) => {return margin || '20px 0'} };
    text-align: ${({ align }) => {return align ? align : 'center '}};
    line-height: 0.875rem;
    font-family: PFont-Light;
    word-break: break-word;
`
export const Grid = styled.div`
    place-content: space-between;
    display: grid;
    gap: 10px;
    /* height: 400px; */
    /* min-height: 400px; */
    /* max-height: 400px; */
    overflow: hidden auto;
    display: grid;
    grid-template-columns: repeat(auto-fit,50%) 50%;
    width: 100%;
    place-content: space-between;
    gap: 5px;
`
export const LoadingComponent = styled.div`
    background: linear-gradient(to left, rgb(243, 242, 241), rgb(228, 226, 224), rgb(243, 242, 241)) 0% 0% / 200% 100%;
    animation: 4s linear 0s infinite normal none running pulse;
    border-radius: 1rem;
    padding: 10px;
    margin: 5px 0;
    width: ${({ width }) => {return width || '100%'}};
    @keyframes pulse {
        0% {
    background-position: 400% 0;
        }
        100% {
            background-position: 0 0;
        }
    }
`
export const Container = styled.div`
    display: flex;
    transition: all 1s 1s;
    justify-content: space-around;
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
    margin-bottom: 100px;
    /* flex-wrap: nowrap; */
    /* flex-direction: column; */
    `
export const Input = styled.input`
    border: 1px solid #0000000d; 
    width: 100%;
    padding: 10px;
`
export const CardDynamic = styled.div`
    width: ${({ width }) => {return width || '60%'}};
    ${props => {return props.width === '0%' &&css`
        opacity: 0;
        z-index: -11;
    `}}
    display: ${({ display }) => {return display || 'block'}};
    transition: width .2s ease;
    position: relative;
    ${props => {return props.height && css`height: ${props.height};`}}
`
export const FooterOptionWallet = styled.div`
    /* position: absolute;
    bottom: 40px;
    left: 0;
    display: flex;
    border-top: 1px solid #dbdddf; */
`
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${PColor};
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const ContentMenuOptions = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    width: calc(100vw - 180px);
    border-top: 1px solid ${SFVColor};
    background-color: ${BGColor};
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    overflow: hidden;   
    padding: 48px 48px 24px;
    z-index: 9;
    height: ${({ height }) => {return height || 'auto'}};
    transition: all .5s ease;
    ${props => {return props.active ? css`
    transform: translateY(0px);
    
    ` : css`
    transform: translateY(60px);
    `}

}
     .btn-absolute {
        position: absolute;
        left: 0;
        right: 0;
        width: 100px;
        background-color: transparent;
        top: 0;
        margin: auto;
    }
    & div {
        animation: ${pulse} 2s infinite;
     
    }
`
export const Content = styled.div`
    /* height: 100vh; */
    display: block;
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
    position: sticky;
    top: 0;
    background-color: ${BGColor};
    .items {
    background-color: #FFFFFF;
    padding: 10px;
    margin: 15px 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    gap: 20px;

    cursor: pointer;
    }
`
export const CardContent = styled.div`
    padding: 20px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-around;
    background: #f2f2f2;
    /* position: sticky; */
    top: 0;
    font-size:  12px;
    border-bottom: 1px solid #ccc;
    z-index: 99;
`