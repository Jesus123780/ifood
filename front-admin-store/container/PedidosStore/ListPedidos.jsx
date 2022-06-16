import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { APColor, BColor, BGColor, BGVColor, PColor, PLColor, SCColor, SECColor, SEGColor, TBGEColor, WColor } from 'public/colors'
import React, { useContext, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import moment from 'moment'
import { useMutation } from '@apollo/client'
import Link from 'next/link'
import { numberFormat, updateCache } from 'utils'
import { FadeOup } from 'components/animations'
import { AwesomeModal } from 'components/AwesomeModal'
import Image from 'next/image'
import { CHANGE_STATE_STORE_PEDIDO, GET_ALL_PEDIDOS } from './queries'
import { Context } from 'context/Context'
import { IconLocationMap } from 'public/icons'
import { useStore } from '../../components/hooks/useStore'
import { CLIENT_URL_BASE } from 'apollo/urls'

export const ListPedidos = ({ data, fetchMore, setMore, more, errorForm, handleChange, dataForm }) => {
  const [modal, setModal] = useState(false)
  const [dataModal, setDataModal] = useState(null)
  const handleOpenModal = elem => {
    setModal(!modal)
    setDataModal(elem)
  }

  return (
    <div>

      <Table
        data={data}
        labelBtn='Product'
        renderBody={(dataB, titles) => {return dataB?.map((x, i) => {return <Section
          columnWidth={titles}
          key={i}
          odd
          padding='10px 0'
        >
          <Item>
            <span> Restaurante</span>
          </Item>
          <Item>
            <span># {x.pCodeRef}</span>
          </Item>
          <Item>
            <span> {moment(x.pDatCre).format('DD/MM/YYYY')} - {moment(x.pDatCre).format('h:mma')} </span>
          </Item>
          <Item>
            <span> DELIVERY-APP </span>
          </Item>
          <Item>
            <span> {x.payMethodPState === 1 ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
          </Item>
          <Item>
            <span> $ {numberFormat(x.totalProductsPrice)} </span>
          </Item>
          <Item>
            {x.pSState === 1 ? 'Aceptado' : x.pSState === 2 ? 'Pedido en proceso' : x.pSState === 3 ? 'listo para entrega' : x.pSState === 4 ? 'Pedido pagado (Concluido)' : 'Rechazado'}
          </Item>
          <Item>
            <Button onClick={() => {return handleOpenModal(x)}}>
                            Ver detalles
            </Button>
          </Item>
        </Section>})}}
        titles={[
          { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
          { name: 'Date', justify: 'flex-center', width: '1fr' },
          { name: 'Canal', justify: 'flex-center', width: '1fr' },
          { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
          { name: 'Costo total', justify: 'flex-center', width: '1fr' },
          { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' }
        ]}
      />
      <Action>
        <RippleButton
          margin='30px 0'
          onClick={() => {
            setMore(more + 100)
            // getAllStoreAdmin()
            fetchMore({
              variables: { max: more, min: 0 },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult
                return {
                  getAllPedidoStoreFinal: [...fetchMoreResult.getAllPedidoStoreFinal]

                }
              }
            })
          }}
          padding='10px'
        >Cargar Mas</RippleButton>
      </Action>
      <CheckStatus
        dataModal={dataModal}
        modal={modal}
        setModal={setModal}
      />
    </div>
  )
}

export const CheckStatus = ({ setModal, modal, dataModal }) => {
console.log("🚀 ~ file: ListPedidos.jsx ~ line 111 ~ CheckStatus ~ dataModal", dataModal)
  // STATES
  const { setAlertBox } = useContext(Context)
  const { pCodeRef, getAllPedidoStore, totalProductsPrice, pDatCre, locationUser } = dataModal || {}
  const dataLocation = locationUser && JSON.parse(locationUser) || {}
  const { cName, country, dName, uLocationKnow } = dataLocation || {}
  // QUERIES
  const [changePPStatePPedido] = useMutation(CHANGE_STATE_STORE_PEDIDO, {
    onCompleted: data => {
      setAlertBox({ message: data?.changePPStatePPedido?.message })
    }
  })
  // HANDLES

  const HandleChangeState = (stateNumber) => {
    changePPStatePPedido({
      variables: {
        pPStateP: stateNumber,
        pCodeRef: pCodeRef
      }, update: (cache, { data: { getAllPedidoStoreFinal } }) => {return updateCache({
        cache,
        query: GET_ALL_PEDIDOS,
        nameFun: 'getAllPedidoStoreFinal',
        dataNew: getAllPedidoStoreFinal
      })}

    })
  }
  const [dataStore, { loading: LoadingRes }] = useStore()

  return (
    <div>
      <AwesomeModal
        btnConfirm={false}
        footer={false}
        header={false}
        onCancel={() => {return setModal(false)}}
        onHide={() => {return setModal(false)}}
        padding='20px'
        show={modal}
        size='medium'
        zIndex='9999'
      >
        <ModalContainer>
          <Text size='2em'>{moment(pDatCre).format('DD/MM/YYYY')} - {moment(pDatCre).format('h:mma')}</Text>
          <CardTicket>
            <Text size='25px'># {pCodeRef}</Text>
          </CardTicket>
          <CardTicket>
            <IconLocationMap color={PColor} size={30} />
            <Text size='25px'>{cName}</Text>
            <Text size='25px'>{country}</Text>
            <Text size='25px'>{dName}</Text>
            <Text size='25px'>{uLocationKnow}</Text>
          </CardTicket>
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
                      </Flex>
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
                      <GarnishChoicesHeader>
                        <div>
                          <p className='garnish-choices__title'>Adicionales</p>
                          <p className='garnish-choices__title-desc'>Escoge hasta opciones.</p>
                        </div>
                        {/* <IconMiniCheck size={'15px'} color={'#009b3a'} /> */}
                      </GarnishChoicesHeader>
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
                      {![1, 2, 4]?.map((itemOptional, i) => {return (
                        <div key={i + 1}>
                          <GarnishChoicesHeader >
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
        </ModalContainer>
        <Text size='2em'>Total: $ {numberFormat(totalProductsPrice)}</Text>
        <RippleButton onClick={() => {return HandleChangeState(1)}}> Confirmar pedido</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(2)}}> Pedido en proceso</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(3)}}> Pedido en listo para entrega</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(4)}}> Pedido concluido</RippleButton>
        <RippleButton onClick={() => {return HandleChangeState(5)}}> Rechazar pedido</RippleButton>
      </AwesomeModal>
    </div >
  )
}
export const Tooltip = styled.div`
    border-radius: 2px;
    z-index: 10;
    font-size: 10px;
    font-size: 1em;
    height: 40px;
    width: 40px;
    border: 1px solid;
    color: #292626;
    position: absolute;
    top: -45px;
    left: 5px;
    width: 200px;
    opacity: 0;
    padding: 10px;
    filter: drop-shadow(0 3px 5px #ccc);
    font-family: PFont-Regular;
    text-align: center;
    place-content: center;
    background-color: ${BGColor};
    border: 1px solid #ccc;
    margin: auto;
    left: -85px;
    bottom: 60px;
    &:after {
        content: "";
        position: absolute;
        bottom: -9px;
        left: 50%;
        margin-left: -9px;
        width: 18px;
        height: 18px;
        background: white;
        transform: rotate(45deg);
}
`

export const ModalContainer = styled.div`
    max-width: 1366px;
    margin: 30px auto 20px;
    overflow-y: auto;
    height: 700px;
`
export const Text = styled.span`
    font-size: ${({ size }) => {return size || '12px'}};
    text-align:  ${({ align }) => {return align || 'start'}};
    ${({ lineHeight }) => {return lineHeight && css`line-height: ${lineHeight};`}}
    ${({ padding }) => {return padding && css`padding: ${padding};`}}
    margin: ${({ margin }) => {return margin || '0'}};
    color: ${({ color }) => {return color || BColor}};
    /* justify-content: ${({ justify }) => {return justify || 'flex-start'}}; */
    display: flex;
    font-family: ${({ font }) => {return font || 'PFont-Regular'}};
    word-break: break-word;
`
export const GarnishChoicesHeader = styled.div`
    padding: 12px 20px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    position: sticky;
    top: 0;
    border-bottom: 1px solid #ccc;
    z-index: 99;
    .garnish-choices__title { 
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
        color: #3f3e3e;
    }
    .garnish-choices__title-desc {
        font-weight: 100;
        font-size: .875rem;
        line-height: 17px;
        display: block;
        color: #717171;
    }
     .marmita-minitag{
        -webkit-text-size-adjust: 100%;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    --screen-x: 1495px;
    --screen-y: 937px;
    font-family: SulSans,Helvetica,sans-serif;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    margin: 0 3px 0 0;
    height: 20px;
    text-transform: uppercase;
    font-weight: 500;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    font-size: .5625rem;
    line-height: 1;
    background-color: #717171;
    color: #f5f0eb;
    border: none;
    padding: 6px 6px 4px;
     }
     .garnish-choices {
            justify-content: space-around;
            display: flex;
            

     }
`
export const Flex = styled.div`
  display: flex;
  width: 100%;
  
  `
export const DisRestaurant = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(63,62,62,.1);
  border-radius: 4px;
  width: 100%;
  margin: auto;
  padding: 10px;
  height: auto;
  padding: 11px 20px;
  .dish-observation-form__label {
    line-height: 1.15;
    font-weight: 500;
    font-size: 1rem;
    color: #717171;
  }
  .dish-restaurant__header {
    line-height: 1.15;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .dish-restaurant__divisor {
    line-height: 1.15;
    font-size: 16px;
    cursor: pointer;
    box-sizing: border-box;
    border-top: 2px dashed #f2f2f2;
    margin: 8px 0;
  }
`
export const HeadSticky = styled.div`
    position: sticky;
    top: 0;
    background-color: #fff;
    padding: 5px 0;
    width: 100%;
`

const CardsComponent = styled.div`
    background-color: ${BGColor};
    padding: 10px;
    margin: 15px 0;
    border-bottom: 1px solid #ccc;
    grid-template-columns: 5fr 10%;
    gap: 20px;
    cursor: move;
    display: grid;
    .title_card{
        word-break: break-word;
        font-family: PFont-Light;
        color: ${BColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
    }
    .price {
        word-break: break-word;
        font-family: PFont-Light;
        color: ${PColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 600;
    }
`
const CardTicket = styled.div`
    border: 1px dotted #ccc;
    border-radius: 7px;
    padding: 20px;
`
export const CardProductsContent = styled.div`
    width: 100%;  
    border: 1px solid #ccc;
    height: min-content;
    padding: 10px;
    border-radius: 4px;
    grid-template-columns: 5fr 140px;
    grid-column-gap: 20px;
    cursor: pointer;
    display: grid;
    padding: 16px;
    .Name {
      margin-bottom: 10px;
      font-size: 16px;
      font-family: PFont-Light;
    }
    .store_info {
      color: ${`${BGVColor}`};
    }
    .store_image{
      background-color: ${BGColor};
      box-shadow: 1px 1px 10px #00000012;
    }
    `
export const ContentInfo = styled.div` 
    width: 100%;
    flex-direction: column;
    padding: 24px 16px;
    overflow-y: auto;
    position: relative;
`
export const CardProductsModal = styled(CardProductsContent)`
  border: none;
  padding: 0px;
  grid-template-columns: 1fr 50%;
  margin: 10px 0;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`
const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
const Action = styled.div`
    display: flex;
    justify-content: space-between;
    
    `
const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    & form {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

    }
`
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${PColor};
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const CircleStatus = styled.div` 
  border-radius: 50%;
  height: 30px;
  background-color: ${({ status }) => {return status === 1 ? `${WColor}` : status === 2 ? `${TBGEColor}` : status === 3 ? `${SCColor}` : status === 4 ? `${PColor}` : status === 5 ? SECColor : BGColor}};
  width: 30px;
  min-height: 30px;
  text-align: center;
  display: grid;
  place-content: center;
  position: relative;
  min-width: 30px;
  &&:hover > ${Tooltip} {
    opacity: 1;
                animation: ${FadeOup} 333ms cubic-bezier(.35,0,.5,1) backwards;
     }
  ${props => {return props.pulse
    ? css`
    animation: ${pulse} 2s infinite;
  `
    : css`
  `} }
`
const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    /* background-color: ${BGColor}; */
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`