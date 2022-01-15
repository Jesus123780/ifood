import React from 'react'
import { RippleButton } from '../../../Ripple'
import { InputFilesProductos } from '../InputFilesPrev'
import { numberFormat } from '../../../../utils'
import {
    Container,
    Card,
    Title,
    Discount,
    Price,
    Info,
    Button,
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
    const { valuesP, discount, price, PCant, PDescription, start, setRating, assurance, features, intPorcentaje } = props
    const onchangeFile = () => {
    }
    return (<>
        <Container>
            <Card width='70%'>
                <InputFilesProductos onChange={onchangeFile} />
                <Text>Descripción:</Text>
                <Text size='20px'>{PDescription}</Text>
                <Table>
                    <tbody>
                        <tr>
                            <th className="andes-table">{ features[0]?.typeFeature?.thpName }</th>
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
                        <Rate size={18} rating={start} onRating={rate => setRating(rate)} />
                        <Info color='#000' margin='0'>{36}</Info> <Info margin='0 10px'> Opiniones </Info>
                    </ContentRate>
                    <Price> $ {price ? numberFormat(price) : 'Precio del producto'}</Price>
                    <Discount discount={discount} > {/* $ {desc ? numberFormat(desc) : '1.000.000'}, */} El descuento del producto es: {intPorcentaje}% off</Discount>
                    <Discount discount={discount} > Antes: {price} ahora: {price - intPorcentaje}</Discount>
                    <Discount discount={discount} >Total: {price - intPorcentaje} </Discount>
                    <Button>
                        <Info>Ver los medios de pago</Info>
                    </Button>
                    <Info size='17px' color={'#1f4e96'}>Compra internacional</Info>
                    <Info size='15px' color={APColor}>Sin costos de importación</Info>
                    <Info size='15px' color={'#000'}>Cantidad {PCant ? numberFormat(PCant) : 50}</Info>
                    <RippleButton label='Comprar ahora' bgColor={PVColor} />
                </Card>
                <Card sticky>
                    <Info>Ver más datos de este vendedor</Info>
                    <i>Información del producto</i>
                    <Location>
                        <IconLocationMap size={20} />
                        <Location direction >
                            <Info margin='0px' size='15px' color={'#000'}>Ubicación</Info>
                            <Info margin='0px' size='15px' color={'#000'}>Country, Departments, city</Info>
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