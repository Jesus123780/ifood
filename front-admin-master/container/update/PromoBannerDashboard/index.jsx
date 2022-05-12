import { useMutation, useQuery } from '@apollo/client';
import InputHooks from 'components/InputHooks/InputHooks';
import { RippleButton } from 'components/Ripple';
import { PColor } from 'public/colors';
import React, { useState } from 'react'
import { CREATE_CAT_STORE, GET_ALL_CAT_STORE, SET_DES_CAT } from '../../../gql/catStore';
import { CREATE_BANNER_PROMO_DASHBOARD, GET_BANNER_PROMO_DASHBOARD } from './queries';

export const PromoBannerDashboard = ({ setAlertBox }) => {
    // ------------ ESTADOS ------------
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({})
    //-----------QUERIES ------------
    const [createAPromoBanner] = useMutation(CREATE_BANNER_PROMO_DASHBOARD)
    const { data } = useQuery(GET_BANNER_PROMO_DASHBOARD, {
        // context: { clientName: "admin-master" }
    })
    // ------------ HANDLES ------------
    const handleChange = (e, error) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: error })
    }
    // Contexto de las notificaciones
    const handleRegister = async e => {
        e.preventDefault()
        const { comments, metaTags, mainName } = values
        try {
            createAPromoBanner({
                variables: {
                    input: {
                        comments,
                        metaTags,
                        mainName,
                        urlImage: '',
                        bPromoState: 1,
                    }
                },
            }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
        }
        catch (error) {
            setAlertBox({ message: `${error.message}`, duration: 7000 })
        }
    }
    return (
        <div>
            <form onSubmit={handleRegister}>
                <InputHooks title='mainName'
                    type="text"
                    value={values.mainName}
                    name='mainName'
                    required
                    onChange={handleChange}
                    range={{ min: 0, max: 180 }}
                />
                <InputHooks title='metaTags'
                    value={values.metaTags}
                    name='metaTags'
                    required
                    onChange={handleChange}
                    range={{ min: 0, max: 180 }} />
                <InputHooks title='comments'
                    value={values.comments}
                    name='comments'
                    required
                    onChange={handleChange}
                    range={{ min: 0, max: 180 }} />
                <RippleButton widthButton='100%' margin='20px auto' type='submit' bgColor={PColor}>Subir</RippleButton>
            </form>
            {!!data && data?.getPromoStoreAdmin.map(x => (
                <div style={{ border: '1px solid' }} key={x}>
                    <h2> {x.comments}</h2>
                    <br></br>
                    <h2> {x.metaTags}</h2>
                    <br></br>
                    <h2> {x.mainName}</h2>
                </div>
            ))}
        </div>
    )
}
