import React, { Fragment, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_SCHEDULE_STORE } from './queriesStore'
import moment from 'moment'
import { Card } from './styled'
import styled, { css } from 'styled-components'
import { BGColor, EColor, PVColor, TFSColor } from '../../public/colors'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { CREATE_STORE_CALENDAR } from './queries'
import { RippleButton } from '../../components/Ripple'
import { updateCache } from 'utils'
import { parseZone } from 'moment'
import { duration } from 'moment'

export const ScheduleTimings = () => {
    const { data, loading, error } = useQuery(GET_SCHEDULE_STORE, { variables: { schDay: 1 } })
    const [showTiming, setShowTiming] = useState(0)
    const SHOW_TIMING = useSetState(false)
    const SHOW_ALERT = useSetState(false)

    const handleClick = n => {
        setShowTiming(n)
        SHOW_TIMING.setState(!SHOW_TIMING.state)
    }
    const [values, setValues] = useState({})
    const [message, setMessage] = useState('')
    const starTime = moment(values.startTime, 'HH:mm:ss')
    const endTime = moment(values.endTime, 'HH:mm:ss')
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const [setStoreSchedule] = useMutation(CREATE_STORE_CALENDAR);
    const handleForm = (e) => {
        e.preventDefault();
        if (moment(starTime).isAfter(endTime)) {
            SHOW_ALERT.setState(!SHOW_ALERT.state)
            return setMessage('La Hora Final no puede ser menor que la Hora de Inicio.')
        } else if (moment(starTime).isSame(endTime)) {
            SHOW_ALERT.setState(!SHOW_ALERT.state)
            return setMessage('La Hora final no puede ser igual que la Hora de inicio.')
        } else {
            setMessage('')
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
            }).then(e => console.log(e)).catch(e => console.log(e))
        }
    }
    let suma = 0
    const [totalH, setTotalH] = useState(0)
    useEffect(() => {
        data?.getStoreSchedules.forEach((a) => {
            let count = 0
            const { schHoEnd, schHoSta } = a || {}
            const starTime = parseFloat(starTime ? starTime : 0)
            const endTime = parseFloat(schHoEnd ? schHoEnd : 0)
            count = endTime + starTime
            suma += count
        })
    }, [])
    return (
        <div>
            <AwesomeModal backdrop='static' zIndex='9999' padding='25px' show={SHOW_ALERT.state} onHide={() => { SHOW_ALERT.setState(!SHOW_ALERT.state) }} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' > <h3>{message}</h3> </AwesomeModal >
            <ScheduleHeader>
                <ScheduleHeaderNav onClick={() => handleClick(1)} current={showTiming === 1 && 1}>Lunes</ScheduleHeaderNav>
                <ScheduleHeaderNav onClick={() => handleClick(2)} current={showTiming === 2 && 1}>Martes</ScheduleHeaderNav>
                <ScheduleHeaderNav onClick={() => handleClick(3)} current={showTiming === 3 && 1}>Miércoles</ScheduleHeaderNav>
                <ScheduleHeaderNav onClick={() => handleClick(4)} current={showTiming === 4 && 1}>Jueves</ScheduleHeaderNav>
                <ScheduleHeaderNav onClick={() => handleClick(5)} current={showTiming === 5 && 1}>Viernes</ScheduleHeaderNav>
                <ScheduleHeaderNav onClick={() => handleClick(6)} current={showTiming === 6 && 1}>Sábado</ScheduleHeaderNav>
                <ScheduleHeaderNav onClick={() => handleClick(7)} current={showTiming === 7 && 1}>Domingo</ScheduleHeaderNav>
            </ScheduleHeader>
            <AwesomeModal title={showTiming === 1 ? 'Lunes' : showTiming === 2 ? 'Martes ' : showTiming === 3 ? 'Miercoles' : showTiming === 4 ? 'Jueves ' : showTiming === 5 ? 'Viernes' : showTiming === 6 ? 'Sabado' : showTiming === 7 ? 'Domingo' : null} backdrop='static' zIndex='9990' padding='25px' height='50vh' show={SHOW_TIMING.state} onHide={() => { SHOW_TIMING.setState(!SHOW_TIMING.state) }} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <Form onSubmit={(e) => handleForm(e)}>
                    {[1]?.map((x, i) => <AModalRow key={i + 10}>
                        <SelectInfo title='Hora Inicial' name={'startTime'} value={values.schHoSta} handleChange={handleChange} index={i} hide={x.schState} />
                        <SelectInfo title='Hora Final' name={'endTime'} value={values.schHoEnd} handleChange={handleChange} index={i} hide={x.schState} />
                    </AModalRow>)}
                    <RippleButton label='Guardar' type={'submit'} />
                </Form>
            </AwesomeModal>
            <ScheduleHeader>
                {data ? data?.getStoreSchedules?.map((s, i) => (
                    <Card direction='column' active={s.schDay === showTiming} margin='10px' key={i + 1} onClick={() => handleClick(s.schDay)} current={s.schDay === showTiming}>
                        <Text>
                            {s.schDay === 1 ? 'Lunes' : s.schDay === 2 ? 'Martes ' : s.schDay === 3 ? 'Miercoles' : s.schDay === 4 ? 'Jueves ' : s.schDay === 5 ? 'Viernes' : s.schDay === 6 ? 'Sabado' : s.schDay === 7 ? 'Domingo' : null}
                        </Text>
                        <Text size='1em'>
                            {s.schHoSta} - {s.schHoEnd}
                        </Text>
                    </Card>
                )) : <div>Agenda tus horarios</div>}
            </ScheduleHeader>
        </div>
    )
}

