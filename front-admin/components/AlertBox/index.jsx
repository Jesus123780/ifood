/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
// import { Container } from './styled'
import { ContainerText, ContainerToast, ContentToast } from './styled'

export const AlertBox = ({ err }) => {
  const [closed, setClosed] = useState(false)

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (err) {
      const timeOut = setTimeout(() => {return setClosed(true)}, (err.duration || 7000) / 2)
      return () => {
        clearTimeout(timeOut)
        setClosed(false)
      }
    }
  }, [err])
  return (
    <ContainerToast
      closed={closed}
      color={err?.color}
      error={!!err?.message}
      onClick={setClosed}
    >
      <ContentToast>
        <ContainerText >{(err?.message || '')}</ContainerText>
        <div></div>
      </ContentToast>
    </ContainerToast>
  )
}
