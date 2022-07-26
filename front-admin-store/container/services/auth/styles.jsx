import { PColor } from '@/public/colors'
import styled from 'styled-components'

export const ContainerAuth = styled.div`
  margin: 50px auto;
width: 200px;
  .password::before {
    border: 1px solid red;
    content: ' ';
    background-color: transparent;
    border-radius: 4px;
    transform: rotate(45deg);
    height: 22px;
    min-width: 22px;
    display: inline-block;
  }
  .password::after {
    content: '*';
    transform: translate(-17px, 4px);
    position: absolute;
    color: ${PColor};

  }
  .pass-md {
    max-width: 230px;
    border-bottom: 1px solid ${PColor};
    margin: auto;
    padding-bottom: 25px;
    justify-content: center;
    display: grid;
  }
`
export const TableKeyboard = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 15px;
  width: 200px;
  margin: 10px auto;
  max-width: 260px;
  
  .delete {
    grid-column-start: 3;
    grid-row-end: 4;
    grid-row-start: 5;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background: transparent;
  }
  .Option_button {
    background: transparent;
    display: grid;
    outline: none;
    place-content: center;
    place-items: center;
    margin: 0;
    overflow: visible;
    cursor: pointer;
    max-height: 100%;
    border: none;
    border-radius: 100%;
    width: 55px;
    font-weight: 400;
    font-family: PFont-Light;
    font-size: 2.8em;
    line-height: 2.2em;
    padding: 0;
    color: ${PColor};
    text-align: center;
    height: 55px;
  }
`