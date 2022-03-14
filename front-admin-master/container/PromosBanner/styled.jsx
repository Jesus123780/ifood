import { BGColor } from "public/colors";
import styled, { css } from "styled-components";

export const Content = styled.div`
    margin: auto;
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1766px!important;
`
export const CardProduct = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 2%;
    box-shadow: 1px 1px 3px #7c7c7c54;
    `
export const Img = styled.img`
    background-color: rgb(255 251 251 / 70%);
    background-blend-mode: overlay;
    object-fit: contain;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    width: 100%;
    min-height: 100%;
    border-radius: 4px;
    /* transition: opacity .2s ease-out;y */

`
export const BannerPromo = styled.div`
    border-radius: 4%;
    cursor: pointer;
    box-shadow: 1px 1px 3px #00000052;
    margin: auto;
    place-content: center;
    border-radius: 5px;
    /* margin: 0 40px; */
    /* ${props => props.color && css`
        background-color: ${props.color}
    `} */


`
export const ContainerCardProduct = styled.div`
    /* display: flex; */
    /* margin-top: 20px; */
    /* margin: 0 40px ; */
    /* grid-template-columns: repeat(100, 100px); */
    /* padding: 5px; */
    /* grid-template: 1fr/ 20% 20% 20% 20% 20% ; */
    /* grid-template-columns: 33% repeat(auto-fill, 33%) 33%; */

`
export const ImageBannerPromo = styled.img`
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: top;
    object-position: top;
    width: 100%;
`
export const Text = styled.span`
    font-size: 22px;
    font-weight: 600;
    line-height: 1.09;
    color: ${BGColor} !important;
`
export const CardPromo = styled.div`
    position: relative;
    border-radius: 5px;
 
    border-radius: 6px;
    display: block;
    height: ${({ height }) => height || '250px'};
    overflow: hidden;
    position: relative;
    text-align: center;
    @media (max-width: 960px){
       height: 250px;

    }
    .btn-delete-master-banner {
        position: absolute;
        transition: .5s ease;
        left: 0;
        right: 0;
        margin: auto;
        top: 10px;
        z-index: -1;
        padding: 10px;
        width: min-content;
    }
    .btn {
        cursor: pointer;
        background-color: transparent;


    }
    &:hover {
        .btn-delete-master-banner {
            transform: translateY(-100%) !important;
        }
    }
    .goto-action {
    align-items: center;
    bottom: 0;
    box-sizing: border-box;
    display: -webkit-flex;
    display: flex;
    left: 0;
    padding: 16px;
    position: absolute;
    width: 100%;
    z-index: 1;
    background: ${({ final }) =>  `linear-gradient(${final})}`};
    }
   
`
export const ContainerSliderPromo = styled.div`
    display: grid;
    grid-template-columns: repeat(100, 100px); 
    padding: 5px;
    gap: 10px;
    place-content: center;
    grid-template-columns: 33% repeat(auto-fill, 33%) 33%;
    @media (max-width: 960px){
        grid-template-columns: repeat(auto-fill, 45%);
        /* display: flex; */
    }
`

// const chartColor = ['rgba(1,25,71, 0.0001)', 'rgb(1,25,71)', rgba(255,0,0,1)]
// // const final = 
// const final = `0deg, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 0%, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 100%`
// export const CardPromo = styled.div`
//     position: relative;
//     border-radius: 5px;
//     border-radius: 6px;
//     display: block;
//     height: 250px;
//     overflow: hidden;
//     position: relative;
//     text-align: center;
//     @media (max-width: 960px){
//        height: 150px;
//     }
//     .goto-action {
//     /* background: linear-gradient(${final}); */
//     align-items: center;
//     bottom: 0;
//     display: flex;
//     left: 0;
//     padding: 16px;
//     position: absolute;
//     width: 100%;
//     }
//     .text {
//         font-size: 22px;
//     font-weight: 600;
//     line-height: 1.09;
//     color: ${BGColor};
//     @media (max-width: 960px){
//        font-size: 12px;

//     }
//     }
// `