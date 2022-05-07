import styled from 'styled-components'
import { BGColor } from '../../../../assets/colors'

export const LabelInput = styled.span`
    position: absolute;
    text-align: left;
    font-size: ${ ({ value }) => {return value ? '16px' : '16px'} };
    top: ${ ({ value }) => {return value ? '5px' : '10px'} };
    left: 15px;;
    left: ${ ({ left }) => {return left ? left : '17px'} };
    transition: .2s;
    background-color: ${ BGColor };
    color:  #CCC;
    pointer-events: none;
    font-family: PFont-Light;
    user-select: none;
`
export const Input = styled.input`
    padding: 20px 10px;
    margin: 10px 0;
    outline: 0;
    border: 1px solid #524e4e;
    font-weight: 500;
    font-size: 15px;
    width: 100%;
    border-radius: 5px;
    font-family: PFont-Light;  
    &:focus ~ ${ LabelInput } {
        font-size: 16px;
        color: #CCC;
        padding: 0px 5px ;
    }  
    &::selection{
        background-color: red;
        color: ${ BGColor }
    }
    &:disabled{
        color: #808080;
    }
`
export const BoxInput = styled.div`
    position: relative;
    padding: ${ ({ padding }) => {return padding ? padding : '10px 5px'} };
    width: ${ ({ width }) => {return width ? width : '100%'} };
`