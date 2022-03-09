import { BColor, BGColor, PColor, PLColor, PVColor } from 'public/colors'
import { useEffect, useReducer, useRef, useState } from 'react'
import { Title } from './story-item'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'
import { IconCancel, IconFacebook, IconTwitter, IconWhatsApp, IconEnlace, IconSendMessage, IconSendMessageTwo } from 'public/icons'
import CustomSlider from 'components/Slider'
import { SwiperSlide } from 'swiper/react'
import useTimeAgo from 'components/hooks/useTimeAgo'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { useRouter } from 'next/router'
import { copyToClipboard, decodeToken, updateCache, updateCacheMod } from 'utils'
import { Flex } from 'container/RestaurantProfile/styled'
import { GET_ALL_COMMENT_STORY, REGISTER_COMMENT_STORY } from './queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { RippleButton } from 'components/Ripple'
import { useUser } from 'components/hooks/useUser'

export const SlideStory = ({ closeModal, OpenModalInfo, dataItem }) => {
  const { nameStore, createAt, stoId } = OpenModalInfo.state || {}
  const [browser, setBrowser] = useState(false)
  const [user, setUser] = useState(false)
  const location = useRouter()
  const timeAgo = useTimeAgo(new Date(createAt).getTime())
  const [registerStoryComment] = useMutation(REGISTER_COMMENT_STORY)
  const [getAllComment, { data: dataComment }] = useLazyQuery(GET_ALL_COMMENT_STORY,
    {
      notifyOnNetworkStatusChange: true,
      pollInterval: 1000
    })
  const input = useRef(null)
  console.log(stoId)
  console.log(dataComment)
  useEffect(() => {
    setUser(window.localStorage.getItem('session'))
    getAllComment({ variables: { stoId } })
  }, [OpenModalInfo, stoId])
  const messagesEndRef = useRef(null)

  const decode = decodeToken(user)
  const [dataUser, { loading: loUser }] = useUser()
  console.log(dataUser?.username)

  const [message, setMessage] = useState({
    stoId: stoId,
    comments: '',
    from: window.localStorage.getItem('usuario'),
    username: dataUser?.username?.slice(0, 3).toUpperCase(),
  })
  const onSend = () => {
    if (message.comments.length > 0) {
      registerStoryComment({
        variables: {
          input: message
        }, update: (cache, { data: { getAllStoryComment } }) => updateCacheMod({
          cache,
          type: 2,
          query: GET_ALL_COMMENT_STORY,
          nameFun: 'getAllStoryComment',
          dataNew: getAllStoryComment
        }),
      });
    }
    setMessage({
      ...message,
      comments: '',
    });
    input.current.focus()
    input.current.value = ''
    // messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setBrowser(true)
  }, [])
  function reducer(state, action) {
    switch (action?.type) {
      case 'NEXT':
        return {
          ...state,
          currentIndex: state?.currentIndex + (1 % state?.data?.length),

        };
      case 'PREV':
        return {
          ...state,
          currentIndex: state?.currentIndex - (1 % state?.data?.length)
        };
      case 'GOTO':
        return {
          ...state,
          currentIndex: action?.index
        };
      case 'RESET':
        return { ...state, currentIndex: 0, currentPosition: 0, };

      default:
        return { state };
    }
  }
  const dataArr = dataItem?.map(x => { return ({ id: x.iStoId, name: x.itemImage, image: x.itemImage }) })
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0, data: dataArr
  });
  const [share, setShare] = useState(false)

  const handlerShare = index => {
    if (index === 1) {
      setShare(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`)
    }
    if (index === 2) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`),
        'facebook-share-dialog',
        'width=626,height=436')
    }
    if (index === 3) {
      window.open(`https://api.whatsapp.com/send?text=Mira este producto ${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?phone=34123456789`)
    }
    if (index === 4) {
      window.open(`https://twitter.com/intent/tweet?text=Mira este producto ${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`)
    }
  }
  const portalContent = (
    <ContentPortal>
      <Card>
        <button className='btn btn-close' onClick={closeModal}>
          <IconCancel size='20px' color={BGColor} />
        </button>
        <BlurBg bannerImage={dataItem[0]?.itemImage}>
        </BlurBg>
        <CustomSlider
          spaceBetween={35}
          centeredSlides
          infinite={true}
          autoplay={true}
          slidesToShow={1}
          direction='horizontal' >
          {dataItem && dataItem?.map((item, i) => (
            <SwiperSlide
              key={item.iStoId}>
              <ContentSlider>
                <Img src={item.itemImage} />
              </ContentSlider>
            </SwiperSlide>
          ))}
        </CustomSlider>
      </Card>
      <Card margin={'0 auto'} flex='0 0 544px' padding='0' bgColor='transparent'>
        <Header>
          <h2>{nameStore}</h2>
          <date>{timeAgo}</date>
          <ContentShare>
            compartir
            <ContainerShare>
              <button onClick={() => handlerShare(2)}> <div className='icon facebook'><IconFacebook color={BGColor} size='20px' /></div>  </button>
              <button onClick={() => handlerShare(3)}> <div className='icon whatsApp'><IconWhatsApp color={BGColor} size='20px' /> </div></button>
              <button onClick={() => handlerShare(4)}> <div> <IconTwitter color={'#00acee '} size='20px' /> </div></button>
              <button onClick={() => copyToClipboard(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`)}> <div> <IconEnlace size='20px' /> </div></button>
            </ContainerShare>
          </ContentShare>
          <CopyLink>
            <input value={`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`} className='input-copy' />
            <button className='' onClick={() => copyToClipboard(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`)}>Copiar enlace</button>
          </CopyLink>
        </Header>
        <ContainerCom>
          {dataComment?.getAllStoryComment?.length ? dataComment?.getAllStoryComment.map(comment => (
            <div className='item-comment' key={comment?.cStoId}>
              <UserCircle>
                {comment.username.slice(0, 1).toUpperCase()}
              </UserCircle>
              <div>
                <span className='user'>{comment.username}</span>
                <p>{comment.comments}</p>
              </div>
            </div>
          )) : <span>No hay comentarios aun</span>}
          <div ref={messagesEndRef} />
        </ContainerCom>
        <ContentInput>
          <Flex>
            <Input ref={input} placeholder='Aa' value={state.content} onChange={evt => setMessage({ ...message, comments: evt.target.value })} onKeyUp={evt => { if (evt.key === 'Enter') { onSend(); } }} />
            <ButtonSend onClick={() => { onSend() }}>Publicar</ButtonSend>
          </Flex>
        </ContentInput>
      </Card>
    </ContentPortal>
  )
  if (browser) {
    return ReactDOM.createPortal(portalContent,
      document.getElementById('portal'))
  } else {
    return null

  }
}
export const ButtonSend = styled.button`
  color: rgba(22, 24, 35, 0.34);
    font-size: 14px;
    cursor: default;
    flex: 0 0 48px;
    line-height: 39px;
    text-align: right;
    margin-right: 4px;
`
const Input = styled.input`
    padding: 10px;
    outline: 0;
    border: 1px solid #eee;
    font-weight: 200;
    font-size: 13px;
    width: 100%;
    border-radius: 5px;
    
`
const Header = styled.div`
  flex: 0 0 auto;
  background-color: rgb(255, 255, 255);
  margin: 0px auto;
  padding: 21px 0px;
  /* position: absolute; */
  top: 0;
  left: 0;
  border-bottom: 1px solid ${`${PLColor}69`};
`
const ContentInput = styled.div`
  flex: 0 0 auto;
  background-color: rgb(255, 255, 255);
  margin: 0px auto;
  padding: 21px 0px;
  border-top: 1px solid ${`${PLColor}69`};
  position: fixed;
  bottom: 0;
`
export const ContainerShare = styled.div`
  position: absolute;
  display: none;
  width: 250px;
  place-content: space-between;
  box-shadow: 0 0 1.5rem rgb(18 38 63 / 9%);
  z-index: 99;
  background-color: ${BGColor};
  border-radius: 10px;
  padding: 6px;
  bottom: 0;
  right: 70px;
  transition: all .5s ease;
  .icon  {
    border-radius: 50%;
    height: 20px;
    min-height: 20px;
    max-height: 20px;
    width: 20px;
    min-width: 20px;
    max-width: 20px;
    display: flex;
    place-content: center;
    align-items: center;
  }
  .whatsApp {
    background-color: #01e675;
  }
  .facebook {
    background-color: #1196f5;
  }
  &::after {
    content: ' ';
    position: absolute;
    top: 50%;
    right: -20px;
    margin-left: 45px;
    border-width: 10px;
    border-style: solid;
  border-color:  transparent transparent transparent ${BGColor};
}
  button {
    color: ${BColor};
    padding: 8px;
    transition: .5 ease;
    cursor: pointer;
    background-color: ${BGColor};
  }
  button:hover {
    background-color: #ededed69;
  }
  `
