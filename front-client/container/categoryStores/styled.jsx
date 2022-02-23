import styled, { css, keyframes } from "styled-components";

export const Text = styled.div`
    font-size: ${({ size }) => size || '1.7123rem'};
    text-align: ${({ align }) => align || 'start'};
    color: ${({ color }) => color};
    margin: ${({ margin }) => margin};
`
export const Container = styled.div`
    width: 100%;
    max-width: 1366px!important;
    margin: 100px auto;

`