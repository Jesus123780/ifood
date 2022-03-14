import React from 'react'
import { RippleButton } from '../../../Ripple'
import { numberFormat } from '../../../../utils'
import { Container, Card, Title, Discount, Price, Info, Button, ContentRate, StickyWrapper, ContentImage } from './styled'
import { Rate } from '../../../Rate'
import { PVColor } from '../../../../public/colors'
import { InputFile } from '../InputFilesPrev/styled'

export const FoodCardPreview = props => {
    const { valuesP, discount, price, start, setRating, intPorcentaje, alt, src, onFileInputChange, fileInputRef, onTargetClick } = props
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
                        <Rate size={18} rating={start} />
                    </ContentRate>
                    <Price> $ {price ? numberFormat(price) : 'Precio del producto'}</Price>
                    <RippleButton label='Comprar ahora' bgColor={PVColor} />
                </Card>
            </StickyWrapper>
        </Container>

    </>
    )
}