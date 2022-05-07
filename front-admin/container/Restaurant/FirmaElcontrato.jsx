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
  {return handleSubmit({
    event: e,
    action: () => {
      return createOneContract({
        variables: {
          input: {
            ctCode: code,
            catDescription: 'Description'
          }
        }
      })
    }
  })}
  
  const [dataUser] = useUser()
  const router = useRouter()
  const { data } = useQuery(GET_ONE_STORE)
  const store = data?.getStore || {}
  return (
    <ContentCards>
      <form onSubmit={(e) => {return handleForm(e)}}>
        <button onClick={() => {return handleClick()}} type='submit'>Click</button>
      </form>
      <button onClick={() => {return handleClean()}}>Limpiar</button>
      <button onClick={() => {return handleUndo()}}>Volver</button>
      <CanvasDraw
        brushColor={PColor}
        brushRadius={1}
        clampLinesToDocument
        disabled={false}
        gridColor='#ccc'
        ref={ref}
      />
      <CanvasDraw
        brushColor={color}
        brushRadius={1}
        clampLinesToDocument
        disabled={true}
        disabled={false}
        gridColor={color}
        ref={secondCanvas}
      />
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
          margin='20px auto'
          onClick={() => {return handleRedirect()}}
          type='submit'
          widthButton='100%'
        >Finalizar</RippleButton>
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
