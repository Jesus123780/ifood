import styled from "styled-components";
import { BColor, SFVColor } from "../../public/colors";

export  const Content = styled.div`
    margin: auto;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    font-size: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    width: 100%;
    max-width: 1366px!important;
`
export  const Section = styled.div`
  margin: 30px 0;
  `
export const ItemCategory = styled.div`
    width: 100%;
    border: 1px solid ${SFVColor};
    border-radius: 3% ;
    height: 100px;
` 
export const ContentStores = styled.div`
    width: 100%;
    display: grid;  
    gap: 5px;
    grid-auto-flow: column;
    place-content: space-around;
    overflow: hidden;
    grid-template-columns: 30% repeat(auto-fill, 30%);
    margin: 0 30px 30px auto;
`
export const H2 = styled.h2`
    color: ${BColor};
    font-size: 20px;
    margin: 20px 0 20px 0;
    font-family: PFont-Light;
`
export const List = styled.div`
    width: 100%;
    display: grid;  
    gap: 5px;
    grid-auto-flow: column;
    place-content: space-around;
    overflow: hidden;
    grid-template-columns: 9% repeat(auto-fill, 9%);
    margin: 0 30px 30px auto;
` 
export const ContainerFilter = styled.div` 
    margin: 30px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
export const ItemFilter = styled.button` 
    display: flex;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    height: 32px;
    background: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 20px;
    padding: 7px 14px;
    color: #717171;
    font-size: 0.875rem;
    cursor: pointer;
    min-width: 5.375rem;
    font-family: PFont-Light;
`
export  const CardProduct = styled.div`
    height: 300px;
    width: 100%;
    border-radius: 2%;
    box-shadow: 1px 1px 3px #7c7c7c54;
`
export  const ContainerCardProduct = styled.div`
    display: grid;
    gap: 5px;
    grid-template-columns: 23% repeat(auto-fill, 23%);

`