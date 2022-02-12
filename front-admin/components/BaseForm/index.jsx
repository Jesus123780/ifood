import { useCallback, useContext, useEffect, useState } from 'react'
import { Context } from '../../context/Context'
import { PColor, WColor } from '../../public/colors'
import { validationSubmitHooks } from '../../utils'
// import { validationSubmitHooks } from '../utils/util'

/**
 * @version 0.0.1
 * @description Hook con herramientas de validación y eventos de cambio
 * @return {Array} devuelve la función onChange a ejecutar y el estado de error de cada input
 */
export const useFormTools = () => {
    const [dataForm, setDataForm] = useState({})
    const [errorForm, setErrorForm] = useState({})
    const [errorSubmit, setErrorSubmit] = useState(false)
    const [calledSubmit, setCalledSubmit] = useState(false)
    // const { setAlertBox } = useContext(Context)

    // Handle Change
    const handleChange = useCallback((e, error) => {
        setDataForm({ ...dataForm, [e.target.name]: e.target.value })
        setErrorForm({ ...errorForm, [e.target.name]: error })
    }, [setDataForm, dataForm, errorForm, setErrorForm])

    // Forzar datos desde una ventana externa
    const handleForcedData = useCallback(data => {
        setDataForm(data)
    }, [setDataForm])

    // Forzar datos de error desde una ventana externa
    const setForcedError = useCallback(errors => {
        setErrorForm(errors)
    }, [setErrorForm])

    // Handle submit, al enviar formulario
    const handleSubmit = useCallback(({ event, action, msgSuccess, msgError, actionAfterSuccess }) => {
        !!event && event.preventDefault()
        setCalledSubmit(true)
        let errSub = false

        // Valida los errores locales
        for (const x in errorForm) {
            if (errorForm[x]) errSub = true
        }

        // if (errSub) return setErrorSubmit(errSub)

        // Valida los errores desde el evento
        const errores = validationSubmitHooks(event.target.elements)
        setErrorForm(errores)
        for (const x in errores) {
            if (errores[x]) errSub = true
        }

        // Ejecuta la petición si es válido
        if (!errSub && action) {
            action().then(res => {
                if (res) {
                    // setAlertBox({ message: msgSuccess || 'Operación exitosa', color: PColor })
                    !!actionAfterSuccess && actionAfterSuccess()
                }

            }).catch(e => console.log({ message: msgError || e?.message || 'Ha ocurrido un error', color: WColor }))
        }

        setErrorSubmit(errSub)
    }, [errorForm, setErrorForm])

    useEffect(() => setCalledSubmit(false), [calledSubmit])

    return [handleChange, handleSubmit, handleForcedData, { dataForm, errorForm, errorSubmit, calledSubmit, setForcedError }]
}