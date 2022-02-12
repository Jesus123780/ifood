import { APColor, BGColor, PLColor } from '../../public/colors';
import InputHooks from '../../components/InputHooks/InputHooks';
import CardProduct from './CardProducts';
import Image from 'next/image';
import { AwesomeModal } from '../../components/AwesomeModal';
import { MerchantBannerWrapperInfo, Container, ContainerCarrusel, ContentCategoryProducts, HeadCategory, CardProductsContent, CardProductsModal, ContentInfo, HeadSticky, Text, Flex, DisRestaurant, ActionButton, GarnishChoicesHeader, CardsComponent } from './styled';
import { RippleButton } from '../../components/Ripple';
import { IconMiniCheck, IconPlus } from '../../public/icons';

export const RestaurantProfile = ({ src, name, errorForm, dataForm, handleChange, data, dataCatProducts, SET_OPEN_PRODUCT, setState, getOneProduct, dataOneProduct, dataOptional, handleCountProducts, handleAddProducts, state, increase, decrease }) => {
    const { pName, getStore, ProPrice, ProDescription, ProDescuento, ExtProductFoodsAll } = dataOneProduct || {}
    return (
        <Container>
            <MerchantBannerWrapperInfo bannerImage={src ? `url(${src})` : `url("/images/DEFAULTBANNER.png")`}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><g fillRule="evenodd" transform="translate(1 1)"><path fill={BGColor} fill={BGColor} fillRule="nonzero" d="M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z"></path><rect fill={BGColor} width="20.514" height="1.895" x="15.243" y="35.105" rx=".947"></rect><rect fill={BGColor} width="10.568" height="1.895" x="20.216" y="30.684" rx=".947"></rect><path fill={BGColor} fill={BGColor} fillRule="nonzero" d="M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z"></path><path fill={BGColor} fill={BGColor} fillRule="nonzero" d="M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z"></path><path fill={BGColor} fillRule="nonzero" d="M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z"></path></g></svg>
                </span>
                <div className="merchant-banner__status-description" data-test-id="merchant-banner-status-description">
                    <h2 className="merchant-banner__status-title">{name || data?.storeName}</h2>
                    <h2 className="merchant-banner__status-title">Restaurante  cerrado</h2>
                    {/* <h3 className="merchant-banner__status-message">Abre mañana a las 11:00</h3> */}
                </div>
            </MerchantBannerWrapperInfo>
            <InputHooks required
                placeholder='Buscar en el menu'
                errors={errorForm?.search}
                value={dataForm?.search}
                onChange={handleChange}
                name='search'
            />
            <ContainerCarrusel>
                <div>
                    1
                </div>
                <div>
                    1
                </div>
                <div>
                    1
                </div>
                <div>
                    1
                </div>
            </ContainerCarrusel>
            <ContentCategoryProducts>
                {dataCatProducts ? dataCatProducts?.map(x => {
                    return (
                        <div key={x.carProId}>
                            <HeadCategory>
                                <button onClick={() => { SET_OPEN.setState(!SET_OPEN.state) }}>
                                    <span size='40px'>{x.pName}</span>
                                </button>
                            </HeadCategory>
                            <ContainerCarrusel>
                                {x.productFoodsAll ? x.productFoodsAll.map(food => {
                                    return (
                                        <CardProduct food={food} key={food.pId} onClick={() => getOneProduct(food)} />
                                    )
                                }) : <div>No products</div>}
                            </ContainerCarrusel>
                        </div>
                    )
                }) : <div>Loading</div>}
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
                            alt="Picture"
                            blurDataURL="data:..."
                            placeholder="blur" // Optional blur-up while loading
                        />
                    </div>
                    <ContentInfo>
                        <HeadSticky>
                            <Text size='1.1em'>{pName}</Text>
                            <Text size='1.1em'>Cantidad: {state} </Text>
                        </HeadSticky>
                        <Text size='14px' margin='20px 0' color='#676464'>{ProDescription}</Text>
                        <Flex>
                            <Text margin='12px 0' size='.875rem' color={APColor}>$ {ProPrice}</Text>
                            <Text margin='12px 0 0 5px' size='14px' color={PLColor} style={{ textDecoration: 'line-through' }} >$ {ProDescuento}</Text>
                        </Flex>
                        <DisRestaurant>
                            <Text className='dish-restaurant__header' margin='12px 0' size='14px'> {getStore?.storeName}</Text>
                            <div className="dish-restaurant__divisor"></div>
                            <label tabindex="0" className="dish-observation-form__label" for="observations-form">¿Algún comentario?</label>
                        </DisRestaurant>
                        <InputHooks
                            required
                            TypeTextarea
                            errors={errorForm?.search}
                            value={dataForm?.search}
                            onChange={handleChange}
                            name='search'
                        />
                        {ExtProductFoodsAll?.length > 0 && <GarnishChoicesHeader>
                            <div>
                                <p className="garnish-choices__title">Adicionales</p>
                                <p className="garnish-choices__title-desc">Escoge hasta opciones.</p>
                            </div>
                            <IconMiniCheck size={'15px'} color={'#009b3a'} />
                        </GarnishChoicesHeader>}
                        {ExtProductFoodsAll?.map(extra => (
                            <CardsComponent key={extra.exPid}>
                                <div>
                                    <h3 className="title_card">{extra.extraName}</h3>
                                    <h3 className="price"> $ {extra.extraPrice}</h3>
                                </div>
                                <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => console.log(extra)} >
                                </RippleButton>
                            </CardsComponent>
                        ))}
                        {dataOptional?.map(itemOptional => (
                            <div>
                                <GarnishChoicesHeader key={itemOptional.opExPid}>
                                    <div>
                                        <p className="garnish-choices__title">{itemOptional.OptionalProName}</p>
                                        <p className="garnish-choices__title-desc">Escoge hasta {itemOptional.numbersOptionalOnly} opciones.</p>
                                    </div>
                                    <IconMiniCheck size={'15px'} color={'#009b3a'} />
                                </GarnishChoicesHeader>
                                {itemOptional?.ExtProductFoodsSubOptionalAll?.map(x => (
                                    <CardsComponent key={x.exPid}>
                                        <div>
                                            <h3 className="title_card">{x.OptionalSubProName}</h3>
                                        </div>
                                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => console.log(x)} >
                                        </RippleButton>
                                    </CardsComponent>

                                ))}
                            </div>
                        ))}
                    </ContentInfo>
                    <div />
                    <ActionButton>
                        <div>
                            <RippleButton color={BGColor} onClick={() => decrease()}>-</RippleButton>
                            <RippleButton color={BGColor}> {handleCountProducts(ProPrice, state)}</RippleButton>
                            <RippleButton color={BGColor} onClick={() => increase()}><IconPlus size='15px' color={BGColor} /></RippleButton>
                        </div>
                        <RippleButton color={BGColor} onClick={() => handleAddProducts(dataOneProduct)}>Agregar</RippleButton>
                    </ActionButton>
                </CardProductsModal>
            </AwesomeModal>
        </Container>);
};
