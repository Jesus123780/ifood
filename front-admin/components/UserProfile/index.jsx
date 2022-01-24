import { useRef, useState } from 'react'
import moment from 'moment'
import { ContentInfo, Text, TextContent, Img, InputFile, ButtonStatus, TextButton, InputSelect, Option } from './style'
import { ContentText, ContainerHead, ContainerUpload, InputText, ImgContainer, Form, ButtonSubmit, Container, Card } from './styled'
import { Map } from '../Map';
import { RippleButton } from '../Ripple';
const UserProfileSettings = ({ handleSubmit, onChange, dataForm }) => {
    const fileInputRef = useRef(null)
    const [images, setImages] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [previewImg, setPreviewImg] = useState(false)
    return <div>
        <Container>
            <RippleButton margin='40px 0' onClick={() => setShowModal(!showModal)}>Registrar Ubicacion</RippleButton>
            <Card >
                <Form onSubmit={handleSubmit}>
                    <ContainerHead>
                        <ImgContainer>
                            {previewImg ? <Img src={previewImg} /> : 'icon'}
                        </ImgContainer>
                        <ContainerUpload>
                        </ContainerUpload>
                    </ContainerHead>
                    <ContentInfo>
                        <TextContent margin='10px 20px'>
                            <Text>Número de Teléfono</Text>
                            <InputText name="upPhone" onChange={onChange} value={dataForm?.upPhone || ''} />
                        </TextContent>
                        <TextContent margin='10px 20px'>
                            <Text>email</Text>
                            <InputText name="email" onChange={onChange} value={dataForm?.email || ''} />
                        </TextContent>
                        <TextContent margin='10px 20px'>
                            <Text>lastName</Text>
                            <InputText name="lastName" onChange={onChange} value={dataForm?.lastName || ''} />
                        </TextContent>
                    </ContentInfo>
                    <ContentInfo>
                        <TextContent margin='10px 20px'>
                            <Text>username</Text>
                            <InputText name="username" onChange={onChange} value={dataForm?.username || ''} />
                        </TextContent>
                        <TextContent margin='10px 20px'>
                            <Text>Fecha de Nacimiento</Text>
                            <InputText type='date' name="upDateBir" onChange={onChange} value={moment(dataForm?.upDateBir).format('YYYY-MM-DD')} />
                        </TextContent>
                        <TextContent margin='10px 20px'>
                            <Text>Direccion como la conoces</Text>
                            <InputText type='text' name="upAddress" onChange={onChange} value={dataForm?.upAddress} />
                        </TextContent>
                        <TextContent margin='10px 20px'>
                            <Text>upZipCode</Text>
                            <InputText type='text' name="upZipCode" onChange={onChange} value={dataForm?.upZipCode} />
                        </TextContent>
                    </ContentInfo>
                    <ContentInfo>
                        <RippleButton type='submit'>Guardar Cambios</RippleButton>
                    </ContentInfo>
                </Form>
            </Card>
        </Container >
        <Map showModal={showModal} setShowModal={setShowModal} modal={1} />
    </div>;
};

export default UserProfileSettings;
