import moment from 'moment'
import { useContext, useEffect, useReducer, useState } from "react"
import { numberFormat } from "../../utils"
import { IconConfig, IconDelete, IconEdit, IconPlus } from "public/icons"
import { RippleButton } from "components/Ripple"
import { useSetState } from "components/hooks/useState"
import Image from 'next/image';
import { AwesomeModal } from "components/AwesomeModal"
import { BColor, BGColor, PColor } from "public/colors"
import { Context } from "context/Context"
import { Content, CardContent, Action, CtnList, Grid, LoadingComponent, SubTitle, Container, CardDynamic, FooterOptionWallet, Input, ContentMenuOptions } from "./styled"
import { CardProduct } from 'container/wallet/styled'

export const ManageWallet = ({ data, dataProducto, product, dispatch, loading, search, handleChangeFilter, dataFree, fetchMoreProduct, OPEN_MODAL }) => {
    const { getAllWalletDebtProduct, RefDebtCode, debtName, phoneWalletUser, debtAmount } = data
    const { setAlertBox } = useContext(Context)
    const [amount, setAmount] = useState(0);
    const [modalOptions, setOpenModalOptions] = useState(true)
    const [amountPro, setAmountPro] = useState(0);
    const [showMoreProduct, setShowMoreProducts] = useState(100)

    let amountCount = 0
    useEffect(() => {
        getAllWalletDebtProduct?.forEach(function (a) {
            amountCount += a.debtAmountProduct
        });
        setAmount(amountCount)
    }, [getAllWalletDebtProduct])
    let amountCountPro = 0
    useEffect(() => {
        product?.PRODUCT_WALLET?.forEach(function (a) {
            amountCountPro += a.ProPrice
        });
        setAmountPro(amountCountPro)
    }, [product])
    const handleAddProduct = elem => {
        const { pName } = elem || {}
        dispatch({ type: 'ADD_PRODUCT_WALLET', payload: elem })
    }
    const OPEN_OPTION = useSetState(false)
    function handleOpen() {
        OPEN_MODAL.setState(!OPEN_MODAL.state)
        setOpenModalOptions(!modalOptions)
    }
    return (
        <Container>
            {<Content>
                <AwesomeModal height='100vh' show={OPEN_MODAL.state} footer={true} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='large' >
                    <Container>
                        <CardDynamic display='flex' width={OPEN_OPTION.state ? '100%' : '80%'}>
                            <div>
                                {/* <button onClick={() => OPEN_OPTION.setState(!OPEN_OPTION.state)}>{OPEN_OPTION.state ? 'Abrir menu' : 'Cerrar menu'}</button> */}
                                <SubTitle size='15px' align='start' >Puedes Añadir varios producto a la cartera {debtName} {RefDebtCode} </SubTitle>
                                <Input autoFocus={true} autoComplete={'off'} label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' />
                                <SubTitle size='15px'>{search && `producto buscado por ${search}`}</SubTitle>
                                <span>{dataFree.length ? `${dataFree.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</span>
                                <Grid>
                                    {dataProducto?.map((x, idx) => (
                                        <CardProduct width='100%' key={idx.pId}>
                                            <div className='col'>
                                                <h3 className='title' size='20px' >{(x.pName)}</h3>
                                                <p className='description' size='20px' >{x.ProDescription}</p>
                                                <div size='20px' >precio: $ {numberFormat(x.ProPrice)}</div>
                                                <button onClick={() => handleAddProduct(x)}>Añadir <IconPlus size='10px' /></button>
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
                                </Grid>
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
                            </div>
                            <div>
                                {/* <button type="button"></button> */}
                                <SubTitle size='15px' align='start'>{product?.PRODUCT_WALLET.length === 0 ? 'Añade un ' : 'añadir otro'} producto a la cartera {debtName} {RefDebtCode} </SubTitle>
                                <Input autoFocus={true} autoComplete={'off'} label='Busca tus productos' name='search' value={search} onChange={handleChangeFilter} type='text' />
                                <SubTitle size='15px'>{search && `producto buscado por ${search}`}</SubTitle>
                                <span>{dataFree.length ? `${dataFree.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</span>
                                <Grid>
                                    {product ? product?.PRODUCT_WALLET?.map((x, idx) => (
                                        <CardProduct width='100%' key={idx.carProId}>
                                            <div className='col'>
                                                <h3 className='title' size='20px' >{(x.pName)}</h3>
                                                <p className='description' size='20px' >{x.ProDescription}</p>
                                                <div size='20px' >precio: $ {numberFormat(x.ProPrice)}</div>
                                                <RippleButton padding='0' onClick={() => dispatch({ type: 'REMOVE_PRODUCT_WALLET', idx })}>
                                                    Eliminar <IconDelete size={15} color={BGColor} />
                                                </RippleButton>
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
                                    )) : <span>Aun no hay productos</span>}
                                </Grid>
                            </div>
                        </CardDynamic>
                        {/* OPTIONS */}
                        <CardDynamic height={'100vh'} width={OPEN_OPTION.state ? '0%' : '20%'}>
                            <div>
                                <SubTitle align='start' size='17px'>Deuda anterior $ {numberFormat(debtAmount)}</SubTitle>
                                {product?.PRODUCT_WALLET.length !== 0 && <SubTitle align='start' size='17px'>Deuda sumada $ {numberFormat(debtAmount + amountPro)}</SubTitle>}
                                <FooterOptionWallet>
                                    <RippleButton widthButton='50%' onClick={() => { product?.PRODUCT_WALLET.length === 0 ? setAlertBox({ message: 'Ya no hay productos', duration: 7000 }) : dispatch({ type: 'REMOVE_ALL_WALLET' }) }}>
                                        Vaciar
                                    </RippleButton>
                                    <SubTitle>$ {numberFormat(amountPro)}</SubTitle>
                                </FooterOptionWallet>
                            </div>
                        </CardDynamic>
                    </Container>
                </AwesomeModal>
                <CardContent>
                    <SubTitle margin='0' size='12px' align='start'>productos {getAllWalletDebtProduct?.length || 0}</SubTitle>
                    <SubTitle margin='0' size='12px' align='start'>Total {numberFormat(amount)}</SubTitle>
                    <SubTitle margin='0' size='12px' align='start'>{RefDebtCode}</SubTitle>
                    <SubTitle margin='0' size='12px' align='start'>{debtName}</SubTitle>
                    <SubTitle margin='0' size='12px' align='start'># {phoneWalletUser}</SubTitle>
                </CardContent>
                {getAllWalletDebtProduct && <RippleButton bgColor={'#f2f2f2'} type='button' color={BColor} padding='5px' widthButton='100%' onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>{'agregar otro producto'}</RippleButton>}
                <CtnList>
                    {getAllWalletDebtProduct ? getAllWalletDebtProduct?.map(x => (
                        <div className="items" key={x.debtWalletProductId}>
                            <div>
                                <div>Monto: $ {numberFormat(x.debtAmountProduct)}</div>
                                <div>Creado: {moment(x.createAt).format('DD-MM-YYYY - HH:mm A')}</div>
                                <div> Estado: {x.debtProductState === 1 ? 'Pendiente' : 'Cancelado'}</div>
                            </div>
                            <button><IconDelete color={PColor} size='25px' /></button>
                            <button><IconEdit color={PColor} size='25px' /></button>
                            <button><IconConfig color={PColor} size='25px' /></button>
                        </div>
                    )) : <span></span>}
                    <Action>
                        <SubTitle align='start'>$ {numberFormat(amount)}</SubTitle>
                    </Action>
                </CtnList>
            </Content>}
        </Container>
    )

}
