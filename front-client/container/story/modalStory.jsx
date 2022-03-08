import { BColor, BGColor, PColor } from 'public/colors'
import { useEffect, useReducer, useState } from 'react'
import { Title } from './story-item'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { IconCancel, IconFacebook, IconTwitter, IconWhatsApp, IconEnlace } from 'public/icons'
import CustomSlider from 'components/Slider'
import { SwiperSlide } from 'swiper/react'
import useTimeAgo from 'components/hooks/useTimeAgo'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { useRouter } from 'next/router'
import { copyToClipboard } from 'utils'
import { Flex } from 'container/RestaurantProfile/styled'

export const SlideStory = ({ closeModal, OpenModalInfo, dataItem }) => {
  const [browser, setBrowser] = useState(false)
  const location = useRouter()

  const { nameStore, createAt } = OpenModalInfo.state || {}
  const timeAgo = useTimeAgo(new Date(createAt).getTime())
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

        <h2>{nameStore}</h2>
        <date>{timeAgo}</date>
        <ContentShare>
          compartir
          <ContainerShare>
            <button onClick={() => handlerShare(2)}> <div className="icon facebook"><IconFacebook color={BGColor} size='20px' /></div>  </button>
            <button onClick={() => handlerShare(3)}> <div className='icon whatsApp'><IconWhatsApp color={BGColor} size='20px' /> </div></button>
            <button onClick={() => handlerShare(4)}> <div> <IconTwitter color={'#00acee '} size='20px' /> </div></button>
            <button onClick={() => copyToClipboard(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`)}> <div> <IconEnlace size='20px' /> </div></button>
          </ContainerShare>
        </ContentShare>
        <CopyLink>
          <input value={`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`} className='input-copy' />
          <button className='' onClick={() => copyToClipboard(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}`)}>Copiar enlace</button>
        </CopyLink>
        <ContainerCom>

        </ContainerCom>
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
    content: " ";
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
export const ContainerCom = styled.div`
      width: 100%;
    padding: 24px 32px;
    box-sizing: border-box;
    background-color: rgb(248, 248, 248);
    border-top: 1px solid rgba(18, 18, 18, 0.12);
    border-bottom: 1px solid rgba(18, 18, 18, 0.12);
    overflow: hidden auto;
    -webkit-box-flex: 1;
    flex-grow: 1;
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