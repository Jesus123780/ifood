import React, { useEffect, useState, useCallback, useContext } from 'react'
import Link from '../common/Link'
import styled from 'styled-components'
import { BColor, BGColor, PColor, SECColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { ButtonOption, FloatingBoxTwo, Overline } from './styled'
import { IconLogo, IconLogout, IconMessageMain, IconNotification, IconShopping, IconUser } from '../../public/icons'
import { useRouter } from 'next/router'
import { Context } from 'context/Context'
import { LoadingClosed } from 'components/Loading'
import usePushNotifications from 'hooks/usePushNotifications'
import Column from 'components/common/Atoms/Column'
import Text from 'components/common/Atoms/Text'
import Portal from 'components/portal'
import Button from 'components/common/Atoms/Button'
import Row from 'components/common/Atoms/Row'

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

  const handleClick = index => {
    setShow(index === show ? false : index)
  }

  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error: errorPush,
    loading: loadingPush,
  } = usePushNotifications();
  const Loading = ({ loading }) => (loading &&
    <Portal>
      <ContentNotification background='red'>
        <Column color={BGColor} display='grid' maxWidth={'500px'} minWidth={'100px'}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.9925 18.5075L6.48501 4H16.25C16.7141 4 17.1593 3.81563 17.4874 3.48744C17.8156 3.15925 18 2.71413 18 2.25C18 1.78587 17.8156 1.34075 17.4874 1.01256C17.1593 0.684375 16.7141 0.5 16.25 0.5H2.33751C1.87338 0.5 1.42826 0.684375 1.10007 1.01256C0.771883 1.34075 0.587509 1.78587 0.587509 2.25V16.25C0.587509 16.7141 0.771883 17.1592 1.10007 17.4874C1.42826 17.8156 1.87338 18 2.33751 18H2.25001C2.71414 18 3.15926 17.8156 3.48745 17.4874C3.81563 17.1592 4.00001 16.7141 4.00001 16.25V6.5375L18.455 20.9925C18.6177 21.1565 18.8112 21.2867 19.0245 21.3756C19.2378 21.4644 19.4665 21.5101 19.6975 21.5101C19.9285 21.5101 20.1573 21.4644 20.3705 21.3756C20.5838 21.2867 20.7773 21.1565 20.94 20.9925C21.1075 20.8333 21.2418 20.6425 21.3352 20.4311C21.4286 20.2198 21.4792 19.992 21.4841 19.7609C21.489 19.5299 21.448 19.3002 21.3637 19.0851C21.2793 18.8699 21.1531 18.6736 20.9925 18.5075Z" fill="white"></path></svg>
          <Text fontSize='1.875rem'>
            Permitir notificaciones
          </Text>
          <Text fontSize='1.25rem'>
            Haz clique en ”Permitir” para mirar el andamiento de tus pedidos y enterarse de nuestras promociones y novedades
          </Text>
        </Column>
      </ContentNotification>
    </Portal>
  );
  const Error = ({ error }) =>
    error ? (
      <Column  >
        <Text>{error.name}</Text>
        <Text>{error.message}</Text>
        <Text>{error.code}</Text>
      </Column>
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
          <Row alignItems={'center'}>
            <Column width='10%' display={'grid'} margin='0 13px 0 15px' justifyContent='flex-start'>
              <IconNotification size={20} />
            </Column>
            <Column display={'grid'} margin='0 13px 0 15px' justifyContent='flex-start'>
              <Loading loading={loadingPush} />
              {loadingPush && <div>Loading</div>}
              {(pushNotificationSupported && !isConsentGranted) && <Text color={SECColor} textAlign='start' fontSize='.775rem' margin='0 0 6px 0'>Habilita las notificaciones</Text>}
              {(isConsentGranted) && <Text textAlign='start'>Las notificaciones están activas</Text>}
              {!pushNotificationSupported && <Text>Las notificaciones {!pushNotificationSupported && "No"} son compatibles con este dispositivo.</Text>}
              <Text textAlign='start' color={SECColor} fontSize='.60rem' margin={'0 0 9px 0'}> Consentimiento del usuario para recibir notificaciones {userConsent}.</Text>
              <Error error={errorPush} />
              <Button padding='0' fontSize='.875rem' width='fit-content' color={PColor} background='transparent' disabled={!pushNotificationSupported || isConsentGranted} onClick={() => onClickAskUserPermission()}>
                {!isConsentGranted && "Activar"}
              </Button>
              {/* <button disabled={!pushNotificationSupported || !isConsentGranted || userSubscription} onClick={onClickSusbribeToPushNotification}>
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
            )} */}
              {/* <section>
              <h4>Your notification subscription details</h4>
              <pre>
                <code>{JSON.stringify(userSubscription, null, " ")}</code>
              </pre>
            </section> */}
            </Column>

          </Row>
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
const ContentNotification = styled.div`
    position: fixed;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,.7);
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    width: 100vw;
    top: 0;
    z-index: 8888888;
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    place-content: center;
    place-items: center;
    .content {
      color: ${BGColor};
      /* left: 50%; */
      display: block;
      /* opacity: 1; */
      /* overflow-x: hidden; */
      /* overflow-y: auto; */
      /* position: absolute; */
      /* top: 50%; */
      /* transform: translate(-50%,-50%); */
    }
`