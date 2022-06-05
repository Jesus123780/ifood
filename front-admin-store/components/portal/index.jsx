import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children, selector }) => {
    const [dom, setDom] = useState(undefined)
    useEffect(() => {
        setDom(window.document.querySelector(selector))
        console.log(document)
    }, [])
    if (dom) {
        if (selector === undefined) {
            return null
        }
        return ReactDOM.createPortal(children, dom)
    } else if (!selector) {
        return children
    }
}

Portal.propTypes = {}

export default React.memo(Portal)