import React from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import { CREATE_SCHEDULE_STORE, GET_SCHEDULE_STORE } from './queriesStore'
import { LoadEllipsis } from '../../components/LoadingButton'
import moment from 'moment'
import { TimeSlotsList } from './styled'

export const ScheduleTimings = () => {
    const [setStoreSchedule] = useMutation(CREATE_SCHEDULE_STORE)
    const [getStoreSchedules, { data, loading, error }] = useLazyQuery(GET_SCHEDULE_STORE, { fetchPolicy: 'network-only', variables: { data: 'showTiming', idStore: '' } })
    console.log(data)

    // ----- ELIMINAR TIMESLOTS INICIO
    const deleteTimeSlot = id => {
        const value = data?.getStoreSchedules?.map(x => (x.schId === id) ? { ...x, schState: 0 } : x)
        const newValue = value?.map(x => ({ drId: x.drId, schId: x.schId, schDay: x.schDay, schHoEnd: x.schHoEnd, schHoSta: x.schHoSta, schState: x.schState }))
        setDrSchedule({
            variables: { input: { schData: newValue } },
            update(cache) {
                cache.modify({
                    fields: {
                        getStoreSchedules() {
                            const newData = data?.getStoreSchedules?.filter(elem => elem.schId !== id) || []
                            return cache.writeQuery({ query: GET_SCHEDULE_STORE, data: newData })
                        }
                    }
                })
            }
        }).catch(() => setAlertBox({
            message: 'Se ha producido un error intente de nuevo',
            duration: 8000,
            color: 'error'
        }))

    }
    // ---- FILTRO DURACION DEL INTERVALO DE TIEMPO
    const filterTimeInterval = x => {
        const startTime = moment(x.schHoSta, 'HH:mm:ss')
        const endTime = moment(x.schHoEnd, 'HH:mm:ss')
        const timeInterval = endTime.diff(startTime, 'm').toString()
        return filterValue === '0|' ? x : filterValue === timeInterval
    }
    return (
        <div>
            <h1>
                <TimeSlotsList>
                    {/* {(loading && !error) && <LoadEllipsis />}
                    {data?.getDrSchedules?.length === 0 ? <span>No disponible</span> : data?.getDrSchedules?.filter(x => filterTimeInterval(x)).map(x => x.schState !== 0 && (
                        <TimeSlots key={x.schId}>{moment(x.schHoSta, 'HH:mm:ss').format('hh:mm A')} - {moment(x.schHoEnd, 'HH:mm:ss').format('hh:mm A')}<BtnDeleteSlot icon={faTimes} onClick={() => deleteTimeSlot(x.schId)} /></TimeSlots>))
                    } */}
                </TimeSlotsList>

            </h1>
        </div>
    )
}

ScheduleTimings.propTypes = {

}
