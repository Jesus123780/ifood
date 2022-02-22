import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { APColor, PColor, PLColor } from '../../public/colors';
import Link from 'next/link'
import { RippleButton } from '../../components/Ripple'
import { FeedItem, OlList, Wrapper } from './styled';
import { Context } from '../../context/index';
import { useFormTools } from '../../components/BaseForm'


export const CheckoutFinalizar = () => {
    // STATE
    const { setAlertBox, setCountItemProduct } = useContext(Context)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    return (
        <Wrapper>
            <div>
                asda
            </div>
            <div>
                <OlList>
                    {[1, 2, 3].map(x => (
                        <FeedItem pulse={true} key={x._id}>
                            <span className='activity-text'>Confirmado</span>
                            <div>
                                <span className='text-info'>Enviamos el pedido al restaurante</span>
                            </div>
                            <span className='date'>date, Sep 25</span>
                        </FeedItem>
                    ))}
                </OlList>
                <RippleButton>
                    Contactar al restaurante
                </RippleButton>
                <RippleButton>
                    Enviar al restaurante
                </RippleButton>
            </div>
        </Wrapper>
    )
};
