/* eslint-disable @typescript-eslint/no-empty-function */
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState, useContext } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_SCHEDULE_STORE } from './queriesStore'
import moment from 'moment'
import { Card } from './styled'
import styled, { css } from 'styled-components'
import { BGColor, PVColor, TFSColor } from '../../public/colors'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { CREATE_STORE_CALENDAR } from './queries'
import { RippleButton } from '../../components/Ripple'
import { Context } from '../../context/Context'

export const ScheduleTimings = () => {
  const { setAlertBox } = useContext(Context)
  const { data } = useQuery(GET_SCHEDULE_STORE, { variables: { schDay: 1 } })
  const [showTiming, setShowTiming] = useState(0)
  const SHOW_TIMING = useSetState(false)
  const SHOW_ALERT = useSetState(false)
  const handleClick = n => {
    setShowTiming(n)
    SHOW_TIMING.setState(!SHOW_TIMING.state)
  }
  const [values, setValues] = useState({})
  // const [message, setMessage] = useState('')
  const starTime = moment(values.startTime, 'HH:mm:ss')
  const endTime = moment(values.endTime, 'HH:mm:ss')
  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const [setStoreSchedule] = useMutation(CREATE_STORE_CALENDAR)
  const handleForm = (e) => {
    e.preventDefault()
    if (moment(starTime).isAfter(endTime)) {
      SHOW_ALERT.setState(!SHOW_ALERT.state)
      return setAlertBox({ message: 'La Hora Final no puede ser menor que la Hora de Inicio.' })
    } else if (moment(starTime).isSame(endTime)) {
      SHOW_ALERT.setState(!SHOW_ALERT.state)
      return setAlertBox({ message: 'La Hora final no puede ser igual que la Hora de inicio.' })
    } 
    return setStoreSchedule({
      variables: {
        input:
                    {
                      schHoSta: values.startTime,
                      schHoEnd: values.endTime,
                      schState: 1, schDay: showTiming
                    }
      }, update(cache) {
        cache.modify({
          fields: {
            getStoreSchedules(dataOld = []) {
              return cache.writeQuery({ query: GET_SCHEDULE_STORE, data: dataOld })
            }
          }
        })
      }
    }).then(() => {
      SHOW_TIMING.setState(!SHOW_TIMING.state)
    }).catch(() => {})
        
  }
  // eslint-disable-next-line
    let suma = 0
  useEffect(() => {
    if (data && data?.getStoreSchedules?.length > 0) {
      data?.getStoreSchedules.forEach((a) => {
        let count = 0
        // eslint-disable-next-line
                const { schHoEnd, schHoSta } = a || {}
        const starTime = parseFloat(starTime ? starTime : 0)
        const endTime = parseFloat(schHoEnd ? schHoEnd : 0)
        count = endTime + starTime
        // eslint-disable-next-line
                suma += count
      })
    }
  }, [data])
  const PortalContent = (
    <AwesomeModal
      backdrop='static'
      borderRadius='10px'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      height='50vh'
      onCancel={() => {return false}}
      onHide={() => { SHOW_TIMING.setState(!SHOW_TIMING.state) }}
      padding='25px'
      show={SHOW_TIMING.state}
      size='small'
      title={showTiming === 1 ? 'Lunes' : showTiming === 2 ? 'Martes ' : showTiming === 3 ? 'Miercoles' : showTiming === 4 ? 'Jueves ' : showTiming === 5 ? 'Viernes' : showTiming === 6 ? 'Sabado' : showTiming === 7 ? 'Domingo' : null}
      zIndex='9990'
    >
      <Form onSubmit={(e) => {return handleForm(e)}}>
        {[1]?.map((x, i) => {return <AModalRow key={i + 10}>
          <SelectInfo
            handleChange={handleChange}
            hide={x.schState}
            index={i}
            name={'startTime'}
            title='Hora Inicial'
            value={values.schHoSta}
          />
          <SelectInfo
            handleChange={handleChange}
            hide={x.schState}
            index={i}
            name={'endTime'}
            title='Hora Final'
            value={values.schHoEnd}
          />
        </AModalRow>})}
        <RippleButton label='Guardar' type={'submit'} />
      </Form>
    </AwesomeModal>
  )
  // if (browser)  return ReactDOM.createPortal(portalContent, document.getElementById('portal'))
  return (
    <div>
      {PortalContent}
      <ScheduleHeader>
        <ScheduleHeaderNav current={showTiming === 1 && 1} onClick={() => {return handleClick(1)}}>Lunes</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 2 && 1} onClick={() => {return handleClick(2)}}>Martes</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 3 && 1} onClick={() => {return handleClick(3)}}>Miércoles</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 4 && 1} onClick={() => {return handleClick(4)}}>Jueves</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 5 && 1} onClick={() => {return handleClick(5)}}>Viernes</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 6 && 1} onClick={() => {return handleClick(6)}}>Sábado</ScheduleHeaderNav>
        <ScheduleHeaderNav current={showTiming === 7 && 1} onClick={() => {return handleClick(7)}}>Domingo</ScheduleHeaderNav>
      </ScheduleHeader>
      <ScheduleHeader>
        {data ? data?.getStoreSchedules?.map((s, i) => {return (
          <Card
            active={s.schDay === showTiming}
            current={s.schDay === showTiming}
            direction='column'
            key={i + 1}
            margin='10px'
            onClick={() => {return handleClick(s.schDay)}}
          >
            <Text>
              {s.schDay === 1 ? 'Lunes' : s.schDay === 2 ? 'Martes ' : s.schDay === 3 ? 'Miercoles' : s.schDay === 4 ? 'Jueves ' : s.schDay === 5 ? 'Viernes' : s.schDay === 6 ? 'Sabado' : s.schDay === 7 ? 'Domingo' : null}
            </Text>
            <Text size='1em'>
              {s.schHoSta} - {s.schHoEnd}
            </Text>
          </Card>
        )}) : <div>Agenda tus horarios</div>}
      </ScheduleHeader>
    </div>

  )

}

