import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import moment from 'moment'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { CREATE_WALLET_DEBT, DELETE_ONE_WALLET_DEBT, GET_ALL_WALLET_DEBT, GET_ONE_WALLET_DEBT } from './queries'
import { Button, Item, Container, CardProduct, OrganiceProduct, HeaderStatic, ColumnList, ContainerAnimation, ContainerAnimationTow, WrapperClient } from './styled'
import { numberFormat, RandomCode, updateCache } from 'utils'
import { Card } from './styled'
import { ManageWallet } from 'container/ManageWallet'
import { IconDelete, IconPlus } from 'public/icons'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { BColor, BGColor, PColor } from 'public/colors'
import { Context } from 'context/Context'
import { ContentMenuOptions, Input, LoadingComponent } from 'container/ManageWallet/styled'
import { Flex } from 'container/dashboard/styled'
import { TextH2Main } from 'components/common/h2'
import { LocationName } from 'components/hooks/useLocationName'
import { GET_ALL_CLIENTS } from 'container/clients/queries'
import { Loading } from 'components/Loading'

export const WalletC = () => {
  // STATES
  const [setCheck, setChecker] = useState({})
  const [amount, setAmount] = useState(0)
  const [modalOptions, setOpenModalOptions] = useState(false)
  const [search, setSearch] = useState('')
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const { setAlertBox } = useContext(Context)
  const OPEN_MODAL = useSetState()
  const [active, setActive] = useState(1)
  const initialStateInvoice = {
    PRODUCT: [],
    PRODUCT_WALLET: []
  }
  // QUERIES
  const [createWalletDebt] = useMutation(CREATE_WALLET_DEBT)
  const [delWalletDebt] = useMutation(DELETE_ONE_WALLET_DEBT)
  const [dataProducto, setData] = useState([])
  const [index, setIndex] = useState('')
  const [showMoreWalletUser, setShowMoreWalletUser] = useState(100)
  const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
  const [showMoreProduct, setShowMoreProducts] = useState(100)
  const { data, loading, fetchMore } = useQuery(GET_ALL_WALLET_DEBT)
  // HANDLES
  const handleClick = index => {
    setActive(index === active ? true : index)
  }
  const handleSelectClient = index => {
    handleClick(1)
    const { cliId, clientName, clientNumber, clientLastName, ccClient } = index || {}
    setIndex(cliId)
    setDataValue({
      debtName: clientName,
      personName: clientName,
      phoneWalletUser: clientNumber,
      lastName: clientLastName,
      ccWalletUser: ccClient
    })
  }
  const handleDeleteWallet = (debtWalletId, debtState, debtName) => {
    delWalletDebt({
      variables: {
        input: {
          debtWalletId,
          debtState
        }
      },
      update: (cache, { data: { WalletDebt } }) => {return updateCache({
        cache,
        query: GET_ALL_WALLET_DEBT,
        nameFun: 'WalletDebt',
        dataNew: WalletDebt
      })}
    }).then(() => {return setAlertBox({ message: `se ha eliminado la billetera ${debtName}` })})
  }
  const handleChangeFilter = e => {
    setSearch(e.target.value)
  }
  const productRecoger = (state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return {
          ...state,
          // eslint-disable-next-line
                    PRODUCT: [...state?.PRODUCT, action?.payload]
        }
      case 'ADD_PRODUCT_WALLET':
        return {
          ...state,
          // eslint-disable-next-line
                    PRODUCT_WALLET: [...state?.PRODUCT_WALLET, action?.payload]
        }
      case 'REMOVE_PRODUCT':
        return {
          ...state,
          PRODUCT: state?.PRODUCT?.filter((t, idx) => {return idx !== action?.idx})
        }
      case 'REMOVE_PRODUCT_WALLET':
        return {
          PRODUCT_WALLET: state?.PRODUCT_WALLET?.filter((t, idx) => {return idx !== action?.idx})
        }
      case 'REMOVE_ALL':
        return {
          ...state,
          PRODUCT: []
        }
      case 'REMOVE_ALL_WALLET':
        return {
          ...state,
          PRODUCT_WALLET: []
        }
      case 'TOGGLE_INVOICE':
        return {
          ...state,
          PRODUCT: state?.PRODUCT.map((t, idx) => {return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t})
        }
      default:
        return state
    }
  }
  const freeDelivery = dataProductFree => {
    return dataProductFree.ProDelivery === 1
  }
  const [product, dispatch] = useReducer(productRecoger, initialStateInvoice)
  const productFree = dataProducto.filter(freeDelivery)
  const [productFoodsAll, { data: dataProduct, loading: LoadProduct, fetchMore: fetchMoreProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE, {
    fetchPolicy: 'network-only',
    variables: {
      search: search
    }
  })
  const [getOneWalletDebt, { data: dataWallet }] = useLazyQuery(GET_ONE_WALLET_DEBT)
  const HandleGetOne = (debtWalletId) => {
    return getOneWalletDebt({
      variables: {
        debtWalletId
      }, update: (cache, { data: { WalletDebt } }) => {return updateCache({
        cache,
        query: GET_ALL_WALLET_DEBT,
        nameFun: 'WalletDebt',
        dataNew: WalletDebt
      })}
    })
  }
  useEffect(() => {
    // eslint-disable-next-line
        dataProduct?.productFoodsAll && setData([...dataProduct?.productFoodsAll])
  }, [dataProduct, search])
  useEffect(() => {
    productFoodsAll({ variables: { max: showMoreProduct, search: search } })
  }, [showMoreProduct, search])
  const arr = product?.PRODUCT?.map(x => {return { pId: x.pId, debtAmountProduct: x.ProPrice }})
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
  }
  const handleForm = (e) =>
  {return handleSubmit({
    event: e,
    action: () => {
      return createWalletDebt({
        variables: {
          input: {
            UserDebtId: index,
            debtName: dataForm.debtName,
            personName: dataForm.personName,
            lastName: dataForm.lastName,
            gender: setCheck.gender,
            ccWalletUser: dataForm.ccWalletUser,
            phoneWalletUser: dataForm.phoneWalletUser,
            RefDebtCode: RandomCode(10),
            debtAmount: amount,
            debtComments: dataForm?.debtComments
          },
          inputLineItems: {
            setData: arr || []
          }
        }, update(cache) {
          cache.modify({
            fields: {
              WalletDebt(dataOld = []) {
                return cache.writeQuery({ query: GET_ALL_WALLET_DEBT, data: dataOld })
              }
            }
          })
        }
      }).then(() => {
        OPEN_MODAL.setState(!OPEN_MODAL.state)
        setAlertBox({ message: 'Subido exitosamente' })
        setDataValue({})

      }
      ).catch(err => {return setAlertBox({ message: `${err}` })})
    }
  })}

  const handleAddProduct = elem => {
    dispatch({ type: 'ADD_PRODUCT', payload: elem })
  }

  let amountCount = 0

  useEffect(() => {
    product?.PRODUCT?.forEach(function (a) {
      amountCount += a.ProPrice
    })
    setAmount(amountCount)
  }, [product])
  const onChangeInput = (e) => {return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })}
  // eslint-disable-next-line
    const fetchData = async (name) => {
    // let name = 'jesus'
    // fetch("https://api.genderize.io?name=" + name)
    //     .then(response => response.json())
    //     .then(response => {
    //         console.log(capitalize(response.name))
    //     })
    //     .catch(() => {
    //     })
  }
  function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : str
  }
  function handleOpen() {
    OPEN_MODAL.setState(!OPEN_MODAL.state)
    setOpenModalOptions(!modalOptions)
  }
  // eslint-disable-next-line
    function printPartOfPage(elementId, uniqueIframeId) {
    const content = document.getElementById(elementId)
    let pri
    if (document.getElementById(uniqueIframeId)) {
      pri = document.getElementById(uniqueIframeId).contentWindow
    } else {
      const iframe = document.createElement('iframe')
      iframe.setAttribute('title', uniqueIframeId)
      iframe.setAttribute('id', uniqueIframeId)
      iframe.setAttribute('style', 'height: 10px; width: 10px; position: relative;')
      document.body.appendChild(iframe)
      pri = iframe.contentWindow
    }
    pri.document.open()
    pri.document.write(content.innerHTML)
    pri.document.close()
    pri.focus()
    pri.print()
  }
  const [exist] = useState(data?.WalletDebt?.length > 0)
  const OPEN_MODAL_MANAGE = useSetState()
  const { data: clients } = useQuery(GET_ALL_CLIENTS)
  return (
    <div>
      {loading && <Loading />}
      <AwesomeModal
        borderRadius='0px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='large'
        zIndex='9999'
      >
        <Container>
          <Card sticky width='20%'>
            <div>
              <RippleButton
                active={active === 1}
                bgColor='#9797971a'
                color='red'
                label='Crear'
                margin='0px 5px'
                onClick={() => {return active !== 1 && handleClick(1)}}
                padding='10px'
                style={{ borderRadius: '0px' }}
              />
              <RippleButton
                active={active === 2}
                bgColor='#9797971a'
                color='red'
                label='Mis clientes'
                margin='0px 5px'
                onClick={() => {return active !== 2 && handleClick(2)}}
                padding='10px'
                style={{ borderRadius: '0px' }}
              />
            </div>
            {
              active === 1 ?
                <ContainerAnimation>
                  <form onSubmit={(e) => {return handleForm(e)}}>
                    <Flex>
                      <div style={{ marginLeft: '10px' }}>
                        <input
                          name='gender'
                          onChange={(e) => {return handleCheck(e)}}
                          type='checkbox'
                          value={setCheck}
                        />
                      </div>
                      <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
                    </Flex>
                    <InputHooks
                      autoComplete='off'
                      error={errorForm?.debtName}
                      name='debtName'
                      onChange={handleChange}
                      required
                      title='Nombre de la billetera'
                      value={dataForm?.debtName}
                      width={'100%'}
                    />
                    <InputHooks
                      autoComplete='off'
                      error={errorForm?.personName}
                      name='personName'
                      onChange={handleChange}
                      required
                      title='Nombre de la persona'
                      value={dataForm?.personName}
                      width={'100%'}
                    />
                    <InputHooks
                      autoComplete='off'
                      error={errorForm?.lastName}
                      name='lastName'
                      onChange={handleChange}
                      required
                      title='Apellido'
                      value={dataForm?.lastName}
                      width={'100%'}
                    />
                    <InputHooks
                      autoComplete='off'
                      error={errorForm?.phoneWalletUser}
                      name='phoneWalletUser'
                      onChange={handleChange}
                      required
                      title='Numero'
                      value={dataForm?.phoneWalletUser}
                      width={'100%'}
                    />
                    <InputHooks
                      autoComplete='off'
                      error={errorForm?.ccWalletUser}
                      name='ccWalletUser'
                      onChange={handleChange}
                      required
                      title='CC de la persona'
                      value={dataForm?.ccWalletUser}
                      width={'100%'}
                    />
                    <InputHooks
                      TypeTextarea={true}
                      autoComplete='off'
                      error={errorForm?.debtComments}
                      name='debtComments'
                      onChange={handleChange}
                      required
                      title='comentario'
                      value={dataForm?.debtComments}
                      width={'100%'}
                    />
                    <span>monto: $ {numberFormat(amount)}</span>
                    <RippleButton type='submit' widthButton='100%' >Crear Billetera para {dataForm?.personName}</RippleButton>
                  </form>
                </ContainerAnimation>
                : <ContainerAnimationTow>
                  {clients?.getAllClients.map((client, i) => {return (
                    <WrapperClient
                      active={index === client.cliId}
                      key={i + 1}
                      onClick={() => {return handleSelectClient(client)}}
                    >
                      <div>{capitalize(client.clientLastName)}</div>
                      <div>{capitalize(client.clientName)}</div>
                    </WrapperClient>
                  )})}
                </ContainerAnimationTow>}
          </Card>
          <Card
            align
            display='flex'
            margin='0'
            width='70%'
          >
            <Card margin={'0 0 0 10px'}>
              {/* <RippleButton onClick={()=> OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear billetera</RippleButton> */}
              <HeaderStatic>
                <TextH2Main
                  size={'15px'}
                  text={`Mis Productos (${dataProducto?.length || 0})`}
                  weight='400'
                />
                <Input
                  autoComplete={'off'}
                  autoFocus={true}
                  label='Busca tus productos'
                  name='search'
                  onChange={handleChangeFilter}
                  placeholder='Buscar...'
                  type='text'
                  value={search}
                />
              </HeaderStatic>
              <OrganiceProduct width='50%'>
                {dataProducto?.map((x, idx) => {return (
                  <CardProduct key={idx + 1} width='100%'>
                    <div className='col'>
                      <h3 className='title' size='20px' >{(x.pName)}</h3>
                      <h3 className='price_text'>precio: ${numberFormat(x.ProPrice)}</h3>
                      <RippleButton
                        bgColor={'#f2f2f2'}
                        color={BColor}
                        onClick={() => {return handleAddProduct(x)}}
                        padding='0'
                        type='button'
                        widthButton='100%'
                      >Añadir producto <IconPlus color={BColor} size='10px' /></RippleButton>
                    </div>
                    <img
                      alt={x.pName}
                      src={x.ProImage}
                    />
                    {/* <Image width={550} height={550} objectFit='contain' src={'/images/hamb.jpg'} alt='Picture' blurDataURL='data:...' placeholder='blur' /> */}
                  </CardProduct>
                )})}
              </OrganiceProduct>
              <RippleButton
                margin='20px auto'
                onClick={() => {
                  setShowMoreProducts(s => {return s + 50})
                  fetchMoreProduct({
                    variables: { max: showMoreProduct, min: 0 },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prevResult
                      let productFoodsAll = [...prevResult.productFoodsAll]
                      return {
                        productFoodsAll: [
                          productFoodsAll,
                          ...fetchMoreResult.productFoodsAll]
                      }
                    }
                  })
                }}
                widthButton='100%'
              > {loading ? '...Cargando' : 'CARGAR MÁS'}</RippleButton>
            </Card>
            <Card>
              <HeaderStatic>
                <TextH2Main
                  size={'15px'}
                  text={`Productos agregados a la billetera (${product?.PRODUCT?.length || 0})`}
                  weight='400'
                />
                <Input
                  autoComplete={'off'}
                  autoFocus={true}
                  label='Busca tus productos'
                  name='search'
                  onChange={handleChangeFilter}
                  placeholder='Buscar...'
                  type='text'
                  value={search}
                />
              </HeaderStatic>
              <OrganiceProduct margin='0 20px' width='50%'>
                {product?.PRODUCT?.map((x, idx) => {return (
                  <CardProduct key={idx + 1} width='100%'>
                    <div className='col'>
                      <h3 className='title' size='20px' >{x.pName}</h3>
                      <h3 className='price_text' >precio: $ {numberFormat(x.ProPrice)}</h3>
                      <RippleButton
                        onClick={() => {return dispatch({ type: 'REMOVE_PRODUCT', idx })}}
                        padding='0'
                        type='button'
                        widthButton='100%'
                      >
                        <IconDelete color={BGColor} size={15} />
                      </RippleButton>
                    </div>
                    <img
                      alt={x.pName}
                      src={x.ProImage}
                    />
                    {/* <Image
                                            width={450}
                                            height={550}
                                            objectFit='contain'
                                            src={'/images/hamb.jpg'}
                                            alt='Picture'
                                            blurDataURL='data:...'
                                            placeholder='blur' /> */}
                  </CardProduct>
                )})}
              </OrganiceProduct>
            </Card>
          </Card>
        </Container>
      </AwesomeModal>
      <Container>
        <LocationName />
        <Card >
          {exist && <form>
            <InputHooks
              name='fromDate'
              onChange={onChangeInput}
              required
              title='Desde'
              type='date'
              value={valuesDates?.fromDate}
              width={'20%'}
            />
            <InputHooks
              name='toDate'
              onChange={onChangeInput}
              required
              title='Hasta'
              type='date'
              value={valuesDates?.toDate}
              width='20%'
            />
            <InputHooks
              error={errorForm?.ProPrice}
              name='ProPrice'
              onChange={handleChange}
              required
              title='Código'
              value={dataForm?.ProPrice}
              width='30%'
            />
            <InputHooks
              error={errorForm?.ProPrice}
              name='ProPrice'
              numeric
              onChange={handleChange}
              required
              title='Nombre'
              value={dataForm?.ProPrice}
              width='30%'
            />
            <Button type='submit'> Mas opciones</Button>
            <RippleButton margin='30px' padding='10px'>Consultar</RippleButton>
            <RippleButton margin='30px' padding='10px'>Consultar y exportar</RippleButton>
          </form>}
          <ColumnList>
            <Item>Código</Item>
            <Item>Billetera</Item>
            <Item>Genero</Item>
            <Item>Cliente</Item>
            <Item>identificación</Item>
            <Item>identificación</Item>
            <Item>Monto</Item>
            <Item>Date</Item>
            <Item>Eliminar</Item>
            <Item></Item>
          </ColumnList>
          {data?.WalletDebt?.map(x => {return (
            <ColumnList key={x.RefDebtCode}>{console.log(x)}
              <Item>
                <span> {x.RefDebtCode}</span>
              </Item>
              <Item>
                <span> {x.debtName}</span>
              </Item>
              <Item>
                <span> {x.gender === 0 ? 'Masculino' : 'Femenino'}</span>
              </Item>
              <Item>
                <span> {capitalize(x.personName)} {capitalize(x.lastName)}</span>
              </Item>
              <Item>
                <span> {x.ccWalletUser}</span>
              </Item>
              <Item>
                <span> $ {numberFormat(x.debtAmount)}</span>
              </Item>
              <Item>
                <span> {moment(x.createAt).format('DD-MM-YYYY')} </span>
              </Item>
              <Item>
                <Button onClick={() => {return handleDeleteWallet(x.debtWalletId, x.debtState, x.debtName)}}><IconDelete color={PColor} size='25px' /></Button>

              </Item>
              <Item>
                <Button onClick={() => {return HandleGetOne(x.debtWalletId)}}>
                                    Ver detalles
                </Button>
              </Item>
            </ColumnList>
          )})}
          {exist && <RippleButton
            margin='20px auto'
            onClick={() => {
              setShowMoreWalletUser(s => {return s + 50})
              fetchMore({
                variables: { max: showMoreWalletUser, min: 0 },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prevResult
                  let WalletDebt = [...prevResult.WalletDebt]
                  return {
                    WalletDebt: [
                      WalletDebt,
                      ...fetchMoreResult.WalletDebt]
                  }
                }
              })
            }}
            widthButton='100%'
          > {loading ? '...Cargando' : 'CARGAR MÁS'}</RippleButton>}
        </Card>
        <Card width='30%'>
          {<ManageWallet
            OPEN_MODAL={OPEN_MODAL_MANAGE}
            data={dataWallet?.getOneWalletDebt || {}}
            dataFree={productFree}
            dataProducto={dataProducto}
            dispatch={dispatch}
            fetchMoreProduct={fetchMoreProduct}
            handleChangeFilter={handleChangeFilter}
            loading={LoadProduct || loading}
            product={product}
            search={search}
          />}
        </Card>
      </Container>
      {!OPEN_MODAL.state && !OPEN_MODAL_MANAGE.state && <ContentMenuOptions active={modalOptions}>
        <button className='btn-absolute' onClick={() => {return setOpenModalOptions(!modalOptions)}}>
          <LoadingComponent />
        </button>
        {<RippleButton
          onClick={handleOpen}
          padding='5px'
          type='button'
          widthButton='100%'
        >{'Adicionar nueva cartera'}</RippleButton>}
      </ContentMenuOptions>}
    </div>

  )
}
