import styled, { css } from 'styled-components'

export const ContainerMain = styled.div`
    padding-top: 25px;
    margin-left: 15px;
`
export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    width: ${ ({ width }) => {return width ? width : '50%'} };
    margin: ${ ({ margin }) => {return margin ? margin : '0 20px'} };

    @media (max-width: 767.98px) {
        width: 100%;
        margin: 0;
        margin-top: 12px;
    }
`
export const Card = styled.div`
    width: 100%;
    border-radius: 4px;
    background-color: ${ ({ theme }) => {return theme.InvColor} };
    border: 1px solid ${ ({ theme }) => {return theme.PLColor} };
    margin: 0 auto 50px;
    padding: 30px 10px;

    @media (max-width: 767.98px) {
        width: 95%;
    }
`

export const ContentInfo = styled.div`
    display: flex;
    flex-direction: row;
    ${ ({ margin }) => {return margin && css`margin: ${ margin };`} };
    ${ ({ mLeft }) => {return mLeft && css`
        margin-left: ${ ({ marginLeft }) => {return marginLeft ? marginLeft : 'auto'} };
    `} }
    ${ ({ Action }) => {return Action && css`
        cursor: pointer;
    `} }
    @media(max-width: 768px){
        flex-direction: column;
    }
`
export const InputSelect = styled.select`
    font-size: 16px;
    outline: none;
    margin: auto;
    border-radius: 5px;
    border: 1px solid ${ ({ theme }) => {return theme.PLVColor} };
    background-color: ${ ({ theme }) => {return theme.BGAColor} };
    width: 100%;
    padding: 10px 5px;
`
export const Option = styled.option`
    :checked{
            background-color:${ ({ theme }) => {return theme.PLVColor} }
        }
`
export const Text = styled.span`
    text-align: ${ ({ tAlign }) => {return tAlign ? tAlign : 'left'} };
    font-size: ${ ({ fSize }) => {return fSize ? fSize : '16px'} };
    font-family: PFont-Regular;
    ${ ({ margin }) => {return margin && css`margin: ${ margin }`} };
    color: ${ ({ theme }) => {return theme.InvTColor} };
    ${ ({ tit }) => {return tit && css`
        font-weight: ${ ({ fontWeight }) => {return fontWeight ? fontWeight : '700'} };
    `} }
    ${ ({ aSelf }) => {return aSelf && css`
        align-self: ${ ({ alignS }) => {return alignS ? alignS : 'flex-end'} };
    `} }

    @media (max-width: 767.98px) {
        font-size: 15px;
    }
`
export const TextButton = styled.span`
    font-size: 13px;
    margin: 5px;
    color: #fff;
`
export const Title = styled.span`
    text-align: ${ ({ tAlign }) => {return tAlign ? tAlign : 'left'} };
    font-size: ${ ({ fSize }) => {return fSize ? fSize : '16px'} };
    font-family: PFont-Regular;
    color: ${ ({ theme }) => {return theme.SFColor} };
    font-weight: ${ ({ fontWeight }) => {return fontWeight ? fontWeight : '700'} };
    ${ ({ margin }) => {return margin && css`margin: ${ margin };`} };
    ${ ({ aSelf }) => {return aSelf && css`
        align-self: ${ ({ alignS }) => {return alignS ? alignS : 'flex-end'} };
    `} }
`
export const ButtonStatus = styled.button`
    background-color:#20c0f3;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    margin-bottom: 10px;
    padding:10px 15px;
    font-weight: 600;
    font-size: ${ ({ fSize }) => {return fSize ? fSize : '13px'} };
    min-width: 120px;
    width: 150px;
    border-radius: 50px;
`
export const ButtonSave = styled.button`
    border: none;
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    padding: ${ ({ padding }) => {return padding ? padding : '15px 30px'} };
    font-weight: 600;
    font-size: ${ ({ fSize }) => {return fSize ? fSize : '16px'} };
    min-width: 120px;
    width: 220px;
    ${ ({ bgColor }) => {return bgColor && css`background-color: ${ bgColor };`} };
    border-radius: 5px;
`
export const ImgContainer = styled.div`
    display: inline-block;
    margin: 0 20px;
`

export const InputText = styled.input`
    width: ${ ({ width }) => {return width ? width : '100%'} };
    margin: ${ ({ margin }) => {return margin ? margin : '20px 0'} };
    border: 1px solid ${ ({ theme }) => {return theme.InpBorColor} };
    background-color: ${ ({ theme }) => {return theme.TColor} };
    border-radius: 4px;
    color: ${ ({ theme }) => {return theme.InvTColor} };
    font-size: 15px;
    min-height: 45px;
    padding: 0 15px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    &:focus{
        border-color: #bbb;
        box-shadow: none;
        outline: 0 none;
    }
    ${ ({ radio }) => {return radio && css`
        width: 20px;
    `} }
`
export const InputFile = styled.input`
    display: none;
`
export const Container = styled.div`
    width: 61%;
    margin: 20px auto ;
`
//---- NO SE ESTA USANDO
export const InputTextArea = styled.textarea`
    border: 1px solid ${ ({ theme }) => {return theme.InpBorColor} };
    background-color: ${ ({ theme }) => {return theme.TColor} };
    border-radius: 4px;
    color: ${ ({ theme }) => {return theme.InvTColor} };
    font-size: 15px;
    max-height: 150px;
    max-width: 88%;
    min-height: 150px;
    min-width: 90%;
    transition: border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
    &:focus{
        border-color: #bbb;
        box-shadow: none;
        outline: 0 none;
    }
    ${ ({ radio }) => {return radio && css`
        width: 20px;
    `} }
`
export const Required = styled.span`
   color: #ff0100 !important;
   font-size: 10px;

`
