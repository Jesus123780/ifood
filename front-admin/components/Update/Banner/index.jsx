import { useSetState } from '../../hooks/useState'
import PropTypes from 'prop-types'
import { Container } from './styled'
import Component from './landing'
import useHover from '../../hooks/useHover'
import { useScrollRotate } from '../../hooks/useScroll'
import { ReactComponent as Logo } from '../../../assets/img/logo.svg'
import { TextAnimation } from '../../animations/TextAnimation'
import { AnimatedText } from '../../animations/MouseHover'
import { usePosition } from '../../hooks/usePosition'
import styled from 'styled-components'
import { useRef, useState } from 'react'
import Square from '../../common/square'

export function Banner({ watch, settings }) {
  const { state, increase, decrease, reset, changeState } = useSetState(0)
  const [hoverRef, isHovered] = useHover()
  const { position } = useScrollRotate()
  const {
    latitude, longitude, timestamp, accuracy, speed, error
  } = usePosition(watch, settings)
  const loader = !latitude && !error ? (
    <>
      <div>Trying to fetch location...</div>
      <br />
    </>
  ) : null
  const fileInputRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState([])
  const [previewImg, setPreviewImg] = useState(false)
  const onFileInputChange = event => {
    const { files } = event.target
    setImages([files])
    setPreviewImg([URL.createObjectURL(files[0])])
  }
  const onTargetClick = e => {
    e.preventDefault()
    fileInputRef.current.click()
  }
  if (!latitude && !error) return loader
  return (
    <Container>

      <TextAnimation />
      <AnimatedText overlayColor='#fdc52c' textColor='#000000'>
                React
      </AnimatedText>
      <>
        <code>
                    latitude: {latitude}
          <br />
                    longitude: {longitude}
          <br />
                    timestamp: {timestamp}
          <br />
                    accuracy: {accuracy && `${accuracy}m`}
          <br />
                    speed: {speed}
          <br />
                    error: {error}
        </code>
      </>
      <div>
        <Logo className='Logo' style={{ transform: `rotate(${position}deg)` }} />
        <p>Scroll position {position}</p>
      </div>
      <i>{state}</i>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={changeState}>Animaciones</button>
      {state && <i>Animacion</i>}
      <Component />
      <Component />
      <Component />
      <Component />
      <Component />
      <div
        ref={hoverRef}
        style={{
          color: 'white',
          padding: '8rem',
          width: '12rem',
          textAlign: 'center',
          fontSize: '5rem',
          backgroundColor: isHovered ? '#00e3e3' : '#ccc'
        }}
      >
        {isHovered ? '😁' : '☹️'}
      </div>
      <ContainerUpload>
        <InputFile
          accept='.jpg, .png'
          id='iFile'
          onChange={onFileInputChange}
          ref={fileInputRef}
          type='file'
        />
        <ButtonStatus onClick={onTargetClick} type='button'>Subir</ButtonStatus>
        <Img src={previewImg} />
        <br />
      </ContainerUpload>
      <Square />
    </Container>
  )
}

Banner.propTypes = {
  settings: PropTypes.any,
  watch: PropTypes.any
}
export const InputFile = styled.input`
    display: none;
`
export const ContainerUpload = styled.div`
    width: 80%;
    padding: 10px;
    margin: auto 0;
`
export const ButtonStatus = styled.button`
    background-color:#20c0f3;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: PFont-Regular;
    color: #fff;
    margin-bottom: 10px;
    padding:10px 15px;
    font-weight: 600;
    font-size: ${ ({ fSize }) => {return fSize ? fSize : '13px'} };
    min-width: 120px;
    width: 150px;
    border-radius: 50px;
`
export const Img = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 4px;
    margin-right: 20px;
`