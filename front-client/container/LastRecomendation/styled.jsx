import styled from 'styled-components';
import { BColor, PColor } from '../../public/colors';
// import { PColor } from '../../assets/colors';

export const Card = styled.div`
@media (min-width: 992px){
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
}
@media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 100%;
}
`
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1366px!important;
    margin: auto;
`
export const ContainerProduct = styled.div`
grid-template-columns: repeat(auto-fill,minmax(275px,1fr));
    grid-gap: 30px;
    display: grid;
    grid-gap: 28px;
    max-width: 1366px;
    margin: 30px auto 20px;

`
export const Title = styled.h2`
    color: ${ BColor };
    margin: 20px 0;
    text-align: start;
    font-weight: 500; 
    font-size: 20px;
    margin: 20px 0 20px 0;
    font-family: PFont-Light;
    font-weight: 400;
`
export const Paragraph = styled.p`
    font-weight: 300;
    line-height: 29px;
    text-align: justify;
    list-style: initial;
    color: #717171;
    font-family:  PFont-Light;
    margin: 7px 0px;
    font-size: 14px;

`