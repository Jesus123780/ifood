import styled, { css, keyframes } from "styled-components";
import { PColor } from "../../public/colors";

export const Wrapper = styled.div`
    width: 100%;
    max-width: 1366px;
    min-width: 1366px;
    margin: 100px auto;
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: repeat( auto-fit,minmax(45%,1fr) );
`
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${PColor};
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const OlList = styled.ol`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    word-wrap: break-word;
    box-sizing: border-box;
    outline: none !important;
    margin-top: 0;
    margin-bottom: 0!important;
    padding: 15px 15px 0 15px;
    list-style: none;
`
export const FeedItem = styled.li`
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.5;
    color: #212529;
    font-family: PFont-Light;
    word-wrap: break-word;
    list-style: none;
    position: relative;
    padding-bottom: 20px;
    padding-left: 30px;
    border-left: 2px solid #e4e8eb;
    .text-info {
        font-size: 17px;
    }
    .date {
      display: block;
      position: relative;
      top: -5px;
      color: #8c96a3;
      text-transform: uppercase;
      font-size: 13px;
    }
    .activity-text{
      position: relative;
      top: -3px;
    }
    &:after {
    content: "";
    display: block;
    background-color: ${PColor};
    position: absolute;
    top: 0;
    ${props => props.pulse && css`animation: ${pulse} 2s infinite; `}
    left: -13px;
    width: 20px;
    height: 20px;
    border-radius: 50%  ;
    background: #ffffff;
    border: 1px solid ${PColor};
    background-color: ${PColor};

}
`