import { useFormTools } from 'components/BaseForm'
import React, { useEffect, useState } from 'react'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import moment from 'moment'
import { ProvidersCreate } from './create'
import { GET_ALL_PROVIDERS } from './queries'
import Image from 'next/image'
import { useLazyQuery } from '@apollo/client'
import { Button, Container, ColProviders } from './styled'
import { Loading } from 'components/Loading'

export const Providers = () => {
  const [{ fromDate, toDate }, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })
  const [more, setShowMore] = useState(100)
  const OPEN_MODAL = useSetState()
  const [dataProvider, setDataProvider] = useState([])

  const [handleChange, { dataForm, errorForm }] = useFormTools()
  const [getAllProviders, { data, fetchMore, loading }] = useLazyQuery(GET_ALL_PROVIDERS, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: 'cache-first',
    refetchWritePolicy: 'merge'
  })
  useEffect(() => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    data?.getAllProviders && setDataProvider([...data?.getAllProviders])
    getAllProviders({
      variables: {
        // fromDate,
        // toDate,
      }
    })
  }, [dataProvider])
  return (
    <Container>
      <RippleButton onClick={() => { return OPEN_MODAL.setState(!OPEN_MODAL.state) }}>Crear nuevo</RippleButton>
      <ProvidersCreate setShow={OPEN_MODAL.setState} show={OPEN_MODAL.state} />
      <form>
        <InputHooks
          name='fromDate'
          // eslint-disable-next-line no-undef
          onChange={e => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }}
          title='Desde'
          type='date'
          value={fromDate}
          width='30%'
        />
        <InputHooks
          name='toDate'
          // eslint-disable-next-line no-undef
          onChange={e => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }}
          title='Hasta'
          type='date'
          value={toDate}
          width='30%'
        />
        <InputHooks
          error={errorForm?.ProPrice}
          name='ProPrice'
          onChange={handleChange}
          required
          title='Numero'
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
        <Button type='submit'>
          Mas opciones
        </Button>
        <RippleButton margin='30px' padding='10px'>Consultar</RippleButton>
        <RippleButton margin='30px' padding='10px'>Consultar y exportar</RippleButton>
      </form>
      <ColProviders>
        <div>#</div>
        <div>Img</div>
        <div>Nombre</div>
        <div>PrAdres</div>
        <div>PrNumberPhone</div>
        <div>PrNit</div>
        <div>PrNumberIdentity</div>
        <div>TotalBysPr</div>
        <div>TotalDeuda</div>
      </ColProviders>
      {!loading && dataProvider?.length > 0 && dataProvider?.map((provider, i) => {
        return (
          <ColProviders key={provider.idProvider}>
            <div>{i + 1}</div>
            <div>
              <Image
                alt={''}
                blurDataURL='/images/DEFAULTBANNER.png'
                className='store_image'
                height={70}
                layout='responsive'
                objectFit='contain'
                placeholder='blur'
                src={provider.prImage || '/images/202109081904_64O5_i.webp'}
                width={70} // Optional blur-up while loading
              />
            </div>
            <div>{provider.prName}</div>
            <div>{provider.PrAdres}</div>
            <div>{provider.PrNumberPhone}</div>
            <div>{provider.PrNit}</div>
            <div>{provider.PrNumberIdentity}</div>
            <div>{provider.TotalBysPr}</div>
            <div>{provider.TotalDeuda}</div>
            <div>{provider.prState === 1 ? 'Activo' : 'In activo'}</div>
          </ColProviders>
        )
      })}
      <RippleButton
        margin='20px auto'
        onClick={() => {
          setShowMore(s => { return s + 5 })
          fetchMore({
            variables: { max: more, min: 0 },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              return {
                getAllProviders: [...fetchMoreResult.getAllProviders]

              }
            }
          })
        }}
        widthButton='100%'
      >{loading ? <Loading /> : 'CARGAR MÁS'}</RippleButton>
    </Container>
  )
}

// Conforta y elegancia
// .
// :
// :
// :
// :
// :
// :
// #interiordesigner #interiordecor #interiorstyling #interiores #designdeinteriores #interiorinspo #arquiteturadeinteriores #interiordecorating #interiorinspiration #interiorismo #homeinterior #interiorstyle #designinterior #diseñodeinteriores #pazinterior #interiorarchitecture #interiorlovers #interiordesignideas #interiordetails #interiordecoration #interiorandhome #luxuryinteriors #interior_design #decoraciondeinteriores #cortinas #minipersianas #velos #papeltapiz #decoracion #barranquilla