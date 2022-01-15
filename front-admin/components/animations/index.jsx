import { keyframes } from 'styled-components'

export const animationFadeDown = keyframes`
0%, 30% {
    opacity: 0;
    transform: translateY(-50px);
}
100% {
    opacity: 1;
    transform: translateY(0);
}
`
export const animationSlide = keyframes`
0% {
    -webkit-transform: translateX(0);
    -ms-transform: translateX(0);
    transform: translateX(0);
}
100% {
    -webkit-transform: translateX(calc(-376px * 8));
    -ms-transform: translateX(calc(-376px * 8));
    transform: translateX(calc(-376px * 8));
}
`
export const Rotator = keyframes`
 0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`
export const Rotate = keyframes`
 0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
}

100% {
    -webkit-transform: rotate(
359deg);
    transform: rotate(
359deg);
}
`
export const dashAnimation = keyframes`

 0% { stroke-dashoffset: 187; }
 50% {
   stroke-dashoffset: 1874;
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: 187;
   transform:rotate(450deg);
 }
`
export const AnimationColor = keyframes`
    0% { stroke: #4285F4; }
    25% { stroke: #DE3E35; }
    50% { stroke: #4285F4; }
    75% { stroke: #4285F4; }
    100% { stroke: #4285F4; }

`
export const FadeIn = keyframes`
0% {
    opacity: 0;
}

100% {
    opacity: 1;
}

`
export const FadeInLeft = keyframes`
  from {
    opacity: 0;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
`
export const SlideInLeft = keyframes`
  from {
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
}
`
export const SideIn = keyframes`
0% {
    transform: translate3d(120%,0,0);
}

80% {
    transform: translate3d(-5px,0,0);
}
100% {
    transform: translate3d(0,0,0);
}

`
export const FadeOutLeftBig = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0);
  }
`
export const FadeOup = keyframes`
0% {
    -webkit-transform: translateY(7.8125rem);
    transform: translateY(7.8125rem);
}
100% {
    -webkit-transform: none;
    transform: none;
}
`
export const onPulses = keyframes`
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
}
`
export const OnShowSwich = keyframes`
0% {
    transform: translate3d(0px, 0px, 0px);
    opacity: 0.001;
}

40% {
    transform: scale3d(1.2, 1.2, 1.2) translate3d(-10px, 5px, 0px);
    opacity: 1;
}
100% {
    transform: scale3d(1, 1, 1) translate3d(0px, 0px, 0px);
}
`
