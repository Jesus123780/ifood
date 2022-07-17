import React from 'react'
import Column from '~/components/common/Atoms/Column'
import Row from '~/components/common/Atoms/Row'
import Text from '~/components/common/Atoms/Text'
import { RippleButton } from '~/components/Ripple'

export const EmployeeProfile = ({ eId,
  idStore,
  id,
  idEmployee,
  eSalary,
  typeContract,
  uEmail,
  termContract,
  eDatAdm,
  eState,
  tpEmail }) => {
  return (
    <div>
      <Column>
        <Text as='h4' >Email: {tpEmail}</Text>
        <Text as='h4' >eDatAdm: {eDatAdm}</Text>
        <Text as='h4' >eState: {eState}</Text>
        <Text as='h4' >termContract: {termContract}</Text>
        <Text as='h4' >typeContract: {typeContract}</Text>
        <Text as='h4' >uEmail: {uEmail}</Text>
        <Text as='h4' >eSalary: {eSalary}</Text>
        <Text as='h4' >idEmployee: {idEmployee}</Text>
        <Text as='h4' >id: {id}</Text>
        <Text as='h4' >idStore: {idStore}</Text>
      </Column>
      <Row>
        <RippleButton>
          <Text as='h4'>Editar</Text>
        </RippleButton>
        <RippleButton>
          <Text as='h4'>Eliminar</Text>
        </RippleButton>
        <RippleButton>
          <Text as='h4'>Editar accesos</Text>
        </RippleButton>
      </Row>
    </div>
  )
}