export const ContentShare = styled.div`
    position: relative;
    cursor: pointer;
    color: red;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    position: relative;
    &:hover  > ${ContainerShare} {
        display: flex;
    }
`
export const CopyLink = styled.div`
  color: rgba(22, 24, 35, 0.75);
    font-size: 14px;
    line-height: 20px;
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    box-sizing: border-box;
    border: 1px solid rgba(22, 24, 35, 0.12);
    border-radius: 2px;
    .input-copy {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      outline: none;
      border: none;
      flex: 1 1 auto;
      padding: 7px 0px 5px 12px;
      background-color: rgba(22, 24, 35, 0.06);
    }
    button { 
      border: none;
    background: none;
    outline: none;
    color: rgb(22, 24, 35);
    font-weight: 700;
    flex: 0 0 auto;
    cursor: pointer;
    padding: 7px 18px;
    }
`
export const UserCircle = styled.div`
  min-width: 40px;
  width: 40px;
  min-height: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${PVColor};
  color: ${BGColor};
  font-size: 25px;
  display: flex;
  place-content: center;
  margin-right: 10px;
  align-items: center;
`
export const ContainerCom = styled.div`
    width: 100%;
    padding: 24px 32px;
    background-color: rgb(248, 248, 248);
    border-top: 1px solid rgba(18, 18, 18, 0.12);
    border-bottom: 1px solid rgba(18, 18, 18, 0.12);
    overflow: hidden auto;
    /* min-height: 100vh;
    height: 100vh; */
    height: calc(100vh - 80px);
    min-height: calc(100vh - 100px);
    flex-grow: 1;
    margin-bottom: 100px;
    padding-bottom: 100px;
    p {
      font-size: 16px;
      line-height: 22px;
      white-space: pre-line;
      word-break: break-word;
      margin-bottom: 6px;
    }
    .item-comment {
      margin-bottom: 16px;
      flex: 1 1 auto;
      display: flex;
    }
    .user {
      color: rgb(22, 24, 35);
      text-decoration: none;
      cursor: pointer;
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
  }
`
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

