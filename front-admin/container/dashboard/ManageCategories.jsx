import PropTypes from 'prop-types'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ALL_PRODUCT_STORE, REGISTER_CAT_OF_PRODUCTS } from './queriesStore'
import { CtnItems, FlexContent } from './styled'
import { useFormTools } from '../../components/BaseForm'
import InputHooks from '../../components/InputHooks/InputHooks'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import { ButtonAction } from './styledStore'
import { DELETE_ONE_CAT_PRODUCTS, DELETE_ONE_CAT_PRODUCTS_FINAL, GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ULTIMATE_CATEGORY_PRODUCTS, UPDATE_CAT_IN_PRODUCT } from './queries'
import { IconBuy, IconDelete, IconEdit, IconPause } from '../../public/icons'
import { RippleButton } from '../../components/Ripple'
import { PColor, WColor } from '../../public/colors'
import { Item } from '../../components/Update/Products/styled'
import { SkeletonP } from '../../components/Update/Products/food'
import { Table } from 'components/Table'
import styled from 'styled-components'
import { Section } from 'components/Table/styled'
import { CardProducts } from 'components/CartProduct'
import { Context } from 'context/Context'

export const ManageCategories = ({ SHOW_MODAL_UPDATE_PRODUCTS }) => {
  // STATES
  const initialStateInvoice = {
    PRODUCT: []
  }
  const { setAlertBox } = useContext(Context)

  const SHOW_CATEGORIES = useSetState(false)
  const [idCat, setIdCat] = useState('')
  const [dataProducto, setData] = useState([])
  const [showMore, setShowMore] = useState(100)
  const [openModalProducts, setOpenModalProducts] = useState(false)
  // QUERIES
  const [updatedProducts, { loading, error }] = useMutation(REGISTER_CAT_OF_PRODUCTS)
  const [deleteCatOfProducts] = useMutation(DELETE_ONE_CAT_PRODUCTS, {
    onError: (error) => {
      console.error({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          catProductsAll(dataOld = []) {
            return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
          }
        }
      })
    }
  })
  const [deleteCatFinalOfProducts] = useMutation(DELETE_ONE_CAT_PRODUCTS_FINAL, {
    onError: (error) => {
      console.error({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          catProductsAll(dataOld = []) {
            return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
          }
        }
      })
    }
  })
  const [updatedCatWithProducts] = useMutation(UPDATE_CAT_IN_PRODUCT, {
    onError: (error) => {
      console.error({
        message: error.graphQLErrors[0].message,
        color: WColor
      })
    },
    update(cache) {
      cache.modify({
        fields: {
          catProductsAll(dataOld = []) {
            return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
          }
        }
      })
    }
  })
  const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
  const [productFoodsAll, { data: dataProduct }] = useLazyQuery(GET_ALL_PRODUCT_STORE)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  // HANDLES
  const handleForm = (e) => {
    return handleSubmit({
      event: e,
      action: () => {
        const { catName, catDescription } = dataForm
        return updatedProducts({
          variables: {
            input: {
              pName: catName,
              ProDescription: catDescription
            }
          },
          update(cache) {
            cache.modify({
              fields: {
                catProductsAll(dataOld = []) {
                  return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                }
              }
            }),
            cache.modify({
              fields: {
                getCatProductsWithProduct(dataOld = []) {
                  return cache.writeQuery({ query: GET_ALL_CATEGORIES_WITH_PRODUCT, data: dataOld })
                }
              }
            })
          }
        })
      },
      actionAfterSuccess: () => {
        setDataValue({})
        SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state)
      }
    })
  }

  const productRecoger = (state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return {
          ...state,
          // eslint-disable-next-line
          PRODUCT: [...state?.PRODUCT, action?.payload]
        }
      case 'REMOVE_PRODUCT':
        return {
          PRODUCT: state?.PRODUCT?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_ALL':
        return {
          PRODUCT: []
        }
      case 'TOGGLE_INVOICE':
        return {
          PRODUCT: state?.PRODUCT.map((t, idx) => { return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t })
        }
      default:
        return state
    }
  }
  const [data, dispatch] = useReducer(productRecoger, initialStateInvoice)

  const handleAddProduct = elem => {
    let includes = data?.PRODUCT.includes(elem)
    if (includes) {
      setAlertBox({ message: 'El producto ya esta en la lista' })
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }

  }
  const handleUpdateCatInProduct = async () => {
    await updatedCatWithProducts({
      variables: {
        input: {
          setData: data?.PRODUCT?.map(x => { return { idProduct: x.pId } }),
          idCat: idCat
        }
      }
    })
  }
  const openModal = (carProId) => {
    setIdCat(carProId)
    setOpenModalProducts(!openModalProducts)
  }
  // EFFECTS
  useEffect(() => {
    // eslint-disable-next-line
    dataProduct?.productFoodsAll && setData([...dataProduct?.productFoodsAll])
  }, [dataProduct])
  useEffect(() => {
    productFoodsAll({ variables: { max: showMore } })
  }, [showMore])
  return (
    <>
      <AwesomeModal
        backdrop='static'
        bgColor='transparent'
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => { return false }}
        onHide={() => { SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }}
        padding='25px'
        show={SHOW_CATEGORIES.state}
        size='large'
        zIndex='90'
      >
        <form onSubmit={(e) => { return handleForm(e) }}>
          <InputHooks
            error={errorForm?.catName}
            name='catName'
            onChange={handleChange}
            required
            title='Nombre de la categoría'
            value={dataForm?.catName}
            width='100%'
          />
          <InputHooks
            TypeTextarea
            error={errorForm?.catDescription}
            name='catDescription'
            onChange={handleChange}
            required
            title='Description'
            value={dataForm?.catDescription}
            width='100%'
          />
          <ButtonAction type='submit'>
            Submit
          </ButtonAction>
        </form>
        <ButtonAction onClick={() => { return SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }}> Registrar  Categorías de productos </ButtonAction>
      </AwesomeModal>
      <ButtonAction onClick={() => { return SHOW_CATEGORIES.setState(!SHOW_CATEGORIES.state) }}> Adicionar Categorías</ButtonAction>
      <Table
        data={datCat?.catProductsAll}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((x, i) => {
            return <Section
              columnWidth={titles}
              key={i}
              odd
              padding='10px 0'
            >
              <Item>
                <span># {x.pName}</span>
              </Item>
              <Item>
                <span> {x.ProDescription}</span>
              </Item>
              <Item>
                <button
                  className='btn'
                  onClick={() => { return deleteCatOfProducts({ variables: { idPc: x.carProId, pState: x.pState }, update(cache) {
                    cache.modify({
                      fields: {
                        catProductsAll(dataOld = []) {
                          return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                        }
                      }
                    })
                  } }) }}
                >
                  <IconPause color={PColor} size={30} />
                </button>
              </Item>
              <Item>
                <Button onClick={() => { return openModal(x.carProId) }}> Seleccionar </Button>
              </Item>
              <Item>
                <button
                  onClick={() => {
                    return deleteCatFinalOfProducts({
                      variables: { idPc: x.carProId }, update(cache) {
                        cache.modify({
                          fields: {
                            catProductsAll(dataOld = []) {
                              return cache.writeQuery({ query: GET_ULTIMATE_CATEGORY_PRODUCTS, data: dataOld })
                            }
                          }
                        })
                      }
                    })
                  }}
                >
                  <IconDelete color={PColor} size={20} />
                </button>
              </Item>
              <Item>
                <button onClick={() => { return deleteCatFinalOfProducts({ variables: { idPc: x.carProId } }) }}>
                  <IconEdit color={PColor} size={20} />
                </button>
              </Item>
            </Section>
          })
        }
        }
        titles={[
          { name: 'Nombre', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Descripción', justify: 'flex-center', width: '1fr' },
          { name: 'Pausar ventas', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' }
        ]}

      />
      <AwesomeModal
        backdrop='static'
        bgColor='transparent'
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={true}
        footer={true}
        header={true}
        height='100vh'
        onCancel={() => { return setOpenModalProducts(!openModalProducts) }}
        onConfirm={() => { return handleUpdateCatInProduct() }}
        onHide={() => { return setOpenModalProducts(!openModalProducts) }}
        padding='25px'
        show={openModalProducts}
        size='large'
        zIndex='990'
      >
        <RippleButton onClick={() => { return SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state) }} padding='5px'> Subir productos</RippleButton >
        <FlexContent>
          <CtnItems>
            {!dataProducto?.length ? <SkeletonP /> : dataProducto?.map((x) => {
              return (
                <CardProducts
                  ProDescription={x.ProDescription}
                  ProDescuento={x.ProDescuento}
                  ProImage={x.ProImage}
                  ProPrice={x.ProPrice}
                  ValueDelivery={x.ValueDelivery}
                  edit
                  key={x.pId}
                  onClick={() => { return handleAddProduct(x) }}
                  pId={x.pId}
                  pName={x.pName}
                  render={<IconBuy color={PColor} size={20} />}
                />
              )
            })}
          </CtnItems>
          <CtnItems>
            {data?.PRODUCT?.map((x, idx) => {
              return (

                <CardProducts
                  ProDescription={x.ProDescription}
                  ProDescuento={x.ProDescuento}
                  ProImage={x.ProImage}
                  ProPrice={x.ProPrice}
                  ValueDelivery={x.ValueDelivery}
                  edit
                  key={x.pId}
                  onClick={() => { return dispatch({ type: 'REMOVE_PRODUCT', idx }) }}
                  pId={x.pId}
                  pName={x.pName}
                  render={<IconDelete color={PColor} size={20} />}
                />
              )
            })}
          </CtnItems>
        </FlexContent>
      </AwesomeModal >
    </>
  )
}

ManageCategories.propTypes = {
  SHOW_MODAL_UPDATE_PRODUCTS: PropTypes.shape({
    setState: PropTypes.func,
    state: PropTypes.any
  })
}

const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`