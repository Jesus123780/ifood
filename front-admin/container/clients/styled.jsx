import { PColor } from "public/colors"
import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    max-width: 1366px;
    margin: 0 auto;
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
export const GridStatistics = styled.div`
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