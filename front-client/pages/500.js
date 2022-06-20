import React from "react"
import { EmptyLayout } from "./_app"

const Error = ({ statusCode = null }) => {
  return <p>{`failed ${statusCode}`}</p>
}

export default Error
Error.Layout = EmptyLayout
