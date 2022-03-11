import React from 'react';
import { Anchor, ContainerShare, ContentShare, DisRestaurant, FeedItem, Flex, OlList, Text, Wrapper } from './styled';
import { useQuery } from '@apollo/client';
import { GET_ALL_PEDIDOS_STATUS } from './queries';
import moment from 'moment';
import Link from 'next/link';
import { BGColor } from 'public/colors';
import { IconWhatsApp } from 'public/icons';

export const CheckoutFinalizar = () => {
    // STATE
    const { data } = useQuery(GET_ALL_PEDIDOS_STATUS, {
        pollInterval: 60000,
        fetchPolicy: 'cache-and-network',
        onError: (e) => console.log(e),
        onCompleted: (data) => console.log(data)
    })
    const handleContact = ({ getOneStore, ref }) => {
        console.log(getOneStore)
        const { storePhone } = getOneStore
        window.open(`https://api.whatsapp.com/send?text='Hola, mi pedido es ${ref}'?phone=${`${storePhone}`}`)
    }
    return (
        <Wrapper>
            {!!data && data?.getAllPedidoUserFinal?.map(x => {
                const { getOneStore } = x
                return (
                    <div className='wrapper-column'>
                        <div className='animation-container'>
                          <Text># {x.pCodeRef}</Text>  
                        </div>
                        <div >
                            <div className='wrapper-content' key={x.pCodeRef}>
                                {x.pSState === 5 ? <div>
                                    <StatusItemOrderProcess pulse={false} text={'El pedido fue rechazado'} data={x.pDatMod} />
                                </div> : <OlList>
                                    {x.pSState === 0 && <StatusItemOrderProcess pulse={x.pSState === 0} text={'Pedido en estado de confirmacion'} data={x.pDatMod} />}
                                    {x.pSState >= 1 && <StatusItemOrderProcess pulse={x.pSState === 1} text={'Aceptado'} data={x.pDatMod} />}
                                    {x.pSState >= 2 && <StatusItemOrderProcess pulse={x.pSState === 2} text={'Pedido en proceso'} data={x.pDatMod} />}
                                    {x.pSState >= 3 && <StatusItemOrderProcess pulse={x.pSState === 3} text={'listo para entrega'} data={x.pDatMod} />}
                                    {x.pSState >= 4 && <StatusItemOrderProcess pulse={x.pSState === 4} text={'Pedido concluido'} data={x.pDatMod} />}
                                </OlList>}
                                <DisRestaurant>
                                    <Text margin='12px 0 0 5px' size='19px'>{getOneStore.storeName}</Text>
                                    <Link href={`/delivery/${encodeURIComponent(getOneStore?.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(getOneStore?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(getOneStore.storeName)}/${getOneStore?.idStore}`}>
                                        <Anchor>
                                            Ir a la tienda
                                        </Anchor>
                                    </Link>

                                    <div className="dish-restaurant__divisor"></div>
                                    <ContentShare>
                                        Contactar
                                        <ContainerShare>
                                            <Flex>
                                                <div className='icon-WhatsApp'>
                                                    <IconWhatsApp color={BGColor} size='20px' />
                                                </div>
                                                <button onClick={() => handleContact({ getOneStore, ref: x.pCodeRef })}> Contactar en WhatsApp</button>
                                            </Flex>
                                        </ContainerShare>
                                    </ContentShare>
                                    <label tabIndex="0" className="dish-observation-form__label" for="observations-form">¿Ocurrió algo? Contacta el restaurante +57 {getOneStore.storePhone}</label>
                                </DisRestaurant>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Wrapper>
    )
};
export const StatusItemOrderProcess = ({ pulse, text, data }) => {
    return (
        <FeedItem pulse={pulse}>
            <span className='activity-text'>{text}</span>
            {/* <span className='activity-text'>{x.pSState === 1 ? 'Aceptado' : x.pSState === 2 ? 'Pedido en proceso' : x.pSState === 3 ? 'listo para entrega' : x.pSState === 4 ? 'Pedido pagado (Concluido)'  : x.pSState === 5 ? 'Rechazado' : 'Pedido en espera de confirmacion'}</span> */}
            <div>
                <span className='text-info'>{text}</span>
                <span className='date'>{moment(data).format('DD/MM/YYYY')}</span>
            </div>
        </FeedItem>
    )
}
