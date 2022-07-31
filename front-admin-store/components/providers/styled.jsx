import { PColor } from 'public/colors'
import styled from 'styled-components'

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
export const ColProviders = styled.div`
    display: grid;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(5%, 1fr) );
    grid-gap: 19px 12px; 
    height: auto;
    align-items: center;
    margin: 0 auto;
    padding: 10px 0;
    place-content: center;
    border-bottom: 1px solid #f0f0f0;
    & > div{
        overflow: hidden;
        text-overflow: ellipsis;
        
    }
    :hover {
        background-color: #e9e9e933;
        :first-child {
            background-color: #fff;
        }
    }
    &:nth-of-type(odd), .thead-default th {
        background-color: rgba(0, 0, 0, 0.03);
    }
`