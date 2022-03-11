import { useFormTools } from 'components/BaseForm'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { APColor, BColor, BGColor, BGVColor, PColor, PLColor, SCColor, SECColor, SEGColor, TBGEColor, WColor } from 'public/colors'
import React, { useContext, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import moment from 'moment'
import { useQuery, useMutation } from '@apollo/client'
import Link from 'next/link'
import { numberFormat, updateCache } from 'utils'
import { FadeOup, onPulses } from 'components/animations'
import { AwesomeModal } from 'components/AwesomeModal'
import Image from 'next/image'
import { CHANGE_STATE_STORE_PEDIDO, GET_ALL_PEDIDOS } from './queries'
import { Context } from 'context/Context'
import { IconLocationMap } from 'public/icons'
import { useStore } from '../../components/hooks/useStore'
import { CLIENT_URL_BASE } from 'apollo/urls'
moment.locale('SG');

export const ListPedidos = ({ data }) => {
    const moment = require('moment')
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [modal, setModal] = useState(false)
    const [dataModal, setDataModal] = useState(null)

    const m1 = moment(new Date('2019/06/01 3:04:03'))
    const handleOpenModal = elem => {
        setModal(!modal)
        setDataModal(elem)
    }
    return (
        <div>
            <Card>
                <form>
                    <InputHooks
                        title='Desde'
                        width={'20%'}
                        required
                        error={errorForm?.Desde}
                        value={dataForm?.Desde}
                        onChange={handleChange}
                        name='Desde'
                        type='date'
                    />
                    <InputHooks
                        title='Hasta'
                        width='20%'
                        required
                        type='date'
                        error={errorForm?.ProDescuento}
                        value={dataForm?.ProDescuento}
                        onChange={handleChange}
                        name='ProDescuento'
                    />
                    <InputHooks
                        title='Numero'
                        width='30%'
                        required
                        error={errorForm?.ProPrice}
                        value={dataForm?.ProPrice}
                        onChange={handleChange}
                        name='ProPrice'
                    />
                    <InputHooks
                        title='Nombre'
                        width='30%'
                        numeric
                        required
                        error={errorForm?.ProPrice}
                        value={dataForm?.ProPrice}
                        onChange={handleChange}
                        name='ProPrice'
                    />
                    <NewSelect
                        width='33.33%'
                        name='colorId'
                        options={[1, 2]}
                        id='colorId'
                        onChange={handleChange}
                        optionName='colorName'
                        value={dataForm?.Color}
                        title='Restaurante'
                    />
                    <NewSelect
                        width='33.33%'
                        name='colorId'
                        options={[1, 2]}
                        id='colorId'
                        onChange={handleChange}
                        optionName='colorName'
                        value={dataForm?.Color}
                        title='Método de pago'
                    />
                    <NewSelect
                        width='33.33%'
                        name='colorId'
                        options={[1, 2]}
                        id='colorId'
                        onChange={handleChange}
                        optionName='colorName'
                        value={dataForm?.Color}
                        title='STATUS'
                    />
                    <Button type='submit'>
                        Mas opciones
                    </Button>
                    <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                    <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
                </form>
            </Card>
            <Table
                titles={[
                    { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
                    { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
                    { name: 'Date', justify: 'flex-center', width: '1fr' },
                    { name: 'Canal', justify: 'flex-center', width: '1fr' },
                    { name: 'Método de pago', justify: 'flex-center', width: '1fr' },
                    { name: 'Costo total', justify: 'flex-center', width: '1fr' },
                    { name: 'Numero de Entrega', justify: 'flex-center', width: '1fr' },
                    { name: 'Cupon', justify: 'flex-center', width: '1fr' },
                    { name: '', justify: 'flex-center', width: '1fr' },
                ]}
                labelBtn='Product'
                data={data}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
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
                        <span> {x.payMethodPState ? 'EFECTIVO' : 'TRANSFERENCIA'}</span>
                    </Item>
                    <Item>
                        <span> $ {numberFormat(x.totalProductsPrice)} </span>
                    </Item>
                    <Item>
                        <CircleStatus onClick={() => handleOpenModal(x)} pulse={x.pSState !== 5} status={x.pSState}>
                            <Tooltip>{x.pSState === 1 ? 'Aceptado' : x.pSState === 2 ? 'Pedido en proceso' : x.pSState === 3 ? 'listo para entrega' : x.pSState === 4 ? 'Pedido pagado (Concluido)' : 'Rechazado'}</Tooltip>
                        </CircleStatus>
                    </Item>
                    <Item>
                        <span> {i + 1}</span>
                    </Item>
                    <Item>
                        <Button onClick={() => handleOpenModal(x)}>
                            Ver detalles
                        </Button>
                    </Item>
                </Section>)}
            />
            <Action>
                <RippleButton padding='10px' margin='30px 0'>Mas antiguos</RippleButton>
                <RippleButton padding='10px' margin='30px 0'>Cargar Mas</RippleButton>
            </Action>
            <CheckStatus
                setModal={setModal}
                modal={modal}
                dataModal={dataModal}
            />
        </div>
    )
}


export const CheckStatus = ({ setModal, modal, dataModal }) => {
    // STATES
    const { setAlertBox } = useContext(Context)
    const { pCodeRef, getAllPedidoStore, totalProductsPrice, pDatCre, locationUser } = dataModal || {}
    const dataLocation = locationUser && JSON.parse(locationUser) || {}
    console.log(dataLocation)
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
            }, update: (cache, { data: { getAllPedidoStoreFinal } }) => updateCache({
                cache,
                query: GET_ALL_PEDIDOS,
                nameFun: 'getAllPedidoStoreFinal',
                dataNew: getAllPedidoStoreFinal
            })

        })
    }
    const [dataStore, { loading: LoadingRes }] = useStore()
    console.log(dataStore)
    return (
        <div>
            <AwesomeModal show={modal} onCancel={() => setModal(false)} onHide={() => setModal(false)} btnConfirm={false} header={false} footer={false} padding='20px' zIndex='9999' size='medium' >
                <ModalContainer>
                    <Text size='2em'>{moment(pDatCre).format('DD/MM/YYYY')} - {moment(pDatCre).format('h:mma')}</Text>
                    <CardTicket>
                        <Text size='25px'># {pCodeRef}</Text>
                    </CardTicket>
                    <CardTicket>
                        <IconLocationMap size={30} color={PColor} />
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
                                                <label tabIndex="0" className="dish-observation-form__label" for="observations-form">¿Algún comentario?</label>
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
                </ModalContainer>
                <Text size='2em'>Total: $ {numberFormat(totalProductsPrice)}</Text>
                <RippleButton onClick={() => HandleChangeState(1)}> Confirmar pedido</RippleButton>
                <RippleButton onClick={() => HandleChangeState(2)}> Pedido en proceso</RippleButton>
                <RippleButton onClick={() => HandleChangeState(3)}> Pedido en listo para entrega</RippleButton>
                <RippleButton onClick={() => HandleChangeState(4)}> Pedido concluido</RippleButton>
                <RippleButton onClick={() => HandleChangeState(5)}> Rechazar pedido</RippleButton>
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
    font-size: ${({ size }) => size || '12px'};
    text-align:  ${({ align }) => align || 'start'};
    ${({ lineHeight }) => lineHeight && css`line-height: ${lineHeight};`}
    ${({ padding }) => padding && css`padding: ${padding};`}
    margin: ${({ margin }) => margin || '0'};
    color: ${({ color }) => color || BColor};
    /* justify-content: ${({ justify }) => justify || 'flex-start'}; */
    display: flex;
    font-family: ${({ font }) => font || 'PFont-Regular'};
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
  background-color: ${({ status }) => status === 1 ? `${WColor}` : status === 2 ? `${TBGEColor}` : status === 3 ? `${SCColor}` : status === 4 ? `${PColor}` : status === 5 ? SECColor : BGColor};
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
  ${props => props.pulse
        ? css`
    animation: ${pulse} 2s infinite;
  `
        : css`
  ` }
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