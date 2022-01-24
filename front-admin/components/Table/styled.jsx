import styled, { css } from 'styled-components'
import { BGColor, EColor, PVColor, SEGColor, TBGAColor, TBGBColor, TBGDColor, TBGEColor, TBGRColor, TBGSColor, TBGVColor, TFBColor, TFEColor, TFSColor } from '../../public/colors'

export const ContainerTable = styled.div`
    width: 100%;
    min-width: max-content;
`
export const TableResponsive = styled.div`
    overflow: hidden;
    overflow-x: auto;
`
export const Button = styled.button`
    background-color: transparent;

`
export const Section = styled.th`
     display: grid;
    grid-template-columns: ${({ columnWidth }) => columnWidth ? columnWidth?.map(x => `${x?.width} `) : '1fr'}; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
   ${props => props.odd && css`
    &:nth-of-type(odd), .thead-default th {
        background-color: rgba(0, 0, 0, 0.03);
    }
   `}
    background-color: ${({ bgRow }) => bgRow === 1 ? `${TBGAColor}` : bgRow === 2 ? `${BGColor}` : bgRow === 3 ? `${TBGBColor}` : bgRow === 4 ? `${TBGSColor}` : bgRow === 5 ? TBGAColor : bgRow === 6 ? TBGEColor : bgRow === 7 ? TBGRColor : bgRow === 8 && TBGDColor};
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    }
`

export const Content = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0;
    justify-content: space-around;
    ${({ column }) => column && css`
        flex-direction: column;
        justify-content:center;
        align-items: flex-start};
    `}
    justify-content: ${({ justify }) => justify || 'start'};

`
export const Title = styled.span`
    cursor: ${({ pointer }) => pointer && 'pointer'};
    font-size: 0.875rem;
    font-family: PFont-Regular;
    user-select: none;
    pointer-events: none;

`
export const Box = styled.div`
    display: flex;
    flex-direction: column;
`
export const Text = styled.span`
    display: block;
    border-radius: 4px;
    font-size: ${({ size }) => size ? `${size}` : '12px'};
    color: ${({ color }) => color === 1 ? TFSColor : color === 2 ? TFEColor : color === 3 ? TFBColor : '#272b41'};
    transition: .5s;
    ${({ hover, theme }) => hover && css`
        :hover {
            cursor: pointer;
            color:  ${theme.TFBColor};
        }
    `}
`
export const StatusC = styled.span`
    display:block;
    font-family: sans-serif;
    border-radius: 10rem;
    background-color: ${({ theme, color }) => color === 1 && theme.SCColor};
    color: ${({ color, theme }) => color === 1 ? theme.TFSColor : color === 2 ? theme.TFEColor : color === 3 ? theme.TFBColor : '#272b41'};
    font-size: 12px;
    min-width: 100px;
    text-align:center;
    padding: 2px;
    font-weight: 700;
    color: ${({ theme }) => theme.BGAColor};
`
export const ProfileImg = styled.div`
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    height: 40px;
    margin-right: 8px;
    border: 1px solid blue;
    border-radius: 100px;
    object-fit: cover;
    cursor: ${({ pointer }) => pointer && 'pointer'};
`
export const BtnIcon = styled.div`
    margin-right: 5px;
`
export const TableBtn = styled.button`
    border-radius: 5px;
    border:none;
    outline: none;
    padding: 10px 7px;
    border: 1px solid ${SEGColor};
    background-color: ${({ color, theme }) => color === 1 ? theme.TFSColor : color === 2 ? theme.TFEColor : color === 3 ? theme.TFBColor : BGColor};

    font-size: 12px;
    :hover{
        cursor:pointer;
    }
 `
export const Image = styled.img`
    width: 40px;
    border-radius: 100px;
    object-fit: cover;
`
export const CheckBoxWrapper = styled.div`
  position: relative;
`
export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 55px;
  height: 26px;
  border-radius: 15px;
  background: ${PVColor};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`
export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
 &:checked + ${CheckBoxLabel} {
    background-color: ${EColor};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 33px;
      transition: 0.2s;
    }
  }} 
`

export const EntryPerViewC = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 15px;

`
export const EntryLabel = styled.label`
    font-size: 13px;
    font-family: PFont-Regular;
`
export const EntryInput = styled.input`
    width: 38px;
    height: 23px;
    margin: 0px 10px 0px 10px;
    outline:none;
`
export const EntryPaginationC = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top: 20px;

`
export const EntryButton = styled.button`
    cursor: pointer;
    border-radius: 20px;
    width: 100px;
    padding: 0 6px;
    height: 25px;
    color: ${BGColor};
    background-color: #202020;
    font-size: 16px;
    font-weight: 400;
    user-select: none;
    transition: all 200ms ease;
`
export const CurrentPage = styled.span`
    display: flex;
    width: 34px;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 20px;
    width: 50px;
    padding: 0 6px;
    height: 25px;
    color: ${BGColor};
    background-color: #202020;
    font-size: 16px;
    font-weight: 400;
    user-select: none;
    transition: all 200ms ease;
`
export const ArrowsLabel = styled.label`
    display: flex;
    flex-direction: column;
    user-select: none; 
    position: relative;

    /* pointer-events: none; */

`
export const ArrowsCheck = styled.input`
    /* display: none; */
    /* opacity: 0; */
    top: 14%;
    z-index: 999;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
`
export const A = styled.a`
    text-decoration:none;
`
