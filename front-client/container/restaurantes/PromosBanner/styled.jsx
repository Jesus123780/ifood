import styled, { css } from "styled-components";

export  const Content = styled.div`
    margin: auto;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1366px!important;
`
export  const CardProduct = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 2%;
    box-shadow: 1px 1px 3px #7c7c7c54;
    `
export  const Img = styled.img`
    background-color: rgb(255 251 251 / 70%);
    background-blend-mode: overlay;
    object-fit: contain;
    width: 100%;
    height: 100%;
`
export  const BannerPromo = styled.div`
    border-radius: 4%;
    cursor: pointer;
    box-shadow: 1px 1px 3px #7c7c7c54;
    margin: auto;
    place-content: center;
    height: 250px;
    ${props => props.color && css`
        background-color: ${props.color}
    `}

`
export  const ContainerCardProduct = styled.div`
    display: grid;
    gap: 5px;
    /* grid-template: 1fr/ 20% 20% 20% 20% 20% ; */
    grid-template-columns: 33% repeat(auto-fill, 33%) 33%;

`