import styled from 'styled-components'

export const Container = styled.div`
    width: 98%;
    margin: 26px auto;

`
export const Card = styled.div`
    width: 100%;
    border: 1px solid #ccc;
    margin: 0 auto 50px;
    padding: 30px 10px;

    @media (max-width: 767.98px) {
        width: 100%;
    }
`

export const ContainerHead = styled.div`
    display: flex;
    margin: 0 12px;
`
export const ImgContainer = styled.div`
    padding: 10px;
    min-width: 10%;
`
export const ContainerUpload = styled.div`
    width: 80%;
    padding: 10px;
    margin: auto 0;
`

export const InputContent = styled.div`
    justify-content: center;
    display: flex;
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
`
export const Input = styled.input`
    width: 100%;
    margin: 5px;
    height: 30px;
    padding: 5px;
`
export const ContentText = styled.div`
    width: 100%;
    margin: 0 20px;

    @media (max-width: 767.98px) {
        margin: 0;
        width: 100%;
        margin-top: 10px;
    }
`
export const InputText = styled.input`
    width: 100%;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    min-height: 46px;
    padding: 4px 15px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
        border-color: #bbb;
        box-shadow: none;
        outline: 0 none;
    }
`

export const InputTextDesabled = styled.input`
    width: 100%;
    margin: 5px 0;
        border: 1px solid #ccc;
    background-color: #ddd;
    border-radius: 4px;
    color: ${({ theme }) => theme.InvTColor};
    font-size: 15px;
    min-height: 46px;
    padding: 4px 15px;
    cursor: no-drop;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &:focus {
        border-color: #bbb;
        box-shadow: none;
        outline: 0 none;
    }
`

export const Form = styled.form`
    width: 99%;
    background-color: ${({ theme }) => theme.InvColor};
    border: 1px solid #ccc;
    margin: auto;
`
export const ButtonSubmit = styled.button`
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    margin: 0 5px;
    padding: 12px 10px;
    font-weight: 600;
    font-size: 16px;
    min-width: 120px;
    width: 200px;
    border-radius: 4px;
    background-color: #09e5ab;
    margin: 0 20px;

    @media (max-width: 767.98px) {
        margin: auto;
        margin-top: 20px;
    }
`

export const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width ? width : '50%'};
    margin: ${({ margin }) => margin ? margin : '0 20px'};

    @media (max-width: 767.98px) {
        width: 100%;
        margin: 0;
        margin-top: 12px;
    }
`

export const Text = styled.span`
    text-align: ${({ tAlign }) => tAlign ? tAlign : 'left'};
    font-size: ${({ fSize }) => fSize ? fSize : '16px'};
    font-family: PFont-Regular;
    ${({ margin }) => margin && css`margin: ${margin};`};
    color: ${({ theme }) => theme.InvTColor};
    ${({ tit }) => tit && css`
        font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '700'};
    ` }
    ${({ aSelf }) => aSelf && css`
        align-self: ${({ alignS }) => alignS ? alignS : 'flex-end'};
    ` }

    @media (max-width: 767.98px) {
        font-size: 15px;
    }
`

