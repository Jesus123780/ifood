/* eslint no-console: "error" */
import React, { useCallback, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import mapStyle from './mapStyles'
import { IconArrowLeft } from '../../public/icons'
import { BGColor, PColor } from '../../public/colors'
import { Span } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { GET_ALL_LOCATIONS, SAVE_LOCATION_USER } from './queries'
// import { Context } from '../../../../context'
import InputHooks from '../InputHooks/InputHooks'
import { RippleButton } from '../Ripple'
import { useFormTools } from '../BaseForm'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD } from '../../gql/Location'
import NewSelect from '../NewSelectHooks/NewSelect'

export const Map = ({ showModal, setShowModal, modal }) => {
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const mapContainerStyle = {
    height: '70vh',
    width: '100%',
    position: 'absolute'
  }
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false

  }
  const [map, setMap] = useState(null)
  const fetchData = async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${dataForm.address}${dataForm.city}${dataForm.province}&key=AIzaSyAy0SY1G3OFqesWSTQRHJvzyJzNgURPoN8`;
    fetch(API)
      .then(response => response.json())
      .then(response => {
        setMap(response?.results)
      })
      .catch(() => {
      })
  }
  const defaultCenter = {
    lat: map && parseFloat(map[0]?.geometry?.location?.lat),
    lng: map && parseFloat(map[0]?.geometry?.location?.lng)
  }
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const handleClickMap = (params) => {
  }
  const hableSearchLocation = (params) => {
    handleClickMap(2)
    fetchData();
  }
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])
  const [markers, setMarkers] = React.useState([])
  const onMapClick = React.useCallback(e => {
    setMarkers(() => [{
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }])
  })
  // const [getUserLocations, { data: dataLocation }] = useLazyQuery(GET_ALL_LOCATIONS)
  const  { data: dataLocation } = useQuery(GET_ALL_LOCATIONS)
  const [updateUserLocations] = useMutation(SAVE_LOCATION_USER)
  const handleSave = async () => {
    // getUserLocations()
    return updateUserLocations({
      variables: {
        input: {
          cId: values.countryId,
          ctId: values.ctId,
          dId: values.dId,
          uLatitud: '10',
          uLongitude: '10',
          uLocationKnow: dataForm.uLocationKnow,
          uPiso: 1,
          id: 'MjcyMDg4ODE0ODUxNTE2NDUw',

        }
      }
    }).catch(err => console.log({ message: 'error' }))
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})

  const [getDepartments, { data: dataDepartments }] = useLazyQuery(GET_ALL_DEPARTMENTS)
  const [getCities, { data: dataCities }] = useLazyQuery(GET_ALL_CITIES)
  const { data: dataRoad, loading: loadRoad } = useQuery(GET_ALL_ROAD)
  const { data: dataCountries, loading: loadCountries } = useQuery(GET_ALL_COUNTRIES)
  const handleChangeLocation = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const handleChangeSearch = e => {
    if (e.target.name === 'countryId') getDepartments({ variables: { cId: e.target.value } })
    else if (e.target.name === 'dId') getCities({ variables: { dId: e.target.value } })
    handleChangeLocation(e)
  }
  const departments = dataDepartments?.departments || []
  const countries = dataCountries?.countries || []
  const road = dataRoad?.road || []
  const cities = dataCities?.cities || []

  return (
    <ContainerModal showModal={showModal} onClick={() => setShowModal(!showModal)}>
      <AwesomeModal onClick={e => e.stopPropagation()} showModal={showModal}>
        {<Container modal={modal === 1}>
          <NewSelect name='countryId' options={countries} id='cId' onChange={handleChangeSearch} error={errors?.countryId} optionName='cName' value={values?.countryId} title='País' />
          <NewSelect name='dId' options={departments} id='dId' onChange={handleChangeSearch} error={errors?.dId} optionName='dName' value={values?.dId} title='Departamento' />
          <NewSelect name='ctId' options={cities} id='ctId' onChange={handleChangeSearch} error={errors?.ctId} optionName='cName' value={values?.ctId} title='Ciudad' />
          <NewSelect name='rId' options={road} id='rId' onChange={handleChangeSearch} error={errors?.rId} optionName='rName' value={values?.rId} title='Tipo de via' />
          <InputHooks
            title='Ingresa tu dirección como la conoces'
            required
            errors={errorForm?.uLocationKnow}
            value={dataForm?.uLocationKnow}
            onChange={handleChange}
            name='uLocationKnow'
          />
          <RippleButton widthButton={'100%'} onClick={() => handleSave()}><Text>Search Address</Text></RippleButton>
        </Container>}
        <ContainerMap modal={modal === 2}>
          <MapHeader>
            <button style={{ backgroundColor: 'transparent' }} onClick={() => handleClickMap(1)} >
              <IconArrowLeft size={20} color={PColor} />
            </button>
            <Span>{dataForm?.address}</Span><div></div>
          </MapHeader>
          <LoadScript googleMapsApiKey='AIzaSyBjsZdzx04Ol7DQ7v4BXimgxC1JwNCAnj0'>
             <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={9}
              onLoad={onLoad}
              options={options}
              onClick={onMapClick}
              center={map ? defaultCenter : defaultCenter}
              onUnmount={onUnmount}
            >
              <Marker position={defaultCenter ? defaultCenter : markers && { lat: parseFloat(markers[0]?.lat), lng: parseFloat(markers[0]?.lng) }} />
            </GoogleMap>
            {1 && <ContentButton>
              <RippleButton style={{ width: '40%' }} onClick={handleSave}>Confirmar</RippleButton>
            </ContentButton>}
          </LoadScript>
        </ContainerMap>
      </AwesomeModal>
    </ContainerModal>
  )
}

Map.propTypes = {
  google: PropTypes.func,
  setShowModal: PropTypes.func,
  handleClickMap: PropTypes.func,
  showModal: PropTypes.bool,
  modal: PropTypes.number

}

const Container = styled.div`
  background-color: ${BGColor};
  padding: 30px;
  position: absolute;
  transition: 200ms ease-in-out;
