import ReactDOM from 'react-dom'
import { useState } from 'react';
import { InputHook } from './Input';
import { ViewProducts } from './ViewProducts';
import { Rate } from '../../Rate';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils';
import { RippleButton } from '../../Ripple';
import { FeaturesProducts } from './FeaturesProduct';
import {
    Container,
    FormProducts,
    Card,
    Button,
    CardOne,
    Label,
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
    CardInput,
    CardCheckBox,
    CardRadioLabel,
    ContainerFilter,
    ItemFilter,
    ContainerBurger
} from './styled';
import { Skeleton } from '../../Skeleton/SkeletonCard';
// import { AwesomeModal } from '../../AwesomeModal';
import { CustomSlider } from './CustomSlider';
// import { ReactTable } from '../../common/ReactTable';
import { SliderAreas } from './SliderAreas';
import { Discount } from './ViewProducts/styled';
import { SliderCategory } from './SliderCategories';
import { LoadingBabel } from '../../Loading/LoadingBabel';
import { Range } from '../../InputRange';
import { SliderCategoryUpdate } from './SliderCategoriesUpdate';
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../public/icons';
import { APColor, PColor, PVColor, SEGColor } from '../../../public/colors';

export const Products = ({ datafatures,
    finalDataAreas,
    features,
    handleAddFeature,
    dispatch,
    search,
    state,
    handleChangeFilter,
    data,
    setShowMore,
    values,
    handleRegister,
    handleChange,
    countries,
    setRating,
    rating,
    color,
    size,
    onChangeSearch,
    departments,
    cities,
    setName,
    names,
    loading,
    handleDelete,
    // filtro
    handleChangeClick,
    onClickClear,
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
    const handleClickModal = index => {
        setModal(index === modal ? true : index)
    }
    // const columns = [
    //     { name: 'Nombres y Apellidos' },
    //     { name: 'CC', accessor: 'user.userprofile.up_ideNum' },
    //     { name: 'Monto solicitado', accessor: 'mr_retire', render: () => `$ ${ numberFormat(423432) }` },
    //     { name: 'Monto solicitado', accessor: 'mr_retire', render: () => `$ ${ numberFormat(423432) }` },
    //     { name: 'Medio de pago', accessor: 'userbankentity.typebank.tb_name' },
    //     { name: 'Tipo de cuenta', accessor: 'userbankentity.accounttype.at_name' },
    //     { name: 'N° de cuenta', accessor: 'userbankentity.ube_accNum' },
    // ]
    // const count = 100
    return (<div>
        {loading && <LoadingBabel />}
        <Container>
            <CardOne state={stateCard}>
                <FormProducts onSubmit={handleRegister}>
                    <InputHook label='Nombre del producto'
                        type="text"
                        placeholder="Nombre del producto"
                        value={names}
                        name='pName'
                        required
                        onChange={e => setName(e.target.value)}
                        range={{ min: 0, max: 180 }}
                    />
                    <InputHook label='ProPrice'
                        value={numberFormat(values.ProPrice)}
                        name='ProPrice'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Descuento'
                        value={values.ProDescuento}
                        name='ProDescuento'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Unidades Disponibles'
                        value={values.ProUniDisponibles}
                        name='ProUniDisponibles'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Producto Protegido'
                        value={values.ProProtegido}
                        name='ProProtegido'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHook label='Garantia'
                        value={values.ProAssurance}
                        name='ProAssurance'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <>
                        <Rate rating={rating} onRating={rate => setRating(rate)} size={20} value={values.rating} />
                        <img />
                        <InputHook label='Ancho'
                            value={values.Width}
                            name='Width'
                            onChange={handleChange}
                            numeric
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Alto'
                            value={values.Height}
                            name='Height'
                            onChange={handleChange}
                            numeric
                            range={{ min: 0, max: 180 }} />
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
                        <InputHook label='Cantidad # Disponible'
                            value={values.Cantidad}
                            name='Cantidad'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Destacado'
                            value={values.Destacado}
                            name='Destacado'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Envio gratis?'
                            value={values.IstFree}
                            name='IstFree'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHook label='Voltaje'
                            value={values.ProVoltaje}
                            name='ProVoltaje'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <NewSelect
                            name='colorId'
                            options={color}
                            id='colorId'
                            onChange={handleChange}
                            optionName='colorName'
                            value={values?.colorId}
                            title='Color'
                        />
                        <NewSelect
                            name='sizeId'
                            options={size}
                            id='sizeId'
                            onChange={handleChange}
                            optionName='sizeName'
                            value={values?.sizeId}
                            title='Talla' />
                        <NewSelect
                            name='countryId'
                            options={countries}
                            id='cId'
                            onChange={onChangeSearch}
                            optionName='cName'
                            value={values?.countryId}
                            title='País' />
                        <NewSelect
                            name='dId'
                            options={departments}
                            id='dId'
                            onChange={onChangeSearch}
                            optionName='dName'
                            value={values?.dId}
                            title='Departamento' />
                        <NewSelect
                            name='ctI d'
                            options={cities}
                            id='ctId'
                            onChange={handleChange}
                            optionName='cName'
                            value={values?.ctId}
                            title='Ciudad' />
                        {/* <TextAreaHooks
                            title='Description'
                            value={values.ProDescription}
                            name='ProDescription'
                            onChange={handleChange}
                            range={{ min: 0, max: 7000 }}
                            showRange
                        /> */}
                        <Text size='30px'>Registra el producto en una categoria</Text>
                        <SliderCategoryUpdate duration={'500ms'} dataCategories={dataCategories} handleChangeClick={handleChangeClick} />
                        <div>
                            <Text>Agregar Características principales</Text>
                            {/* {ReactDOM.createPortal(<>
                                <AwesomeModal
                                    show={modal}
                                    title={'Selecciona una característica para el producto'}
                                    backdrop
                                    onCancel={() => setModal(false)}
                                    onHide={() => setModal(false)}
                                    btnConfirm={false}
                                    header={false}
                                    footer={false}
                                    padding='20px'
                                    size='large'
                                >
                                    <div>
                                        {modal === 1 ? <CustomSlider handleAddFeature={handleAddFeature} autoPlayTime={4000} state={state} dispatch={dispatch} duration={'500ms'} datafatures={datafatures} /> :
                                            <FeaturesProducts />
                                        }
                                    </div>
                                </AwesomeModal>
                            </>, document.getElementById('root')
                            )} */}
                        </div>
                    </>
                    <RippleButton type="button" margin='20px auto' onClick={() => handleClickModal(1)} widthButton='100%' bgColor={SEGColor}> <Label>Características principales</Label></RippleButton>
                    <RippleButton type="button" margin='20px auto' onClick={() => handleClickModal(2)} widthButton='100%' bgColor={PVColor}> <Label>Registrar Características principales</Label></RippleButton>
                    <RippleButton widthButton='100%' margin='20px auto' type='submit' bgColor={APColor}>Subir</RippleButton>
                </FormProducts>
            </CardOne>
            <i style={{ position: 'relative' }}>
                <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
            </i>
            <Card state={stateCard} bgColor='#ededed'>
                <ViewProducts
                    features={features}
                    valuesP={'name'}
                    Country={countries}
                    price={values?.ProPrice}
                    desc={values?.ProDescuento}
                    PCant={values?.ProUniDisponibles}
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
                        label={`${ data[0]?.ProPrice }`}
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
                    <RippleButton onClick={()=> onClickSearch()} bgColor={PVColor}>Buscar</RippleButton>
                    <Range min={1962} max={2018} value={2018} label="Year" />
                </CardProduct>
                <CardProduct>
                    <SliderCategory duration={'500ms'} dataCategories={dataCategories} handleChangeClick={handleChangeClick} />
                    <RippleButton margin='5px 30px 30px 30px' onClick={()=> onClickSearch()} bgColor={PVColor}>Buscar</RippleButton>
                </CardProduct>
                <CardProduct>
                    {dataCategories?.length}
                    <RippleButton margin='5px 30px 30px 30px' onClick={()=> onClickSearch()} bgColor={PVColor}>Buscar</RippleButton>
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
                <ItemFilter onClick={()=> onClickClear()}>Limpio</ItemFilter>
            </ContainerFilter>
            <SliderAreas autoPlayTime={4000} duration={'500ms'} finalDataAreas={finalDataAreas} />
            <ContainerCardProduct grid={grid}>
                <div>
                    <ItemFilter>{data.length ? `${ data.length } Productos` : 'No hay productos'}</ItemFilter>
                    <ItemFilter>{dataFree.length ? `${ dataFree.length } Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
                </div>
                {!data?.length ? <SkeletonP /> : data?.map(product => (
                    <CardProduct grid={grid} key={product.pId} >
                        <ButtonCard grid={grid} onClick={() => handleDelete(product.pId)}>
                            <IconDelete size={20} color={PColor} />
                            <ActionName >
                                Eliminar
                            </ActionName>
                        </ButtonCard>
                        <ButtonCard grid={grid} delay='.1s'top={'80px'}>
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
            <ReadMore onClick={() => setShowMore(s => s + 5)}>'Cargar Más' </ReadMore>
            {/* <ReactTable
                data={data}
                collapse
                nowrap
                columns={columns}
                // selectable
                loading={loading}
                isDisabled={x => x.register}
                orderable
                collapse
                resizable
                nowrap
                serverSideRender
                searchable={true}
                serverSideRender
                isDisabled={x => x.register}
                length={count}
                loading={loading}
                // onFetch={(page, length, search) => fetchData(length * (page - 1), length, search)}
                caption={<h2>Historial de transacciones</h2>}
            /> */}
        </ContentProducts>
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