`
const ContentSlider = styled.div`
  background: rgb(255, 255, 255);
  height: 100vh;
`
const ContentPortal = styled.div`
    position: fixed;
    inset: 0px;
    background: rgb(255, 255, 255);
    z-index: 1000;
    display: flex;
    flex-direction: row;
`
const BlurBg = styled.div`
    position: absolute;
    width: 10%;
    height: 10%;
    filter: blur(2px);
    left: 50%;
    top: 50%;
    transform: scale(11);
    opacity: 0.3;
    background-image: ${({ bannerImage }) => bannerImage && `url(${bannerImage})`};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`
const Card = styled.div`
    flex: ${({ flex }) => flex || '.9 0 96px'};
    background-color: ${({ bgColor }) => bgColor || BColor};
    position: relative;
    overflow: hidden;
    padding: ${({ padding }) => padding || '0px 80px'};
    padding: ${({ padding }) => padding || '0px 80px'};
    margin: ${({ margin }) => margin || '0'};
    .btn-close {
      position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    outline: none;
    top: 20px;
    z-index: 999;
    transition: opacity 0.3s ease 0s;
    left: 20px;
    }
    h2 {
      font-weight: 500;
      font-size: 18px;
      line-height: 25px;
      font-family: PFont-Light;
      margin-top: 30px;
    }
`