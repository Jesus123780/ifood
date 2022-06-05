import React, { useEffect, useState, useCallback, useContext } from 'react'
import Link from '../common/Link'
import styled from 'styled-components'
import { PColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { ButtonOption, FloatingBoxTwo, Overline } from './styled'
import { IconLogout, IconMessageMain, IconShopping, IconUser } from '../../public/icons'
import { useRouter } from 'next/router'
import { Context } from 'context/Context'
import { LoadingClosed } from 'components/Loading'
import usePushNotifications from 'hooks/usePushNotifications'

export const Options = () => {
  const { client } = useApolloClient()
  const [show, setShow] = useState(false)
  const { setAlertBox } = useContext(Context)
  const location = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Cerrar sesión
  const onClickLogout = useCallback(async () => {
    setLoading(true)
    await window
      .fetch(`${process.env.URL_BASE}api/auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          location.replace('/entrar')
          setLoading(false)
        }
      })
      .catch(() => {
        setError(true)
        setAlertBox({ message: 'Ocurrió un error al cerrar session' })
      })
  }, [client, location, setAlertBox])

  useEffect(() => {
    const body = document.body
    body.addEventListener('keyup', e => { return e.code === 'Escape' && setShow(false) })
    return () => { return body.removeEventListener('keyup', () => { return setShow }) }

  }, [setShow])
  const handleClick = index => {
    setShow(index === show ? false : index)
  }
  useEffect(() => {
    setShow(false)
  }, [location])
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error: ee,
    loading: loasss
  } = usePushNotifications();
  const Loading = ({ loading }) => (loading ? <div className="app-loader">Please wait, we are loading something...</div> : null);
const Error = ({ error }) =>
  error ? (
    <section className="app-error">
      <h2>{error.name}</h2>
      <p>Error message : {error.message}</p>
      <p>Error code : {error.code}</p>
    </section>
  ) : null;
  const isConsentGranted = userConsent === "granted";
  return (
    <ContainerOption>
      {(loading || error) && <LoadingClosed error={error} />}
      <Overline onClick={() => { return setShow(!true) }} show={show} />
      <ButtonOption>
        <Enlace href='/messages'>
          <a>
            <IconMessageMain color={PColor} size='25px' />
          </a>
        </Enlace>
      </ButtonOption>
      <ButtonOption onClick={onClickLogout}>
        <IconLogout color={PColor} size='20px' />
      </ButtonOption>
      <ButtonOption onClick={() => { return handleClick(2) }}>
        <IconShopping color={PColor} size='25px' />
      </ButtonOption>
      <ContainerOption>
        <FloatingBoxTwo show={show === 2}>
        <main>
              <Loading loading={loading} />
              <p>Push notification are {!pushNotificationSupported && "NOT"} supported by your device.</p>
              <p>
                User consent to recevie push notificaitons is <strong>{userConsent}</strong>.
              </p>
              <Error error={error} />
              <button disabled={!pushNotificationSupported || isConsentGranted} onClick={onClickAskUserPermission}>
                {isConsentGranted ? "Consent granted" : " Ask user permission"}
              </button>
              <button disabled={!pushNotificationSupported || !isConsentGranted || userSubscription} onClick={onClickSusbribeToPushNotification}>
                {userSubscription ? "Push subscription created" : "Create Notification subscription"}
              </button>
              <button disabled={!userSubscription || pushServerSubscriptionId} onClick={onClickSendSubscriptionToPushServer}>
                {pushServerSubscriptionId ? "Subscrption sent to the server" : "Send subscription to push server"}
              </button>
              {pushServerSubscriptionId && (
                <div>
                  <p>The server accepted the push subscrption!</p>
                  <button onClick={onClickSendNotification}>Send a notification</button>
                </div>
              )}
              <section>
                <h4>Your notification subscription details</h4>
                <pre>
                  <code>{JSON.stringify(userSubscription, null, " ")}</code>
                </pre>
              </section>
            </main>
          <Option Theme={false} >
            <ButtonOption onClick={() => { return location.push('/profile/user') }} space>
              <span>Perfil</span>
              <IconUser color={PColor} size='25px' />
            </ButtonOption>
          </Option>
          <Option Theme={false} >
            <ButtonOption onClick={() => { return location.push('/messages') }} space>
              <span>Messages</span>
              <IconUser color={PColor} size='25px' />
            </ButtonOption>
          </Option>
          <Option Theme={false} >
            <ButtonOption onClick={() => { return location.push('/contrato') }} space>
              <span>Contrato</span>
              <IconUser color={PColor} size='25px' />
            </ButtonOption>
          </Option>
          <Option Theme={false} >
            <ButtonOption onClick={onClickLogout} space>
              <span>Cerrar sesión</span>
              <IconLogout color={PColor} size='20px' />
            </ButtonOption>
          </Option>
        </FloatingBoxTwo>
      </ContainerOption>
    </ContainerOption>
  )
}
const ContainerOption = styled.div`
    position: relative;
    width: ${({ width }) => { return width ? width : 'max-content' }};
`
const Enlace = styled(Link)`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    &:hover{
        background-color: #1b18181a;
    }
    `
const Option = styled.div`
    padding: 15px 0px;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    &:hover{
        background-color: #ffffff1a;
    }
`