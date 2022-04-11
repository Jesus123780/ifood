import React, { useContext, useEffect, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { BGColor, PColor, APColor } from '../../public/colors'
import { Loading } from '../../components/Loading'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container, Text, Wrapper, CardProductsContent, CardProductsModal, Flex, DisRestaurant, ContentInfo, HeadSticky, ContentImage, TooltipCardProduct, WrapperCard } from './styled'
import { useFormTools } from '../../components/BaseForm'
import { Food } from '../update/Products/food'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_EXTRA_PRODUCT } from './queries'
// import { ScheduleTimings } from './ScheduleTimings'
// import { ManageCategories } from './manageCategories'
import { AddEmployee } from '../searchAddTeam'
import { ContainerFilter, ItemFilter } from '../../components/Update/Products/styled'
import { ButtonAction, WrapperOptions, ContentSearch, Title, ContainerCarrusel } from './styledStore'
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ONE_PRODUCTS_FOOD } from '../producto/queries'
import { ExtrasProductsItems, OptionalExtraProducts } from '../producto/extras'
import { ExtraProducts } from '../Extraproducts'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_PRODUCT_FOOD } from '../update/Products/queries'
import { Context } from 'context/Context'
import moment from 'moment'
import { GET_ALL_PRODUCT_STORE, GET_ONE_SCHEDULE_STORE } from './queriesStore'
import { useStore } from 'components/hooks/useStore'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { ManageCategories } from './ManageCategories'
import { Managebanner } from './profile/Managebanner'
import { Sticky, StickyBoundary, StickyViewport } from './stickyheader';
import { IconDelete, IconEdit, IconCategories } from 'public/icons'
import { numberFormat } from 'utils'

