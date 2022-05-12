/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types'
import React from 'react'
import { RippleButton } from '../../../Ripple'
import { numberFormat } from '../../../../utils'
import { Container, Card, Title, Price, ContentRate, StickyWrapper, ContentImage } from './styled'
import { Rate } from '../../../Rate'
import { PVColor } from '../../../../public/colors'
import { InputFile } from '../InputFilesPrev/styled'

export const FoodCardPreview = props => {
  const { valuesP, price, start, alt, src, onFileInputChange, fileInputRef, onTargetClick } = props
  return (<>
    <Container>
      <StickyWrapper>
        <ContentImage onClick={() => {return onTargetClick()}} >
          <img alt={alt} src={src} />
          <InputFile
            accept='.jpg, .png .jpeg'
            id='iFile'
            onChange={onFileInputChange}
            ref={fileInputRef}
            type='file'
          />
        </ContentImage>
        <Card>
          <marquee>Nuevo producto, agrega la mejor descripción para un mejor posicionamiento en búsquedas * Puedes hacer una estrategia con las promociones de Deliver </marquee>
          <Title>{valuesP ? valuesP : 'Nombre del producto'}</Title>
          <ContentRate style={{ display: 'flex' }}>
            <Rate rating={start} size={18} />
          </ContentRate>
          <Price> $ {price ? numberFormat(price) : 'Precio del producto'}</Price>
          <RippleButton bgColor={PVColor} label='Comprar ahora' />
        </Card>
      </StickyWrapper>
    </Container>

  </>
  )
}
FoodCardPreview.propTypes = {
  alt: PropTypes.any,
  discount: PropTypes.any,
  fileInputRef: PropTypes.any,
  intPorcentaje: PropTypes.any,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.func,
  price: PropTypes.any,
  setRating: PropTypes.any,
  src: PropTypes.any,
  start: PropTypes.any,
  valuesP: PropTypes.any
}
