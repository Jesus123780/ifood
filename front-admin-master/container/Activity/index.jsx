import { useStoreAdmin } from '@/hooks/useStoreAdmin'
import { useUserAdmin } from '@/hooks/useUserAmin'
import { Column, Row, Text } from 'components/common/Atoms'
import { Loading } from 'components/Loading'
import React from 'react'

export const Activity = () => {
  const [dataStoreReport, { loading }] = useStoreAdmin()
  const [dataUserReport, { loading: UserLoading }] = useUserAdmin({ inActiveUser: true })
  if (loading || UserLoading) return <Loading />
  return (
    <Column display='grid'>
      <Row>
        <Column>
          <Text>Tiendas Activas</Text>
          <Text as='h2'>{dataStoreReport?.count}</Text>
        </Column>
        <Column>
          <Text>Tiendas Inactivas</Text>
          <Text as='h2'>{dataStoreReport?.countInActive}</Text>
        </Column>
      </Row>
      <Row>
        <Column>
          <Text>Usuarios  Activos</Text>
          <Text as='h2'>{dataUserReport?.count}</Text>
        </Column>
        <Column>
          <Text>Usuarios  Inactivos</Text>
          <Text as='h2'>{dataUserReport?.countInActive}</Text>
        </Column>
      </Row>
    </Column>
  )
}
