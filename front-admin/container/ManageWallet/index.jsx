import { Content, CardContent, Action, CtnList } from "./styled"
import moment from 'moment'
import { useContext, useEffect, useReducer, useState } from "react"
import { numberFormat } from "../../utils"
import { IconConfig, IconDelete, IconEdit } from "public/icons"
import { RippleButton } from "components/Ripple"
import { useSetState } from "components/hooks/useState"
import { AwesomeModal } from "components/AwesomeModal"
import { BGColor, PColor } from "public/colors"
import { GET_ALL_PRODUCT_STORE } from "container/dashboard/queriesStore"
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { Context } from "context/Context"

export const ManageWallet = ({ data }) => {
    const { getAllWalletDebtProduct, RefDebtCode, debtName } = data
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
    const initialStateInvoice = {
        PRODUCT: [],
    }
   
    const productAdd = (state, action) => {
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
    const [dataProducto, setData] = useState([])
    const [productFoodsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE)
    const [showMore, setShowMore] = useState(100)
    useEffect(() => {
        dataProduct?.productFoodsAll && setData([...dataProduct?.productFoodsAll])
    }, [dataProduct])
    useEffect(() => {
        productFoodsAll({ variables: { max: showMore } })
    }, [showMore])
    const [product, dispatch] = useReducer(productAdd, initialStateInvoice)
    const handleAdd = () => {

    }
    const handleAddProduct = elem => {
        let includes = product?.PRODUCT.includes(elem);
        console.log(elem)
        const { pName } = elem || {}
        if (includes) {
            setAlertBox({ message: `El producto ${pName && pName} ya esta agregado a la lista` })
        } else {
            dispatch({ type: 'ADD_PRODUCT', payload: elem })
        }
    }
    let amountCountPro = 0
    useEffect(() => {
        product?.PRODUCT?.forEach(function (a) {
            amountCountPro += a.ProPrice
        });
        setAmountPro(amountCountPro)
    }, [product])
    return (
        <>
            {<Content>
                <AwesomeModal zIndex='9999' padding='25px' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                    <span>añadir otro producto a la cartera {debtName} {RefDebtCode} </span>
                    {dataProducto?.map((x, idx) => (
                        <div width='100%' key={idx.carProId}>
                            <div >
                                <button onClick={() => handleAddProduct(x)}>Add</button>
                                <div size='20px' >{x.pName}</div>
                                <div size='20px' >{x.ProDescription}</div>
                                <div size='20px' >precio: {x.ProPrice}</div>
                            </div>
                        </div>
                    ))}
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
                </AwesomeModal>
                <button onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>{'agregar otro producto'}</button>
                <CardContent>
                    <span>productos ({getAllWalletDebtProduct?.length || 0})</span>
                    <span>Total: {numberFormat(amount)}</span>
                    <span>{RefDebtCode}</span>
                    <span>{debtName}</span>
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
