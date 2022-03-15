import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1366px !important;
    margin: auto;
`
export const Form = styled.form`
    position: sticky;
    top: 20px;
    width: 50%;
    display: flex;
    display: st;
    height: fit-content;
    justify-content:center;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 5px;
    & > button {
        width: 50%;
        margin: auto;
    }
`

export const ContainerTask = styled.div`
    position: relative;
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    border: 1px solid #e9e9e9;
    width: 100%;
    min-height: 40px;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    cursor: pointer;
    margin: 10px;
    &:hover{
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
    }
    ${ ({ show }) => show
        && css`
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;


              ` }
    
`
export const OptionsFunction = styled.div`
    position: absolute;
    display: grid;
    transition: all 200ms ease-in-out;
    display: flex;
  ${ ({ show }) => show
        ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateX(0);
              `
        : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateX(-50px);
              ` }
    @media only screen and (min-width: 960px){
    }
`

export const Button = styled.button`
    outline: none;
    background: transparent;
    cursor: pointer;
`
export const ListTask = styled.div`
    transition: all 200ms ease-in-out;
    display: flex;
    margin-left: 200px;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-family: PFont-Light;
  ${ ({ show }) => show
        ? css`
        margin-left: 200px;
        `
        : css`
                
                margin-left: 30px;
              ` }
    @media only screen and (min-width: 960px){
    }
`
export const ContainInput = styled.div`
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    width: 100%;
    min-height: 40px;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    cursor: pointer;
    margin: 20px;
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: transparent;
    
`
export const Input = styled.input`
    padding: 10px;
    outline: none;
    border: 1px solid #dcdcdc;
    font-family: PFont-Light;
`