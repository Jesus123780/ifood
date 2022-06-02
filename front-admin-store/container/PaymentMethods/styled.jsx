import styled from 'styled-components'

export const Card = styled.div`
@media (min-width: 768px) {
    margin: auto;
    min-width: 600px;
    width: auto;
    align-self: center;
    display: grid;
    grid-template-columns: auto 445px;
    grid-template-rows: initial;
    position: relative;
    height: 60vh;
    /* overflow: hidden; */
}
`
export const ContentCard = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fit,minmax(250px,1fr) );
    width: 90%;
    grid-gap: 19px 12px;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    place-content: space-between;
    padding: 30px;
    width: 100%;
    max-width: 1366px;
`