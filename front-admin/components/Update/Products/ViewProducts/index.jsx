import PropTypes from 'prop-types'
import React from 'react'
import { RippleButton } from '../../../Ripple'
import { InputFilesProductos } from '../InputFilesPrev'
import { numberFormat } from '../../../../utils'
import {
  Container,
  Card,
  Title,
  Price,
  Info,
  Table,
  Text,
  Location,
  BoxComponent,
  ContentRate,
  StickyWrapper
} from './styled'
import { Rate } from '../../../Rate'
import { APColor, PVColor } from '../../../../public/colors'
import { IconLocationMap } from '../../../../public/icons'

export const ViewProducts = props => {
  const { valuesP, price, PCant, PDescription, start, setRating, assurance, features } = props
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onchangeFile = () => {}
  return (<>
    <Container>
      <Card width='70%'>
        <InputFilesProductos onChange={onchangeFile} />
        <Text>Descripción:</Text>
        <Text size='20px'>{PDescription}</Text>
        <Table>
          <tbody>
            <tr>
              <th className='andes-table'>{ features[0]?.typeFeature?.thpName }</th>
              <td><span> { features[0]?.hpqrQuestion }</span></td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <StickyWrapper>
        <Card>
          <i>Nuevo producto</i>
          <Title>{valuesP ? valuesP : 'Nombre del producto'}</Title>
          <ContentRate style={{ display: 'flex' }}>
            <Rate
              onRating={rate => {return setRating(rate)}}
              rating={start}
              size={18}
            />
            <Info color='#000' margin='0'>{36}</Info> <Info margin='0 10px'> Opiniones </Info>
          </ContentRate>
          <Price> $ {price ? numberFormat(price) : 'Precio del producto'}</Price>
          <Info color={'#1f4e96'} size='17px'>Compra internacional</Info>
          <Info color={APColor} size='15px'>Sin costos de importación</Info>
          <Info color={'#000'} size='15px'>Cantidad {PCant ? numberFormat(PCant) : 50}</Info>
          <RippleButton bgColor={PVColor} label='Comprar ahora' />
        </Card>
        <Card sticky>
          <Info>Ver más datos de este vendedor</Info>
          <i>Información del producto</i>
          <Location>
            <IconLocationMap size={20} />
            <Location /* direction */ >
              <Info
                color={'#000'}
                margin='0px'
                size='15px'
              >Ubicación</Info>
              <Info
                color={'#000'}
                margin='0px'
                size='15px'
              >Country, Departments, city</Info>
            </Location>
          </Location>
          <BoxComponent>
            <i>Garantía del vendedor: {assurance ? assurance : `${ 20 }`}</i>
          </BoxComponent>
        </Card>
      </StickyWrapper>
    </Container>

  </>
  )
}
ViewProducts.propTypes = {
  PCant: PropTypes.any,
  PDescription: PropTypes.any,
  assurance: PropTypes.any,
  discount: PropTypes.any,
  features: PropTypes.any,
  intPorcentaje: PropTypes.any,
  price: PropTypes.any,
  setRating: PropTypes.func,
  start: PropTypes.any,
  valuesP: PropTypes.any
}
