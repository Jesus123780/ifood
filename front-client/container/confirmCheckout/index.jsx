import { useEffect, useState } from 'react';
import { PColor } from '../../public/colors';
import Link from 'next/link'
import { Body, Card, ContentInfo, Text } from './styled';

export const ConfirmCheckout = ({ dataOneProduct, handleSubmitPedido }) => {
    const { ProPrice, ProDelivery, ProDescription, ProDescuento, pName } = dataOneProduct || {}
    return (
        <Body>
            <Card>
                <ContentInfo>
                    <Text>{pName}</Text>
                    <button onClick={() => handleSubmitPedido()}>cLICK</button>
                </ContentInfo>
            </Card>
            <Card>
                2
            </Card>
        </Body>
    )
};
