import { useEffect, useState } from 'react'
import { Container } from './styled'
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
        <Container color={err.color} closed={closed} error={!!err?.message}>{(err.message || '')}</Container>
    )
}
