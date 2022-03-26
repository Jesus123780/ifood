import PropTypes from 'prop-types'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useQuery, useMutation } from '@apollo/client'
import { Card2, Cards, ContentCardInfo, ContentCards, Text } from './styled'
import CanvasDraw from 'react-canvas-draw'
import { BColor, PColor } from '../../public/colors'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '../../components/hooks/useUser'
import { useRouter } from 'next/router'
import { GET_ONE_STORE } from './queries'
import { RippleButton } from '../../components/Ripple'
import { REGISTER_CONTRACT_STORE } from '../dashboard/queriesStore'
const ContractSignature = props => {
    // STATES
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const ref = useRef(null)
    const [code, setCode] = useState('')
    const secondCanvas = useRef(null)
    const [color, setColor] = useState('')

    // HANDLES
    const handleClick = () => {
        const data = ref.current.getSaveData()
        setCode(data)
        secondCanvas.current.loadSaveData(data)
    }
    const handleClean = () => {
        const data = ref.current.clear()

    }
    const handleUndo = () => {
        ref.current.eraseAll()
        //    ref.current.resetView()

    }
    // useEffect(() => {
    //     window.setInterval(() => {
    //         setColor( "#" + Math.floor(Math.random() * 16777215).toString(16));
    //       }, 6000)
    // }, [color]);
    const [createOneContract, { loading, error }] = useMutation(REGISTER_CONTRACT_STORE)
    const handleForm = (e) =>
        handleSubmit({
            event: e,
            action: () => {
                return createOneContract({
                    variables: {
                        input: {
                            ctCode: code,
                            catDescription: 'Description',
                        }
                    }
                })
            }
        })

  
    const [dataUser] = useUser()
    const router = useRouter()
    const { data } = useQuery(GET_ONE_STORE)
    const store = data?.getStore || {}
    return (
        <ContentCards>
            <form onSubmit={(e) => handleForm(e)}>
                <button type='submit' onClick={() => handleClick()}>Click</button>
            </form>
            <button onClick={() => handleClean()}>Limpiar</button>
            <button onClick={() => handleUndo()}>Volver</button>
            <CanvasDraw ref={ref} brushColor={PColor} disabled={false} gridColor="#ccc" clampLinesToDocument brushRadius={1} /* imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg" */ />
            <CanvasDraw ref={secondCanvas} disabled={true} brushColor={color} disabled={false} gridColor={color} clampLinesToDocument brushRadius={1} /* imgSrc="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg" */ />
            <ContentCardInfo>
                <h1>Antes de terminar, revisa tus datos</h1>
                <Card2>
                    <div>
                        <Text size='15px' color={BColor}>Nombre del restaurante </Text>
                        <Text size='15px' color={BColor}>{store?.storeName}</Text>
                    </div>
                    <div>
                        <Text size='15px' color={BColor}>NIT </Text>
                        <Text size='15px' color={BColor}>{store?.NitStore}</Text>
                    </div>

                </Card2>
                <Card2>
                    <div>
                        <Text size='15px' color={BColor}>Documento de identidad </Text>
                        <Text size='15px' color={BColor}>{store?.documentIdentifier}</Text>
                    </div>
                    <div>
                        <Text size='15px' color={BColor}>Email Store </Text>
                        <Text size='15px' color={BColor}>{store?.emailStore}</Text>
                    </div>
                </Card2>
                <Card2>
                    <div>
                        <div>
                            <Text size='15px' color={BColor}>Información del representante legal </Text>
                            {/* <Text size='15px' color={BColor}>{store?.NitStore}</Text> */}
                        </div>

                    </div>
                    <div>
                        {dataUser?.email || ''}
                    </div>
                </Card2>
                <Card2>
                    <div>
                        <div>
                            <Text size='15px' color={BColor}>Dirección</Text>
                            <Text size='15px' color={BColor}>{store?.addressStore}</Text>
                        </div>
                    </div>
                </Card2>
                <Card2>
                    <div>
                        Numero
                    </div>
                    {store.uPhoNum}
                </Card2>
                <Card2>
                    <div>
                        <Text size='15px' color={BColor}>  Descripcion </Text>
                        <Text size='15px' color={BColor}>{store?.description}</Text>
                    </div>
                    <div>
                        <Text size='15px' color={BColor}>Categoría </Text>
                        <Text size='15px' color={BColor}>{store?.cateStore?.cName}</Text>
                    </div>

                </Card2>
                <RippleButton widthButton='100%' margin='20px auto' type='submit' onClick={() => handleRedirect()} >Finalizar</RippleButton>
                {/* <RippleButton widthButton='150px' padding={'15px 5px'} bgColor={PVColor} color={BGColor} onClick={() => generatePdfDocumentInvoice({ dataInvoice: { ...data } })}> */}
                {/* Download */}
                {/* </RippleButton> */}
            </ContentCardInfo>
        </ContentCards>
    )
}

ContractSignature.propTypes = {

}

export default ContractSignature
