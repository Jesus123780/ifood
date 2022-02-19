import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { PColor, PLColor } from '../../public/colors';
import Link from 'next/link'
import { RippleButton } from '../../components/Ripple'
import { Anchor, Body, Card, CardPro, Column, ContainerAnimation, ContainerAnimationTow, ContentInfo, flex, Text, Wrapper } from './styled';
import ActiveLink from '../../components/common/Link';
import { numberFormat } from '../../utils';

export const ConfirmCheckout = ({ dataOneProduct, handleSubmitPedido }) => {
    const { ProPrice, ProDelivery, ProDescription, ProDescuento, pName, getStore, ValueDelivery } = dataOneProduct || {}
    const { city, department, storeName, idStore } = getStore || {}
    const [active, setActive] = useState(1)
    const handleClick = index => {
        setActive(index === active ? true : index)
    }
    const calculatePriceFinal = () => {
        return ValueDelivery + parseInt(ProPrice)
    }
    return (
        <Body>
            <Card>
                <RippleButton active={active === 1} margin='0px 5px' borderRadius='0' color="red" padding="10px" bgColor='transparent' label='Entrega' onClick={() => active !== 1 && handleClick(1)} />
                {/* <RippleButton active={active === 2} margin='0px 5px' borderRadius='0' color="red" padding="10px" bgColor='transparent' label='Recoger' onClick={() => active !== 2 && handleClick(2)} /> */}
                <ContentInfo>
                    {active === 1 ?
                        <ContainerAnimation>
                            <ProcessCheckoutCard

                            />
                        </ContainerAnimation> :
                        active === 2
                            ?
                            <ContainerAnimationTow>
                                <ProcessCheckoutCard

                                />
                            </ContainerAnimationTow>
                            : null}
                    <Text>{pName}</Text>
                    <RippleButton widthButton='100%' margin='20px auto' disabled={false} onClick={() => handleSubmitPedido()}>Hacer pedido</RippleButton>
                </ContentInfo>
            </Card>
            <Card>
                <CardPro>
                    <Text size='15px'>Tu pedido en</Text>
                    <Wrapper border styles={flex}>
                        <Text size='20px'>{storeName}</Text>
                        <Link href={`delivery/${city?.cName}/${storeName}/${idStore}`}>
                            <Anchor>
                                Ver restaurante
                            </Anchor>
                        </Link>
                    </Wrapper>
                    <Wrapper styles={flex}>
                        <Text size='12px'>{pName} {ProDescription} </Text>
                        <Text align='end' size='12px'>$ {numberFormat(ProPrice)}</Text>
                    </Wrapper>
                    <div styles={flex}>
                        <Text size='12px' color={PColor} >Editar </Text>
                        <Text size='12px' align='end' color={`${PLColor}`} >Eliminar </Text>
                    </div>
                    <div styles={flex}>
                        <Text size='12px'  >Costo de envio </Text>
                        <Text size='12px' align='end' color={`${PLColor}`} >{ValueDelivery || 'Gratis'} </Text>
                    </div>
                    <div styles={flex}>
                        <Text size='12px'  >Total </Text>
                        <Text size='12px' align='end' color={`${PLColor}`} >{calculatePriceFinal()} </Text>
                    </div>
                </CardPro>

            </Card>
        </Body>
    )
};


const ProcessCheckoutCard = props => {
    return (
        <div>
            <Wrapper border>
                <Text>Estandar</Text>
            </Wrapper>
        </div>
    )
}

ProcessCheckoutCard.propTypes = {}
