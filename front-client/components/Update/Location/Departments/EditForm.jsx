import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Context } from '../../../../Context';
import { RippleButton } from '../../../Ripple';
import { EDIT_DEPARTMENT } from './queries';
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
    const [editDepartments, { loading, error }] = useMutation(EDIT_DEPARTMENT)
    // eslint-disable-next-line
    const dName = input
    // eslint-disable-next-line
    const dId = props?.edit?.id
    const handleSubmit = async e => {
        e.preventDefault();
        props.onSubmit({
            id: props.edit?.id,
            text: input
        });
        setInput('');
        try {
            const results = await editDepartments({
                variables: {
                    input: {
                        // eslint-disable-next-line
                        dName, dId
                    }
                }
            })
            // eslint-disable-next-line
            if (results) setAlertBox({ message: ` Departamento actualizado a  ${ dName }`, duration: 5000 })
        } catch (err) {
            setAlertBox({ message: `${ err }`, duration: 7000 })
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
                    <RippleButton onClick={handleSubmit}>Actualizar País</RippleButton>
                </ContainInput>
            )}
        </form>
    );
}