const SelectInfo = ({ title, name, value, handleChange, index, hide }) => {return (
  <ModalSelectC hide={hide} >
    <CardSelectLabel>{title} </CardSelectLabel>
    <Select
      id={index}
      name={name}
      onChange={handleChange}
      value={value}
    >
      <CardSelectOption>Seleccionar</CardSelectOption>
      {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => {return <Fragment key={x}>
        <CardSelectOption value={`${x}:00`}> {moment(`${x}:00`, 'HH:mm:ss').format('hh:mm A')}</CardSelectOption>
        <CardSelectOption value={`${x}:30`}> {moment(`${x}:30`, 'HH:mm:ss').format('hh:mm A')}</CardSelectOption>
      </Fragment>})}
    </Select>
  </ModalSelectC>
)}

SelectInfo.propTypes = {
  handleChange: PropTypes.any,
  hide: PropTypes.any,
  index: PropTypes.any,
  name: PropTypes.any,
  title: PropTypes.any,
  value: PropTypes.any
}
ScheduleTimings.propTypes = {

}

export const Text = styled.h3`
    padding: 7px 0;
    font-size: ${({ size }) => {return size || '13px'}};
    color: ${TFSColor};
    font-family:  PFont-Light;
    font-weight: 400;
`
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
export const CardSelectLabel = styled.label`
    margin: 20px 0px 12px 0px;
    font-size: 15px;
`
export const Form = styled.form`
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ScheduleHeader = styled.div`
    /* display:flex; */
    padding: 10px 0;
    border: 1px solid #ccc; 
    display: grid;
    grid-template-columns: 33.33% repeat(auto-fill, 33.33%);
    flex-wrap:wrap;
    grid-template-columns: repeat( auto-fit,minmax(150px,1fr) );
`
export const CardSelect = styled.select`
    font-size: 16px;
    padding: 7px 17px;
    border: 1px solid ${({ theme }) => {return theme.PLVColor}}; 
    background-color: ${({ theme }) => {return theme.BGAColor}};
    width: 200px;
`
export const ModalSelect = styled(CardSelect)`
    height: 36px;
    margin: 0px 20px 0px 0px;
`
const ScheduleHeaderNav = styled.button`
    margin: 10px;
    border: 1px solid ${TFSColor}; 
    padding: 7px 0;
    border-radius: 20px;
    flex-grow: 1;
    font-size: 11px;
    background-color: ${({ current }) => {return current ? PVColor : 'transparent'}};
    color: ${({ current }) => {return current ? BGColor : TFSColor}};
    /* color: ${TFSColor}; */
    text-align: center;
    transition: 0.3s;
    cursor: pointer;
    
    ${({ current }) => {return !current && css`
    :hover{
        background-color:${({ theme }) => {return theme.BGColor}};
        color:${({ theme }) => {return theme.SFColor}}; 
        
    }`} }
`
export const AModalRow = styled.div`
    padding: 10px;
    /* display: grid; */
    /* grid-template-columns: repeat( auto-fit, minmax(50%, 1fr) ); */
    /* display: flex; */
    /* display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 860px){
        width:100%;
        display:block;
    } */
`
export const AModalBtnDelete = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    margin-top: 50px;   
    width: 68px;
    background-color: ${({ theme }) => {return theme.EColor}};
    color: ${({ theme }) => {return theme.BGAColor}};
    ${({ hide }) => {return hide === 0 && css`display:none;`}};
    border-radius: 5px;
    :hover{
        cursor:pointer;
    }
    @media only screen and (max-width: 860px){
        width:100%;
        margin-top: 30px;
    }
`
export const CardSelectOption = styled.option`
     :checked{
            background-color:${({ theme }) => {return theme.PLVColor}}
        }
    
`
export const CardSelectC = styled.div`
    display:flex;
    flex-direction: column;
`

export const ModalSelectC = styled(CardSelectC)`
    justify-content: flex-end;
    min-width: 200px;
    ${({ hide }) => {return hide === 0 && css`display:none;`}}
    @media only screen and (max-width: 860px){
        width:100%;
    }
    
`

// ----- SELECT DEL MODAL
