import { useState } from 'react';
import { InputHook } from './Input';
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../assets/icons/icons';
import { APColor, PColor, PVColor } from '../../../assets/colors';
import { RippleButton } from '../../Ripple';
import { TextAreaHooks } from '../../TextTareaHook';
import { Loading } from '../../Loading';
import {
    Container,
    FormProducts,
    Card,
    Button,
    CardOne,
    ContainerCardProduct,
    CardProduct,
    Img,
    ContentImg,
    Title,
    Text,
    ContentInfo,
    ContentIconFav,
    ButtonCard,
    ActionName,
    ReadMore,
    ContentProducts,
} from './styled';
import { Skeleton } from '../../Skeleton/SkeletonCard';

export const Categories = ({
    search,
    handleChangeFilter,
    data,
    setShowMore,
    values,
    handleRegister,
    handleChange,
    loading,
    handleDelete
}) => {
    const [stateCard, setState] = useState(false)
    const handleClick = () => {
        setState(!stateCard)
    }
    return (<div>
        {loading && <Loading />}
        <Container>
            <CardOne state={stateCard}>
                <Text size='30px'>Registra una categoría</Text>
                <FormProducts onSubmit={handleRegister}>
                    <InputHook label='Nombre de la categoría'
                        value={values.cpName}
                        name='cpName'
                        onChange={handleChange}
                        range={{ min: 0, max: 700 }} />
                    <TextAreaHooks
                        title='Metadata'
                        value={values.Metadata}
                        name='Metadata'
                        onChange={handleChange}
                        range={{ min: 0, max: 7000 }}
                        showRange
                    />
                    <RippleButton widthButton='100%' margin='20px auto' type='submit' bgColor={APColor}>Subir</RippleButton>
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={stateCard} bgColor='#ededed'>
                <ContentProducts>
                    <InputHook label='Filtrar las categorías' name='search' value={search} onChange={handleChangeFilter} type='text' range={{ min: 0, max: 20 }} />
                    <Text size='30px'>Lista de categorías registrados</Text>
                    <ContainerCardProduct>
                        {!data?.length ? <SkeletonP /> : data?.map(product => (
                            <CardProduct key={product.caId} >
                                <ButtonCard onClick={() => handleDelete(product?.caId)}>
                                    <IconDelete size={20} color={PColor} />
                                    <ActionName >
                                Eliminarais
                                    </ActionName>
                                </ButtonCard>
                                <ButtonCard delay='.1s' top={'80px'}>
                                    <IconEdit size={20} color={PColor} />
                                    <ActionName>
                                Editar
                                    </ActionName>
                                </ButtonCard>
                                <ContentImg>
                                    {!product.ProImage ? <i>Cargando</i> : <Img src={product.ProImage} alt={product.ProImage} />}
                                </ContentImg>
                                <ContentInfo>
                                    <ContentIconFav>
                                        <IconLove color={PVColor} size={20} />
                                    </ContentIconFav>
                                    <Title>{product.cpName}</Title>
                                </ContentInfo>
                            </CardProduct>
                        ))}
                    </ContainerCardProduct>
                    <ReadMore onClick={() => setShowMore(s => s + 5)}>'Cargar Más' </ReadMore>
                </ContentProducts>
            </Card>
        </Container>
    </div>
    )
}
export const SkeletonP = () => {
    return <>
        <>
            {[1, 2, 3, 4].map(x => (
                <CardProduct key={x.id}>
                    <Skeleton />
                </CardProduct>
            ))}
        </>
    </>
}