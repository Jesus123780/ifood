import { AwesomeModal } from 'components/AwesomeModal'
import React from 'react'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { Card, CardProductsModal, ContentInfo, DisRestaurant, Flex, HeadSticky, Text, GarnishChoicesHeader } from './styled'
import Image from 'next/image'
import { APColor, PLColor } from 'public/colors'
import { numberFormat } from 'utils'
import { useStore } from 'components/hooks/useStore'
import Link from 'next/link'

export const GetOneSales = ({ setOpen, open, data }) => {
    const { getAllPedidoStore } = data
    const [dataStore, { loading: LoadingRes }] = useStore()
    return (
        <AwesomeModal backdrop='static' zIndex='99390' padding='20px' height='60vh' show={open} onHide={() => { setOpen(!open) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} >
            {getAllPedidoStore && getAllPedidoStore?.map(p => {
                const { getAllShoppingCard } = p || {}
                const { productFood, comments } = getAllShoppingCard || {}
                return (
                    <div key={p.ShoppingCard}>
                        <Card>
                            <CardProductsModal>
                                <Image
                                    className='store_image'
                                    width={250}
                                    height={250}
                                    objectFit='contain'
                                    src={'/images/hamb.jpg'}
                                    alt="Picture"
                                    blurDataURL="data:..."
                                    placeholder="blur" // Optional blur-up while loading
                                />
                                <ContentInfo>
                                    <HeadSticky>
                                        <Text size='1.9em'>{p?.getAllShoppingCard?.productFood?.pName}</Text>
                                        <Text size='1.5em'>Cantidad: {p.getAllShoppingCard.cantProducts} </Text>
                                    </HeadSticky>
                                    <Text size='14px' margin='20px 0' color='#676464'>{p?.getAllShoppingCard?.productFood?.ProDescription}</Text>
                                    <Flex>
                                        <Text margin='12px 0' size='.875rem' color={APColor}>$ {numberFormat(p?.getAllShoppingCard?.productFood.ProPrice)}</Text>
                                        <Text margin='12px 0 0 5px' size='14px' color={PLColor} style={{ textDecoration: 'line-through' }} >$ {numberFormat(p?.getAllShoppingCard?.productFood.ProDescuento)}</Text>
                                    </Flex>{console.log(p)}
                                    <DisRestaurant>
                                        {dataStore && <Link
                                            passHref
                                            shallow
                                            replace
                                            href={{
                                                pathname: `${CLIENT_URL_BASE}delivery/${dataStore?.city?.cName?.toLocaleLowerCase()}-${dataStore?.department?.dName?.toLocaleLowerCase()}/${dataStore.storeName.replace(/\s/g, '-').toLocaleLowerCase()}/${dataStore.idStore}`,
                                            }} >
                                            <a target="_blank">
                                                <Text margin='12px 0 0 5px' size='19px'>$ {dataStore.storeName}</Text>
                                            </a>
                                        </Link>}
                                        <div className="dish-restaurant__divisor"></div>
                                        <label tabIndex="0" className="dish-observation-form__label" >¿Algún comentario?</label>
                                    </DisRestaurant>
                                    <DisRestaurant>
                                        <Text size='1.4'>{p?.getAllShoppingCard.comments}</Text>
                                    </DisRestaurant>
                                    {0 > 0 && <GarnishChoicesHeader>
                                        <div>
                                            <p className="garnish-choices__title">Adicionales</p>
                                            <p className="garnish-choices__title-desc">Escoge hasta opciones.</p>
                                        </div>
                                        {/* <IconMiniCheck size={'15px'} color={'#009b3a'} /> */}
                                    </GarnishChoicesHeader>}
                                    {/* {ExtProductFoodsAll?.map(extra => (
                                            <CardsComponent key={extra.exPid}>
                                                <div>
                                                    <h3 className="title_card">{extra.extraName}</h3>
                                                    <h3 className="price"> $ {extra.extraPrice}</h3>
                                                </div>
                                                <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => console.log(extra)} >
                                                </RippleButton>
                                            </CardsComponent>
                                        ))} */}
                                    {![1, 2, 4]?.map(itemOptional => (
                                        <div>
                                            <GarnishChoicesHeader key={itemOptional?.opExPid}>
                                                <div>
                                                    <p className="garnish-choices__title">{itemOptional?.OptionalProName}</p>
                                                    <p className="garnish-choices__title-desc">Escoge hasta {itemOptional?.numbersOptionalOnly} opciones.</p>
                                                </div>
                                                {/* <IconMiniCheck size={'15px'} color={'#009b3a'} /> */}
                                            </GarnishChoicesHeader>
                                            {itemOptional?.ExtProductFoodsSubOptionalAll?.map(x => (
                                                <CardsComponent key={x.opSubExPid}>
                                                    <div>
                                                        <h3 className="title_card">{x.OptionalSubProName}</h3>
                                                    </div>
                                                    <input name='subOptional' value={x?.opSubExPid} type="checkbox" id="cat" onChange={handleChangeClickOnTable} />
                                                    <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => console.log(x)} >
                                                    </RippleButton>
                                                </CardsComponent>

                                            ))}
                                        </div>
                                    ))}
                                </ContentInfo>
                                <div />
                            </CardProductsModal>
                        </Card>
                    </div>
                )
            })}
        </AwesomeModal>
    )
}
