import { Container } from './styled'
import { Questions } from '../PQR/questionsPQR'
import { StorePqr } from '../PQR/StorePqr'

import { useState } from 'react'
import { RippleButton } from '../../Ripple'
import styled, { css, keyframes } from 'styled-components'

export const PQR = () => {
  const [active, setActive] = useState(1)
  const handleClick = index => {
    setActive(index === active ? true : index)
  }
  return (
    <Container>
      <ContentButton>
        <RippleButton
          active={active === 1}
          bgColor='#9797971a'
          color='red'
          label='See Store'
          margin='0px 5px'
          onClick={() => {return active !== 1 && handleClick(1)}}
          padding='10px'
          style={{ borderRadius: '0px' }}
        />
        <RippleButton
          active={active === 2}
          bgColor='#9797971a'
          color='red'
          label='Update'
          margin='0px 5px'
          onClick={() => {return active !== 2 && handleClick(2)}}
          padding='10px'
          style={{ borderRadius: '0px' }}
        />
        <RippleButton
          active={active === 3}
          bgColor='#9797971a'
          color='red'
          label='Update'
          margin='0px 5px'
          onClick={() => {return active !== 3 && handleClick(3)}}
          padding='10px'
          style={{ borderRadius: '0px' }}
        />
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
${ props=> {return props.active === 1 ? css`animation: ${ AnimationRight } 200ms;` : css`animation: ${ AnimationRight } 200ms;`} }

`
const ContainerAnimationTow = styled.div`
${ props=> {return props.active === 2 ? css`animation: ${ AnimationLeft } 200ms;` : css`animation: ${ AnimationLeft } 200ms;`} }

`
const ContainerAnimationThree = styled.div`
${ props=> {return props.active === 3 ? css`animation: ${ AnimationLeft } 200ms;` : css`animation: ${ AnimationLeft } 200ms;`} }

`
const ContentButton = styled.div`
    width: 90%;
    margin: 0px 40px 30px auto;
`