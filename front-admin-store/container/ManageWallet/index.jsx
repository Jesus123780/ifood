import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { numberFormat } from '../../utils'
import { IconConfig, IconDelete, IconEdit, IconPlus } from 'public/icons'
import { RippleButton } from 'components/Ripple'
import { useSetState } from 'components/hooks/useState'
import Image from 'next/image'
import { AwesomeModal } from 'components/AwesomeModal'
import { BColor, BGColor, PColor } from 'public/colors'
import { Context } from 'context/Context'
import { Content, CardContent, Action, CtnList, Grid, SubTitle, Container, CardDynamic, FooterOptionWallet, Input } from './styled'
import { CardProduct } from 'container/wallet/styled'

export const ManageWallet = ({ data, dataProducto, product, dispatch, loading, search, handleChangeFilter, dataFree, fetchMoreProduct, OPEN_MODAL }) => {
  const { getAllWalletDebtProduct, RefDebtCode, debtName, phoneWalletUser, debtAmount } = data
  const { setAlertBox } = useContext(Context)
  const [amount, setAmount] = useState(0)
  const [modalOptions, setOpenModalOptions] = useState(true)
  const [amountPro, setAmountPro] = useState(0)
  const [showMoreProduct, setShowMoreProducts] = useState(100)

  let amountCount = 0
  useEffect(() => {
    getAllWalletDebtProduct?.forEach(function (a) {
      amountCount += a.debtAmountProduct
    })
    setAmount(amountCount)
  }, [getAllWalletDebtProduct])
  let amountCountPro = 0
  useEffect(() => {
    product?.PRODUCT_WALLET?.forEach(function (a) {
      amountCountPro += a.ProPrice
    })
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
        <AwesomeModal
          footer={true}
          height='100vh'
          onCancel={() => {return false}}
          onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
          show={OPEN_MODAL.state}
          size='large'
        >
          <Container>
            <CardDynamic display='flex' width={OPEN_OPTION.state ? '100%' : '80%'}>
              <div>
                {/* <button onClick={() => OPEN_OPTION.setState(!OPEN_OPTION.state)}>{OPEN_OPTION.state ? 'Abrir menu' : 'Cerrar menu'}</button> */}
                <SubTitle align='start' size='15px' >Puedes Añadir varios producto a la cartera {debtName} {RefDebtCode} </SubTitle>
                <Input
                  autoComplete={'off'}
                  autoFocus={true}
                  label='Busca tus productos '
                  name='search'
                  onChange={handleChangeFilter}
                  type='text'
                  value={search}
                />
                <SubTitle size='15px'>{search && `producto buscado por ${search}`}</SubTitle>
                <span>{dataFree?.length ? `${dataFree?.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</span>
                <Grid>
                  {dataProducto?.map((x, idx) => {return (
                    <CardProduct key={idx + 1} width='100%'>
                      <div className='col'>
                        <h3 className='title' size='20px' >{(x.pName)}</h3>
                        <p className='description' size='20px' >{x.ProDescription}</p>
                        <div size='20px' >precio: $ {numberFormat(x.ProPrice)}</div>
                        <button onClick={() => {return handleAddProduct(x)}}>Añadir <IconPlus size='10px' /></button>
                      </div>
                      <Image
                        alt='Picture'
                        blurDataURL='data:...'
                        height={550}
                        objectFit='contain'
                        placeholder='blur'
                        src={'/images/hamb.jpg'}
                        width={550}
                      />
                    </CardProduct>
                  )})}
                </Grid>
                <RippleButton
                  margin='20px auto'
                  onClick={() => {
                    setShowMoreProducts(s => {return s + 50})
                    fetchMoreProduct({
                      variables: { max: showMoreProduct, min: 0 },
                      updateQuery: (prevResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prevResult
                        // let productFoodsAll = [...prevResult.productFoodsAll]
                        return {
                          productFoodsAll: [
                          // productFoodsAll,
                            ...fetchMoreResult.productFoodsAll]
                        }
                      }
                    })
                  }}
                  widthButton='100%'
                > {loading ? '...Cargando' : 'CARGAR MÁS'}</RippleButton>
              </div>
              <div>
                {/* <button type="button"></button> */}
                <SubTitle align='start' size='15px'>{product?.PRODUCT_WALLET.length === 0 ? 'Añade un ' : 'añadir otro'} producto a la cartera {debtName} {RefDebtCode} </SubTitle>
                <Input
                  autoComplete={'off'}
                  autoFocus={true}
                  label='Busca tus productos'
                  name='search'
                  onChange={handleChangeFilter}
                  type='text'
                  value={search}
                />
                <SubTitle size='15px'>{search && `producto buscado por ${search}`}</SubTitle>
                <span>{dataFree?.length ? `${dataFree?.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</span>
                <Grid>
                  {product ? product?.PRODUCT_WALLET?.map((x, idx) => {return (
                    <CardProduct key={idx.carProId} width='100%'>
                      <div className='col'>
                        <h3 className='title' size='20px' >{(x.pName)}</h3>
                        <p className='description' size='20px' >{x.ProDescription}</p>
                        <div size='20px' >precio: $ {numberFormat(x.ProPrice)}</div>
                        <RippleButton onClick={() => {return dispatch({ type: 'REMOVE_PRODUCT_WALLET', idx })}} padding='0'>
                                                    Eliminar <IconDelete color={BGColor} size={15} />
                        </RippleButton>
                      </div>
                      <Image
                        alt='Picture'
                        blurDataURL='data:...'
                        height={550}
                        objectFit='contain'
                        placeholder='blur'
                        src={'/images/hamb.jpg'}
                        width={550}
                      />
                    </CardProduct>
                  )}) : <span>Aun no hay productos</span>}
                </Grid>
              </div>
            </CardDynamic>
            {/* OPTIONS */}
            <CardDynamic height={'100vh'} width={OPEN_OPTION.state ? '0%' : '20%'}>
              <div>
                <SubTitle align='start' size='17px'>Deuda anterior $ {numberFormat(debtAmount)}</SubTitle>
                {product?.PRODUCT_WALLET.length !== 0 && <SubTitle align='start' size='17px'>Deuda sumada $ {numberFormat(debtAmount + amountPro)}</SubTitle>}
                <FooterOptionWallet>
                  <RippleButton onClick={() => { product?.PRODUCT_WALLET.length === 0 ? setAlertBox({ message: 'Ya no hay productos', duration: 7000 }) : dispatch({ type: 'REMOVE_ALL_WALLET' }) }} widthButton='50%'>
                                        Vaciar
                  </RippleButton>
                  <SubTitle>$ {numberFormat(amountPro)}</SubTitle>
                </FooterOptionWallet>
              </div>
            </CardDynamic>
          </Container>
        </AwesomeModal>
        <CardContent>
          <SubTitle
            align='start'
            margin='0'
            size='12px'
          >productos {getAllWalletDebtProduct?.length || 0}</SubTitle>
          <SubTitle
            align='start'
            margin='0'
            size='12px'
          >Total {numberFormat(amount)}</SubTitle>
          <SubTitle
            align='start'
            margin='0'
            size='12px'
          >{RefDebtCode}</SubTitle>
          <SubTitle
            align='start'
            margin='0'
            size='12px'
          >{debtName}</SubTitle>
          <SubTitle
            align='start'
            margin='0'
            size='12px'
          ># {phoneWalletUser}</SubTitle>
        </CardContent>
        {getAllWalletDebtProduct && <RippleButton
          bgColor={'#f2f2f2'}
          color={BColor}
          onClick={() => {return OPEN_MODAL.setState(!OPEN_MODAL.state)}}
          padding='5px'
          type='button'
          widthButton='100%'
        >{'agregar otro producto'}</RippleButton>}
        <CtnList>
          {getAllWalletDebtProduct ? getAllWalletDebtProduct?.map(x => {return (
            <div className='items' key={x.debtWalletProductId}>
              <div>
                <div>Monto: $ {numberFormat(x.debtAmountProduct)}</div>
                <div>Creado: {moment(x.createAt).format('DD-MM-YYYY - HH:mm A')}</div>
                <div> Estado: {x.debtProductState === 1 ? 'Pendiente' : 'Cancelado'}</div>
              </div>
              <button><IconDelete color={PColor} size='25px' /></button>
              <button><IconEdit color={PColor} size='25px' /></button>
              <button><IconConfig color={PColor} size='25px' /></button>
            </div>
          )}) : <span></span>}
          <Action>
            <SubTitle align='start'>$ {numberFormat(amount)}</SubTitle>
          </Action>
        </CtnList>
      </Content>}
    </Container>
  )

}
