import styled, { css } from 'styled-components'
import React from 'react'

export const ContainerModal = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transition: opacity 150ms ease-in-out;
${ ({ modal }) => modal
        ? css`  
    position: absolute; 
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    background-color:red;


          `
        : css`
            
        opacity: 0;

          ` }
`

export const Container = styled.div``
export const ContentList = styled.div`
    position: relative;
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    border: 1px solid #e9e9e9;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    padding: 10px;
    cursor: pointer;
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
export const TextList = styled.h3`
    font-size: 14px !important;
    font-family: PFont-Regular;
    `
export const Card = styled.form`
  height: min-content;
  border: 1px solid #dcdcdc;
  `
export const ContentTooltip = styled.div`

`
export const Options = ({ icon, name }) => {

    return (
        <React.Fragment>
            <div>
                {icon}
            </div>
            <ContentTooltip title={name}>
            </ContentTooltip>
        </React.Fragment>
    )
}