import Link from 'next/link'
import styled, { css } from 'styled-components';
import { FadeOup } from '../../components/animations';
import { BGColor, EColor, PColor, SECColor } from '../../public/colors';

export const Content = styled.div`
    width: 100%;
    display: grid;
    overflow: auto;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
@media only screen and (min-width: 960px){
    width: 100%;
    margin: auto;
    flex: wrap;
    width: 100%;
    margin: auto;
}

`
export const Form = styled.form`
box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    border-radius: 8px;
    padding: 36px;
    place-content: center;
    display: grid;
    flex-wrap: wrap;
    flex-direction: row ;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    align-self: center;
    width: 600px;
    `
export const WrapDirection = styled.div`
box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row ;
    background-color: #fff;
    overflow: hidden;
    position: relative;
    align-self: center;
    transition: all 0.5s ease;
    ${props => props.showLocation ? css`
    padding: 0;
    height: auto;
    padding: 36px;
    ` : css`
    height: 0;

    
    `};
    `
export const ContainerSliderForm = styled.form`
    @media (min-width: 768px) {
        position: absolute;
        width: 100%;
        top: 0;
        padding: 36px 50px;
        margin: auto;
        height: 100%;
        background-color: ${BGColor};
        left: 0;
        transform: ${props => props.activeLogin ? 'translateX(0px)' : 'translateX(900px)'};
        transition: all 0.6s ease;
    }
`
export const Iconos = styled.div`
    color: ${({ color }) => (color ? color : EColor)};
    margin: ${({ margin }) => (margin ? margin : '0px 7px')};
    ${({ size }) => size &&
        css`
            font-size: ${size};
        ` }
`
export const ButtonSubmit = styled.button`
    background-color: ${({ color, theme }) => color === '1'
        ? ' #4065b4'
        : color === '2'
            ? `${BGColor}`
            : theme.SFAColor};
    outline: none;
    border: none;
    box-shadow: 0px 1px 4px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 6%);
    font-family:  PFont-Regular;
    cursor: pointer;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: ${({ content }) => content ? content : 'space-between'};
    font-size: ${({ size }) => (size ? size : '1rem')};
    color: ${({ colorFont }) => (colorFont ? colorFont : `${BGColor}`)};
    line-height: 1.5;
    border-radius: 0.3rem;
    text-align: center;
    width: 100%;
    margin: 10px 7px;
    ${props => props.hoverColor &&
        css`
            &:hover {
                color: ${BGColor};
                background-color:${PColor};
            }
        ` };
    ${props => props.colorPrimary &&
        css`
            {
                color: ${BGColor};
                background-color:${PColor};
            }
        ` };
`
export const Enlace = styled(Link)`
    position: absolute;
    transform: translateX(0);
    left: 44px;
    display: block;
`
export const Card = styled.div`
    font-size: 16px;
    position: relative;
    justify-content: center;
    display: flex;
    width: 50%;
    height: 100vh;
    @media only screen and (min-width: 960px) {
        &::before {
            right: 0;
            bottom: unset;
            left: auto;
            min-width: 130vh;
            min-height: 135vh;
            max-width: 80vw;
            max-height: 80vw;
            width: 80vw;
            height: 80vw;
            -webkit-transform: translate(15vw,-23%);
            transform: translate(15vw,-23%);
        }
    }
    &:before {
    content: "";
        min-width: 130vh;
        min-height: 135vh;
        width: 130vw;
        height: 130vw;
        z-index: -1;
        position: absolute;
        background-color: #fdedee;
        border-radius: 0 100% 100%;
        left: 50%;
        transform: translate(-70%);
        bottom: -70px;
    }

`

export const ContentCardInfo = styled.div`
display: grid;
    gap: 24px;
    margin: 0px auto;
    max-width: 767px;
    padding: 56px 24px;
`
export const ContentCards = styled.div`
    font-size: 16px;
    gap: 16px;
    margin: 0px auto;
    max-width: 767px;
    padding: 56px 24px;
`


export const Cards = styled.div`
    border-radius: 6px;
    border: 1px solid rgb(242, 242, 242);
    transform: scale(1);
    transition: transform 250ms ease-in 0s;
    max-width: 500px;
    &:hover {
        transform: scale(1.015);
        transition: transform 250ms ease-in 0s;
    }
`
export const Card2 = styled(Cards)`
    max-width: 100%;
    border-radius: 6px;
    padding: 16px;
    background-color: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-color: rgb(242, 242, 242);
`
export const GoBack = styled.div`
    display: flex;
    margin-bottom: 40px;
    & > span {
            font-family: PFont-Light;
            font-size: 14px;
            text-align: center;
            width: 100%;
            color: ${({ theme }) => `${theme.PColor}`};
        }
`
export const Text = styled.h2`
@media only screen and (min-width: 960px){
    margin: 0 0 42px;
    text-align: ${({ align }) => align ? align : 'start'};
    margin: ${({ margin }) => margin ? margin : '0'};
    font-size: ${({ size }) => size ? size : '1.5rem'};
}
    font-weight: initial;
    font-family: PFont-Regular;
    color: ${({ color }) => color ? color : '#717171'};
    margin: 0 0 22px;
    ${props => props.cursor && css`cursor: pointer;`}
`

