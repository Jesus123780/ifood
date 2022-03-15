import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1366px !important;
    margin: auto;
    @media only screen and (max-width: 960px){
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%)
    }
`
export const Form = styled.form`
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
export const ContainerList = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 200px repeat(auto-fill, 200px) 200px;
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
export const ContentModal = styled.div`
    transition: opacity 150ms ease-in-out;
    ${ ({ modal }) => modal
        ? css`  
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    z-index: 10000;
    background-color: rgba(0,0,0,0.322);
    `
        : css`
            
            margin: 0;
            opacity: 0;
            z-index: -99999099;
            ` }
            `
export const AwesomeModal = styled.div`
            width: 97%;
            border-radius: 10px;
            display: grid;
            grid-gap: 10px;
            opacity: 0;
            position: absolute;
            transition: 500ms ease;
            overflow-y: auto;
            background-color: ${ ({ theme }) => theme.InvColor };
            max-height: 700px;
            padding: 50px;
            ${ ({ modal }) => modal
        ? css`  
                    top: -50px;
                    bottom: 0;
                    transform: translateY(95px);
                    border-radius: 4px;
                    opacity: 1;
                    z-index: 99999909;
                      `
        : css`
                        
                    margin: 0;
                    opacity: 0;
                    z-index: -99999;
                      ` }
            &::-webkit-scrollbar {
                width: 3px;
                background-color: #dcdcdc;
                border-radius: 5px;
            }
            `