const SelectInfo = ({ title, name, value, handleChange, index, hide }) => (
    <ModalSelectC hide={hide} >
        <CardSelectLabel>{title} </CardSelectLabel>
        <Select name={name} id={index} value={value} onChange={handleChange}>
            <CardSelectOption>Seleccionar</CardSelectOption>
            {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(x => <Fragment key={x}>
                <CardSelectOption value={`${x}:00`}> {moment(`${x}:00`, 'HH:mm:ss').format('hh:mm A')}</CardSelectOption>
                <CardSelectOption value={`${x}:30`}> {moment(`${x}:30`, 'HH:mm:ss').format('hh:mm A')}</CardSelectOption>
            </Fragment>)}
        </Select>
    </ModalSelectC>
)
ScheduleTimings.propTypes = {

}

export const Text = styled.h3`
    padding: 7px 0;
    font-size: ${({ size }) => size || '13px'};
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
    border: 1px solid ${({ theme }) => theme.PLVColor}; 
    background-color: ${({ theme }) => theme.BGAColor};
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
    background-color: ${({ current }) => current ? PVColor : 'transparent'};
    color: ${({ current }) => current ? BGColor : TFSColor};
    /* color: ${TFSColor}; */
    text-align: center;
    transition: 0.3s;
    cursor: pointer;
    
    ${({ current }) => !current && css`
    :hover{
        background-color:${({ theme }) => theme.BGColor};
        color:${({ theme }) => theme.SFColor}; 
        
    }` }
`
export const AModalRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 860px){
        width:100%;
        display:block;
    }
`
export const AModalBtnDelete = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 38px;
    margin-top: 50px;   
    width: 68px;
    background-color: ${({ theme }) => theme.EColor};
    color: ${({ theme }) => theme.BGAColor};
    ${({ hide }) => hide === 0 && css`display:none;`};
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
            background-color:${({ theme }) => theme.PLVColor}
        }
    
`
export const CardSelectC = styled.div`
    display:flex;
    flex-direction: column;
`

export const ModalSelectC = styled(CardSelectC)`
    justify-content: flex-end;
    min-width: 200px;
    ${({ hide }) => hide === 0 && css`display:none;`}
    @media only screen and (max-width: 860px){
        width:100%;
    }
    
`

// ----- SELECT DEL MODAL
