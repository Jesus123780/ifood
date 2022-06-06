import React, { useEffect, useRef } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ONE_CONTRACT } from 'gql/information/contract'
import { CanvasDrawn } from 'components/CanvasDrawn'
import moment from 'moment'

const Contract = () => {
  const { data, loading } = useQuery(GET_ONE_CONTRACT)
  const { ctCode, createAt } = data?.getOneCOntractStore || {}
  const canvas = useRef(null)
  useEffect(() => {
    if (!loading && data && ctCode) {
      const cor = JSON.parse(!loading && ctCode)
      const f = JSON.stringify(cor)
      canvas?.current?.loadSaveData(f)
    }
  }, [ctCode, data, loading])
  return (
    <div>
      {/* <CanvasDrawn />
      <CanvasDraw
        brushColor={''}
        brushRadius={1}
        clampLinesToDocument
        disabled={true}
        gridColor={''}
        ref={canvas}
        // saveData={array}
      /> */}
    </div>
  )
}

Contract.propTypes = {}

export default Contract