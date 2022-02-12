import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { useFormTools } from '../../components/BaseForm'
import { useUser } from '../../components/hooks/useUser'
import { useQuery } from '@apollo/client'
import InputHooks from '../../components/InputHooks/InputHooks'
import OTPInput from '../../components/OTPInputHook'
import { RippleButton } from '../../components/Ripple'
import { BColor, BGColor, EColor, PVColor } from '../../public/colors'
import { Card2, ContentCardInfo, Text } from './styled'
import { GET_ONE_STORE } from './queries'
import { generatePdfDocumentInvoice } from './PdfStore'
import { useRouter } from 'next/router'
import useLocalStorage from '../../components/hooks/useLocalSorage'
import Context from '../../context/Context'

const CheckYourData = props => {
    // const { setCompanyLink } = useContext(Context)
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [step, setStep] = useState(0)
    const [dataUser] = useUser()
    const router = useRouter()
    const { data } = useQuery(GET_ONE_STORE)
    const store = data?.getStore || {}
    const handleRedirect = () => {
        router.push('/restaurante/firma-el-contrato')
    }
    return (
        <div>
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
                <RippleButton widthButton='100%' margin='20px auto' type='submit' onClick={() => handleRedirect()} bgColor={EColor}>{step !== 1 ? 'Continuar' : 'Finalizar'}</RippleButton>
                <RippleButton widthButton='150px' padding={'15px 5px'} bgColor={PVColor} color={BGColor} onClick={() => generatePdfDocumentInvoice({ dataInvoice: { ...data } })}>
                    Download
                </RippleButton>
            </ContentCardInfo>
        </div>
    )
}

CheckYourData.propTypes = {

}

export default CheckYourData
