import styled from 'styled-components'

export const ContainerLeft = styled.div`
@media (min-width: 1024px){
    display: flex;
    flex: 1 1 0%;
}
display: none;
position: static;
margin: 0px;
top: 0px;
left: 0px;
width: 60%;
min-width: 60%;
max-width: 60%;
height: 93vh;
`
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    white-space: nowrap;
    height: 100vh;
`
export const ContentImage = styled.div`
    width: 40vw;
    position: relative;
    height: 100%;
`
export const Form = styled.div`
    width: 20vw;
    align-items: center;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    padding: 16px;
    @media (max-width: 1024px) {
        width: 60vw;
    }
`