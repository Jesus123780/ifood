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
            update: (cache, { data: { getAllClients } }) => updateCache({
                cache,
                query: GET_ALL_CLIENTS,
                nameFun: 'getAllClients',
                dataNew: getAllClients
            })
        })
    }
    const OPEN_MODAL = useSetState()
    const OPEN_MODAL_CLIENT = useSetState()
    const [createClients] = useMutation(CREATE_CLIENTS)
    const { data: clients } = useQuery(GET_ALL_CLIENTS)
    console.log(clients)
    const handleForm = (e) =>
        handleSubmit({
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
                            clientLastName,
                        }
                    },
                    update: (cache, { data: { getAllClients } }) => updateCache({
                        cache,
                        query: GET_ALL_CLIENTS,
                        nameFun: 'getAllClients',
                        dataNew: getAllClients
                    })
                }).then(() => {
                    OPEN_MODAL.setState(!OPEN_MODAL.state)
                    setDataValue({})
                })
            }
        })
    console.log(clients?.getAllClients)
    return (
        <Container>
            <RippleButton onClick={() => OPEN_MODAL.setState(!OPEN_MODAL.state)}>Crear nuevo</RippleButton>
            <AwesomeModal zIndex='9999' title={`Cliente ${''}`} padding='25px' show={OPEN_MODAL_CLIENT.state} onHide={() => {
                OPEN_MODAL_CLIENT.setState(!OPEN_MODAL_CLIENT.state)
                setDataValue({})
            }} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <form onSubmit={(e) => handleForm(e)}>
                    <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
                    <div style={{ marginBottom: '20px' }}>
                        <input type="checkbox" name="gender" value={setCheck.gender} onChange={(e) => handleCheck(e)} />
                    </div>
                    <InputHooks
                        title='Nombre'
                        width={'50%'}
                        required
                        error={errorForm?.clientName}
                        value={dataForm?.clientName}
                        onChange={handleChange}
                        name='clientName'
                    />
                    <InputHooks
                        title='Apellido'
                        width={'50%'}
                        required
                        error={errorForm?.clientLastName}
                        value={dataForm?.clientLastName}
                        onChange={handleChange}
                        name='clientLastName'
                    />
                    <InputHooks
                        title='Dirección'
                        width={'50%'}
                        required
                        error={errorForm?.ClientAddress}
                        value={dataForm?.ClientAddress}
                        onChange={handleChange}
                        name='ClientAddress'
                    />
                    <InputHooks
                        title='# Identidad'
                        width={'50%'}
                        required
                        error={errorForm?.ccClient}
                        value={dataForm?.ccClient}
                        onChange={handleChange}
                        name='ccClient'
                        numeric

                    />
                    <InputHooks
                        title='Numero de celular'
                        width={'50%'}
                        numeric
                        required
                        error={errorForm?.clientNumber}
                        value={dataForm?.clientNumber}
                        onChange={handleChange}
                        name='clientNumber'
                    />
                    <RippleButton type='submit' widthButton='100% ' >Guardar</RippleButton>
                </form>
            </AwesomeModal>
            <AwesomeModal zIndex='9999' title='Crea un cliente manualmente ' padding='25px' show={OPEN_MODAL.state} onHide={() => { OPEN_MODAL.setState(!OPEN_MODAL.state) }} onCancel={() => false} size='small' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <label>{setCheck.gender === 1 ? 'Femenino' : 'Masculino'}</label>
                <div style={{ marginBottom: '20px' }}>
                    <input type="checkbox" name="gender" value={setCheck} onChange={(e) => handleCheck(e)} />
                </div>
                <form onSubmit={(e) => handleForm(e)}>
                    <InputHooks
                        title='Nombre'
                        width={'50%'}
                        required
                        error={errorForm?.clientName}
                        value={dataForm?.clientName}
                        onChange={handleChange}
                        name='clientName'
                    />
                    <InputHooks
                        title='Apellido'
                        width={'50%'}
                        required
                        error={errorForm?.clientLastName}
                        value={dataForm?.clientLastName}
                        onChange={handleChange}
                        name='clientLastName'
                    />
                    <InputHooks
                        title='# Identidad'
                        width={'50%'}
                        required
                        error={errorForm?.ccClient}
                        value={dataForm?.ccClient}
                        onChange={handleChange}
                        name='ccClient'
                        numeric
                    />
                    <InputHooks
                        title='Dirección'
                        width={'50%'}
                        required
                        error={errorForm?.ClientAddress}
                        value={dataForm?.ClientAddress}
                        onChange={handleChange}
                        name='ClientAddress'
                    />
                    <InputHooks
                        title='Numero de celular'
                        width={'50%'}
                        numeric
                        required
                        error={errorForm?.clientNumber}
                        value={dataForm?.clientNumber}
                        onChange={handleChange}
                        name='clientNumber'
                    />
                    <RippleButton type='submit' widthButton='100% ' >Guardar</RippleButton>
                </form>
            </AwesomeModal>
            <form>
                <InputHooks
                    title='Numero'
                    width='30%'
                    required
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'
                />
                <InputHooks
                    title='Nombre'
                    width='30%'
                    numeric
                    required
                    error={errorForm?.ProPrice}
                    value={dataForm?.ProPrice}
                    onChange={handleChange}
                    name='ProPrice'
                />
                <Button type='submit'>
                    Mas opciones
                </Button>
                <RippleButton padding='10px' margin='30px'>Consultar</RippleButton>
                <RippleButton padding='10px' margin='30px'>Consultar y exportar</RippleButton>
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
                {clients?.getAllClients?.length > 0 ? clients?.getAllClients?.map((client) => (
                    <div key={client.cliId}>
                        <Item>{client.clientName}</Item>
                        <Item>{client.clientLastName}</Item>
                        <Item>
                            <Button onClick={() => DeleteOneClient({ cliId: client.cliId, clState: client.clState })}>
                                <IconDelete size='30px' color={PColor} />
                            </Button>
                        </Item>
                    </div>
                )) : <h2>No hay datos</h2>}
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
