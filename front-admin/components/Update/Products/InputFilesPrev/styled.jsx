import styled, { css } from 'styled-components'

export const Box = styled.div`
    display: block;
    position: relative;
    box-sizing: border-box;
`
export const Button = styled.button`
    cursor: pointer;
    justify-content: center;
    background-color: transparent;
    display: flex;
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
    ${ props => {return props?.previewImg?.length ? css`border: 2px dashed rgba(0, 0, 0, 0.1);` : css`border: none;`} };
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
export const PreviewLoader = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 500px;
    ${ props => {return props?.previewImg?.length ? css`border: 2px dashed rgba(0, 0, 0, 0.1);` : css`border: none;`} };
    box-sizing: border-box;
    height: fit-content;
    max-width: 140px;
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
// export const Details = styled.div`
//     z-index: 20;
//     position: absolute;
//     top: 0;
//     left: 0;
//     opacity: 0;
//     font-size: 13px;
//     min-width: 100%;
//     max-width: 100%;
//     padding: 2em 1em;
//     text-align: center;
//     color: rgba(0, 0, 0, 0.9);
//     line-height: 150%;
// `
// export const Progress = styled.div`
//     background: linear-gradient(to bottom, #666, #444);
//     position: absolute;
//     top: 0;
//     left: 0;
//     bottom: 0;
//     width: 100%;
// `
// export const SpanCont = styled.div`
//     overflow: hidden;
//     text-overflow: ellipsis;
// `
// export const Span = styled.span`
//     background-color: rgba(255, 255, 255, 0.4);
//     padding: 0 0.4em;
//     border-radius: 3px;
// `