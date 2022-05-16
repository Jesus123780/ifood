import { TextH2Main } from 'components/common/h2'
import { BGColor } from 'public/colors'
import { IconPrint } from 'public/icons'
import React from 'react'
import { numberFormat } from 'utils'
import { Box, Button, ContentCalcules, FlipTop } from './styled'
// import PropTypes from 'prop-types'

const FooterCalcules = ({ setPrint, print, totalProductPrice,counter }) => {
  return (
    <ContentCalcules>
      <Box display='flex' width='40%'>
        <TextH2Main
          color={BGColor}
          size='15px'
          text={`${counter}`}
        />
      </Box>
      <Box display='flex' width='40%'>
        <TextH2Main
          color={BGColor}
          size='15px'
          text={`$ ${numberFormat(totalProductPrice)}`}
        />
        <FlipTop>
          <Button onClick={() => { return setPrint(!print) }} radius='50%'><IconPrint color={BGColor} size={30} /></Button>
        </FlipTop>
      </Box>
    </ContentCalcules>
  )
}

FooterCalcules.propTypes = {}

export default FooterCalcules