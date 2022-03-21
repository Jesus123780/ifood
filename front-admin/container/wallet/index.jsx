import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import moment from 'moment'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { CREATE_WALLET_DEBT, DELETE_ONE_WALLET_DEBT, GET_ALL_WALLET_DEBT, GET_ONE_WALLET_DEBT } from './queries'
import { Button, Item, Container, CardProduct, OrganiceProduct } from './styled'
import { numberFormat, RandomCode, updateCache } from 'utils'
import { CustomTable } from '../pruebas'
import { Card } from './styled'
import { ManageWallet } from 'container/ManageWallet'
import { IconConfig, IconDelete, IconEdit } from 'public/icons'
import { GET_ALL_PRODUCT_STORE } from 'container/dashboard/queriesStore'
import { BGColor, PColor } from 'public/colors'
import { Context } from 'context/Context'
import { LoadingComponent } from 'container/ManageWallet/styled'
import Image from 'next/image';
import { Flex } from 'container/dashboard/styled'
import { TextH2Main } from 'components/common/h2'

export const WalletC = () => {
    const [amount, setAmount] = useState(0);
    const [dataWalletUser, setDataWallet] = useState([]);
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const { setAlertBox } = useContext(Context)
    const OPEN_MODAL = useSetState()
    const initialStateInvoice = {
        PRODUCT: [],
    }
    const [createWalletDebt] = useMutation(CREATE_WALLET_DEBT)
    const [delWalletDebt] = useMutation(DELETE_ONE_WALLET_DEBT, {
        onCompleted: data => console.log(data),
        onError: data => console.log(data),
    })
    const [dataProducto, setData] = useState([])
    const [showMoreWalletUser, setShowMoreWalletUser] = useState(100)
    const { data, loading, error, fetchMore } = useQuery(GET_ALL_WALLET_DEBT, {
        notifyOnNetworkStatusChange: true,
        refetchWritePolicy: 'merge',
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        onError: (e) => console.log(e),
    })
    const handleDeleteWallet = (debtWalletId, debtState) => {
        delWalletDebt({
            variables: {
                input: {
                    debtWalletId,
                    debtState
                }
            }
        })
    }
    const productRecoger = (state, action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return {
                    ...state,
                    PRODUCT: [...state?.PRODUCT, action?.payload]
                }
            case 'REMOVE_PRODUCT':
                return {
                    PRODUCT: state?.PRODUCT?.filter((t, idx) => idx !== action?.idx)
                };
            case 'REMOVE_ALL':
                return {
                    PRODUCT: []
                };
            case "TOGGLE_INVOICE":
                return {
                    PRODUCT: state?.PRODUCT.map((t, idx) => idx === action.idx ? { ...t, isPaid: !t.isPaid } : t),
                };
            default:
                return state;
        }
    }
    const [showMore, setShowMore] = useState(100)
    const [product, dispatch] = useReducer(productRecoger, initialStateInvoice)
    const [productFoodsAll, { data: dataProduct, loading: LoadProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE)
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
    }, [dataProduct])
    useEffect(() => {
        productFoodsAll({ variables: { max: showMore } })
    }, [showMore])
    console.log(data?.WalletDebt)
    const arr = product?.PRODUCT.map(x => ({ pId: x.pId, debtAmountProduct: x.ProPrice, }))
    const [setCheck, setChecker] = useState({})
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
                            UserDebtId: 'MjcyMDg4ODE0ODUxNTE2NDUw',
                            debtName: dataForm.debtName,
                            personName: dataForm.personName,
                            lastName: dataForm.lastName,
                            gender: setCheck.gender,
                            ccWalletUser: dataForm.ccWalletUser,
                            phoneWalletUser: dataForm.phoneWalletUser,
                            RefDebtCode: RandomCode(9),
                            debtAmount: amount,
                            debtComments: dataForm?.debtComments,
                        },
                        inputLineItems: {
                            setData: arr || []
                        }
                    }
                })
            }
        })

    const handleAddProduct = elem => {
        // let includes = product?.PRODUCT.includes(elem);
        const { pName } = elem || {}
        dispatch({ type: 'ADD_PRODUCT', payload: elem })
        // if (includes) {
        //     setAlertBox({ message: `El producto ${pName && pName} ya esta agregado a la lista` })
        // } else {
        // }
    }

    let amountCount = 0

    useEffect(() => {
        product?.PRODUCT?.forEach(function (a) {
            amountCount += a.ProPrice
        });
        setAmount(amountCount)
    }, [product])
    const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
    const onChangeInput = (e) => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })

    return (
        <>
            <AwesomeModal zIndex='9999' padding='25px' height='100vh' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0px' >
                <Container>
                    <Card sticky width='20%'>
                        <form onSubmit={(e) => handleForm(e)}>
                            <Flex>
                                <input type="checkbox" name="gender" value={setCheck} onChange={(e) => handleCheck(e)} />
                                <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
                            </Flex>
                            {/* <InputHooks type='radio' title='Nombre de la billetera' width={'100%'} required error={errorForm?.debtName} value={dataForm?.debtName} onChange={handleChange} name='debtName' /> */}
                            <InputHooks title='Nombre de la billetera' width={'100%'} required error={errorForm?.debtName} value={dataForm?.debtName} onChange={handleChange} name='debtName' />
                            <InputHooks title='Nombre de la persona' width={'100%'} required error={errorForm?.personName} value={dataForm?.personName} onChange={handleChange} name='personName' />
                            <InputHooks title='Apellido' width={'100%'} required error={errorForm?.lastName} value={dataForm?.lastName} onChange={handleChange} name='lastName' />
                            <InputHooks title='Numero' width={'100%'} required error={errorForm?.phoneWalletUser} value={dataForm?.phoneWalletUser} onChange={handleChange} name='phoneWalletUser' />
                            <InputHooks title='CC de la persona' width={'100%'} required error={errorForm?.ccWalletUser} value={dataForm?.ccWalletUser} onChange={handleChange} name='ccWalletUser' />
                            <InputHooks title='comentario' TypeTextarea={true} width={'100%'} required error={errorForm?.debtComments} value={dataForm?.debtComments} onChange={handleChange} name='debtComments' />
                            <span>monto: $ {numberFormat(amount)}</span>
                            <RippleButton type='submit' widthButton='100%' >Crear</RippleButton>
                        </form>
                    </Card>
                    <Card margin='0' align display='flex' width='70%'>
                        <div>
                            <TextH2Main margin='0 0  0 10px' weight='400' size={'20px'} text={`Mis Productos (${dataProducto?.length || 0})`} /> 
                            <OrganiceProduct margin='0 20px' width='50%'>
                                {dataProducto?.map((x, idx) => (
                                    <CardProduct width='100%' key={idx.carProId}>
                                        <div className='col'>
                                            <h3 className='title' size='20px' >{x.pName}</h3>
                                            <p className='description' size='20px' >{x.ProDescription}</p>
                                            <div size='20px' >precio: $ {numberFormat(x.ProPrice)}</div>
                                            <RippleButton type='button' padding='0' widthButton='100%' onClick={() => handleAddProduct(x)}>Añadir producto</RippleButton>
                                        </div>
                                        <Image
                                            width={550}
                                            height={550}
                                            objectFit='contain'
                                            src={'/images/hamb.jpg'}
                                            alt='Picture'
                                            blurDataURL='data:...'
                                            placeholder='blur' />
                                    </CardProduct>
                                ))}
                            </OrganiceProduct>
                        </div>
                        <div>
                            <TextH2Main margin='0 0  0 40px' weight='400' size={'20px'} text={`Productos agregados a la billetera (${product?.PRODUCT?.length || 0})`} />
                            <OrganiceProduct margin='0 20px' width='50%'>
                                {product?.PRODUCT?.map((x, idx) => (
                                    <CardProduct width='100%' key={idx.carProId}>
                                        <div className='col'>
                                            <h3 className='title' size='20px' >{x.pName}</h3>
                                            <p className='description' size='20px' >{x.ProDescription}</p>
                                            <div size='20px' >precio: $ {numberFormat(x.ProPrice)}</div>
                                            <RippleButton type='button' padding='0' widthButton='100%' onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>
                                                <IconDelete size={20} color={BGColor} />
                                            </RippleButton>
                                            {/* <RippleButton type='button' padding='0' widthButton='100%' onClick={() => handleAddProduct(x)}>Añadir producto</RippleButton> */}
                                        </div>
                                        <Image
                                            width={550}
                                            height={550}
                                            objectFit='contain'
                                            src={'/images/hamb.jpg'}
                                            alt='Picture'
                                            blurDataURL='data:...'
                                            placeholder='blur' />
                                    </CardProduct>
                                ))}
                            </OrganiceProduct>
                        </div>
                    </Card>
                </Container>
            </AwesomeModal>
            <Container>
                <Card >
                    <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton>
                    <form>
                        <InputHooks title='Desde' width={'20%'} required value={valuesDates?.fromDate} onChange={onChangeInput} name='fromDate' type='date' />
                        <InputHooks title='Hasta' width='20%' required type='date' value={valuesDates?.toDate} onChange={onChangeInput} name='toDate' />
                        <InputHooks title='Numero' width='30%' required error={errorForm?.ProPrice} value={dataForm?.ProPrice} onChange={handleChange} name='ProPrice' />
                        <InputHooks title='Nombre' width='30%' numeric required error={errorForm?.ProPrice} value={dataForm?.ProPrice} onChange={handleChange} name='ProPrice' />
                        <Button type='submit'> Mas opciones</Button>
                        <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                        <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
                    </form>
                    {data && data?.WalletDebt?.map((x, i) => (
                        <div odd padding='10px 0' columnWidth={1} key={i}>
                            <Item>
                                <span> {x.RefDebtCode}</span>
                            </Item>
                            <Item>
                                <span> {x.debtName}</span>
                            </Item>
                            <Item>
                                <span> {x.gender === 1 ? 'Masculino' : 'Femenino'}</span>
                            </Item>
                            <Item>
                                <span> {x.personName} {x.lastName}</span>
                            </Item>
                            <Item>
                                <span> {x.ccWalletUser}</span>
                            </Item>
                            <Item>
                                <span> $ {numberFormat(x.debtAmount)}</span>
                            </Item>
                            <Item>
                                <span> {moment(x.createAt).format('DD-MM-YYYY - HH:mm A')} </span>
                            </Item>
                            <Item>
                                <Button onClick={() => handleDeleteWallet(x.debtWalletId, x.debtState)}><IconDelete color={PColor} size='25px' /></Button>
                                <Button><IconEdit color={PColor} size='25px' /></Button>
                                <Button><IconConfig color={PColor} size='25px' /></Button>
                                <Button onClick={() => HandleGetOne(x.debtWalletId)}>
                                    Ver detalles
                                </Button>
                            </Item>
                        </div>
                    ))}
                    {/* <Table
                        titles={[
                            { name: '#', key: 'RefDebtCode', justify: 'flex-start', width: '.4fr' },
                            { name: 'Billetera', key: 'debtName', justify: 'flex-start', width: '.5fr' },
                            { name: 'Genero', key: 'gender', justify: 'flex-start', width: '.5fr' },
                            { name: 'Cliente', key: 'personName', justify: 'flex-start', width: '.5fr' },
                            { name: '# identificación', key: 'ccWalletUser', justify: 'flex-start', width: '.5fr' },
                            { name: 'Monto', key: 'debtAmount', justify: 'flex-start', width: '.5fr' },
                            { name: 'Date', justify: 'flex-start', width: '.5fr' },
                            { name: '', justify: 'flex-start', width: '.5fr' },
                        ]}
                        labelBtn='Product'
                        data={data?.WalletDebt || []}
                        renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                            <Item>
                                <span> {x.RefDebtCode}</span>
                            </Item>
                            <Item>
                                <span> {x.debtName}</span>
                            </Item>
                            <Item>
                                <span> {x.gender === 1 ? 'Masculino' : 'Femenino'}</span>
                            </Item>
                            <Item>
                                <span> {x.personName} {x.lastName}</span>
                            </Item>
                            <Item>
                                <span> {x.ccWalletUser}</span>
                            </Item>
                            <Item>
                                <span> $ {numberFormat(x.debtAmount)}</span>
                            </Item>
                            <Item>
                                <span> {moment(x.createAt).format('DD-MM-YYYY - HH:mm A')} </span>
                            </Item>
                            <Item>
                                <Button onClick={() => delWalletDebt({
                                    variables: { input: { debtWalletId: x.debtWalletId, debtState: x.debtState } }, update: (cache, { data: { WalletDebt } }) => updateCache({
                                        cache,
                                        query: GET_ALL_WALLET_DEBT,
                                        nameFun: 'WalletDebt',
                                        dataNew: WalletDebt
                                    })
                                })}><IconDelete color={PColor} size='25px' /></Button>
                                <Button><IconEdit color={PColor} size='25px' /></Button>
                                <Button><IconConfig color={PColor} size='25px' /></Button>
                                <Button onClick={() => HandleGetOne(x.debtWalletId)}>
                                    Ver detalles
                                </Button>
                            </Item>
                        </Section>)}
                    /> */}
                    {loading && <div style={{ marginTop: '50px' }}>
                        <LoadingComponent />
                        <LoadingComponent />
                        <LoadingComponent />
                        <LoadingComponent />
                    </div>}
                    <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
                        setShowMoreWalletUser(s => s + 5)
                        fetchMore({
                            variables: { max: showMoreWalletUser, min: 0 },
                            updateQuery: (prevResult, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prevResult
                                return {
                                    WalletDebt: [
                                        ...fetchMoreResult.WalletDebt
                                    ]

                                }
                            }
                        })
                    }}> {loading ? '...Cargando' : 'Cargar Más'}</RippleButton>
                </Card>
                <Card width='30%'>
                    <ManageWallet
                        loading={LoadProduct || loading}
                        dataProducto={dataProducto}
                        product={product}
                        dispatch={dispatch}
                        data={dataWallet?.getOneWalletDebt || {}}
                    />
                </Card>
            </Container>
        </>

    )
}
