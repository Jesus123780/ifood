/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
// import { Container } from './styled'
import { ContainerText, ContainerToast, ContentToast } from './styled'

export const AlertBox = ({ err }) => {
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        if (err) {
            const timeOut = setTimeout(() => setClosed(true), (err.duration || 7000) / 2)
            return () => {
                clearTimeout(timeOut)
                setClosed(false)
            }
        }
    }, [err])
    return (
        <ContainerToast onClick={setClosed} color={err?.color} closed={closed} error={!!err?.message}>
            <ContentToast>
                <ContainerText >{(err?.message || '')}</ContainerText>
                <div></div>
            </ContentToast>
        </ContainerToast>
    )
}
