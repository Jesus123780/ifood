import { PColor } from "public/colors"
import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    max-width: 1366px;
    margin: 30px auto;
    form{
        display: flex;
    width: 100%;
    flex-wrap: wrap;
    }
`
export const Item = styled.div``
export const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 80%;
    gap: 20px;
`
export const StatisticHours = styled.div`
 border: 1px solid #aaaaaa69;
 border-radius: 5px;
 padding: 30px;
 place-content: center;
 display: grid;
 h2 {
     text-align: center;
     font-size: 1.3em;
     margin-bottom: 10px;
    }
    p {
        text-align: center;
    }
    grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
`