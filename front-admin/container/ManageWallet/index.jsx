import moment from 'moment'
import { useContext, useEffect, useReducer, useState } from "react"
import { numberFormat } from "../../utils"
import { IconConfig, IconDelete, IconEdit } from "public/icons"
import { RippleButton } from "components/Ripple"
import { useSetState } from "components/hooks/useState"
import { AwesomeModal } from "components/AwesomeModal"
import { BGColor, PColor } from "public/colors"
import { GET_ALL_PRODUCT_STORE } from "container/dashboard/queriesStore"
import { useLazyQuery } from '@apollo/client'
import { Context } from "context/Context"
import { Content, CardContent, Action, CtnList, Grid, LoadingComponent } from "./styled"

export const ManageWallet = ({ data, dataProducto, product, dispatch, loading }) => {
    const { getAllWalletDebtProduct, RefDebtCode, debtName, phoneWalletUser } = data
    const { setAlertBox } = useContext(Context)
    const [amount, setAmount] = useState(0);
    const [amountPro, setAmountPro] = useState(0);
    let amountCount = 0
    useEffect(() => {
        getAllWalletDebtProduct?.forEach(function (a) {
            amountCount += a.debtAmountProduct
        });
        setAmount(amountCount)
    }, [getAllWalletDebtProduct])
    const OPEN_MODAL = useSetState()
    let amountCountPro = 0
    useEffect(() => {
        product?.PRODUCT?.forEach(function (a) {
            amountCountPro += a.ProPrice
        });
        setAmountPro(amountCountPro)
    }, [product])
    const handleAddProduct = elem => {
        // let includes = product?.PRODUCT.includes(elem);
        const { pName } = elem || {}
        dispatch({ type: 'ADD_PRODUCT', payload: elem })
        // if (includes) {
        //     setAlertBox({ message: `El producto ${pName && pName} ya esta agregado a la lista` })
        // } else {
        // }
    }
    if (loading) return <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(load => (
            <div style={{ marginTop: '50px' }}>
                <LoadingComponent />
                <LoadingComponent width='30%' />
                <LoadingComponent width='50%' />
                <LoadingComponent width='10%' />
            </div>
        ))}
    </div>
    return (
        <>
            {<Content>
                <AwesomeModal padding='25px' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                    <Grid>
                        {dataProducto?.map((x, idx) => (
                            <div key={idx.carProId}>
                                <div >
                                    <button onClick={() => handleAddProduct(x)}>Add</button>
                                    <div size='20px' >{x.pName}</div>
                                    <div size='20px' >{x.ProDescription}</div>
                                    <div size='20px' >precio: {x.ProPrice}</div>
                                </div>
                            </div>
                        ))}
                    </Grid>
                    <span>añadir otro producto a la cartera {debtName} {RefDebtCode} </span>
                    <Grid>
                        {product?.PRODUCT?.map((x, idx) => (
                            <div width='100%' key={idx.carProId}>
                                <div >
                                    <span size='20px' >{x.pName}</span>
                                    <span size='20px' >{x.ProDescription}</span>
                                </div>
                                <div >
                                    <RippleButton onClick={() => dispatch({ type: 'REMOVE_PRODUCT', idx })}>
                                        <IconDelete size={20} color={BGColor} />
                                    </RippleButton>
                                </div>
                            </div>
                        ))}
                        {numberFormat(amountPro)}
                    </Grid>
                </AwesomeModal>
                <button onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>{'agregar otro producto'}</button>
                <CardContent>
                    <span>productos ({getAllWalletDebtProduct?.length || 0})</span>
                    <span>Total: {numberFormat(amount)}</span>
                    <span>{RefDebtCode}</span>
                    <span>{debtName}</span>
                    <span># {phoneWalletUser}</span>
                </CardContent>
                <CtnList>
                    {getAllWalletDebtProduct && getAllWalletDebtProduct?.map(x => (
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
                    ))}
                    <Action>
                        $ {numberFormat(amount)}
                        <button>Enviar recordatorio</button>
                        <button>Pagar</button>
                    </Action>
                </CtnList>
            </Content>}
        </>
    )

}
