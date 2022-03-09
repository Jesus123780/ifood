import React, { useCallback, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'
import mapStyle from './mapStyles'
import { IconArrowLeft, IconDelete, IconDost, IconEdit, IconLocationMap } from '../../public/icons'
import { BColor, BGColor, PColor } from '../../public/colors'
import { Span } from './styled'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import { DELETE_ONE_LOCATIONS, GET_ALL_LOCATIONS, SAVE_LOCATION_USER } from './queries'
// import { Context } from '../../../../context'
import InputHooks from '../InputHooks/InputHooks'
import { RippleButton } from '../Ripple'
import { useFormTools } from '../BaseForm'
import { GET_ALL_CITIES, GET_ALL_COUNTRIES, GET_ALL_DEPARTMENTS, GET_ALL_ROAD, GET_ONE_CITY, GET_ONE_COUNTRY, GET_ONE_DEPARTMENT } from '../../gql/Location'
import NewSelect from '../NewSelectHooks/NewSelect'
import { filterKeyObject, updateCache } from '../../utils'
import { Context } from '../../context'
import { usePosition } from '../hooks/usePosition'
import { API_GOOGLE_GEOLOCATION_PRIVATE, API_GOOGLE_MAPS } from '../../apollo/urls'

export const Map = ({ showModal, setShowModal }) => {
  const [modal, setModal] = useState(0)
  const { latitude, longitude, timestamp, accuracy, speed, error: err } = usePosition();

  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [show, setShow] = useState(false)
  const { setAlertBox, modalLocation, setLocationString } = useContext(Context)

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
  const [getOneCountry, { data: dataCountry }] = useLazyQuery(GET_ONE_COUNTRY)
  const [getOneDepartment, { data: dataDepartment }] = useLazyQuery(GET_ONE_DEPARTMENT)
  const [getOneCities, { data: dataGetOneCity }] = useLazyQuery(GET_ONE_CITY)
  const [map, setMap] = useState(null)
  const fetchData = useCallback(async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${dataCountry && dataCountry?.getOneCountry?.cName} ${dataDepartment && dataDepartment?.getOneDepartment?.dName} ${dataGetOneCity && dataGetOneCity?.getOneCities?.cName} ${latitude} ${longitude}&key=${API_GOOGLE_GEOLOCATION_PRIVATE}`;
    fetch(API)
      .then(response => response.json())
      .then(response => {
        setMap(response?.results)
      })
      .catch(() => {
      })
  }, [])
  const defaultCenter = {
    lat: !!map ? parseInt(map[0]?.geometry?.location?.lat) : 987,
    lng: !!map ? parseInt(map[0]?.geometry?.location?.lng) : 987
  }
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const hableSearchLocation = (params) => {
    setModal(2)
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
  const { data: dataLocation, loading: LoadL } = useQuery(GET_ALL_LOCATIONS)
  const [updateUserLocations] = useMutation(SAVE_LOCATION_USER)
  const [deleteUserLocations] = useMutation(DELETE_ONE_LOCATIONS)
  const handleSave = async () => {
    setModal(0)
    return updateUserLocations({
      variables: {
        input: {
          cId: values.countryId,
          ctId: values.ctId,
          dId: values.dId,
          uLatitud: parseInt(map[0]?.geometry?.location?.lat),
          uLongitude: parseInt(map[0]?.geometry?.location?.lng),
          uLocationKnow: dataForm.uLocationKnow,
          uPiso: 1,
        }
      }, update: (cache, { data: { getUserLocations } }) => updateCache({
        cache,
        query: GET_ALL_LOCATIONS,
        nameFun: 'getUserLocations',
        dataNew: getUserLocations
      })
    })
      .then(z => setAlertBox({ message: 'ubicación guardada exitosamente' }))
      .catch(err => console.log({ message: err }))
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
    if (e.target.name === 'countryId') {
      getDepartments({ variables: { cId: e.target.value } })
      getOneCountry({ variables: { cId: e.target.value } })
    }
    else if (e.target.name === 'dId') {
      getCities({ variables: { dId: e.target.value } })
      getOneDepartment({ variables: { dId: e.target.value } })
    } else if (e.target.name === 'ctId') {
      getOneCities({ variables: { ctId: e.target.value } })
    }
    handleChangeLocation(e)
  }

  const departments = dataDepartments?.departments || []
  const countries = dataCountries?.countries || []
  const road = dataRoad?.road || []
  const cities = dataCities?.cities || []
  const closeAllState = () => {
    setShowModal(!showModal)
    setModal(0)
    setValues({})
    setShow(false)
  }
  const [check, setCheck] = useState(false)
  const [selected, setSelected] = useState(false)
  const handleCheckChange = e => {
    const { checked } = e.target
    setCheck(checked ? true : false)
  }
  const HandleDeleteUserLocations = elem => {
    const { locationId } = elem
    deleteUserLocations({
      variables: {
        locationId,
        uLocationState: 1
      }, update: (cache, { data: { getUserLocations } }) => updateCache({
        cache,
        query: GET_ALL_LOCATIONS,
        nameFun: 'getUserLocations',
        dataNew: getUserLocations
      })
    })

  }
  const handleSelectLocation = elem => {
    let data = elem
    data = filterKeyObject(elem, ['__typename', 'DatMod', 'DatCre'])
    localStorage.setItem('location.data', JSON.stringify(data))
    const location = localStorage.getItem('location.data')
    setSelected(JSON.parse(location))
    setLocationString(data)
  }
  useEffect(() => {
    const location = localStorage.getItem('location.data')
    setSelected(JSON.parse(location))
    if (!LoadL && !dataLocation?.getUserLocations?.length > 0) {
      localStorage.removeItem('location.data')
    }
  }, [dataLocation])

  const handleMyLocation = async () => {
    localStorage.removeItem('location.data');
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude} &key=${API_GOOGLE_GEOLOCATION_PRIVATE}`;
    fetch(API)
      .then(response => response.json())
      .then(response => {
        setLocationString({ uLocationKnow: response?.results[0].formatted_address })
        const data = {
          uLocationKnow: response?.results[0].formatted_address
        }
        localStorage.setItem('location.data', JSON.stringify(data))
      })
      .catch(() => {
      })
  }
  console.log(markers[0]?.lat)
  return (
    <ContainerModal showModal={showModal} onClick={() => closeAllState()}>
      <AwesomeModal onClick={e => e.stopPropagation()} showModal={showModal}>
        {<Container modal={modal === 0}>
          <div className="content-location">
            <h2>¿Donde quieres recibir tu pedido?</h2>
            {dataLocation?.getUserLocations?.length > 0 ? dataLocation?.getUserLocations.map(index => {
              const { cName } = index.city
              const { dName } = index.department
              const { cName: countryName } = index.pais
              return (
                <ContainerTask show={show === index} selected={selected?.locationId === index.locationId} key={index.locationId} onClick={() => handleSelectLocation(index)}>
                  <OptionsFunction show={show === index}>
                    <Button onClick={() => HandleDeleteUserLocations(index)}><IconDelete color={PColor} size={30} /></Button>
                  </OptionsFunction>
                  <ListTask show={show === index}>
                    <div>
                      <Text> {countryName}</Text>
                      <Text> {dName}</Text>
                      <Text> {cName}</Text>
                    </div>
                    <Text> {index.uLocationKnow}</Text>
                  </ListTask>
                  <div style={{ display: 'contents' }}><Button onClick={() => setShow(index === show ? false : index)}><IconDost size={30} color={show === index ? PColor : '#CCC'} /></Button></div>
                </ContainerTask>
              )
            }) : (
              <ContainerTask onClick={() => handleMyLocation()}>
                <IconLocationMap size={30} color={PColor} />
                Usar mi ubicación
              </ContainerTask>
            )}
            <RippleButton widthButton={'100%'} onClick={() => setModal(1)}> Buscar mi ubicación</RippleButton>
          </div>
        </Container>}
        {<Container modal={modal === 1}>
          {/* <Select name="select" onChange={(e) => handleChangeSelect(e)}>
            {countries?.map(x => (
              <option value={x.cName}>{x.cName}</option>
            ))}
          </Select> */}
          <NewSelect name='countryId' options={countries} id='cId' onChange={handleChangeSearch} error={errors?.countryId} optionName='cName' value={values?.countryId} title='País' />
          <NewSelect name='dId' options={departments} id='dId' onChange={handleChangeSearch} error={errors?.dId} optionName='dName' value={values?.dId} title='Departamento' />
          <NewSelect name='ctId' options={cities} id='ctId' onChange={handleChangeSearch} error={errors?.ctId} optionName='cName' value={values?.ctId} title='Ciudad' />
          <NewSelect name='rId' options={road} id='rId' onChange={handleChangeSearch} error={errors?.rId} optionName='rName' value={values?.rId} title='Tipo de via' />
          <div className='flex-center'>
            <InputHooks
              title='Numero interior de piso'
              required
              errors={errorForm?.piso}
              value={dataForm?.piso}
              onChange={handleChange}
              name='piso'
              range={{ min: 0, max: 4 }}
              numeric
              disabled={check}
            />
            <div>
              <input type='checkbox' onChange={e => handleCheckChange(e)} />
            </div>
          </div>
          <InputHooks
            title='Ingresa tu dirección como la conoces'
            required
            errors={errorForm?.uLocationKnow}
            value={dataForm?.uLocationKnow}
            onChange={handleChange}
            name='uLocationKnow'
          />
          <div className='flex-center'>
            <RippleButton widthButton={'100%'} onClick={() => setModal(0)}><Text>Volver</Text></RippleButton>
            <RippleButton disabled={!dataForm?.uLocationKnow} widthButton={'100%'} onClick={() => hableSearchLocation(2)}><Text>Search Address</Text></RippleButton>
          </div>
        </Container>}
        <ContainerMap modal={modal === 2}>
          <MapHeader>
            <button style={{ backgroundColor: 'transparent' }} onClick={() => setModal(1)} >
              <IconArrowLeft size={20} color={PColor} />
            </button>
            <Span>{dataCountry && dataCountry?.getOneCountry?.cName} {dataDepartment && dataDepartment?.getOneDepartment?.dName} {dataGetOneCity && dataGetOneCity?.getOneCities?.cName}</Span><div></div>
          </MapHeader>
          <LoadScript
            // region="ES"
            // language="es"
            libraries={["places"]}
            googleMapsApiKey={`${API_GOOGLE_MAPS}`}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={15}
              onLoad={onLoad}
              options={options}
              onClick={onMapClick}
              center={map ? defaultCenter : defaultCenter}
              onUnmount={onUnmount}
            >
              <Marker position={defaultCenter ? defaultCenter : { lat: markers[0]?.lat ? parseInt(markers[0]?.lat) : 34543, lng: markers[0]?.lng ? parseInt(markers[0]?.lng) : 932423 }} />
            </GoogleMap>
            {modal === 2 && <ContentButton>
              <RippleButton style={{ width: '40%' }} onClick={handleSave}>Confirmar</RippleButton>
            </ContentButton>}
          </LoadScript>
        </ContainerMap>
      </AwesomeModal>
    </ContainerModal>
  )
}

Map.propTypes = {
  setShowModal: PropTypes.func,
  hableSearchLocation: PropTypes.func,
  showModal: PropTypes.bool,
  modal: PropTypes.number

}
export const Select = styled.select`
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  padding: 13px 20px;
  height: 48px;
  color: #3e3e3e;
  width: 100%;
  background-color: #fff;
`
export const ListTask = styled.div`
    transition: all 200ms ease-in-out;
    display: flex;
    margin-left: 200px;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-family: PFont-Light;
  ${({ show }) => show
    ? css`
        margin-left: 200px;
        `
    : css`
                
                margin-left: 30px;
              ` }
    @media only screen and (min-width: 960px){
    }
`
export const ContainerTask = styled.div`
    position: relative;
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    border: 1px solid #e9e9e9;
    width: 95%;
    min-height: 40px;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    cursor: pointer;
    margin: 10px  auto;
    ${props => props.selected && css`  border-color: red; `}
    &:hover{
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
    }
    ${({ show }) => show
    && css`
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: red;


              ` }
    
`
export const Button = styled.button`
    outline: none;
    background: transparent;
    cursor: pointer;
`
export const OptionsFunction = styled.div`
    position: absolute;
    display: grid;
    transition: all 200ms ease-in-out;
    display: flex;
  ${({ show }) => show
    ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateX(0);
              `
    : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateX(-50px);
              ` }
    @media only screen and (min-width: 960px){
    }
`

const Container = styled.div`
  background-color: ${BGColor};
  padding: 30px;
  position: absolute;
  height: 100%;
  transition: 200ms ease-in-out;
${({ modal }) => modal
    ? css`  
    transform: translateY(95px);
    border-radius: 4px;
    top: -100px;
        `
    : css`
      z-index: -10000;
      opacity: 0;
              `}
        .card {
  display: grid;
  height: auto;
  opacity: 1;
  overflow: visible;
  h2 {
    color: #3e3e3e;
    font-size: 1.125rem;
    line-height: 22px;
    font-family: PFont-Light;
    text-align: center;
    margin: 30px 0;
  }
      }
      .flex-center{
        display: flex;
        flex: 1 1 0%;
        align-items: center;
      }
      .content-location {
        overflow-y: auto;
        overflow-x: hidden;
        height: 500px;
        h2 {
          text-align: center;
          margin: 30px 0;
          font-size: 24px;
          font-family: PFont-Light;
          color: rgba(0,0,0,.9);
        }
      }
`
const Text = styled.span`
    width: 100%;
    font-size: 15px;
    font-family: PFont-Light;
`
const AwesomeModal = styled.div`
    width: 700px;
    border-radius: 10px;
    z-index: 99999;
    display: flex;
    max-height: 584px;
    width: 694px;
    flex-direction: column;
    transition: 500ms ease;
    overflow-x: hidden;
    overflow-y: hidden;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    height: calc(100vh - 100px);
    top: 80px;
    ${({ showModal }) => showModal
    ? css`  
      transform: translateY(0%);
      `
    : css`
      transform: translateY(50%);
              `}
  
`
const ContainerModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8880;
    background-color:rgba(0, 0, 0, 0.322);
    ${({ showModal }) => showModal
    ? css`  
        visibility: visible;
        
        `
    : css`
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
    bottom: 30px;
    /* bottom: -550px; */
`
