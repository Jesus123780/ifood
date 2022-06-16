import { Container } from './styled';
import { Questions } from '../PQR/questionsPQR';
import { StorePqr } from '../PQR/StorePqr';

import { useState } from 'react';
import { RippleButton } from '../../Ripple';
import styled, { css, keyframes } from 'styled-components';

export const PQR = () => {
    const [active, setActive] = useState(1)
    const handleClick = index => {
        setActive(index === active ? true : index)
    }
    return (
        <Container>
             
            <ContentButton>
                <RippleButton active={active === 1} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='See Store' onClick={() => active !== 1 && handleClick(1)} />
                <RippleButton active={active === 2} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Update' onClick={() => active !== 2 && handleClick(2)} />
                <RippleButton active={active === 3} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Update' onClick={() => active !== 3 && handleClick(3)} />
            </ContentButton>
            {
                active === 1 ?
                    <ContainerAnimation><StorePqr /></ContainerAnimation> : active === 2 ? <ContainerAnimationTow><Questions /></ContainerAnimationTow> : active === 2 ? <ContainerAnimationThree>Holsdafsdfasa</ContainerAnimationThree> : null
            }
        </Container>
    )
}
export const AnimationRight = keyframes`
0% {
    transform: translateX(50vw);
    opacity: 0;
}
100% {
    transform: translateY(0);
    opacity: 1;
}
`
export const AnimationLeft = keyframes`
0% {
    transform: translateX(-50vw);
    opacity: 0;
}

100% {
    transform: translateY(0);
    opacity: 1;
}
`
const ContainerAnimation = styled.div`
${ props=> props.active === 1 && css`animation: ${ AnimationRight } 200ms;` }

`
const ContainerAnimationTow = styled.div`
${ props=> props.active === 2 && css`animation: ${ AnimationLeft } 200ms;` }

`
const ContainerAnimationThree = styled.div`
${ props=> props.active === 3 && css`animation: ${ AnimationLeft } 200ms;` }

`
const ContentButton = styled.div`
    width: 90%;
    margin: 0px 40px 30px auto;
`