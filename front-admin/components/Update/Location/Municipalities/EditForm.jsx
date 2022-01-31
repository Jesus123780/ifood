import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../../../../Context';
import { RippleButton } from '../../../Ripple';
import { EDIT_MUNICIPALITIES } from './queries';
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
    const [editMunicipalities, { loading, error }] = useMutation(EDIT_MUNICIPALITIES)
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
            const results = await editMunicipalities({
                variables: {
                    input: {
                        cName, cId
                    }
                }
            })
            // eslint-disable-next-line
            if (results) setAlertBox({ message: ` Cuidad actualizado a  ${cName}`, duration: 5000 })
        } catch (err) {
            setAlertBox({ message: `${err}`, duration: 7000 })
        }
    };
    if (error) return <div>Ocurrió un error</div>
    return (
        <form onSubmit={handleSubmit} className='todo-form'>
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
                    <RippleButton onClick={handleSubmit}>Actualizar Cuidad</RippleButton>
                </ContainInput>
            )}
        </form>
    );
}