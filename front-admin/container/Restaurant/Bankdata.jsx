import PropTypes from 'prop-types'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Cards, ContentCards } from './styled'

const Bankdata = props => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()

    return (
        <ContentCards>
            <InputHooks title='Banco' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
            <InputHooks title='Tipo de cuenta' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
            <InputHooks title='Nombre del Representante Legal' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
            <InputHooks title='Número de cuenta bancaria' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
            <InputHooks title='Banco' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
        </ContentCards>
    )
}

Bankdata.propTypes = {

}

export default Bankdata
