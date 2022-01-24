/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import * as Styled from './styled'

export const StepsComponent = ({ current, status, titles }) => {
  const steps = titles.map((title, i) => {
    let stepStatus
    if (i < current) {
      stepStatus = 'finish'
    } else if (i === current) {
      stepStatus = status === 'finish' ? 'finish' : status
    } else {
      stepStatus = status === 'finish' ? 'finish' : 'wait'
    }
    return <Step key={i} stepNumber={i + 1} title={title} status={stepStatus} />
  })
  return (
    <Styled.Steps>
      {steps}
    </Styled.Steps>
  )
}
const formatNumber = (n) => n > 9 ? `${n}` : `0${n}`
const StepIcon = ({ status, children }) => {
  let IconComponent
  switch (status) {
    case 'progress':
      IconComponent = Styled.ProcessIcon
      break
    case 'wait':
      IconComponent = Styled.WaitIcon
      break
    case 'error':
      IconComponent = Styled.ErrorIcon
      break
    default:
      IconComponent = Styled.DefaultIcon
  }
  return <IconComponent>{children}</IconComponent>
}
const Step = ({ stepNumber, title, status }) => (
  <Styled.Step>
    <Styled.Tail finished={status === 'finish'} />
    <StepIcon status={status}>
      <Styled.StepNumber>{formatNumber(stepNumber)}</Styled.StepNumber>
    </StepIcon>
    <Styled.Content>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Content>
  </Styled.Step>
)

Step.propTypes = {
  title: PropTypes.string,
  stepNumber: PropTypes.number,
  status: PropTypes.oneOf(['wait', 'progress', 'finish', 'error'])
}

StepsComponent.propTypes = {
  title: PropTypes.node,
  size: PropTypes.string,
  padding: PropTypes.string,
  show: PropTypes.bool || PropTypes.number,
  backdrop: PropTypes.bool,
  keyboard: PropTypes.bool,
  footer: PropTypes.bool,
  btnCancel: PropTypes.bool,
  btnConfirm: PropTypes.bool,
  children: PropTypes.object,
  hiddeOnConfirm: PropTypes.bool,
  timeOut: PropTypes.number,
  height: PropTypes.string,
  header: PropTypes.bool,
  submit: PropTypes.bool,
  onHidde: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,

  hideOnConfirm: PropTypes.func,
  closeIcon: PropTypes.bool,
  borderRadius: PropTypes.string,
  onHide: PropTypes.func
}
