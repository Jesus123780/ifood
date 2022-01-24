import styled from 'styled-components'
import { BGColor, PColor } from '../../public/colors'

// START STEP

const MainColor = '#ef4036'
const red = '#fdedee'
const lightGray = '#D9D9D9'
export const Steps = styled.div`
  display: flex;
  font-size: 0;
  margin: auto;
`

export const Step = styled.div`
  position: relative;
  flex: 1;

  &:last-child {
    flex: none;
  }
`

const iconSize = 25
const stepWidth = 150

export const DefaultIcon = styled.div`
  margin-left: ${(stepWidth - iconSize) / 2}px;
  background: ${MainColor}; 

  width: ${iconSize}px;
  height: ${iconSize}px;
  border-radius: ${iconSize}px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const WaitIcon = styled(DefaultIcon)`
  background-color: transparent;
  border: 2px solid ${lightGray};
`

export const ProcessIcon = styled(DefaultIcon)`
  background-color: ${PColor};
`

export const ErrorIcon = styled(DefaultIcon)`
  background-color: ${red};
`

export const StepNumber = styled.span`
  color: ${BGColor};
  line-height: 1;
  font-size: 11px;
  font-weight: 100;

  ${WaitIcon} & {
    color: #ccc;
  }
`

export const Content = styled.div`
  text-align: center;
  margin-top: 12px;
  width: ${stepWidth}px;
`

export const Title = styled.div`
  font-size: 14px;
  color: ${MainColor};
  text-align: center;
  font-weight: 400;
`

export const Tail = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: ${iconSize / 2}px;
  padding: 0px ${iconSize / 2}px;
  margin-left: ${stepWidth / 2}px;

  &:after {
    content: '';
    display: inline-block;
    background: ${props => props.finished ? MainColor : lightGray};
    height: 2px;
    border-radius: 2px;
    width: 100%;
  }

  ${Step}:last-child & {
    display: none;
  }
`
