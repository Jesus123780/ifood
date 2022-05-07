import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { ContentInfo, Text, TextContent } from './style'
import { ContainerHead, ContainerUpload, InputText, ImgContainer, Form, Container, Card } from './styled'
import { Map } from '../Map'
import { RippleButton } from '../Ripple'
import { CardDevice } from 'container/dashboard/styled'
const UserProfileSettings = ({ handleSubmit, onChange, dataForm, dataDevice }) => {
  const [showModal, setShowModal] = useState(false)
  const [deviceId, setDeviceId] = useState(false)
  useEffect(() => {
    setDeviceId(window.localStorage.getItem('deviceid'))
  }, [])
  return <div>
    <Container>
      <RippleButton margin='40px 0' onClick={() => { return setShowModal(!showModal) }}>Registrar Ubicación</RippleButton>
      <Card >
        <Form onSubmit={handleSubmit}>
          <ContainerHead>
            <ImgContainer>
            </ImgContainer>
            <ContainerUpload>
            </ContainerUpload>
          </ContainerHead>
          <ContentInfo>
            <TextContent margin='10px 20px'>
              <Text>Número de Teléfono</Text>
              <InputText
                name='upPhone'
                onChange={onChange}
                value={dataForm?.upPhone || ''}
              />
            </TextContent>
            <TextContent margin='10px 20px'>
              <Text>email</Text>
              <InputText
                name='email'
                onChange={onChange}
                value={dataForm?.email || ''}
              />
            </TextContent>
            <TextContent margin='10px 20px'>
              <Text>lastName</Text>
              <InputText
                name='lastName'
                onChange={onChange}
                value={dataForm?.lastName || ''}
              />
            </TextContent>
          </ContentInfo>
          <ContentInfo>
            <TextContent margin='10px 20px'>
              <Text>username</Text>
              <InputText
                name='username'
                onChange={onChange}
                value={dataForm?.username || ''}
              />
            </TextContent>
            <TextContent margin='10px 20px'>
              <Text>Fecha de Nacimiento</Text>
              <InputText
                name='upDateBir'
                onChange={onChange}
                type='date'
                value={moment(dataForm?.upDateBir).format('YYYY-MM-DD')}
              />
            </TextContent>
            <TextContent margin='10px 20px'>
              <Text>Direccion como la conoces</Text>
              <InputText
                name='upAddress'
                onChange={onChange}
                type='text'
                value={dataForm?.upAddress}
              />
            </TextContent>
            <TextContent margin='10px 20px'>
              <Text>upZipCode</Text>
              <InputText
                name='upZipCode'
                onChange={onChange}
                type='text'
                value={dataForm?.upZipCode}
              />
            </TextContent>
          </ContentInfo>
          <ContentInfo>
            <RippleButton type='submit'>Guardar Cambios</RippleButton>
          </ContentInfo>
        </Form>
      </Card>
      {dataDevice?.map(x => {
        return (
          <CardDevice key={x.dId}>
            <span className='device__icon'>
              {x.short_name === 'WIN' &&
                <svg
                  fill='none'
                  height='24'
                  viewBox='0 0 24 24'
                  width='24'
                ><rect
                    height='15.5'
                    rx='3.25'
                    stroke='#3E3E3E'
                    strokeWidth='1.5'
                    width='20.5'
                    x='1.75'
                    // eslint-disable-next-line react/jsx-closing-bracket-location
                    y='0.75' >
                  </rect><path
                    d='M5 13L19 13'
                    stroke='#3E3E3E'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  ></path><path
                    d='M8 22C8 20.343 9.79133 19 12 19C14.2087 19 16 20.343 16 22H8Z'
                    stroke='#3E3E3E'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  ></path><path
                    d='M12 17L12.0017 19'
                    stroke='#3E3E3E'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.5'
                  ></path></svg>
              }
            </span>
            <div className='device__info'>
              <div className='device__description-wrapper'>
                <span className='device__description'> {x.deviceName} - {x.platform} </span>
                {deviceId === x.deviceId && <span className='device__current'>Current device </span>}
              </div>
              <span className='device__localization' tabIndex='0'> {x.short_name}</span>
              <span className='device__localization' tabIndex='0'> {x.locationFormat}</span>
              <span className='device__localization' tabIndex='0'> {moment(x.DatCre).format('YYYY-MM-DD')} </span>
            </div>
          </CardDevice>
        )
      })}
    </Container >
    <Map
      modal={1}
      setShowModal={setShowModal}
      showModal={showModal}
    />
  </div>
}

UserProfileSettings.propTypes = {
  dataDevice: PropTypes.shape({
    map: PropTypes.func
  }),
  dataForm: PropTypes.shape({
    email: PropTypes.string,
    lastName: PropTypes.string,
    upAddress: PropTypes.any,
    upDateBir: PropTypes.any,
    upPhone: PropTypes.string,
    upZipCode: PropTypes.any,
    username: PropTypes.string
  }),
  handleSubmit: PropTypes.any,
  onChange: PropTypes.any
}

export default UserProfileSettings
