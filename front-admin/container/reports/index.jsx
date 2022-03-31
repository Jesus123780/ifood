import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { RippleButton } from 'components/Ripple'
import { Table } from 'components/Table'
import { Section } from 'components/Table/styled'
import { Addons } from 'container/dashboard'
import { AlertStatistic } from 'container/dashboard/AlertClients'
import { DeliveryFood } from 'container/dashboard/Delivery'
import { LastedStatistic } from 'container/dashboard/LastedStatistic'
import { OurFood } from 'container/dashboard/OurFood'
import { SalesWeek } from 'container/dashboard/salesWeek'
import { SalesWeekShortDays } from 'container/dashboard/salesWeekShortDays'
import moment from 'moment'
import React from 'react'
import { Button, Item, Container } from './styled'

export const ReportsC = () => {
    const HandleGetOne = () => { }
    const OPEN_MODAL = useSetState()
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    return (
        <Container>
            {/* <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton> */}
            <SalesWeekShortDays />
            <SalesWeek />
            {/* <Addons /> */}
            <LastedStatistic />
            <OurFood />
            {/* <AlertStatistic /> */}
            {/* <DeliveryFood /> */}
            <AwesomeModal height='100vh' zIndex='9999' padding='25px' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='90%' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <form>
                    <InputHooks
                        title='Desde'
                        width={'20%'}
                        required
                        error={errorForm?.Desde}
                        value={dataForm?.Desde}
                        onChange={handleChange}
                        name='Desde'
                        type='date'
                    />
                </form>
            </AwesomeModal>
        </Container>
    )
}