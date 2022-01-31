import React from 'react'
import styled from 'styled-components'

export const Skeleton = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Container>
                <div className="card-loader"></div>
            </Container>
        </div>
    )
}
const Container = styled.div`
    z-index: 999;
.card-loader {
  background-color: #fff;
  padding: 8px;
  position: relative;
  margin-bottom: 50px;
  height: 200px;
  overflow: hidden;
 /* padding: 10px; */
  &:before {
    content: '';
    height: 120px;
    display: flex;
    background-color: #ededed;
    border-radius: 6px;
    box-shadow: -48px 78px 0 -48px #ededed, -51px 102px 0 -51px #ededed;
  }

  &:after {
    content: '';
    background-color: #636363;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    animation-duration: .8s;
    animation-iteration-count: infinite;
    animation-name: loader-animate;
    animation-timing-function: linear;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0) 81%);
  }
  
}
 

// Loader animation
@keyframes loader-animate{
 0%{
    transform: translate3d(-100%, 0, 0);
  }
 100%{
    transform: translate3d(100%, 0, 0);
  }
}
`