import ReactDOM from 'react-dom'
import { useState } from 'react';
import { InputHook } from './Input';
import { Rate } from '../../Rate';
import { numberFormat } from '../../../utils';
import { RippleButton } from '../../Ripple';
import { Container, FormProducts, Card, Button, CardOne, Label, ContainerCardProduct, CardProduct, Img, ContentImg, Title, Text, ContentInfo, ContentIconFav, ButtonCard, ActionName, ReadMore, ContentProducts, CardInput, CardCheckBox, CardRadioLabel, ContainerFilter, ItemFilter, ContainerBurger, Footer } from './styled';
import { Skeleton } from '../../Skeleton/SkeletonCard';
import { SliderAreas } from './SliderAreas';
import { SliderCategory } from './SliderCategories';
import { LoadingBabel } from '../../Loading/LoadingBabel';
import { Range } from '../../InputRange';
import { SliderCategoryUpdate } from './SliderCategoriesUpdate';
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../public/icons';
import { APColor, PColor, PVColor, SEGColor } from '../../../public/colors';
import { FoodCardPreview } from './FoodPreview';

export const FoodComponent = ({
    finalDataAreas,
    features,
    search,
    handleChangeFilter,
    data,
    setShowMore,
    values,
    handleRegister,
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
            <Text size='30px'>Filtrar productos</Text>
            <ContainerCardProduct>
                <CardProduct>
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
                <CardProduct id='space'>
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
            </ContainerCardProduct>
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
                <ItemFilter>Evaluacion</ItemFilter>
                <ItemFilter>Full envio</ItemFilter>
                <ItemFilter>Tarifa de envio</ItemFilter>
                <ItemFilter>Distancia mas corta</ItemFilter>
                <ItemFilter>Ordenar</ItemFilter>
                <ItemFilter onClick={() => onClickClear()}>Limpio</ItemFilter>
            </ContainerFilter>
            <SliderAreas autoPlayTime={4000} duration={'500ms'} finalDataAreas={finalDataAreas} />
            <ContainerCardProduct grid={grid}>
                <div>
                    <ItemFilter>{data?.length ? `${data?.length} Productos` : 'No hay productos'}</ItemFilter>
                    <ItemFilter>{dataFree?.length ? `${dataFree?.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
                </div>
                {!data?.length ? <SkeletonP /> : data?.map(product => (
                    <CardProduct grid={grid} key={product.pId} >
                        <ButtonCard grid={grid} onClick={() => handleDelete(product.pId)}>
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
                            <ContentIconFav grid={grid}>
                                <IconLove color={PVColor} size={20} />
                            </ContentIconFav>
                            {product.ProDescuento && <Discount discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</Discount>}
                            <Title>{product.pName}</Title>
                            <Text>{numberFormat(product.ProPrice)}</Text>
                            <ContentInfo direction>
                                <Rate rating={product.ProStar} onRating={() => setRating(product.ProStar)} size={20} value={product.ProStar} />
                                {product.ProDelivery === 1 && <span>Gratis</span>}
                            </ContentInfo>
                        </ContentInfo>
                    </CardProduct>
                ))}
            </ContainerCardProduct>
            <ReadMore onClick={() => setShowMore(s => s + 5)}>CARGAR MÁS </ReadMore>
        </ContentProducts>
    </div>
    )
}
export const SkeletonP = () => {
    return <>
        <>
            {[1, 2, 3, 4].map(x => (
                <CardProduct key={x}>
                    <Skeleton />
                </CardProduct>
            ))}
        </>
    </>
}