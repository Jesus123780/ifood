import ReactDOM from 'react-dom'
import { useState } from 'react';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { Rate } from '../../Rate';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils';
import { RippleButton } from '../../Ripple';
import { Skeleton } from '../../Skeleton/SkeletonCard';
import { SliderAreas } from './SliderAreas';
import { Discount } from './ViewProducts/styled';
import { SliderCategory } from './SliderCategories';
import { LoadingBabel } from '../../Loading/LoadingBabel';
import { Range } from '../../InputRange';
import { SliderCategoryUpdate } from './SliderCategoriesUpdate';
import { IconArrowRight, IconDelete, IconDollar, IconEdit, IconLove } from '../../../public/icons';
import { APColor, PColor, PVColor, SEGColor, TFSColor } from '../../../public/colors';
import { FoodCardPreview } from './FoodPreview';
import { Container, FormProducts, Card, Button, CardOne, Label, ContainerCardProduct, CardProduct, Img, ContentImg, Title, Text, ContentInfo, ContentIconFav, ButtonCard, ActionName, ReadMore, ContentProducts, CardInput, CardCheckBox, CardRadioLabel, ContainerFilter, ItemFilter, ContainerBurger, Footer, LateralModal, WrapperProducts, Grid } from './styled';
import { useRouter } from 'next/router';
import { useSetState } from '../../hooks/useState';
import { AwesomeModal } from '../../AwesomeModal';

export const FoodComponent = ({ datafatures,
    finalDataAreas,
    features,
    search,
    state,
    handleChangeFilter,
    data,
    setShowMore,
    values,
    handleRegister,
    dispatch,
    handleAddProductR,
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
    dataCategories,
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
        {/* <marquee>Este texto se mueve de derecha a izquierda</marquee> */}
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
                    <InputHook label='ProHeight'
                        value={numberFormat(values.ProHeight)}
                        name='ProHeight'
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
                        <RippleButton widthButton='min-content' margin='1px' type='submit' bgColor={APColor}>Subir</RippleButton>
                    </Footer>
                </form>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={stateCard} bgColor='#ededed'>
                <FoodCardPreview
                    features={features}
                    valuesP={'name'}
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

            {/* Slider para filtrar productos */}
            <Text size='30px'>Lista de productos registrados</Text>
            <ContainerFilter>
                <ItemFilter onClick={() => setLocalStorage(grid)}>
                    <ContainerBurger>
                        <div className="BurgerMenu__container" role="button" >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </ContainerBurger>
                </ItemFilter>
                <ItemFilter>Mejor precio</ItemFilter>
                <ItemFilter>Mayor precio</ItemFilter>
                <ItemFilter>Envio gratis</ItemFilter>
                <ItemFilter>Evaluaciones de producto</ItemFilter>
                <ItemFilter>Full envio</ItemFilter>
                <ItemFilter>Tarifa de envio</ItemFilter>
                <ItemFilter onClick={() => OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state)}>Ordenar</ItemFilter>
                <ItemFilter onClick={() => onClickClear()}>Limpio</ItemFilter>
            </ContainerFilter>
            <SliderAreas autoPlayTime={4000} duration={'500ms'} finalDataAreas={finalDataAreas} />
            <ItemFilter>{data.length ? `${data.length} Productos` : 'No hay productos'}</ItemFilter>
            <ItemFilter>{dataFree.length ? `${dataFree.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
            <Text size='30px'>Filtrar productos</Text>
            <WrapperProducts className='filter'>
                <div style={{ display: 'block', width: '30%', height: 'min-content', position: 'sticky' }}>
                    <CardProduct width='90%'>
                        <InputHook label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' range={{ min: 0, max: 20 }} />
                        <i>Filtro de precio</i>
                        <InputHook
                            type='range'
                            label={`${data[0]?.ProPrice}`}
                            // value={data[0]?.ProPrice}
                            name='price'
                            maxLength={data[0]?.ProPrice}
                            minLength={data[0]?.ProPrice}
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }}
                        />
                    </CardProduct>
                    <CardProduct width='90%' id='space'>
                        <Text size='20px'>Filtrar productos</Text>
                        <div>
                            <CardInput onChange={handleChangeClick}>
                                <CardCheckBox name='gender' value="1" type="checkbox" id="checkboxF" />
                                <CardRadioLabel htmlFor='checkboxF'>Envío gratis</CardRadioLabel>
                            </CardInput>
                            <CardInput onChange={handleChangeClick}>
                                <CardCheckBox name='desc' value="1" type="checkbox" id="checkboxF" />
                                <CardRadioLabel htmlFor='checkboxF'>Ofertas</CardRadioLabel>
                            </CardInput>
                        </div>
                        <RippleButton onClick={() => onClickSearch()} bgColor={PVColor}>Buscar</RippleButton>
                        <Range min={1962} max={2018} value={2018} label="Year" />
                    </CardProduct>
                </div>
                <ContainerCardProduct grid={grid}>
                    {!data?.length ? <SkeletonP /> : data?.map(product => (
                        <CardProduct grid={grid} key={product.pId} >
                            <ButtonCard grid={grid} onClick={() => handleDelete(product)}>
                                <IconDelete size={20} color={PColor} />
                                <ActionName >
                                    Eliminar
                                </ActionName>
                            </ButtonCard>
                            <ButtonCard grid={grid} delay='.1s' top={'80px'}>
                                <IconEdit size={20} color={PColor} />
                                <ActionName>
                                    Editar
                                </ActionName>
                            </ButtonCard>
                            <ContentImg grid={grid}>
                                {!product.ProImage ? <i>No img</i> : <Img src={product.ProImage} alt={product.ProImage} />}
                            </ContentImg>
                            <ContentInfo>
                                <ContentIconFav grid={grid} onClick={() => router.push(`/producto/editar/${product.pId}`)}>
                                    <IconLove color={PVColor} size={20} />
                                </ContentIconFav>
                                {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
                                <Title>{product.pName}</Title>
                                <Text>{numberFormat(product.ProPrice)}</Text>
                                <ContentInfo /* direction */>
                                    <Rate rating={product.ProStar} onRating={() => setRating(product.ProStar)} size={20} value={product.ProStar} />
                                    {product.ProDelivery === 1 && <span>Gratis</span>}
                                </ContentInfo>
                            </ContentInfo>
                        </CardProduct>
                    ))}
                </ContainerCardProduct>
            </WrapperProducts>
            <ReadMore onClick={() => setShowMore(s => s + 5)}>'Cargar Más' </ReadMore>
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
import React from 'react';

const ComponentCardProduct = ({ data, dispatch, ADD_TO_EFFECTIVE, REMOVE, ADD_PRODUCT }) => {
    return <div>
        {!data?.length ? 'No data' : data?.map((product, idx) => (
            <CardProduct grid={true} key={product.idx}  >
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
                <ButtonCard grid={true} delay='.1s' top={'140px'} onClick={() => dispatch({ type: ADD_PRODUCT  && ADD_PRODUCT, payload: product })}>
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
            {[1, 2, 3, 4].map(x => (
                <CardProduct key={x.id}>
                    <Skeleton />
                </CardProduct>
            ))}
        </>
    </>
}