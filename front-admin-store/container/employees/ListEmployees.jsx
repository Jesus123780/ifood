import PropTypes from 'prop-types'
import React from 'react'
import { Section } from '~/components/Table/styled'
import { Table } from '~/components/Table'
import Button from '~/components/common/Atoms/Button'
import { RippleButton } from '~/components/Ripple'
import { PColor } from '@/public/colors'

const ListEmployees = ({
  data,
  setMore,
  loading,
  more,
  fetchMore,
  hamdleEmployee,
  handleDeleteEmployee
}) => {
  return (
    <div>
      <Table
        data={data || []}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((x, i) => {
            const state = x.eState === 1 ? 'Activo' : 'Inativo'
            const contentEmail = x.tpEmail ? x.tpEmail : 'No informado'
            return <Section
              columnWidth={titles}
              key={i}
              odd
              padding='10px 0'
            >
              <div>
                <span> {x.eSalary} </span>
              </div>
              <div>
                <span> {state} </span>
              </div>
              <div>
                <span> {x.termContract} </span>
              </div>
              <div>
                <span> {x.typeContract} </span>
              </div>
              <div>
                <span> {contentEmail} </span>
              </div>
              <div>
                <Button onClick={() => { return hamdleEmployee({ employee: x }) }}>
                  Ver detalles
                </Button>
                <Button color={PColor} onClick={() => { return handleDeleteEmployee({ employee: x }) }}>
                  Eliminar
                </Button>
              </div>
            </Section>
          })
        }}
        titles={
          [
            { name: 'Salario', key: 'x.eSalary', justify: 'flex-start', width: '1fr' },
            { name: 'Estado', key: 'x.eState', justify: 'flex-start', width: '1fr' },
            { name: 'Terminos', key: 'x.termContract', justify: 'flex-start', width: '1fr' },
            { name: 'Tipo de Contract', justify: 'flex-start', width: '1.5fr' },
            { name: 'Email', key: 'x.uEmail', justify: 'flex-start', width: '1fr' },
            { name: 'Accion', justify: 'flex-start', width: '1fr' }
          ]}
      />
      <RippleButton
        margin='20px auto'
        onClick={() => {
          setMore(more + 100)
          // employees()
          fetchMore({
            variables: { max: more, min: 0 },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              return {
                employees: [...fetchMoreResult.employees]

              }
            }
          })
        }}
        widthButton='100%'
      >{loading ? '...Cargando' : 'Cargar mas'}</RippleButton>
    </div >
  )
}

ListEmployees.propTypes = {
  data: PropTypes.array
}

export default ListEmployees