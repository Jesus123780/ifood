import styled, { css } from "styled-components";
export const Card = styled.div`
    grid-template-columns: 1fr 146px;
    grid-gap: 15px;
    padding: 15px;
    min-width: 320px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
    border-radius: 4px;
    position: relative;
    display: grid;
    min-height: 190px;
    width: 100%;
    height: 147px;
    background: #fff;
    padding: 20px;
    text-decoration: none;
    transition: .2s;
    overflow: hidden;
    
    height: 100%;
    .footer  {
      position: absolute;
      bottom: 15px;
    }
    .card__price, .card__des  {
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: #3e3e3e;
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
    .card__des {
      text-decoration: line-through;
    }
    .card__description {
      list-style: none;
      cursor: pointer;
      box-sizing: border-box;
      color: #3e3e3e;
      font-weight: 400;
      margin-top: 0;
      font-size: 1.125rem;
      line-height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &&:hover {
      border: 1px solid #dbdad9;
    }
    .card__description_main {
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    margin-bottom: 10px;
    font-size: .875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
`