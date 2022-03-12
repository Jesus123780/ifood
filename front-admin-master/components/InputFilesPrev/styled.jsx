import styled, { css } from 'styled-components'

export const Box = styled.div`
    display: block;
    position: relative;
    min-height: 230px;
    border: 2px dashed #ced4da;
    box-sizing: border-box;
`
export const Button = styled.button`
    cursor: pointer;
    justify-content: center;
    background-color: transparent;
    display: flex;
    width: 100%;
    align-items: center;
    height: 300px;
    margin: auto;
`
export const InputFile = styled.input`
    display: none;
`
export const DropZone = styled.div`
    min-height: 150px;
    cursor: pointer;
    display: flex;

`
export const Preview = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: none;
    ${props => props?.previewImg?.length ? css`border: 2px dashed rgba(0, 0, 0, 0.1);` : css`border: none;`};
    box-sizing: border-box;
    height: fit-content;
    width: 145px;
    max-width: 145px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
}
`
export const ImgCont = styled.div`
    border-radius: 4px;
    width: 25%;
    height: 25%;
    min-width: 80px;
    min-height: 80px;
    position: relative;
    z-index: 10;
    margin: 10px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 2px solid #3483fa;
`
export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
export const FileText = styled.span`
    position: absolute;
    bottom: 0;
    color: #FFF;
    width: 100%;
    background-color: rgba(0,0,0,.7);
    padding: 2px;
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
export const ButtonDelete = styled.button`
    position: absolute;
    background-color: #fff;
    border: none;
    outline: none;
    top: 0px;
    border-radius: 2px;
    padding: 2px 0;
    cursor: pointer;
    left: 52.1px;
    `
export const Tooltip = styled.span`
    position: absolute;
`
