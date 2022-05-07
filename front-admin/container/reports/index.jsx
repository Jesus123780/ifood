import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import { LastedStatistic } from 'container/dashboard/LastedStatistic'
import { OurFood } from 'container/dashboard/OurFood'
import { SalesWeek } from 'container/dashboard/salesWeek'
import { SalesWeekShortDays } from 'container/dashboard/salesWeekShortDays'
import { ChatStatistic } from 'container/ventas/ListVentas'
import React from 'react'
import { Container } from './styled'

export const ReportsC = () => {
  const OPEN_MODAL = useSetState()
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  return (
    <Container>
      <MainCard title={`Ventas por meses del año`} weight={'200'}>
        <ChatStatistic />
      </MainCard>
      {/* <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton> */}
      <SalesWeekShortDays />
      <SalesWeek />
      {/* <Addons /> */}
      <LastedStatistic />
      <OurFood />
      {/* <AlertStatistic /> */}
      {/* <DeliveryFood /> */}
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100vh'
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='90%'
        zIndex='9999'
      >
        <form>
          <InputHooks
            error={errorForm?.Desde}
            name='Desde'
            onChange={handleChange}
            required
            title='Desde'
            type='date'
            value={dataForm?.Desde}
            width={'20%'}
          />
        </form>
      </AwesomeModal>
    </Container>
  )
}