${({ modal }) => modal
    ? css`  
    transform: translateY(95px);
    border-radius: 4px;
    height: 100%;
    top: -100px;
        `
    : css`
      z-index: -10000;
      opacity: 0;
              `}
`
const Text = styled.span`

`
const AwesomeModal = styled.div`
    width: 700px;
    height: 60vh;
    border-radius: 10px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    /* opacity: 0; */
    top: 50%;
    /* position: absolute; */
    transition: 500ms ease;
    overflow-y: auto;
  ${({ showModal }) => showModal
    ? css`  
            top: 80px;
            transform: translateY(95px);
            border-radius: 4px;
            /* opacity: 1; */
            `
    : css`
            /* margin: 0; */
            /* opacity: 0; */
            z-index: -99999;
              `}
    &::-webkit-scrollbar {
        width: 3px;
        background-color: #dcdcdc;
        border-radius: 5px;
    }
`
const ContainerModal = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    transition: opacity 150ms ease-in-out;
    ${({ showModal }) => showModal
    ? css`  
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        background-color:rgba(0, 0, 0, 0.322);
        
        `
    : css`
          z-index: -10000;
          visibility: hidden;
          opacity: 0;
              `}
    `
const ContainerMap = styled.div`
    position: absolute;
    transition: 500ms ease;
    top: 0;
    bottom: 0;
    ${({ modal }) => modal
    ? css`  
            transform: translateY(0px);
            border-radius: 4px;
        
        `
    : css`
          z-index: -10000;
          opacity: 0;
              `}
`
const MapHeader = styled.div`
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    grid-template-columns: 50px 1fr 50px;
    padding: 27px 20px;
    z-index: 99;
    background: linear-gradient(
    0deg
    , rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.8) 25%, white 100%);
`
const ContentButton = styled.div`
    width: 100%;
    position: absolute;
    margin: auto;
    display: flex;
    justify-content: center;
    z-index: 99999;
    bottom: -550px;
`
