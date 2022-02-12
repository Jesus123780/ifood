import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../../../../context/Context';
import { RippleButton } from '../../../Ripple';
import { EDIT_COUNTRIES } from './queries';
import { Input, ContainInput } from './styled';

export function EditForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef(null);
  //  const { setAlertBox } = useContext(Context)
    useEffect(() => {
        inputRef?.current?.focus();
    });
    const handleChange = e => {
        setInput(e.target.value);
    };
    const [editCountries, { loading }] = useMutation(EDIT_COUNTRIES)
    const cName = input
    const cId = props?.edit?.id
    const handleSubmit = async e => {
        e.preventDefault();

        props.onSubmit({
            id: props.edit?.id,
            text: input
        });
        setInput('');
        try {
            const results = await editCountries({
                variables: {
                    input: {
                        cName, cId
                    }
                }
            })
            if (results) setAlertBox({ message: `País  actualizado con éxito ${ cName }`, duration: 5000, color: 'success' })
        } catch (error) {
            setAlertBox({ message: `${ error }`, duration: 7000 })
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            {loading && <i>Cargando</i>}
            {props.edit && (
                <ContainInput>
                    <Input
                        placeholder='País'
                        value={input}
                        onChange={handleChange}
                        name='text'
                        ref={inputRef}
                    />
                    <RippleButton onClick={handleSubmit}>Actualizar País</RippleButton>
                </ContainInput>
            )}
        </form>
    );
}