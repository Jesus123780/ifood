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
    onError: (err) => {return console.log({ message: `${err}`, duration: 8000 })}
  })
  const { id, email } = data?.getOneUser || {}
  const handleForm = (e, show) => {return handleSubmit({
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
              uEmail: email
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
              uEmail: dataForm?.email
            }
          }
        })
      }
    },
    actionAfterSuccess: () => {
      // setDataValue({})

    }
  })}
  // create-team
  const [nextStep, setNextStep] = useState(0)

  return (
    <Content>
      <Form onSubmit={(e) => {return handleForm(e, 1)}}>
        <Text color={BColor} size='20px'>correo para continuar</Text>
        {<Text color={BColor} size='19px'>{dataForm?.email || data?.getOneUser?.email}</Text>}
        <InputHooks
          error={errorForm?.email}
          name='email'
          onChange={handleChange}
          required
          title='Informa tu correo.'
          value={dataForm?.email}
          width='100%'
        />
        {data?.getOneUser && !loading && <ContentTeam border={data?.getOneUser} onClick={() => {return setModal(true)}}>
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
                        <RippleButton
                          bgColor={PVColor}
                          margin='0'
                          onClick={() => {return SHOW_ADD_EMPLOYEE.setState(!SHOW_ADD_EMPLOYEE.state)}}
                          padding='15px'
                          type='button'
                          widthButton='min-content'
                        >
                          <IconPlus color={BGColor} size='20px' />
                        </RippleButton>
                      </CtnAdd>
                    </ContentTeam>
        }
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          onClick={() => {return setStep(1)}}
          style={{ position: 'absolute', left: '0', bottom: '0' }}
          type='submit'
          widthButton='100%'
        >{loading ? 'Loading...' : 'Buscar'}</RippleButton>
      </Form>
      <AwesomeModal
        backdrop='static'
        bgColor={'transparent'}
        btnConfirm={false}
        footer={false}
        header={true}
        height='85vh'
        onCancel={() => {return setModal(false)}}
        onHide={() => { setModal(false) }}
        padding='20px'
        show={modal}
        size='100vw'
        zIndex='99998887'
      >
        <Form onSubmit={(e) => {return handleForm(e, 2)}}>
          {data?.getOneUser && !loading && <ContentTeam border={data?.getOneUser}>
            <User>
              {data?.getOneUser?.email?.slice(0, 2).toUpperCase()}
            </User>
            {data?.getOneUser?.email}
          </ContentTeam>}
          <InputHooks
            error={errorForm?.eSalary}
            name='eSalary'
            onChange={handleChange}
            required
            title='Salario. por mes'
            value={numberFormat(dataForm?.eSalary)}
            width='100%'
          />
          <InputHooks
            error={errorForm?.typeContract}
            name='typeContract'
            onChange={handleChange}
            required
            title='typeContract.'
            value={dataForm?.typeContract}
            width='100%'
          />
          <InputHooks
            error={errorForm?.termContract}
            name='termContract'
            onChange={handleChange}
            required
            title='termContract.'
            value={dataForm?.termContract}
            width='100%'
          />
          <RippleButton
            bgColor={EColor}
            margin='20px auto'
            onClick={() => {return setNextStep(nextStep + 1)}}
            type={'submit'}
            widthButton='100%'
          >
            {step !== 1 ? 'Continuar' : 'Enviar'}
          </RippleButton>
        </Form >
      </AwesomeModal>
      <AwesomeModal
        backdrop='static'
        bgColor={'transparent'}
        btnConfirm={false}
        footer={false}
        header={true}
        height='85vh'
        onCancel={() => {return SHOW_ADD_EMPLOYEE.setState(!SHOW_ADD_EMPLOYEE.state)}}
        onHide={() => { SHOW_ADD_EMPLOYEE.setState(!SHOW_ADD_EMPLOYEE.state) }}
        padding='20px'
        show={SHOW_ADD_EMPLOYEE.state}
        size='100vw'
        zIndex='99998887'
      >
        <Text color={BColor} size='30px'>Agregar un usuario </Text>
        {!data?.getOneUser && !loading && <ContentTeam border={false}>
          <User>
            {dataForm.email?.slice(0, 2).toUpperCase()}
          </User>
          {dataForm.email}
        </ContentTeam>}
        <Form onSubmit={(e) => {return handleForm(e, 3)}}>
          {data?.getOneUser && !loading && <ContentTeam border={data?.getOneUser}>
            <User>
              {data?.getOneUser?.email?.slice(0, 2).toUpperCase()}
            </User>
            {data?.getOneUser?.email}
          </ContentTeam>}
          <RippleButton
            bgColor={EColor}
            margin='20px auto'
            type={'submit'}
            // onClick={() => setNextStep(nextStep + 1)}
            widthButton='100%'
          >
          </RippleButton>
        </Form >
      </AwesomeModal>
    </Content>
  )
}
