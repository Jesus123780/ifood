import React from 'react'
import { LastedStatistic } from './LastedStatistic'
import { OurFood } from './OurFood'
import { AlertStatistic } from './AlertClients'
import { DeliveryFood } from './Delivery'
import { Wrapper, ContentGrid } from './styled'
import { SalesWeek } from './salesWeek'
import { SalesWeekShortDays } from './salesWeekShortDays'
import { Devices } from 'components/Devices'
import { TeamStore } from 'container/TeamStore'
import { MainCard } from 'components/common/Reusable/ShadowCard'
import { Main } from './Main'
import { ChatStatistic } from 'container/ventas/ListVentas'

const Dashboard = () => {
  return (<>
    <Wrapper>
      <Main />
      <ChatStatistic />
      <SalesWeekShortDays />
      <SalesWeek />
      <Addons />
      <LastedStatistic />
      <OurFood />
      <AlertStatistic />
      <DeliveryFood />
    </Wrapper >
  </>
  )
}

Dashboard.propTypes = {

}

export default Dashboard

export const Addons = () => {
  return (
    <ContentGrid>
      <MainCard title='Mi equipo'>
        <TeamStore />
      </MainCard>
      <MainCard title='Dispositivos conectados'>
        {/*  */}
      </MainCard>
      <MainCard title='Dispositivos conectados'>
        <Devices />
      </MainCard>
    </ContentGrid>
  )
}
