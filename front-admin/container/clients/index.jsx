import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { useSetState } from 'components/hooks/useState'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import React, { useState } from 'react'
import { Button, Item, Container, GridStatistics } from './styled'
import { useQuery, useMutation } from '@apollo/client'
import { CREATE_CLIENTS, DELETE_ONE_CLIENTS, GET_ALL_CLIENTS } from './queries'
import { updateCache } from 'utils'
import { IconDelete } from 'public/icons'
import { PColor } from 'public/colors'
import { UserVisit } from 'container/dashboard/LastedStatistic'
import { MainCard } from 'components/common/Reusable/ShadowCard'

export const Clients = () => {
  const [deleteClient] = useMutation(DELETE_ONE_CLIENTS)
  const [setCheck, setChecker] = useState({})
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
  }
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const DeleteOneClient = ({ clState, cliId }) => {
    deleteClient({
      variables: {
        clState: clState,
        cliId
      },
      update: (cache, { data: { getAllClients } }) => {return updateCache({
        cache,
        query: GET_ALL_CLIENTS,
        nameFun: 'getAllClients',
        dataNew: getAllClients
      })}
    })
  }
  const OPEN_MODAL = useSetState()
  const OPEN_MODAL_CLIENT = useSetState()
  const [createClients] = useMutation(CREATE_CLIENTS)
  const { data: clients } = useQuery(GET_ALL_CLIENTS)
  const handleForm = (e) =>
  {return handleSubmit({
    event: e,
    action: () => {
      const { clientLastName, ccClient, clientName, clientNumber, ClientAddress } = dataForm
      return createClients({
        variables: {
          input: {
            clientNumber,
            clientName,
            gender: setCheck.gender,
            ccClient,
            ClientAddress,
            clientLastName
          }
        },
        update: (cache, { data: { getAllClients } }) => {return updateCache({
          cache,
          query: GET_ALL_CLIENTS,
          nameFun: 'getAllClients',
          dataNew: getAllClients
        })}
      }).then(() => {
        OPEN_MODAL.setState(!OPEN_MODAL.state)
        setDataValue({})
      })
    }
  })}
  return (
    <Container>
      <RippleButton onClick={() => {return OPEN_MODAL.setState(!OPEN_MODAL.state)}}>Crear nuevo</RippleButton>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => {return false}}
        onHide={() => {
          OPEN_MODAL_CLIENT.setState(!OPEN_MODAL_CLIENT.state)
          setDataValue({})
        }}
        padding='25px'
        show={OPEN_MODAL_CLIENT.state}
        size='small'
        title={`Cliente ${''}`}
        zIndex='9999'
      >
        <form onSubmit={(e) => {return handleForm(e)}}>
          <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
          <div style={{ marginBottom: '20px' }}>
            <input
              name='gender'
              onChange={(e) => {return handleCheck(e)}}
              type='checkbox'
              value={setCheck.gender}
            />
          </div>
          <InputHooks
            error={errorForm?.clientName}
            name='clientName'
            onChange={handleChange}
            required
            title='Nombre'
            value={dataForm?.clientName}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.clientLastName}
            name='clientLastName'
            onChange={handleChange}
            required
            title='Apellido'
            value={dataForm?.clientLastName}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.ClientAddress}
            name='ClientAddress'
            onChange={handleChange}
            required
            title='Dirección'
            value={dataForm?.ClientAddress}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.ccClient}
            name='ccClient'
            numeric
            onChange={handleChange}
            required
            title='# Identidad'
            value={dataForm?.ccClient}
            width={'50%'}

          />
          <InputHooks
            error={errorForm?.clientNumber}
            name='clientNumber'
            numeric
            onChange={handleChange}
            required
            title='Numero de celular'
            value={dataForm?.clientNumber}
            width={'50%'}
          />
          <RippleButton type='submit' widthButton='100% ' >Guardar</RippleButton>
        </form>
      </AwesomeModal>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => {return false}}
        onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }}
        padding='25px'
        show={OPEN_MODAL.state}
        size='small'
        title='Crea un cliente manualmente '
        zIndex='9999'
      >
        <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
        <div style={{ marginBottom: '20px' }}>
          <input
            name='gender'
            onChange={(e) => {return handleCheck(e)}}
            type='checkbox'
            value={setCheck}
          />
        </div>
        <form onSubmit={(e) => {return handleForm(e)}}>
          <InputHooks
            error={errorForm?.clientName}
            name='clientName'
            onChange={handleChange}
            required
            title='Nombre'
            value={dataForm?.clientName}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.clientLastName}
            name='clientLastName'
            onChange={handleChange}
            required
            title='Apellido'
            value={dataForm?.clientLastName}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.ccClient}
            name='ccClient'
            numeric
            onChange={handleChange}
            required
            title='# Identidad'
            value={dataForm?.ccClient}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.ClientAddress}
            name='ClientAddress'
            onChange={handleChange}
            required
            title='Dirección'
            value={dataForm?.ClientAddress}
            width={'50%'}
          />
          <InputHooks
            error={errorForm?.clientNumber}
            name='clientNumber'
            numeric
            onChange={handleChange}
            required
            title='Numero de celular'
            value={dataForm?.clientNumber}
            width={'50%'}
          />
          <RippleButton type='submit' widthButton='100% ' >Guardar</RippleButton>
        </form>
      </AwesomeModal>
      <form>
        <InputHooks
          error={errorForm?.ProPrice}
          name='ProPrice'
          onChange={handleChange}
          required
          title='Numero'
          value={dataForm?.ProPrice}
          width='30%'
        />
        <InputHooks
          error={errorForm?.ProPrice}
          name='ProPrice'
          numeric
          onChange={handleChange}
          required
          title='Nombre'
          value={dataForm?.ProPrice}
          width='30%'
        />
        <Button type='submit'>
                    Mas opciones
        </Button>
        <RippleButton margin='30px' padding='10px'>Consultar</RippleButton>
        <RippleButton margin='30px' padding='10px'>Consultar y exportar</RippleButton>
      </form>
      <MainCard title='Usuarios que han visitado tu tienda'>
        <GridStatistics>
          <div>
            <h2>
              <UserVisit days={90} />
            </h2>
            <p>Ultimos de 90 Dias</p>
          </div>
          <div>
            <h2>
              <UserVisit days={14} />
            </h2>
            <p>Ultimos de 14 Dias</p>
          </div>
          <div>
            <h2>
              <UserVisit days={7} />
            </h2>
            <p>Ultimos de 7 Dias</p>
          </div>
        </GridStatistics>
      </MainCard>
      <div>
        {clients?.getAllClients?.length > 0 ? clients?.getAllClients?.map((client) => {return (
          <div key={client.cliId}>
            <Item>{client.clientName}</Item>
            <Item>{client.clientLastName}</Item>
            <Item>
              <Button onClick={() => {return DeleteOneClient({ cliId: client.cliId, clState: client.clState })}}>
                <IconDelete color={PColor} size='30px' />
              </Button>
            </Item>
          </div>
        )}) : <h2>No hay datos</h2>}
      </div>
      {/* <Table
                titles={[
                    { name: 'Nombre', justify: 'flex-start', width: '.5fr' },
                    { name: 'Apellido', justify: 'flex-start', width: '1fr' },
                    { name: 'Numero', justify: 'flex-start', width: '1fr' },
                    { name: '# Identificación', justify: 'flex-start', width: '1fr' },
                    { name: '# Dirección', justify: 'flex-start', width: '1fr' },
                    { name: 'Fecha de creación', justify: 'flex-start', width: '1fr' },
                    { name: 'Ver', justify: 'flex-start', width: '1fr' },
                    { name: 'Eliminar', justify: 'flex-start', width: '1fr' },
                ]}
                data={clients?.getAllClients || []}
                renderBody={(dataB, titles) => dataB?.map((x, i) => <Section odd padding='10px 0' columnWidth={titles} key={i}>
                    <Item>
                        <span> {x.clientName} </span>
                    </Item>
                    <Item>
                        <span> {x.clientLastName}</span>
                    </Item>
                    <Item>
                        <span> {x.clientNumber} </span>
                    </Item>
                    <Item>
                        <span> {x.ClientAddress}</span>
                    </Item>
                    <Item>
                        <span> {x.ccClient}</span>
                    </Item>
                    <Item>
                        <span> {moment(x.createAt).format('DD-MM-YYYY')} - {moment(x.createAt).format('HH:mm A')}</span>
                    </Item>
                    <Item>
                        <Button onClick={() => HandleGetOne({ id: x.cliId })}>
                            Ver detalles
                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={() => DeleteOneClient({ cliId: x.cliId, clState: x.clState })}>
                            <IconDelete size='30px' color={PColor} />
                        </Button>
                    </Item>
                </Section>)}
            /> */}
    </Container>
  )
}
