import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children, selector= 'portal' }) => {
    const [dom, setDom] = useState(undefined)
    useEffect(() => {
        setDom(window.document.getElementById(selector))
    }, [dom])
    if (dom) {
        if (selector === undefined) {
            return null
        }
        return ReactDOM.createPortal(children, dom || 'portal')
    } 
}

Portal.propTypes = {}

export default Portal