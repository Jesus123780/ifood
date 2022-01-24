import styled, { css } from 'styled-components';
import { BGColor, PColor } from '../../../public/colors';

export const Button = styled.button` 
    position: absolute;
    z-index: 9999;
`
export const FormProducts = styled.form`
    height: 100%;
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
    width: 3px;
    background-color: #dcdcdc;
    border-radius: 5px;
    }
`

export const Card = styled.div` 
    position: relative;
    padding: 10px;
    background-color: ${ ({ theme }) => theme.InvColor };
    border: 1px solid #ccc;
    height: ${({ height }) => height || 'auto'};
`
export const Container = styled.div`
    display: flex;
    border-radius: 4px;
    background-color: ${ ({ theme }) => theme.InvColor };
    transition:  6s ease;
    padding-bottom: 30px;
    padding: 30px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    .filter{
        display: none !important;
    }
`
export const CardOne = styled(Card)` 
    transition:  .6s ease;
    width: 30%;
`
export const ColumnCard = styled.div`
    display: grid;
    gap: 10px;
    height: min-content;
    grid-template-columns: 24% repeat(auto-fill, 24%);
` 
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    top: ${ ({ top }) => top ? top : '20px' };
    transition-delay: ${ ({ delay }) => delay ? delay : 'auto' };
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${ BGColor };
    ${ props => props.grid && css`
        top: ${ ({ top }) => top ? top : '80px' };
        `
}
`
export const CardProduct = styled.div` 
    flex: 0 1 auto;
    display: flex;
    position: relative;
    width: ${({ width }) => width ? width : '100%'};
    overflow: hidden;
    flex-direction: column;
    margin: 10px;
    border-radius: 8px;
    background-color: #FFFFFF;
    border: 1px solid rgba(0,0,0,.1);
    height: 450px;
    &:hover  ${ ButtonCard } {
        right: 15px;
    }
    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    ${ props => props.grid && css`
    height: min-content;
    flex-direction: row;

` }
`
