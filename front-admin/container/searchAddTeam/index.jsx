import React, { useState } from 'react'
import { RippleButton } from '../../components/Ripple'
import { APColor, BColor, BGColor, EColor, PLColor, PVColor } from '../../public/colors'
import InputHooks from '../../components/InputHooks/InputHooks'
import { useFormTools } from '../../components/BaseForm'
import { useMutation } from '@apollo/client'
import { Content, ContentTeam, CtnAdd, Form, Text, User } from './styled'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { CREATE_ONE_TEAM_USER, CREATE_ONE_TEAM_USER_INVITE, GET_ONE_TEAM_USER } from './queries'
import { AwesomeModal } from '../../components/AwesomeModal'
import { StepsComponent } from '../../components/Steps'
import { IconPlus } from '../../public/icons'
import { numberFormat } from '../../utils'
import { isMoment } from 'moment'
import { useSetState } from '../../components/hooks/useState'
// import { EMAIL_SESSION } from './queries'

export const AddEmployee = () => {
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const [step, setStep] = useState(0)
    const [modal, setModal] = useState(0)
    const SHOW_ADD_EMPLOYEE = useSetState(false)
    const router = useRouter()
    const [createOneEmployeeStore] = useMutation(CREATE_ONE_TEAM_USER)
    const [createOneEmployeeStoreAndUser] = useMutation(CREATE_ONE_TEAM_USER_INVITE)
    const [getOneUser, { data, loading, error, called }] = useLazyQuery(GET_ONE_TEAM_USER, {
        onError: (err) => console.log({ message: `${err}`, duration: 8000 })
    })
    const { id, email } = data?.getOneUser || {}
    const handleForm = (e, show) => handleSubmit({
        event: e,
        action: () => {
            if (show === 1) {
                return getOneUser({
                    variables: {
                        uEmail: dataForm.email
                    }
                })
            } else if (show === 2) {
                return createOneEmployeeStore({
                    variables: {
                        input: {
                            eSalary: parseFloat(dataForm?.eSalary),
                            typeContract: dataForm.typeContract,
                            termContract: dataForm.termContract,
                            eDatAdm: new Date().getTime(),
                            eState: 0,
                            idEmployee: id,
                            uEmail: email,
                        }
                    }
                })
            } else if (show === 3) {
                return createOneEmployeeStoreAndUser({
                    variables: {
                        input: {
                            eSalary: parseFloat(dataForm?.eSalary),
                            typeContract: dataForm.typeContract,
                            termContract: dataForm.termContract,
                            eDatAdm: new Date().getTime(),
                            eState: 0,
                            idEmployee: id,
                            uEmail: dataForm?.email,
                        }
                    }
                })
            }
        },
        actionAfterSuccess: () => {
            // setDataValue({})

        }
    })
    // create-team
    const [nextStep, setNextStep] = useState(0)

    return (
        <Content>
            <Form onSubmit={(e) => handleForm(e, 1)}>
                <Text color={BColor} size='20px'>correo para continuar</Text>
                {<Text color={BColor} size='19px'>{dataForm?.email || data?.getOneUser?.email}</Text>}
                <InputHooks title='Informa tu correo.' width='100%' required error={errorForm?.email} value={dataForm?.email} onChange={handleChange} name='email' />
                {data?.getOneUser && !loading && <ContentTeam border={data?.getOneUser} onClick={() => setModal(true)}>
                    <User>
                        {data?.getOneUser?.email?.slice(0, 2).toUpperCase()}
                    </User>
                    {data?.getOneUser?.email}
                </ContentTeam>}
                {!data?.getOneUser && called &&
                    <ContentTeam border={data?.getOneUser}>
                        <User>
                            No
                        </User>
                        <CtnAdd>
                            {dataForm?.email}  No existe
                            <RippleButton widthButton='min-content' margin='0' padding='15px' type='button' onClick={() => SHOW_ADD_EMPLOYEE.setState(!SHOW_ADD_EMPLOYEE.state)} bgColor={PVColor}>
                                <IconPlus size='20px' color={BGColor} />
                            </RippleButton>
                        </CtnAdd>
                    </ContentTeam>
                }
                <RippleButton onClick style={{ position: 'absolute', left: '0', bottom: '0' }} widthButton='100%' margin='20px auto' type='submit' onClick={() => setStep(1)} bgColor={EColor}>{loading ? 'Loading...' : 'Buscar'}</RippleButton>
            </Form>
            <AwesomeModal show={modal} backdrop onCancel={() => setModal(false)} onHide={() => { setModal(false) }} btnConfirm={false} header={true} footer={false} padding='20px' backdrop='static' bgColor={'transparent'} size='100vw' zIndex='99998887' height='85vh' >
                <Form onSubmit={(e) => handleForm(e, 2)}>
                    {data?.getOneUser && !loading && <ContentTeam border={data?.getOneUser}>
                        <User>
                            {data?.getOneUser?.email?.slice(0, 2).toUpperCase()}
                        </User>
                        {data?.getOneUser?.email}
                    </ContentTeam>}
                    <InputHooks title='Salario. por mes' width='100%' required error={errorForm?.eSalary} value={numberFormat(dataForm?.eSalary)} onChange={handleChange} name='eSalary' />
                    <InputHooks title='typeContract.' width='100%' required error={errorForm?.typeContract} value={dataForm?.typeContract} onChange={handleChange} name='typeContract' />
                    <InputHooks title='termContract.' width='100%' required error={errorForm?.termContract} value={dataForm?.termContract} onChange={handleChange} name='termContract' />
                    <RippleButton
                        widthButton='100%'
                        margin='20px auto'
                        type={'submit'}
                        onClick={() => setNextStep(nextStep + 1)}
                        bgColor={EColor}
                    >
                        {step !== 1 ? 'Continuar' : 'Enviar'}
                    </RippleButton>
                </Form >
            </AwesomeModal>
            <AwesomeModal show={SHOW_ADD_EMPLOYEE.state} backdrop onCancel={() => SHOW_ADD_EMPLOYEE.setState(!SHOW_ADD_EMPLOYEE.state)} onHide={() => { SHOW_ADD_EMPLOYEE.setState(!SHOW_ADD_EMPLOYEE.state) }} btnConfirm={false} header={true} footer={false} padding='20px' backdrop='static' bgColor={'transparent'} size='100vw' zIndex='99998887' height='85vh' >
                <Text size='30px' color={BColor}>Agregar un usuario </Text>
                {!data?.getOneUser && !loading && <ContentTeam border={false}>
                    <User>
                        {dataForm.email?.slice(0, 2).toUpperCase()}
                    </User>
                    {dataForm.email}
                </ContentTeam>}
                <Form onSubmit={(e) => handleForm(e, 3)}>
                    {data?.getOneUser && !loading && <ContentTeam border={data?.getOneUser}>
                        <User>
                            {data?.getOneUser?.email?.slice(0, 2).toUpperCase()}
                        </User>
                        {data?.getOneUser?.email}
                    </ContentTeam>}
                    <RippleButton
                        widthButton='100%'
                        margin='20px auto'
                        type={'submit'}
                        // onClick={() => setNextStep(nextStep + 1)}
                        bgColor={EColor}
                    >
                    </RippleButton>
                </Form >
            </AwesomeModal>
        </Content>
    )
}
