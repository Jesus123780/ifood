import PropTypes from 'prop-types'
import { TextH2Main } from 'components/common/h2'
import { BGColor } from 'public/colors'
import React from 'react'
import { numberFormat } from 'utils'
import { Box, Button, ContentCalcules, FlipTop } from './styled'

const FooterCalcules = ({ setPrint, print, totalProductPrice, counter, dispatch }) => {
  return (
    <ContentCalcules>
      <Box display='flex' width='40%'>
        <TextH2Main
          color={BGColor}
          size='15px'
          text={`${counter}`}
        />
      </Box>
      <Box display='flex' width='100%'>
        <TextH2Main
          color={BGColor}
          size='15px'
          text={`$ ${numberFormat(totalProductPrice)}`}
        />
        <Button onClick={() => { return dispatch({ type: 'REMOVE_ALL_PRODUCTS' }) }}>ELIMINAR</Button>
        <FlipTop>
          <Button onClick={() => { return setPrint(!print) }} radius='50%'>GUARDAR</Button>
        </FlipTop>
      </Box>
    </ContentCalcules>
  )
}

FooterCalcules.propTypes = {
  counter: PropTypes.number,
  dispatch: PropTypes.func,
  print: PropTypes.bool,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.number
}

export default FooterCalcules