const DashboardStore = () => {
    // STATE
    const { openSchedule, setOpenSchedule, setAlertBox } = useContext(Context)
    // const StoreId = location.query?.name[1]
    // eslint-disable-next-line no-unused-vars
    const [handleChange, _handleSubmit, _setDataValue, { dataForm, errorForm }] = useFormTools()
    const SHOW_MODAL_UPDATE_PRODUCTS = useSetState(false)
    const SHOW_MANAGE_CATEGORIES = useSetState(false)
    const SHOW_MANAGE_EMPLOYEE = useSetState(false)
    // eslint-disable-next-line no-unused-vars
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
    // eslint-disable-next-line no-unused-vars
    const [search, setSearch] = useState('')
    const [table, openTable] = useState(false)
    const [dataProCat, setData] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [showMore, setShowMore] = useState(5)
    const [modal, setModal] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [hour, setHour] = useState(null)
    const [day, setDay] = useState()
    const SET_OPEN_PRODUCT = useSetState(false)

    const containerStyle = {
        height: '100vh',
        // overflowY: 'auto',
    };
    // QUERY
    const [getCatProductsWithProduct, { data: dataProductAndCategory, loading: loadCatPro }] = useLazyQuery(GET_ALL_CATEGORIES_WITH_PRODUCT, {
        fetchPolicy: 'network-only',
        variables:
        {
            search,
            gender: searchFilter?.gender,
            desc: searchFilter?.desc,
            categories: searchFilter?.speciality,
        }
    })

    // QUERIES
    // eslint-disable-next-line no-unused-vars
    const { data: dataSchedule } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day } })
    // eslint-disable-next-line no-unused-vars
    const { data: dataScheduleTomorrow } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day + 1 } })
    const [store] = useStore()
    const [productFoodsOne, { data: dataProduct, loading }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
    const [ExtProductFoodsOptionalAll, { data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
    const router = useRouter()
    const { name } = router.query
    // HANDLE
    const handleGetOneProduct = (food) => {
        router.replace(`/dashboard/${name[0]}/${name[1]}/?modal=true`)
        try {
            SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
            productFoodsOne({ variables: { pId: food.pId } })
            ExtProductFoodsOptionalAll({ variables: { pId: food.pId } })
            ExtProductFoodsAll({ variables: { pId: food.pId } }).then(() => setAlertBox({ message: 'success' })).catch(() => setAlertBox({ message: 'Lo sentimo no pudimos traer Los sub platos' }))
        } catch (error) {
            setAlertBox({ message: 'Lo sentimos, ocurrió un error' })
        }
    }
    // eslint-disable-next-line no-unused-vars
    const { getStore, pId, carProId, sizeId, colorId, idStore, cId, caId, dId, ctId, tpId, fId, pName, ProPrice, ProDescuento, ProUniDisponibles, ProDescription, ProProtegido, ProAssurance, ProImage, ProStar, ProWidth, ProHeight, ProLength, ProWeight, ProQuantity, ProOutstanding, ProDelivery, ProVoltaje, pState, sTateLogistic, pDatCre, pDatMod, } = dataProduct?.productFoodsOne || {}
    const { storeName } = getStore || {}
    const { storeName: nameStore } = store || {}

    const handleStuck = target => {
        target.style.BorderStyle = 'solid'
        target.style.BorderColor = '#e6e6e6'
        target.style.backgroundColor = PColor
        target.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.14)'
    };
    const handleUnstuck = target => {
        // target.style.backgroundColor = BGColor
        target.style.boxShadow = ''
    };
    const handleChangeLol = ({ target, type }) => {
        if (type === 'stuck') {
            // target.style.backgroundColor = PColor;
            // target.style.BorderBottom = '1px solid'
        } else {
            target.style.backgroundColor = BGColor;
            target.style.BorderBottom = '1px solid'
        }
    };
    // EFFECTS
    useEffect(() => {
        // eslint-disable-next-line no-unsafe-optional-chaining
        dataProductAndCategory?.getCatProductsWithProduct && setData([...dataProductAndCategory?.getCatProductsWithProduct])
    }, [dataProductAndCategory, searchFilter])
    useEffect(() => {
        getCatProductsWithProduct({ variables: { max: showMore } })
    }, [searchFilter, showMore])
    useEffect(() => {
        let date = new Date().getTime()
        let dateDay = new Date().getUTCDay()
        setDay(dateDay)
        setHour(moment(date).format('hh:mm'))
    }, [])

    //     <Link
    //     passHref
    //     shallow
    //     replace
    //     href={{
    //         pathname: `/restaurantes`,
    //         query: { plato: food.pId }
    //     }} >
    //     <a>
    //         <CardProduct food={food} key={food.pId} onClick={() => setOpenProductModal(!openProductModal)} />
    //     </a>
    // </Link>
    // COMPONENTS
    const stickySectionElements = Array.from(dataProCat)?.map((x, key) => {
        return (
            <div key={x.carProId}>
                <StickyBoundary key={key} onStuck={handleStuck} onUnstuck={handleUnstuck} onChange={handleChangeLol} >
                    <Sticky id={key} as='h1' name={x.pName}>
                        <ContentSearch>
                            <Title size='.9em'>{x.pName}</Title>
                        </ContentSearch>
                    </Sticky>
                    <ContainerCarrusel>
                        {x.productFoodsAll.length > 0 ? x.productFoodsAll.map(food => {
                            return (
                                <CardProducts food={food} key={food.pId} setAlertBox={setAlertBox} onClick={() => handleGetOneProduct(food)} />
                            )
                        }) : <div>No hay productos <IconCategories size={30} /></div>}
                    </ContainerCarrusel>
                </StickyBoundary>
            </div>)
    })

    return (<>
        <Wrapper>
            {(loadCatPro || loading) && <Loading />}
            <Container>
                <Managebanner />
                <WrapperOptions>
                    <div>
                        <ButtonAction onClick={() => SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state)}> Subir productos</ButtonAction >
                        <ButtonAction onClick={() => setOpenSchedule(!openSchedule)}> Editar agenda </ButtonAction>
                        <ButtonAction onClick={() => SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state)}> Administrar Categorías</ButtonAction>
                        <ButtonAction onClick={() => SHOW_MANAGE_EMPLOYEE.setState(!SHOW_MANAGE_EMPLOYEE.state)}> Agregar empleados</ButtonAction>
                        <ButtonAction onClick={() => openTable(!table)}> Ver sobre mesa</ButtonAction>
                    </div>
                </WrapperOptions>
                <InputHooks title='Buscar en el menu' required errors={errorForm?.search} value={dataForm?.search} onChange={handleChange} name='search' />
                <StickyViewport as='main' style={containerStyle}>
                    {stickySectionElements}
                </StickyViewport>
            </Container>
            {/* MODALS */}
            <AwesomeModal zIndex='999' backdrop='static' height='100vh' show={SET_OPEN_PRODUCT.state} onHide={() => { SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                <CardProductsModal>
                    <ContentImage>
                        <Image
                            className='store_image'
                            width={450}
                            height={450}
                            objectFit='contain'
                            src={ProImage || '/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                            alt={ProDescription || 'img'}
                            blurDataURL="data:..."
                            placeholder="blur" // Optional blur-up while loading
                        />
                    </ContentImage>
                    <ContentInfo>
                        <HeadSticky>
                            <Text size='1.1em'>{pName}</Text>
                        </HeadSticky>
                        <Text size='14px' margin='20px 0' color='#676464'>{ProDescription}</Text>
                        <Flex>
                            <Text margin='12px 0' size='.875rem' color={APColor}>$ {ProPrice}</Text>
                            <Text margin='12px 0 0 5px' size='14px'>$ {ProDescuento}</Text>
                        </Flex>
                        <DisRestaurant>
                            {store && !!nameStore && <Link
                                passHref
                                shallow
                                replace
                                href={!!store && {
                                    pathname: `${CLIENT_URL_BASE}delivery/${store?.city?.cName?.toLocaleLowerCase()}-${store?.department?.dName?.toLocaleLowerCase()}/${nameStore?.replace(/\s/g, '-')?.toLocaleLowerCase()}/${store.idStore}`,
                                    query: { shared: '' }
                                }} >
                                <a target="_blank">
                                    <Text margin='12px 0 0 5px' size='19px'>$ {storeName}</Text>
                                </a>
                            </Link>}
                            <div className="dish-restaurant__divisor"></div>
                            <label tabIndex="0" className="dish-observation-form__label" >¿Algún comentario?</label>
                        </DisRestaurant>
                        <ExtrasProductsItems
                            pId={pId}
                            setModal={setModal}
                            modal={modal}
                            dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                            dataExtra={dataExtra?.ExtProductFoodsAll || []} />
                    </ContentInfo>
                </CardProductsModal>
                <ContainerFilter>
                    <ItemFilter onClick={() => setModal(!modal)}>Añadir Adicionales</ItemFilter>
                </ContainerFilter>
                <OptionalExtraProducts
                    pId={pId}
                    dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                />
            </AwesomeModal>
            <AwesomeModal backdrop='static' zIndex='888888889' height='100vh' show={SHOW_MODAL_UPDATE_PRODUCTS.state} onHide={() => { SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                {SHOW_MODAL_UPDATE_PRODUCTS.state && <Food />}
            </AwesomeModal>
            <AwesomeModal backdrop='static' zIndex='99390' padding='20px' height='100vh' show={table} onHide={() => openTable(!table)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                {table && <ExtraProducts />}
            </AwesomeModal>
            <AwesomeModal backdrop='static' zIndex='9990' padding='25px' height='100vh' show={SHOW_MANAGE_CATEGORIES.state} onHide={() => { SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state) }} onCancel={() => false} size='100%' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                {SHOW_MANAGE_CATEGORIES.state && <ManageCategories SHOW_MODAL_UPDATE_PRODUCTS={SHOW_MODAL_UPDATE_PRODUCTS} />}
            </AwesomeModal>
            <AwesomeModal zIndex='9990' padding='25px' height='50vh' show={SHOW_MANAGE_EMPLOYEE.state} onHide={() => { SHOW_MANAGE_EMPLOYEE.setState(!SHOW_MANAGE_EMPLOYEE.state) }} onCancel={() => false} size='50%' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                {SHOW_MANAGE_EMPLOYEE.state && <AddEmployee />}
            </AwesomeModal>
        </Wrapper>
    </>
    )
}

export const CardProducts = ({ food, onClick, setAlertBox }) => {
    const router = useRouter()
    const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)
    const handleDelete = product => {
        const { pId, pState, pName } = product || {}
        updateProductFoods({
            variables: {
                input: {
                    pId,
                    pState
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        productFoodsAll(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_PRODUCT_STORE, data: dataOld })
                        }
                    }
                })
                cache.modify({
                    fields: {
                        getCatProductsWithProduct(dataOld = []) {
                            return cache.writeQuery({ query: GET_ALL_CATEGORIES_WITH_PRODUCT, data: dataOld })
                        }
                    }
                })
                setAlertBox({ message: `El producto ${pName} ha sido eliminado`, color: 'error', duration: 7000 })
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 7000 }))
    }
    return (
        <WrapperCard>
            <TooltipCardProduct>
                <button onClick={() => router.push(`/producto/editar/${food.pId}`)}>
                    <IconEdit color={PColor} size={20} />
                </button>
            </TooltipCardProduct>
            <TooltipCardProduct left='50px'>
                <button onClick={() => handleDelete(food)}>
                    <IconDelete color={PColor} size={20} />
                </button>
            </TooltipCardProduct>
            <CardProductsContent onClick={onClick} >
                <div>
                    <h3 className="card__description">{food.pName}</h3>
                    <h3 className="card__description">{food.ProDescription}</h3>
                    <div className='footer'>
                        <span className="card__price">$ {numberFormat(food.ProPrice)}</span>
                        <span className="card__des" style={{ color: APColor }}>$ {numberFormat(food.ProDescuento)}</span>
                    </div>
                </div>
                <Image
                    className='store_image'
                    width={100}
                    height={100}
                    layout='responsive'
                    src={food.ProImage}
                    alt={food.ProDescription || 'img'}
                    blurDataURL="/images/DEFAULTBANNER.png"
                    placeholder="blur"
                />
            </CardProductsContent>
        </WrapperCard>
    );
};
DashboardStore.propTypes = {

}

export default DashboardStore

