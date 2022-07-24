import styled, { css } from 'styled-components';
import { BGColor } from 'public/colors';

export const Button = styled.button` 
    position: absolute;
    z-index: 9999;
`
export const FormProducts = styled.form`
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
    }
`

export const Container = styled.div`
    display: flex;
    position: relative;
    border-radius: 4px;
    background-color: ${ ({ theme }) => theme.InvColor };
    transition:  6s ease;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0,0,0,.1);
`
export const Card = styled.div` 
    position: relative;
    width: ${ props => props.state ? '100%' : '70%' };
    background-color: ${ ({ theme }) => theme.InvColor };

`
export const ContainerButton = styled.div` 
    display: flex;
    justify-content: space-between;
`

export const Content = styled.div` 
    margin: 10px 0px;
`
// Styled Product
export const ContainerCardProduct = styled.div` 
    display: flex;
    max-width: 1366px !important;
    margin: auto;
    display: grid;
    overflow: hidden;
    gap: 5px;
    margin: auto; 
    grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    @media only screen and (max-width: 960px){
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }
    @media only screen and (max-width: 760px){
        grid-template-columns: 50% repeat(auto-fill, 50%) 50%;
    }

`
export const ContentProducts = styled.div` 
    max-width: 1366px !important;
    margin: auto;
    margin-top: 50px;
    @media only screen and (max-width: 960px){
    }
`
export const ActionName = styled.div`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    opacity: 0;
    transition: .1s ease-in-out;
    z-index: -900;
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    top: ${ ({ top }) => top ? top : '20px' };
    transition-delay: ${ ({ delay }) => delay ? delay : 'auto' };
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${ BGColor };
    &:hover  ${ ActionName } {
        opacity: 1;
        z-index: 900;
    }
`
export const CardProduct = styled.div` 
    flex: 0 1 auto;
    display: flex;
    position: relative;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
    margin: 10px;
    border-radius: 8px;
    background-color: #FFFFFF;
    border: 1px solid rgba(0,0,0,.1);
    height: 450px;
    &:hover  ${ ButtonCard } {
        right: 15px;
    }
`

export const ContentImg = styled.div` 
    width: 100%;
    height: 70%;
    min-height: 70%;
    max-height: 70%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 8px 8px 0px 0px;
    background-color: #ededed;
`
export const Img = styled.img` 
    width: 100%;
    height: 100%;
    object-fit: cover;
`
export const ContentInfo = styled.div` 
    width: 100%;
    flex-direction: column;
    padding: 24px 16px;
    position: relative;
`
export const Title = styled.h2` 
    font-size: 17px;
    font-family: PFont-Light;
    line-height: 1.18;
    word-break: break-word;
`
export const ContentIconFav = styled.div` 
position: absolute;
    top: -30px;
    box-shadow: 0px 0px 6px 0px #16101028;
    right: 20px;
    width: 50px;;
    height: 50px;
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${ BGColor };
`
export const Text = styled.h3` 
    font-size: ${ ({ size })=> size ? size : '15px' };
    width: 100%;
    margin: 5px 0px;
    font-weight: 400;
    font-family: PFont-Light;
    word-break: break-word;
`
export const ReadMore = styled.button`
    align-items: center;
    cursor: pointer;
    color: ${ ({ theme }) => theme.BGAColor };
    justify-content: center;
    align-self: center;
    display: flex;
    border: none;
    outline: none;
    user-select: none;
    margin: 30px 0px;
    background-color: #09e5ab;
    padding: 5px 5px;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: .2rem;
    text-align: center;
    width: 200px;
`

export const CardOne = styled(Card)` 
    ${ props => props.state ? css`width: 0%` : css`width: 30%;` }
    transition:  .6s ease;
    position: sticky;
    top: 50px;
    height: min-content;
    padding: 10px;
`