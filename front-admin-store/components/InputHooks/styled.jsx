import styled, { css } from 'styled-components'
import { BGColor, EColor, SEGColor, SFColor, SFVColor } from '../../public/colors'

export const BoxInput = styled.div`
    position: relative;
    padding: ${({ padding }) => {return padding || '15px 5px'}};
    width: ${({ width }) => {return width || '100%'}};
    ${({ minWidth }) => {return minWidth && css`min-width: ${minWidth};`}}
    ${({ maxWidth }) => {return maxWidth && css`max-width: ${maxWidth};`}}

`
export const Listbox = styled.ul`
    position: absolute;
    width: 98%;
    border: 1px solid #aaa;
    margin: 13px 0px;
    background-color: ${BGColor};
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
    padding: ${({ padding }) => {return padding || '15px 5px'}};
    width: ${({ width }) => {return width || '100%'}};
    ${({ minWidth }) => {return minWidth && css`min-width: ${minWidth};`}}
    ${({ maxWidth }) => {return maxWidth && css`max-width: ${maxWidth};`}}
`
export const List = styled.ul`
    position: relative;
    padding: ${({ padding }) => {return padding || '15px 5px'}};
    width: ${({ width }) => {return width || '100%'}};
    ${({ minWidth }) => {return minWidth && css`min-width: ${minWidth};`}}
    ${({ maxWidth }) => {return maxWidth && css`max-width: ${maxWidth};`}}
    &:hover {
        cursor: pointer;
        background-color: #aca5a537;
    }
`
export const ShowPass = styled.button`
    position: absolute;
    left: 80%;
    top: 26px;
    background-color: transparent;
    margin: auto;

`
export const Tooltip = styled.div`
    display: block;
    background-color: transparent;
    border-radius: 2px;
    z-index: 10;
    font-size: 10px;
    color: ${SEGColor};
`
export const LabelInput = styled.span`
    position: absolute;
    transition: .2s ease;
    text-align: left;
    font-size: ${({ value }) => {return value ? '1rem' : '16px'}};
    top: ${({ value }) => {return value ? '-5px' : '30px'}};
    left: ${({ value }) => {return value ? '-4px' : '20px'}};
    color: ${({ value, error }) => {return value ? SFColor : (error ? EColor : SFVColor)}};
    pointer-events: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: PFont-Light;
    padding-left: ${({ value }) => {return value ? '10px' : '0px'}};
    ${({ type }) => {return type === 'date' && css`
        top: -8px;
        left: 5px;
    `}} 
`
export const TextAreaInput = styled.textarea`
    color: ${props => {return (props.type === 'date' && !props.value) ? '#CCC' : '#272323'}};
    padding: ${props => {return props.padding ? props.padding : '15px 10px'}};
    outline: 0;
    border: ${({ border }) => {return border || '1px solid #ccc'}};
    font-weight: 600;
    font-size: ${({ size }) => {return size || '13px'}};
    width: ${({ width }) => {return width || '-webkit-fill-available'}};
    border-radius: ${({ radius }) => {return radius || '2px'}};
    ${({ margin }) => {return !!margin && css`margin: ${margin};`}}
    ${({ minWidth }) => {return minWidth && css`min-width: ${minWidth};`}}
    &:focus ~ ${LabelInput} {
        top: -6px;
        left:0px;
        font-size: 14px;
        color: #CCC;
        background-color: ${BGColor};
        padding: 0px 5px;
    }
    &:focus { border: 1px solid '#35a8df'; }
    &:disabled { cursor: no-drop; }
    &:hover ~ ${Tooltip} { display: block; }
    ${({ error }) => {return error && css`border: .5px solid ${EColor};`}}
    ${({ height }) => {return !!height && css`max-height: ${height};`}}
    ${({ height }) => {return !!height && css`min-height: ${height};`}}
    `
export const InputV = styled.input`
    color: ${props => {return (props.type === 'date' && !props.value) ? '#0f0e0e' : '#272323'}};
    padding: ${props => {return (props.type === 'date') ? '12px' : props.paddingInput ? props.paddingInput : '15px 10px'}};
    outline: 0;
    border: ${({ border }) => {return border || '1px solid #ccc'}};
    font-weight: 600;
    font-size: ${({ size }) => {return size || '13px'}};
    width: ${({ width }) => {return width || '-webkit-fill-available'}};
    border-radius: ${({ radius }) => {return radius || '2px'}};

    ${({ margin }) => {return !!margin && css`
        margin: ${margin};
        
    `}}
    
    ${({ minWidth }) => {return minWidth && css`min-width: ${minWidth};`}}
    &:focus ~ ${LabelInput} {
        top: -6px;
        left:0px;
        font-size: 14px;
        color: #CCC;
        background-color: ${BGColor};
        padding: 0px 5px;
    }
    &:focus { border: 1px solid '#35a8df'; }
    &:disabled { cursor: no-drop; }
    &:hover ~ ${Tooltip} { display: block; }
    ${({ error }) => {return error && css`border: .5px solid ${EColor};`}}
`
