import PropTypes from 'prop-types'
import { useState } from 'react'
import moment from 'moment'
import { ContentInfo, Text, TextContent } from './style'
import { ContainerHead, ContainerUpload, InputText, ImgContainer, Form, Container, Card } from './styled'
import { RippleButton } from '../Ripple'
const UserProfileSettings = ({ handleSubmit, onChange, dataForm }) => {
  const [showModal, setShowModal] = useState(false)
  return <div>
    <Container>
      {/* <RippleButton margin='40px 0' onClick={() => { return setShowModal(!showModal) }}>Registrar Ubicación</RippleButton> */}
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
    </Container >
  </div>
}

UserProfileSettings.propTypes = {
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
