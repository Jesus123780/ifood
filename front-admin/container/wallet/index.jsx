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
import { numberFormat, RandomCode, updateCache, updateCacheMod } from 'utils'
import { CustomTable } from '../pruebas'
import { Card } from './styled'
import { ManageWallet } from 'container/ManageWallet'
import { IconConfig, IconDelete, IconEdit, IconPlus } from 'public/icons'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { BColor, BGColor, PColor } from 'public/colors'
import { Context } from 'context/Context'
import { ContentMenuOptions, Input, LoadingComponent } from 'container/ManageWallet/styled'
import Image from 'next/image';
import { Flex } from 'container/dashboard/styled'
import { TextH2Main } from 'components/common/h2'
import { LocationName } from 'components/hooks/useLocationName'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { GET_ALL_CLIENTS } from 'container/clients/queries'
import { Loading } from 'components/Loading'

export const WalletC = () => {
    // STATES
    const [setCheck, setChecker] = useState({})
    const [amount, setAmount] = useState(0);
    const [modalOptions, setOpenModalOptions] = useState(false)
    const [dataWalletUser, setDataWallet] = useState([]);
    const [search, setSearch] = useState('')
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const { setAlertBox } = useContext(Context)
    const OPEN_MODAL = useSetState()
    const [active, setActive] = useState(1)
    const initialStateInvoice = {
        PRODUCT: [],
        PRODUCT_WALLET: [],
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
            ccWalletUser: ccClient,
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
            update: (cache, { data: { WalletDebt } }) => updateCache({
                cache,
                query: GET_ALL_WALLET_DEBT,
                nameFun: 'WalletDebt',
                dataNew: WalletDebt
            })
        }).then(res => setAlertBox({ message: `se ha eliminado la billetera ${debtName}` }))
    }
    const handleChangeFilter = e => {
        setSearch(e.target.value)
    }
    const productRecoger = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return {
                    ...state,
                    PRODUCT: [...state?.PRODUCT, action?.payload]
                }
            case 'ADD_PRODUCT_WALLET':
                return {
                    ...state,
                    PRODUCT_WALLET: [...state?.PRODUCT_WALLET, action?.payload]
                }
            case 'REMOVE_PRODUCT':
                return {
                    ...state,
                    PRODUCT: state?.PRODUCT?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_PRODUCT_WALLET':
                return {
                    PRODUCT_WALLET: state?.PRODUCT_WALLET?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_ALL':
                return {
                    ...state,
                    PRODUCT: []
                };
            case 'REMOVE_ALL_WALLET':
                return {
                    ...state,
                    PRODUCT_WALLET: []
                };
            case "TOGGLE_INVOICE":
                return {
                    ...state,
                    PRODUCT: state?.PRODUCT.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }
    const freeDelivery = dataProductFree => {
        return dataProductFree.ProDelivery === 1
    }
    const productFree = dataProducto.filter(freeDelivery)
    const [product, dispatch] = useReducer(productRecoger, initialStateInvoice)
    const [productFoodsAll, { data: dataProduct, loading: LoadProduct, fetchMore: fetchMoreProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE, {
        fetchPolicy: 'network-only',
        variables: {
            search: search,
        }
    })
    const [getOneWalletDebt, { data: dataWallet }] = useLazyQuery(GET_ONE_WALLET_DEBT)
    const HandleGetOne = (debtWalletId) => {
        return getOneWalletDebt({
            variables: {
                debtWalletId
            }, update: (cache, { data: { WalletDebt } }) => updateCache({
                cache,
                query: GET_ALL_WALLET_DEBT,
                nameFun: 'WalletDebt',
                dataNew: WalletDebt
            })
        })
    }
    useEffect(() => {
        dataProduct?.productFoodsAll && setData([...dataProduct?.productFoodsAll])
    }, [dataProduct, search])
    useEffect(() => {
        productFoodsAll({ variables: { max: showMoreProduct, search: search } })
    }, [showMoreProduct, search])
    const arr = product?.PRODUCT?.map(x => ({ pId: x.pId, debtAmountProduct: x.ProPrice, }))
    const handleCheck = (e) => {
        const { name, checked } = e.target
        setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
    }
    const handleForm = (e) =>
        handleSubmit({
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
                            debtComments: dataForm?.debtComments,
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
                ).catch(err => setAlertBox({ message: `${err}` }))
            }
        })

    const handleAddProduct = elem => {
        dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }

    let amountCount = 0

    useEffect(() => {
        product?.PRODUCT?.forEach(function (a) {
            amountCount += a.ProPrice
        });
        setAmount(amountCount)
    }, [product])
    const onChangeInput = (e) => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })

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
    const HandleMoreProductComponent = () => <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
        setShowMoreProducts(s => s + 50)
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
    }}> {loading ? '...Cargando' : 'Cargar Más'}</RippleButton>
    const OPEN_MODAL_MANAGE = useSetState()
    const { data: clients } = useQuery(GET_ALL_CLIENTS)
    console.log(clients)
    return (
        <div>
            {loading && <Loading />}
            <AwesomeModal zIndex='9999' padding='25px' height='100vh' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0px' >
                <Container>
                    <Card sticky width='20%'>
                        <div>
                            <RippleButton active={active === 1} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Crear' onClick={() => active !== 1 && handleClick(1)} />
                            <RippleButton active={active === 2} style={{ borderRadius: '0px' }} margin='0px 5px' color="red" padding="10px" bgColor='#9797971a' label='Mis clientes' onClick={() => active !== 2 && handleClick(2)} />
                        </div>
                        {
                            active === 1 ?
                                <ContainerAnimation>
                                    <form onSubmit={(e) => handleForm(e)}>
                                        <Flex>
                                            <div style={{ marginLeft: '10px' }}>
                                                <input type="checkbox" name="gender" value={setCheck} onChange={(e) => handleCheck(e)} />
                                            </div>
                                            <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
                                        </Flex>
                                        <InputHooks autoComplete='off' title='Nombre de la billetera' width={'100%'} required error={errorForm?.debtName} value={dataForm?.debtName} onChange={handleChange} name='debtName' />
                                        <InputHooks autoComplete='off' title='Nombre de la persona' width={'100%'} required error={errorForm?.personName} value={dataForm?.personName} onChange={handleChange} name='personName' />
                                        <InputHooks autoComplete='off' title='Apellido' width={'100%'} required error={errorForm?.lastName} value={dataForm?.lastName} onChange={handleChange} name='lastName' />
                                        <InputHooks autoComplete='off' title='Numero' width={'100%'} required error={errorForm?.phoneWalletUser} value={dataForm?.phoneWalletUser} onChange={handleChange} name='phoneWalletUser' />
                                        <InputHooks autoComplete='off' title='CC de la persona' width={'100%'} required error={errorForm?.ccWalletUser} value={dataForm?.ccWalletUser} onChange={handleChange} name='ccWalletUser' />
                                        <InputHooks autoComplete='off' title='comentario' TypeTextarea={true} width={'100%'} required error={errorForm?.debtComments} value={dataForm?.debtComments} onChange={handleChange} name='debtComments' />
                                        <span>monto: $ {numberFormat(amount)}</span>
                                        <RippleButton type='submit' widthButton='100%' >Crear Billetera para {dataForm?.personName}</RippleButton>
                                    </form>
                                </ContainerAnimation>
                                : <ContainerAnimationTow>
                                    {clients?.getAllClients.map(client => (
                                        <WrapperClient active={index === client.cliId} key={client.cliId} onClick={() => handleSelectClient(client)}>
                                            <div>{capitalize(client.clientLastName)}</div>
                                            <div>{capitalize(client.clientName)}</div>
                                        </WrapperClient>
                                    ))}
                                </ContainerAnimationTow>}
                    </Card>
                    <Card margin='0' align display='flex' width='70%'>
                        <Card margin={'0 0 0 10px'}>
                            <HeaderStatic>
                                <TextH2Main weight='400' size={'15px'} text={`Mis Productos (${dataProducto?.length || 0})`} />
                                <Input placeholder='Buscar...' autoFocus={true} autoComplete={'off'} label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' />
                            </HeaderStatic>
                            <OrganiceProduct width='50%'>
                                {dataProducto?.map((x, idx) => (
                                    <CardProduct width='100%' key={idx.carProId}>
                                        <div className='col'>
                                            <h3 className='title' size='20px' >{(x.pName)}</h3>
                                            <h3 className='price_text'>precio: ${numberFormat(x.ProPrice)}</h3>
                                            <RippleButton bgColor={'#f2f2f2'} type='button' color={BColor} padding='0' widthButton='100%' onClick={() => handleAddProduct(x)}>Añadir producto <IconPlus color={BColor} size='10px' /></RippleButton>
                                        </div>
                                        <Image width={550} height={550} objectFit='contain' src={'/images/hamb.jpg'} alt='Picture' blurDataURL='data:...' placeholder='blur' />
                                    </CardProduct>
                                ))}
                            </OrganiceProduct>
                            <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
                                setShowMoreProducts(s => s + 50)
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
                            }}> {loading ? '...Cargando' : 'Cargar Más'}</RippleButton>
                        </Card>
                        <Card>
                            <HeaderStatic>
                                <TextH2Main weight='400' size={'15px'} text={`Productos agregados a la billetera (${product?.PRODUCT?.length || 0})`} />
                                <Input placeholder='Buscar...' autoFocus={true} autoComplete={'off'} label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' />


                            </HeaderStatic>
                            <OrganiceProduct margin='0 20px' width='50%'>
                                {product?.PRODUCT?.map((x, idx) => (
                                    <CardProduct width='100%' key={idx.carProId}>
                                        <div className='col'>
                                            <h3 className='title' size='20px' >{x.pName}</h3>
                                            <h3 className='price_text' >precio: $ {numberFormat(x.ProPrice)}</h3>
                                            <RippleButton type='button' padding='0' widthButton='100%' onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>
                                                <IconDelete size={15} color={BGColor} />
                                            </RippleButton>
                                        </div>
                                        <Image
                                            width={450}
                                            height={550}
                                            objectFit='contain'
                                            src={'/images/hamb.jpg'}
                                            alt='Picture'
                                            blurDataURL='data:...'
                                            placeholder='blur' />
                                    </CardProduct>
                                ))}
                            </OrganiceProduct>
                        </Card>
                    </Card>
                </Container>
            </AwesomeModal>
            <Container>
                <LocationName />
                <Card >
                    {exist && <form>
                        <InputHooks title='Desde' width={'20%'} required value={valuesDates?.fromDate} onChange={onChangeInput} name='fromDate' type='date' />
                        <InputHooks title='Hasta' width='20%' required type='date' value={valuesDates?.toDate} onChange={onChangeInput} name='toDate' />
                        <InputHooks title='Código' width='30%' required error={errorForm?.ProPrice} value={dataForm?.ProPrice} onChange={handleChange} name='ProPrice' />
                        <InputHooks title='Nombre' width='30%' numeric required error={errorForm?.ProPrice} value={dataForm?.ProPrice} onChange={handleChange} name='ProPrice' />
                        <Button type='submit'> Mas opciones</Button>
                        <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                        <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
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
                    {data?.WalletDebt?.map((x, i) => (
                        <ColumnList>
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
                                <Button onClick={() => handleDeleteWallet(x.debtWalletId, x.debtState, x.debtName)}><IconDelete color={PColor} size='25px' /></Button>

                            </Item>
                            <Item>
                                <Button onClick={() => HandleGetOne(x.debtWalletId)}>
                                    Ver detalles
                                </Button>
                            </Item>
                        </ColumnList>
                    ))}
                    {exist && <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
                        setShowMoreWalletUser(s => s + 50)
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
                    }}> {loading ? '...Cargando' : 'Cargar Más'}</RippleButton>}
                </Card>
                <Card width='30%'>
                    {<ManageWallet
                        loading={LoadProduct || loading}
                        dataProducto={dataProducto}
                        product={product}
                        dataFree={productFree}
                        fetchMoreProduct={fetchMoreProduct}
                        OPEN_MODAL={OPEN_MODAL_MANAGE}
                        handleChangeFilter={handleChangeFilter}
                        dispatch={dispatch}
                        search={search}
                        data={dataWallet?.getOneWalletDebt || {}}
                    />}
                </Card>
            </Container>
            {!OPEN_MODAL.state && !OPEN_MODAL_MANAGE.state && <ContentMenuOptions active={modalOptions}>
                <button className="btn-absolute" onClick={() => setOpenModalOptions(!modalOptions)}>
                    <LoadingComponent />
                </button>
                {<RippleButton type='button' padding='5px' widthButton='100%' onClick={handleOpen}>{'Adicionar nueva cartera'}</RippleButton>}
            </ContentMenuOptions>}
        </div>

    )
}