// cards
export const Line = styled.div`
    height: 0.125rem;
    background-color: #393a3d;
    border-radius: 0.0625rem;
    margin: 0 0 10px 0;
`
export const ContentPrice = styled.div`
font-weight: bold;
   position: relative;
    & #number {
        position: absolute;
        top: 1.0625rem;
        right: 64px;
    }
    & #letters {
        position: absolute;
        top: 2.1rem;
        right: 43px;
    }
`
export const BtnItem = styled.button`
    outline: none;
    border: none;
    background: none!important;
    font-family: PFont-Light;
    padding: 0!important;
    color: inherit;
    line-height: inherit;
    padding-left: 0.5rem;
    padding-right: 0.625rem;
    position: relative;
    text-align: left;
    position: relative;
    font-size: 14px ;
    &:hover {
        text-decoration: underline;
        cursor: pointer;     
    }
    ${props => props.overflow &&css`
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
        font-size: 1.25rem;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    `}
`
export const FeatureItem = styled.div`
    display: flex;
    align-items: flex-start;
    padding-top: 0.5rem;
    cursor: default;
    width: fit-content;
    /* flex-direction: column; */
    padding-top: 0.5rem;
` 
export const Pricing = styled.span`
   position: relative;
    color: #6b6c72;
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.5;
    width: 100%;
    font-family: PFont-Light;
    margin-bottom: 1.25rem;
    position: relative;
`
export const ContentToggle = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`
export const ButtonTheme = styled.div`
    width: 65px;
    min-width: 65px;
    cursor: pointer;
    height: 30px;
    background-color: ${SECColor};
    border-radius: 30px;
    position: relative;
    transition: .3s ease;
`
export const SwitchButton = styled.button`
   width: 23px;
    height: 23px;
    border-radius: 50%;
    top: 3px;
    position: absolute;
    ${({ active }) => active && css`left: ${active};`}
    transition: .3s ease;
`
export const ContentCarPrice = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* height: 70vh; */
    @media (max-width: 900px) {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`
export const ContentPricing = styled.div`
    max-width: 73.75rem;
    margin: 0 auto;
    padding: 1.25rem;
    position: relative;
`
export const BtnClose = styled.button`
    position: absolute;
    cursor: pointer;
    top: 0.75rem;
    right: 1.25rem;
    display: flex;
    height: 2rem;
    width: 2rem;
    padding: 0;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    outline: none;
    color: #8d9096;
    z-index: 1305;
`
export const CardWrap = styled.div`
    display: ${({ display }) => display || 'flex'};
    /* flex-direction: ${({ flexDirection }) => flexDirection || 'row'}; */
    justify-content: ${({ justify }) => justify || 'space-between'};
    flex-wrap: ${({ wrap }) => wrap || 'wrap'};
    margin: ${({ margin }) => margin || '30px 0px 0px 0px'};
    border: ${({ border }) => border || 'none'};
    padding: ${({ padding }) => padding || '0'};
    background-color: ${({ bgColor }) => bgColor || BGColor};
    min-width:${({ minWidth }) => minWidth || 'auto'};
    max-width:${({ maxWidth }) => maxWidth || 'auto'};
    min-height:${({ minHeight }) => minHeight || 'auto'};
    height:${({ height }) => height || 'auto'};
    ${({ shadow }) => shadow && css`box-shadow: ${shadow};`}
    ${({ overflow }) => overflow && css`overflow: ${overflow};`}
    ${({ radius }) => radius && css`border-radius: ${radius};`}
    ${({ alignContent }) => alignContent && css`align-content: ${alignContent};`}
    /* flex-flow: column; */
    width:${({ width }) => width || 'auto'};
    ${({ media }) => media && css`
        @media (max-width: 900px) {
            width: 47%;
            
        }
    
    ;`}
    ${({ mediax }) => mediax && css`
        @media (max-width: 900px) {
            width: 33%;
            min-width: 192px;
            
        }
    
    ;`}
`
export const Module = styled.div`
    padding: 2.375rem .625rem 0 2.5rem;
    & ul {
        padding: 0 0 0 1.25rem!important;
        margin: 0;
        list-style-type: disc;
    
    }
    & li {
        font-size: .9rem;
        line-height: 1.5;

        margin: 0.75rem 0;
        font-family: PFont-Light;
    
    }
`
export const ModuleInfo = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${BGColor};
    z-index: 1300;
    height: 25rem;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    ${({ show }) => show
        ? css`
                opacity: 1;
                animation: ${FadeOup} 333ms cubic-bezier(.35,0,.5,1) backwards;
                `
        : css`
                
                visibility: hidden;
                margin: 0;
                opacity: 0;
                transform: translateY(-11px);
              `}
`