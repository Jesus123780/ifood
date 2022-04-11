import { useState } from 'react';
import { InputHook } from './Input';
import { Rate } from '../../Rate';
import { numberFormat } from '../../../utils';
import { RippleButton } from '../../Ripple';
import { Skeleton } from '../../Skeleton/SkeletonCard';
import { SliderAreas } from './SliderAreas';
import { Discount } from './ViewProducts/styled';
import { LoadingBabel } from '../../Loading/LoadingBabel';
import { Range } from '../../InputRange';
import { IconArrowRight, IconDelete, IconDollar, IconEdit, IconLove } from '../../../public/icons';
import { APColor, PColor, PVColor, TFSColor } from '../../../public/colors';
import { FoodCardPreview } from './FoodPreview';
import { Container, Card, Button, CardOne, Label, ContainerCardProduct, CardProduct, Img, ContentImg, Title, Text, ContentInfo, ContentIconFav, ButtonCard, ActionName, ReadMore, ContentProducts, CardInput, CardCheckBox, CardRadioLabel, ContainerFilter, ItemFilter, ContainerBurger, Footer, LateralModal, WrapperProducts, Grid } from './styled';
import { useRouter } from 'next/router';
import { useSetState } from '../../hooks/useState';
import { AwesomeModal } from '../../AwesomeModal'; import React from 'react';
import Image from 'next/image';
import { Loading } from 'components/Loading';

