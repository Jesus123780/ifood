import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CHANGE_STATE, GET_ALL_RESTAURANT, UPLOAD_FILE } from './queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useSetState } from '../../components/hooks/useState'
import { InputFiles } from 'components/InputFilesPrev'
import { numberFormat, updateCache } from 'utils'
import { Section } from 'components/Table/styled'
import { Table } from 'components/Table'
// import NewSelect from 'components/NewSelect'
import Link from 'next/link'
import { Button, Item, ItemStatus, Select } from './styled'
import { useQuery } from '@apollo/client';
import { CLIENT_URL_BASE } from 'apollo/urls'
import { Context } from 'context/Context'
import { RippleButton } from 'components/Ripple'
import NewSelect from 'components/NewSelectHooks'
import InputHooks from 'components/InputHooks/InputHooks'
import { useFormTools } from 'components/BaseForm'
import { Form, Container } from 'components/common/Reusable'
import { AwesomeModal } from 'components/AwesomeModal'

export const Stores = () => {
  const { Location, setAlertBox } = useContext(Context)
  const [more, setMore] = useState(100)
  const [data, setData] = useState([])
  const [setChangeStatus] = useMutation(CHANGE_STATE)
  const [getAllStoreAdmin, { data: dataRestaurant, fetchMore, loading }] = useLazyQuery(GET_ALL_RESTAURANT, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: 'cache-first',
    refetchWritePolicy: 'merge',
    // variables: {
    //   cId: Location.countryId,
    //   dId: Location.department,
    //   ctId: Location.city
    // }
  })
  useEffect(() => {
    dataRestaurant?.getAllStoreAdmin && setData([...dataRestaurant?.getAllStoreAdmin])
    getAllStoreAdmin({
      variables: {
        cId: Location.countryId, dId: Location.department, ctId: Location.city, max: more
      }, 
    })
  }, [Location])
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [select, setSelect] = useState(2)
  const handleStatus = (e) => {
    setSelect(e.target.value)
  }
  const [openModal, setOpenModal] = useState(false)
  // console.log(parseInt(select))
  const HandleSearch = useCallback(() => {
    getAllStoreAdmin({ variables: { search: dataForm.search, uState: parseInt(select) } })
  }, [select, dataForm, dataRestaurant])
  const handleState = async ({ idStore, uState }) => {
    setChangeStatus({
      variables: { idStore: idStore, uState: uState },
      update: (cache, { data: { getAllStoreAdmin } }) => updateCache({
        cache,
        query: GET_ALL_RESTAURANT,
        nameFun: 'getAllStoreAdmin',
        dataNew: getAllStoreAdmin
      })
    }).then((data) => setAlertBox({ message: data?.data?.setChangeStatus?.message })).catch((error) => console.log({ message: error }))
  }
  return (
    <Container>
      <AwesomeModal zIndex='9990' padding='25px' show={openModal} onHide={() => { setOpenModal(!openModal) }} onCancel={() => false} size='50%' btnCancel={true} btnConfirm={false} header={true} footer={false} >
        Hola Pronto mas acciones
      </AwesomeModal>
      <Form>
        <InputHooks title='Desde' width={'20%'} required error={errorForm?.Desde} value={dataForm?.Desde} onChange={handleChange} name='Desde' type='date' />
        <InputHooks title='Hasta' width='20%' required type='date' error={errorForm?.ProDescuento} value={dataForm?.ProDescuento} onChange={handleChange} name='ProDescuento' />
        <InputHooks title='search' width='30%' required error={errorForm?.search} value={dataForm?.search} onChange={handleChange} name='search' />
        <Select onChange={(e) => handleStatus(e)} defaultValue='2' name='active'>
          <option value={1}>PENDIENTE</option>
          <option value={2} >ACTIVOS</option>
        </Select>
        <Button type='button' onClick={() => setOpenModal(!openModal)}>
          Mas opciones
        </Button>
        <RippleButton padding='10px' margin='30px' type='button' onClick={() => HandleSearch()}>Consultar</RippleButton>
        <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
      </Form>
      <Table
        titles={[
          { name: 'Cancelado por', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Numero', key: 'storePhone', justify: 'flex-center', width: '1fr' },
          { name: 'Date', justify: 'flex-center', width: '1fr' },
          { name: 'Canal', justify: 'flex-center', width: '1fr' },
          { name: 'Ubicación', justify: 'flex-center', width: '1fr' },
          { name: 'Cambiar estado', justify: 'flex-center', width: '1fr' },
          { name: 'Estado', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' },
        ]}
        labelBtn='Product'
        data={dataRestaurant?.getAllStoreAdmin || []}
        renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
          <Item>
            <span> R {x.storeName}</span>
          </Item>
          <Item>
            <span>{x.storePhone}</span>
          </Item>
          <Item>
            <span> 20/03/2020 - 12:43</span>
          </Item>
          <Item>
            <span> DELIVERY-APP </span>
          </Item>
          <Item>
            <span> {x?.city?.cName}</span>
            <span> {x?.department?.dName}</span>
            <span> {x?.pais?.cName}</span>
          </Item>
          <Item onClick={() => handleState({ idStore: x.idStore, uState: x.uState })}>
            <span> $ Cambiar estado</span>
          </Item>
          <Item>
            <ItemStatus active={x.uState == 1}>
              <span> {x.uState == 1 ? 'PENDIENTE' : 'ACTIVO'}</span>
            </ItemStatus>
          </Item>
          <Item>
            <Button>
              <Link href={{ pathname: `${CLIENT_URL_BASE}delivery/${x?.city?.cName?.toLocaleLowerCase()}-${x?.department?.dName?.toLocaleLowerCase()}/${x.storeName.replace(/\s/g, '-').toLocaleLowerCase()}/${x.idStore}` }}>
                <a target="_blank">
                  Ver detalles
                </a>
              </Link>
            </Button>
          </Item>
        </Section>)}
      />
      <RippleButton widthButton='100%' margin='20px auto' onClick={() => {
        setMore(more + 100)
        // getAllStoreAdmin()
        fetchMore({
          variables: { max: more, min: 0 },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prevResult
            return {
              getAllStoreAdmin: [...fetchMoreResult.getAllStoreAdmin]

            }
          }
        })
      }}>{loading ? '...Cargando' : 'Cargar mas'}</RippleButton>
    </Container>
  )
}
