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
    <AwesomeModal
      backdrop='static'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      height='60vh'
      onCancel={() => {return false}}
      onHide={() => { setOpen(!open) }}
      padding='20px'
      show={open}
      size='medium'
      zIndex='99390'
    >
      {getAllPedidoStore && getAllPedidoStore?.map(p => {
        const { getAllShoppingCard } = p || {}
        const { productFood, comments } = getAllShoppingCard || {}
        return (
          <div key={p.ShoppingCard}>
            <Card>
              <CardProductsModal>
                <Image
                  alt='Picture'
                  blurDataURL='data:...'
                  className='store_image'
                  height={250}
                  objectFit='contain'
                  placeholder='blur'
                  src={'/images/hamb.jpg'}
                  width={250} // Optional blur-up while loading
                />
                <ContentInfo>
                  <HeadSticky>
                    <Text size='1.9em'>{p?.getAllShoppingCard?.productFood?.pName}</Text>
                    <Text size='1.5em'>Cantidad: {p.getAllShoppingCard.cantProducts} </Text>
                  </HeadSticky>
                  <Text
                    color='#676464'
                    margin='20px 0'
                    size='14px'
                  >{p?.getAllShoppingCard?.productFood?.ProDescription}</Text>
                  <Flex>
                    <Text
                      color={APColor}
                      margin='12px 0'
                      size='.875rem'
                    >$ {numberFormat(p?.getAllShoppingCard?.productFood.ProPrice)}</Text>
                    <Text
                      color={PLColor}
                      margin='12px 0 0 5px'
                      size='14px'
                      style={{ textDecoration: 'line-through' }}
                    >$ {numberFormat(p?.getAllShoppingCard?.productFood.ProDescuento)}</Text>
                  </Flex>{console.log(p)}
                  <DisRestaurant>
                    {dataStore && <Link
                      href={{
                        pathname: `${CLIENT_URL_BASE}delivery/${dataStore?.city?.cName?.toLocaleLowerCase()}-${dataStore?.department?.dName?.toLocaleLowerCase()}/${dataStore.storeName.replace(/\s/g, '-').toLocaleLowerCase()}/${dataStore.idStore}`
                      }}
                      passHref
                      replace
                      shallow
                    >
                      <a target='_blank'>
                        <Text margin='12px 0 0 5px' size='19px'>$ {dataStore.storeName}</Text>
                      </a>
                    </Link>}
                    <div className='dish-restaurant__divisor'></div>
                    <label className='dish-observation-form__label' tabIndex='0' >¿Algún comentario?</label>
                  </DisRestaurant>
                  <DisRestaurant>
                    <Text size='1.4'>{p?.getAllShoppingCard.comments}</Text>
                  </DisRestaurant>
                  {0 > 0 && <GarnishChoicesHeader>
                    <div>
                      <p className='garnish-choices__title'>Adicionales</p>
                      <p className='garnish-choices__title-desc'>Escoge hasta opciones.</p>
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
                  {![1, 2, 4]?.map(itemOptional => {return (
                    <div>
                      <GarnishChoicesHeader key={itemOptional?.opExPid}>
                        <div>
                          <p className='garnish-choices__title'>{itemOptional?.OptionalProName}</p>
                          <p className='garnish-choices__title-desc'>Escoge hasta {itemOptional?.numbersOptionalOnly} opciones.</p>
                        </div>
                        {/* <IconMiniCheck size={'15px'} color={'#009b3a'} /> */}
                      </GarnishChoicesHeader>
                      {itemOptional?.ExtProductFoodsSubOptionalAll?.map(x => {return (
                        <CardsComponent key={x.opSubExPid}>
                          <div>
                            <h3 className='title_card'>{x.OptionalSubProName}</h3>
                          </div>
                          <input
                            id='cat'
                            name='subOptional'
                            onChange={handleChangeClickOnTable}
                            type='checkbox'
                            value={x?.opSubExPid}
                          />
                          <RippleButton
                            bgColor={'transparent'}
                            margin='0px'
                            onClick={() => {return console.log(x)}}
                            type='button'
                            widthButton='min-content'
                          >
                          </RippleButton>
                        </CardsComponent>

                      )})}
                    </div>
                  )})}
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
