import React from "react"

const Error400 = ({ statusCode = null }) => {
  return <p>{`failed PAGINA NO ENCONTRADA ${statusCode ? statusCode : 404}`}</p>
}

export default Error400