export const FoodComponent = ({ datafatures,
    finalDataAreas,
    features,
    search,
    handleChangeFilter,
    data,
    setShowMore,
    values,
    handleRegister,
    currentYear,
    fetchMore,
    dispatch,
    handleChange,
    countries,
    setRating,
    rating,
    names,
    loading,
    onTargetClick,
    onFileInputChange,
    handleDelete,
    fileInputRef,
    alt,
    product_state,
    src,
    setName,
    handleChangeClick,
    onClickClear,
    handleCheckEnvioGratis,
    onClickSearch,

    state: grid,
    setLocalStorage,
    intPorcentaje,
    dataFree,
}) => {
    const [stateCard, setState] = useState(false)
    const handleClick = () => {
        setState(!stateCard)
    }
    const [modal, setModal] = useState(0)
    const OPEN_MODAL_ORGANICE = useSetState(0)
    const handleClickModal = index => {
        setModal(index === modal ? true : index)
    }
    const router = useRouter()
    return (<div>
        {loading && <LoadingBabel />}
        <Container>
            <CardOne state={stateCard}>
                <form className="form-horizontal" onSubmit={handleRegister}>
                    <InputHook label='Nombre del producto'
                        type="text"
                        placeholder="Nombre del producto"
                        value={names}
                        name='name'
                        // required
                        onChange={e => setName(e.target.value)}
                        range={{ min: 0, max: 180 }}
                    />
                    <InputHook label='ProPrice'
                        value={numberFormat(values.ProPrice)}
                        name='ProPrice'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Costo de envio'
                        value={numberFormat(values.ValueDelivery)}
                        name='ValueDelivery'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Descuento'
                        value={values.ProDescuento}
                        name='ProDescuento'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <>
                        <Rate rating={rating} onRating={rate => setRating(rate)} size={20} value={values.rating} />
                        <img />
                        <InputHook label='Largo'
                            value={values.ProLength}
                            name='ProLength'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Peso'
                            value={values.ProWeight}
                            name='ProWeight'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook TypeTextarea={true} label='Description'
                            value={values.ProDescription}
                            name='ProDescription'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <CardInput onChange={handleCheckEnvioGratis}>
                            <CardCheckBox name='gender' value="1" type="checkbox" id="checkboxF" />
                            <CardRadioLabel htmlFor='checkboxF'>Envío gratis</CardRadioLabel>
                        </CardInput>
                    </>
                    <Footer>
                        <RippleButton widthButton='100%' type='submit'>Subir</RippleButton>
                    </Footer>
                </form>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={stateCard} bgColor='#ededed'>
                <FoodCardPreview
                    features={features}
                    valuesP={names}
                    Country={countries}
                    alt={alt}
                    onTargetClick={onTargetClick}
                    src={src}
                    price={values?.ProPrice}
                    desc={values?.ProDescuento}
                    fileInputRef={fileInputRef}
                    PCant={values?.ProUniDisponibles}
                    onFileInputChange={onFileInputChange}
                    PDescription={values?.ProDescription}
                    start={rating}
                    intPorcentaje={intPorcentaje}
                    setRating={setRating} />
            </Card>
        </Container>

        <ContentProducts>
            <Text size='30px'>Lista de productos registrados</Text>
            <ContainerFilter>
                <ItemFilter>Mejor precio</ItemFilter>
                <ItemFilter>Mayor precio</ItemFilter>
                <ItemFilter>Envio gratis</ItemFilter>
                <ItemFilter>Evaluaciones de producto</ItemFilter>
                <ItemFilter>Full envio</ItemFilter>
                <ItemFilter>Tarifa de envio</ItemFilter>
                <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Ordenar</ItemFilter>
                <ItemFilter onClick={() => onClickClear()}>Limpio</ItemFilter>
                <ItemFilter>{data.length ? `${data.length} Productos` : 'No hay productos'}</ItemFilter>
                <ItemFilter>{dataFree.length ? `${dataFree.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
            </ContainerFilter>
            <Text size='30px'>Filtrar productos</Text>
            <InputHook label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' range={{ min: 0, max: 20 }} />
            <WrapperProducts className='filter'>
                <ContainerCardProduct grid={grid}>
                    {!data?.length === 0 ? <SkeletonP /> : data?.map(product => (
                        <CardProduct grid={grid} key={product.pId} >
                            <ButtonCard grid={grid} onClick={() => handleDelete(product)}>
                                <IconDelete size={20} color={PColor} />
                                <ActionName >
                                    Eliminar
                                </ActionName>
                            </ButtonCard>
                            <ButtonCard grid={grid} delay='.1s' top={'80px'} onClick={() => router.push(`/producto/editar/${product.pId}`)}>
                                <IconEdit size={20} color={PColor} />
                                <ActionName>
                                    Editar
                                </ActionName>
                            </ButtonCard>
                            <ContentImg grid={grid}>
                                <Image
                                    className='store_image'
                                    objectFit='contain'
                                    layout='fill'
                                    src={product.ProImage || '/images/202109081904_64O5_i.webp'}
                                    alt={''}
                                    blurDataURL="/images/DEFAULTBANNER.png"
                                    placeholder="blur" // Optional blur-up while loading
                                />
                            </ContentImg>
                            <ContentInfo>
                                <ContentIconFav grid={grid} onClick={() => router.push(`/producto/editar/${product.pId}`)}>
                                    <IconLove color={PVColor} size={20} />
                                </ContentIconFav>
                                {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
                                <Title>{product.pName}</Title>
                                <Text color={APColor}>{(product.ProDelivery === 1 && !product.ValueDelivery) ? 'Envio Gratis' : ''}</Text>
                                <Text>{numberFormat(product.ProPrice)}</Text>
                                <ContentInfo>
                                    {product.ProDelivery === 1 && <span>Gratis</span>}
                                </ContentInfo>
                            </ContentInfo>
                        </CardProduct>
                    ))}
                </ContainerCardProduct>
            </WrapperProducts>
            <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
                setShowMore(s => s + 5)
                fetchMore({
                    variables: { max: more, min: 0 },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prevResult
                        productFoodsAll = [...prevResult.productFoodsAll]
                        return {
                            productFoodsAll: [...fetchMoreResult.productFoodsAll]

                        }
                    }
                })
            }}>{loading ? <Loading /> : 'CARGAR MÁS'}</RippleButton>
        </ContentProducts>

        <AwesomeModal backdrop='static' height='100vh' zIndex='9999' padding='25px' show={OPEN_MODAL_ORGANICE.state} onHide={() => { OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }} onCancel={() => false} size='90%' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
            <Grid gridColumns={3} gridRows={1} gridColGap='30px' gridRowsGap='20px' height='100%'>
                <div>
                    Todos los productos
                    <ComponentCardProduct data={data} dispatch={dispatch} REMOVE={'REMOVE_PRODUCT'} ADD_TO_EFFECTIVE={'ADD_TO_EFFECTIVE'} ADD_PRODUCT={'ADD_PRODUCT'} />
                </div>
                <div>
                    Productos para recoger
                    <ComponentCardProduct data={product_state?.PRODUCT_RECOGER} dispatch={dispatch} REMOVE={'REMOVE_PRODUCT'} />
                </div>
                <div>
                    Pagos en efectivo
                    <ComponentCardProduct data={product_state?.PRODUCT_EFFECTIVE} dispatch={dispatch} REMOVE={'REMOVE_EFFECTIVE'} />
                </div>
            </Grid>

        </AwesomeModal >

    </div>
    )
}


const ComponentCardProduct = ({ data, dispatch, ADD_TO_EFFECTIVE, REMOVE, ADD_PRODUCT }) => {
    return <div>
        {!data?.length ? 'No data' : data?.map((product, idx) => (
            <CardProduct grid={true} key={idx + 1}  >
                <ButtonCard grid={true} top={'20px'} onClick={() => dispatch({ type: REMOVE, idx })}>
                    <IconDelete size={20} color={PColor} />
                    <ActionName >
                        Eliminar
                    </ActionName>
                </ButtonCard>
                <ButtonCard grid={true} delay='.1s' top={'80px'}>
                    <IconEdit size={20} color={PColor} />
                    <ActionName>
                        Editar
                    </ActionName>
                </ButtonCard>
                <ButtonCard grid={true} delay='.1s' top={'140px'} onClick={() => dispatch({ type: ADD_PRODUCT && ADD_PRODUCT, payload: product })}>
                    <IconDollar color={TFSColor} size={30} />
                    <ActionName>
                        Agregar
                    </ActionName>
                </ButtonCard>
                {ADD_TO_EFFECTIVE && <ButtonCard grid={true} delay='.0s' top={'200px'} onClick={() => dispatch({ type: ADD_TO_EFFECTIVE, payload: product })}>
                    <IconLove color={PVColor} size={20} />
                    <ActionName>
                        Agregar a pagos en efectivo
                    </ActionName>
                </ButtonCard>}
                <ContentImg grid={true}>
                    {!product.ProImage ? <i>No img</i> : <Img src={product.ProImage} alt={product.ProImage} />}
                </ContentImg>
                <ContentInfo>
                    {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
                    <Title>{product.pName}</Title>
                    <Text>{numberFormat(product.ProPrice)}</Text>
                    <ContentInfo>
                        <Rate rating={product.ProStar} onRating={() => setRating(product.ProStar)} size={20} value={product.ProStar} />
                        {product.ProDelivery === 1 && <span>Gratis</span>}
                    </ContentInfo>
                    {/* {ADD_TO_EFFECTIVE && <RippleButton padding={0} margin={0} bgColor={PVColor} onClick={() => dispatch({ type: ADD_TO_EFFECTIVE, payload: product })}> <IconDollar size='30px' /></RippleButton>} */}
                </ContentInfo>
            </CardProduct>
        ))}
    </div>;
};

export const SkeletonP = () => {
    return <>
        <>
            {[1, 2, 3, 4].map((x, i) => (
                <CardProduct key={i + 1}>
                    <Skeleton />
                </CardProduct>
            ))}
        </>
    </>
}
