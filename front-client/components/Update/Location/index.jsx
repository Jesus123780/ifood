import { Container } from './styled';
import { Departments } from '../Location/Departments';
import { Municipalities } from '../Location/Municipalities';
import { Location as LocationAll } from '../Location/All/container';
import { Countries } from './Countries';

import { useState } from 'react';
import { RippleButton } from '../../Ripple';
import styled, { css, keyframes } from 'styled-components';
import { TypeRoad } from './Road';

export const Location = () => {
    const [active, setActive] = useState(1)
    const handleClick = index => {
        setActive(index === active ? true : index)
    }
    return (
        <Container>
             
            <ContentButton>
                <RippleButton active={active === 1} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;País &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' onClick={() => active !== 1 && handleClick(1)} />
                <RippleButton active={active === 2} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Departamentos' onClick={() => active !== 2 && handleClick(2)} />
                <RippleButton active={active === 3} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Ciudades' onClick={() => active !== 3 && handleClick(3)} />
                <RippleButton active={active === 4} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='tipo de via' onClick={() => active !== 4 && handleClick(4)} />
                <RippleButton active={active === 5 } style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Todo' onClick={() => active !== 5 && handleClick(5)} />
            </ContentButton>
            {
                active === 1 ?
                    <ContainerAnimation><Countries /></ContainerAnimation> : active === 2 ? <ContainerAnimationTow><Departments /></ContainerAnimationTow> : active === 3 ? <ContainerAnimationThree><Municipalities /></ContainerAnimationThree>: active === 4 ?<ContainerAnimationFour><TypeRoad /></ContainerAnimationFour> : active === 5 ? <ContainerAnimationFive><LocationAll /></ContainerAnimationFive> : <h1>Donde te sentaste amigo???</h1>
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
${ props=> props.active === 2 && css`animation: ${ AnimationLeft } 200ms;` }

`
const ContainerAnimationFour = styled.div`
${ props=> props.active === 4 && css`animation: ${ AnimationLeft } 200ms;` }

`
const ContainerAnimationFive = styled.div`
${ props=> props.active === 5 && css`animation: ${ AnimationLeft } 200ms;` }

`
const ContentButton = styled.div`
    width: 90%;
    margin: 0px 40px 30px auto;
`