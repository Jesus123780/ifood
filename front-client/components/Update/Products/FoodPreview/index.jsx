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
    StickyWrapper,
    ContentImage
} from './styled'
import { Rate } from '../../../Rate'
import { APColor, PVColor } from '../../../../public/colors'
import { IconLocationMap } from '../../../../public/icons'
import { InputFile } from '../InputFilesPrev/styled'

export const FoodCardPreview = props => {
    const { valuesP, discount, price, PCant, PDescription, start, setRating, assurance, features, intPorcentaje, alt, src, onFileInputChange, fileInputRef, onTargetClick } = props
    const onchangeFile = () => {
    }
    return (<>
        <Container>
            <StickyWrapper>
                <ContentImage onClick={() => onTargetClick()} >
                    <img src={src} alt={alt} />
                    <InputFile
                            accept=".jpg, .png"
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            id='iFile' type='file'
                        />
                </ContentImage>
                <Card>
                    <i>Nuevo producto</i>
                    <Title>{valuesP ? valuesP : 'Nombre del producto'}</Title>
                    <ContentRate style={{ display: 'flex' }}>
                        <Rate size={18} rating={start} onRating={rate => setRating(rate)} />
                    </ContentRate>
                    <Price> $ {price ? numberFormat(price) : 'Precio del producto'}</Price>
                    <Discount discount={discount} > {/* $ {desc ? numberFormat(desc) : '1.000.000'}, */} El descuento del producto es: {intPorcentaje}% off</Discount>
                    <Discount discount={discount} > Antes: {price} ahora: {price - intPorcentaje}</Discount>
                    <Discount discount={discount} >Total: {price - intPorcentaje} </Discount>
                    <Button>
                        <Info>Ver los medios de pago</Info>
                    </Button>
                    <RippleButton label='Comprar ahora' bgColor={PVColor} />
                </Card>
            </StickyWrapper>
        </Container>

    </>
    )
}