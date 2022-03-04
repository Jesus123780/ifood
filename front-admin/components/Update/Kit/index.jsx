import ReactDOM from 'react-dom'
import { useState } from 'react';
import { Rate } from '../../Rate';
import NewSelect from '../../NewSelectHooks/NewSelect'
import { numberFormat } from '../../../utils';
import { RippleButton } from '../../Ripple';
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
    ContainerFilter,
    ItemFilter,
    ContainerBurger
} from './styled';
import { Skeleton } from '../../Skeleton/SkeletonCard';
import { IconArrowRight, IconDelete, IconEdit, IconLove } from '../../../public/icons';
import { APColor, PColor, PVColor, SEGColor } from '../../../public/colors';
import InputHooks from '../../InputHooks/InputHooks';

export const Kit = ({
    datafatures,
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
        <Container>
            <CardOne state={stateCard}>
                <FormProducts onSubmit={handleRegister}>
                    <InputHooks label='Nombre del producto'
                        type="text"
                        placeholder="Nombre del producto"
                        value={names}
                        name='pName'
                        required
                        onChange={e => setName(e.target.value)}
                        range={{ min: 0, max: 180 }}
                    />
                    <InputHooks label='ProPrice'
                        value={numberFormat(values.ProPrice)}
                        name='ProPrice'
                        required
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHooks label='Descuento'
                        value={values.ProDescuento}
                        name='ProDescuento'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHooks label='Unidades Disponibles'
                        value={values.ProUniDisponibles}
                        name='ProUniDisponibles'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHooks label='Producto Protegido'
                        value={values.ProProtegido}
                        name='ProProtegido'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <InputHooks label='Garantia'
                        value={values.ProAssurance}
                        name='ProAssurance'
                        onChange={handleChange}
                        range={{ min: 0, max: 180 }} />
                    <>
                        <Rate rating={rating} onRating={rate => setRating(rate)} size={20} value={values.rating} />
                        <img />
                        <InputHooks label='Ancho'
                            value={values.Width}
                            name='Width'
                            onChange={handleChange}
                            numeric
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Alto'
                            value={values.Height}
                            name='Height'
                            onChange={handleChange}
                            numeric
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Largo'
                            value={values.ProLength}
                            name='ProLength'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Peso'
                            value={values.ProWeight}
                            name='ProWeight'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Cantidad # Disponible'
                            value={values.Cantidad}
                            name='Cantidad'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Destacado'
                            value={values.Destacado}
                            name='Destacado'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Envio gratis?'
                            value={values.IstFree}
                            name='IstFree'
                            onChange={handleChange}
                            range={{ min: 0, max: 180 }} />
                        <InputHooks label='Voltaje'
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

        </Container>
    </div>
    )
}
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