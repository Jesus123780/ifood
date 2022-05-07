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
            <Text color={BColor} size='15px'>Nombre del restaurante </Text>
            <Text color={BColor} size='15px'>{store?.storeName}</Text>
          </div>
          <div>
            <Text color={BColor} size='15px'>NIT </Text>
            <Text color={BColor} size='15px'>{store?.NitStore}</Text>
          </div>

        </Card2>
        <Card2>
          <div>
            <Text color={BColor} size='15px'>Documento de identidad </Text>
            <Text color={BColor} size='15px'>{store?.documentIdentifier}</Text>
          </div>
          <div>
            <Text color={BColor} size='15px'>Email Store </Text>
            <Text color={BColor} size='15px'>{store?.emailStore}</Text>
          </div>
        </Card2>
        <Card2>
          <div>
            <div>
              <Text color={BColor} size='15px'>Información del representante legal </Text>
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
              <Text color={BColor} size='15px'>Dirección</Text>
              <Text color={BColor} size='15px'>{store?.addressStore}</Text>
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
            <Text color={BColor} size='15px'>  Descripcion </Text>
            <Text color={BColor} size='15px'>{store?.description}</Text>
          </div>
          <div>
            <Text color={BColor} size='15px'>Categoría </Text>
            <Text color={BColor} size='15px'>{store?.cateStore?.cName}</Text>
          </div>

        </Card2>
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => {return handleRedirect()}}
          type='submit'
          widthButton='100%'
        >{step !== 1 ? 'Continuar' : 'Finalizar'}</RippleButton>
        <RippleButton
          bgColor={PVColor}
          color={BGColor}
          onClick={() => {return generatePdfDocumentInvoice({ dataInvoice: { ...data } })}}
          padding={'15px 5px'}
          widthButton='150px'
        >
                    Download
        </RippleButton>
      </ContentCardInfo>
    </div>
  )
}

CheckYourData.propTypes = {

}

export default CheckYourData
