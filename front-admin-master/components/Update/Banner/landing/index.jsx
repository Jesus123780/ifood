import React from 'react';
import styled, { css } from 'styled-components';
import { useOnScreen } from '../../../hooks/useIntersection';

export default React.memo(
    ({ type }) => {
        const [ref, isVisible] = useOnScreen();
        return (
            <Container ref={ref} isVisible={isVisible}>
                <div >
                    <h1 style={{ fontSize: '30px' }}>{type} {isVisible ? 'visible' : 'not visible'}</h1>
                </div>
            </Container>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.type === nextProps.type;
    }
);
const Container = styled.div`
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    ${ props => props.isVisible ? css`background-color: #009aff; ` : css`background-color: blue; ` }
`