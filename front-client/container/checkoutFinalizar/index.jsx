import React, { useContext, useEffect, useRef, useState } from 'react';
import { FeedItem, OlList, Wrapper } from './styled';
import { Context } from '../../context/index';
import { useFormTools } from '../../components/BaseForm'
import { useQuery } from '@apollo/client';
import { GET_ALL_PEDIDOS_STATUS } from './queries';
import moment from 'moment';

export const CheckoutFinalizar = () => {
    // STATE
    const { data } = useQuery(GET_ALL_PEDIDOS_STATUS)
    return (
        <Wrapper>
            <div>
                user
            </div>
            <div>
                {data && data?.getAllPedidoUserFinal?.map(x => (
                    <div key={x.pCodeRef}>
                            <OlList>
                                <FeedItem pulse={true}>
                                    <span className='activity-text'>{x.pSState === 1 ? 'Aceptado' : x.pSState === 2 ? 'Pedido en proceso' : x.pSState === 3 ? 'listo para entrega' : x.pSState === 4 ? 'Pedido pagado (Concluido)' : 'Rechazado'}</span>
                                    <div>
                                        <span className='text-info'>Enviamos el pedido al restaurante</span>
                                        <span className='date'>{moment(x.pDatMod).format('DD/MM/YYYY')}</span>
                                    </div>
                                </FeedItem>
                            </OlList>
                        <button>
                            Contactar al restaurante
                        </button>
                        <br></br>
                        <br></br>
                        <button>
                            Enviar al restaurante
                        </button>
                    </div>
                ))}
            </div>
        </Wrapper>
    )
};
