import { APColor, BGColor, PColor, PLColor, WColor } from '../../public/colors';
import InputHooks from '../../components/InputHooks/InputHooks';
import CardProduct from './CardProducts';
import Image from 'next/image'
import { AwesomeModal } from '../../components/AwesomeModal';
import { RippleButton } from '../../components/Ripple';
import Link from 'next/link'
import { IconLove, IconMiniCheck, IconPlus, IconLike, IconDisLike, IconTicker, IconRate, IconLoveFill, IconWhatsApp, IconFacebook, IconTwitter, IconEnlace } from '../../public/icons';
import { Sticky, StickyBoundary, StickyViewport } from './stickyheader';
import ScrollNav from '../../components/hooks/useScrollNav';
import { useEffect, useRef, useState } from 'react';
import { GET_ONE_SCHEDULE_STORE } from '../queries';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { MerchantBannerWrapperInfo, Container, ContainerCarrusel, ContentCategoryProducts, HeadCategory, CardProductsContent, CtnItemFilter, CardProductsModal, ContentInfo, HeadSticky, Text, Flex, DisRestaurant, ActionButton, GarnishChoicesHeader, CardsComponent, ContentSearch, ButtonLike, CardItemRating, Title, ContentShare, ContainerShare } from './styled';
import { Story } from '../story';
import { Rate } from '../../components/Rate';
import { copyToClipboard, numberFormat } from 'utils';
import QRCode from 'react-qr-code';
import { FetchMoreInteractions } from 'components/hooks';
import { Loading } from 'components/Loading';
export const RestaurantProfile = ({ src, more, setMore, id, dataProductAndCategory, errorForm, fetchMore, handlerShare, share, setShare, dataMinPedido, stars, rGoodTemperature, rTasty, appearance, setRatingState, setRatingStar, dataRating, rating, rGoodCondition, handleGetRating, setGoodCondition, setTasty, setGoodTemperature, SetAppearance, RemoveFav, like, setLike, dataForm, handleChange, handleRating, addFav, dataOneFav, data, dataCatProducts, refs, refInterSection, SET_OPEN_PRODUCT, setState, getOneProduct, dataOneProduct, dataOptional, handleCountProducts, handleAddProducts, state, increase, decrease, handleChangeClickOnTable }) => {
    const { pName, getStore, ProPrice, ProDescription, ProDescuento, ExtProductFoodsAll } = dataOneProduct || {}
    const { fState } = dataOneFav
    const containerStyle = {
        height: '100vh',
        // overflowY: 'auto',
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
    const handleUnstuck = target => {
        // target.style.backgroundColor = BGColor
        target.style.boxShadow = ''
    };
    const handleStuck = target => {
        // target.style.BorderStyle = 'solid'
        // target.style.BorderColor = '#e6e6e6'
        // target.style.backgroundColor = PColor
        target.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.14)'
    };
    const section1Ref = useRef()
    const stickySectionElements = Array.from(dataCatProducts)?.map((x, key) => {
        return (
            <div>
                <StickyBoundary key={key} onStuck={handleStuck} onUnstuck={handleUnstuck} onChange={handleChangeLol} >
                    <Sticky id={key} ref={x.section1Ref} as='h1' name={x.pName}>
                        <ContentSearch>
                            <Title size='.9em'>{x.pName}</Title>
                        </ContentSearch>
                    </Sticky>
                    <ContainerCarrusel  >
                        {x.productFoodsAll ? x.productFoodsAll.map(food => {
                            return (
                                <CardProduct food={food} key={food.pId} onClick={() => getOneProduct(food)} />
                            )
                        }) : <div>No products</div>}
                    </ContainerCarrusel>
                </StickyBoundary>
                {/* {key === dataCatProducts.length - 1 && <FetchMoreInteractions fetchMore={key === dataCatProducts.length - 1} callback={() => {
                    // setMore(s => s + 5)
                    fetchMore({
                        variables: { max: 10, min: 0 },
                        updateQuery: (prevResult, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prevResult
                            let getCatProductsWithProductClient = [...prevResult.getCatProductsWithProductClient]
                            return {
                                getCatProductsWithProductClient: [...fetchMoreResult.getCatProductsWithProductClient]

                            }
                        }
                    })

                }} render={<Loading />} />} */}
                <ScrollNav navHeader={Nav || []} />
            </div>)
    }
    );
    const Nav = dataCatProducts?.map((x, key) => { return { headerTitle: x.pName, headerID: `${key}`, headerRef: section1Ref } })
    const [hour, setHour] = useState(null)
    const [day, setDay] = useState()
    const [open, setOpen] = useState(false)
    const { data: dataSchedule, loading: loadTime } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day, idStore: id } })
    const { data: dataScheduleTomorrow } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day, idStore: id } })
    useEffect(() => {
        let date = new Date().getTime()
        let dateDay = new Date().getUTCDay()
        setDay(dateDay)
        setHour(moment(date).format('hh:mm'))
        const { getOneStoreSchedules } = dataSchedule || {}
        const { schDay, schHoEnd, schHoSta } = getOneStoreSchedules || {}
        let endTime = moment(`${schHoEnd}:00`, 'HH:mm:ss').format('hh:mm')
        let starTime = moment(`${schHoSta}:00`, 'HH:mm:ss').format('hh:mm')
        if (moment(starTime).isAfter(endTime)) {
            setOpen(true)
        }
    }, [dataSchedule, dataScheduleTomorrow])
    const [OpenRate, setOpenRate] = useState(false)
    const au = useRef()
    const inputRef = useRef(null);
    return (
        <Container>
            {/* <button onClick={() => au.current.play()}>Click</button>
            <button onClick={() => au.current.pause()}>Pause</button> */}
            <audio id='a1' ref={au}>
                <source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' type='audio/mpeg' />
                Your browser does not support the audio element.
            </audio>
            <StickyViewport as='main' style={containerStyle}>
                <MerchantBannerWrapperInfo bannerImage={src ? `url(${src})` : `url('/images/DEFAULTBANNER.png')`}>
                    <span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='53' height='53' viewBox='0 0 53 53'><g fillRule='evenodd' transform='translate(1 1)'><path fill={BGColor} fillRule='nonzero' d='M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z'></path><rect fill={BGColor} width='20.514' height='1.895' x='15.243' y='35.105' rx='.947'></rect><rect fill={BGColor} width='10.568' height='1.895' x='20.216' y='30.684' rx='.947'></rect><path fill={BGColor} fillRule='nonzero' d='M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z'></path><path fill={BGColor} fillRule='nonzero' d='M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z'></path><path fill={BGColor} fillRule='nonzero' d='M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z'></path></g></svg>
                    </span>
                    <div className='merchant-banner__status-description' data-test-id='merchant-banner-status-description'>
                        <h2 className='merchant-banner__status-title'>{data?.storeName}</h2>
                        <h2 className='merchant-banner__status-title'>{open && 'Restaurante  cerrado'}</h2>
                        <h3 className='merchant-banner__status-message'>{open ? `Abre mañana a las ${dataScheduleTomorrow?.getOneStoreSchedules?.schHoSta}` : null}</h3>
                    </div>
                </MerchantBannerWrapperInfo>
                <ContentSearch>
                    <Flex>
                        <span>
                            <img className='store_image' src={data.Image} />
                            <Flex>
                                <Title>{data?.storeName}</Title>
                                <IconRate color={WColor} size={30} />
                                <Text size='20px'>{stars}</Text>
                            </Flex>
                        </span>
                        {!!dataMinPedido && <Text size='15px' margin='0 10px'>Pedido mínimo $ {dataMinPedido}</Text>}
                    </Flex>
                    <div>
                        <ButtonLike isLiked={fState === 1} onClick={() => fState === 1 ? RemoveFav(data?.idStore, fState) : addFav(data?.idStore)}>
                        </ButtonLike>
                    </div>
                    <button onClick={() => { setOpenRate(!OpenRate), handleGetRating(id) }}><Text>Calificar Restaurante</Text> </button>
                    <Story idStore={id} />
                    <AwesomeModal zIndex='999' padding='20px' show={OpenRate} onHide={() => setOpenRate(!OpenRate)} onCancel={() => setOpenRate(!OpenRate)} size='medium' header={false} footer={false} borderRadius='10px'>
                        <Text>Calificar Restaurante</Text>
                        <Flex>
                            <CardItemRating>
                                <Text>Buen sabor</Text>
                                <CtnItemFilter >
                                    <IconTicker size='30px' />
                                </CtnItemFilter>
                                <div className='option'>
                                    <button onClick={() => setTasty(1)}>
                                        <IconLike size='30px' />
                                    </button>
                                    {rTasty}
                                    <button onClick={() => setTasty(0)}>
                                        <IconDisLike size='30px' />
                                    </button>
                                </div>
                            </CardItemRating>
                            <CardItemRating>
                                <Text>Buena apariencia</Text>
                                <CtnItemFilter >
                                    <IconTicker size='30px' />
                                </CtnItemFilter>

                                <div className='option'>
                                    <button onClick={() => SetAppearance(1)}>
                                        <IconLike size='30px' />
                                    </button>
                                    {appearance}
                                    <button onClick={() => SetAppearance(0)}>
                                        <IconDisLike size='30px' />
                                    </button>
                                </div>
                            </CardItemRating>
                            <CardItemRating>
                                <Text>Buena temperatura</Text>
                                <CtnItemFilter >
                                    <IconTicker size='30px' />
                                </CtnItemFilter>

                                <div className='option'>
                                    <button onClick={() => setGoodTemperature(1)}>
                                        <IconLike size='30px' />
                                    </button>
                                    {rGoodTemperature}
                                    <button onClick={() => setGoodTemperature(0)}>
                                        <IconDisLike size='30px' />
                                    </button>
                                </div>
                            </CardItemRating>
                            <CardItemRating>
                                <Text>Buenas condiciones</Text>
                                <CtnItemFilter >
                                    <IconTicker size='30px' />
                                </CtnItemFilter>

                                <div className='option'>
                                    <button onClick={() => setGoodCondition(1)}>
                                        <IconLike size='30px' />
                                    </button>
                                    {rGoodCondition}
                                    <button onClick={() => setGoodCondition(0)}>
                                        <IconDisLike size='30px' />
                                    </button>
                                </div>
                            </CardItemRating>

                        </Flex>
                        <Rate rating={rating} onRating={rate => {
                            setRatingState(rate)
                            setRatingStar({
                                variables: {
                                    data: {
                                        idStore: id,
                                        rScore: rate
                                    }
                                }
                            })
                        }} size={20} />
                        <RippleButton widthButton='100%' margin='0px' padding='0px' onClick={() => handleRating(id)} color={BGColor}>Subir</RippleButton>
                    </AwesomeModal>
                    <InputHooks required placeholder='Buscar en el menu' errors={errorForm?.search} value={dataForm?.search} onChange={handleChange} name='search' />
                </ContentSearch>
                <ContainerCarrusel>
                </ContainerCarrusel>
                {stickySectionElements}
            </StickyViewport>
            <ContentCategoryProducts>
            </ContentCategoryProducts>
            <AwesomeModal zIndex='999' padding='20px' show={SET_OPEN_PRODUCT.state} onHide={() => { SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state), setState(1) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <CardProductsModal>
                    <div>
                        <Image
                            className='store_image'
                            width={450}
                            height={450}
                            objectFit='contain'
                            src={'/images/hamb.jpg'}
                            alt='Picture'
                            blurDataURL='data:...'
                            placeholder='blur' />
                    </div>
                    <ContentInfo>
                        <HeadSticky>
                            <Text size='1.1em'>{pName}</Text>
                            <Text size='1.1em'>Cantidad: {state} </Text>
                        </HeadSticky>
                        <Text size='14px' margin='20px 0' color='#676464'>{ProDescription}</Text>
                        <Flex>
                            <Text margin='12px 0' size='.875rem' color={APColor}>$ {numberFormat(ProPrice)}</Text>
                            <Text margin='12px 0 0 5px' size='14px' color={PLColor} style={{ textDecoration: 'line-through' }} >$ {numberFormat(ProDescuento)}</Text>
                        </Flex>
                        <DisRestaurant>
                            <Text className='dish-restaurant__header' margin='12px 0' size='14px'> {getStore?.storeName}</Text>
                            <div className='dish-restaurant__divisor'></div>
                            <label tabIndex='0' className='dish-observation-form__label' for='observations-form'>¿Algún comentario?</label>
                        </DisRestaurant>
                        <InputHooks required TypeTextarea errors={errorForm?.comments} value={dataForm?.comments} onChange={handleChange} name='comments' />
                        {ExtProductFoodsAll?.length > 0 && <GarnishChoicesHeader>
                            <div>
                                <p className='garnish-choices__title'>Adicionales</p>
                                <p className='garnish-choices__title-desc'>Escoge hasta opciones.</p>
                            </div>
                            <IconMiniCheck size={'15px'} color={'#009b3a'} />
                        </GarnishChoicesHeader>}
                        {ExtProductFoodsAll?.map(extra => (
                            <CardsComponent key={extra.exPid}>
                                <div>
                                    <h3 className='title_card'>{extra.extraName}</h3>
                                    <h3 className='price'> $ {extra.extraPrice}</h3>
                                </div>
                                <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type='button' onClick={() => console.log(extra)} >
                                </RippleButton>
                            </CardsComponent>
                        ))}
                        {dataOptional?.map(itemOptional => (
                            <div>
                                <GarnishChoicesHeader key={itemOptional.opExPid}>
                                    <div>
                                        <p className='garnish-choices__title'>{itemOptional.OptionalProName}</p>
                                        <p className='garnish-choices__title-desc'>Escoge hasta {itemOptional.numbersOptionalOnly} opciones.</p>
                                    </div>
                                    <IconMiniCheck size={'15px'} color={'#009b3a'} />
                                </GarnishChoicesHeader>
                                {itemOptional?.ExtProductFoodsSubOptionalAll?.map(x => (
                                    <CardsComponent key={x.opSubExPid}>
                                        <div>
                                            <h3 className='title_card'>{x.OptionalSubProName}</h3>
                                        </div>
                                        <input name='subOptional' value={x?.opSubExPid} type='checkbox' id='cat' onChange={handleChangeClickOnTable} />
                                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type='button' onClick={() => console.log(x)} >
                                        </RippleButton>
                                    </CardsComponent>
                                ))}
                            </div>
                        ))}
                    </ContentInfo>
                    <div>
                        <QRCode value={share || ''} />
                        <ContentShare>
                            compartir
                            <ContainerShare>
                                <div>
                                    <button onClick={() => handlerShare(1)}>Generar Código QR</button>
                                </div>
                                <Flex>
                                    <div className='icon-face'>
                                        <IconFacebook color={BGColor} size='20px' />
                                    </div>
                                    <button onClick={() => handlerShare(2)}>Compartir en Facebook </button>
                                </Flex>
                                <Flex>
                                    <div className='icon-WhatsApp'>
                                        <IconWhatsApp color={BGColor} size='20px' />
                                    </div>
                                    <button onClick={() => handlerShare(3)}> Compartir en WhatsApp</button>
                                </Flex>
                                <Flex>
                                    <div style={{ width: 'min-content' }}>
                                        <IconTwitter color={'#00acee '} size='20px' />
                                    </div>
                                    <button onClick={() => handlerShare(4)}> Compartir en Twitter</button>
                                </Flex>
                                <Flex>
                                    <div style={{ width: 'min-content' }}>
                                        <IconEnlace size='20px' />
                                    </div>
                                    <button onClick={() => copyToClipboard(share)}>Copiar enlace</button>
                                </Flex>
                            </ContainerShare>
                        </ContentShare>
                    </div>
                    <ActionButton>
                        <div>
                            <RippleButton color={BGColor} disabled={state <= 1} onClick={() => decrease()}>-</RippleButton>
                            <RippleButton color={BGColor}> {handleCountProducts(ProPrice, state)}</RippleButton>
                            <RippleButton color={BGColor} onClick={() => increase()}><IconPlus size='15px' color={BGColor} /></RippleButton>
                        </div>
                        <RippleButton color={BGColor} onClick={() => handleAddProducts(dataOneProduct)}>Agregar</RippleButton>
                    </ActionButton>
                </CardProductsModal>
            </AwesomeModal>
        </Container>);
};
