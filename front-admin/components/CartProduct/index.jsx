import PropTypes from 'prop-types'
import { RippleButton } from 'components/Ripple'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BGColor, PColor } from 'public/colors'
import { IconDelete, IconEdit } from 'public/icons'
import { numberFormat } from 'utils'
import { ActionName, Button, ButtonCard, Card, ContainerActions, ItemProQuantity, WrapperButton } from './styled'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const CardProducts = ({ pName, del, edit, sum, free, handleFree, ProDescription, handleFreeProducts = () => { }, handleIncrement, ProQuantity, handleDecrement, ValueDelivery, pId, ProPrice, render = null, onClick = () => { }, handleDelete = () => { }, ProDescuento, ProImage, widthButton }) => {
  const router = useRouter()
  const [startAnimateUp, setStartAnimateUp] = useState('')
  const [animateType, setAnimateType] = useState('')
  const handle = () => {
    setTimeout(() => {
      setAnimateType('move-up')
      setStartAnimateUp('')
    }, 250)
  }

  const decreamentHandler = () => {
    handleDecrement()
    setStartAnimateUp('')
    setAnimateType('')
    setTimeout(() => {
      setStartAnimateUp('start-animate-down')
      setTimeout(() => {
        setAnimateType('move-down')
        setStartAnimateUp('')
      }, 250)
    }, 0)
  }

  const increamentHandler = () => {
    handleIncrement()
    setStartAnimateUp('')
    setAnimateType('')
    setTimeout(() => {
      setStartAnimateUp('start-animate-up')
      handle()
    }, 0)
  }

  return (
    <Card free={free}>
      {del && <ButtonCard grid={false} onClick={handleDelete}>
        <IconDelete color={PColor} size={20} />
        <ActionName>Eliminar</ActionName>
      </ButtonCard>}
      {edit && <ButtonCard
        delay='.1s'
        grid={false}
        onClick={() => { return router.push(`/producto/editar/${pId}`) }}
        top={'80px'}
      >
        <IconEdit color={PColor} size={20} />
        <ActionName>Editar</ActionName>
      </ButtonCard>}
      {sum && <WrapperButton>
        <Button
          delay='.1s'
          grid={false}
          onClick={() => { return increamentHandler() }}
          top={'80px'}
        >
          +
        </Button>

        <ItemProQuantity className='ProQuantity' >
          <div className={`counts--container`}>
            <div className={`count ${startAnimateUp}${animateType}`}>
              {ProQuantity}
            </div>
          </div>
        </ItemProQuantity>

        <Button
          delay='.1s'
          grid={false}
          onClick={() => { return decreamentHandler() }}
          top={'80px'}
        >
          -
        </Button>
        {handleFree && <button
          delay='.1s'
          grid={false}
          onClick={() => { return handleFreeProducts() }}
          top={'80px'}
        >
          free products
        </button>
        }
      </WrapperButton>}
      <div className='dish-card__info'>
        {ValueDelivery && <span className='description'>Domicilio $ {numberFormat(ValueDelivery || 0)}</span>}

        <div className='flex-wrap'>
          <span className='price'>$ {ProPrice ? numberFormat(ProPrice) : 'Gratis'}</span>
          {ProDescuento !== 0 && <span className='price discount'>{`$ ${numberFormat(ProDescuento)}`}</span>}
        </div>
      </div>
      <div className='info-price'>
        <span>
          <h3 className='dish-card__description'>{pName}</h3>
          <span className='description'>{ProDescription}</span>
        </span>
        <ContainerActions>
          {render && <RippleButton
            bgColor={BGColor}
            margin='5px auto'
            onClick={() => { return onClick() }}
            padding='0'
            widthButton={widthButton}
          >{render}</RippleButton>}
        </ContainerActions>
      </div>
      <div className='dish-card__container-image'>
        <Image
          alt={pName}
          blurDataURL='/images/DEFAULTBANNER.png'
          className='store_image'
          layout='fill'
          objectFit='cover'
          src={ProImage || '/images/dish-image-placeholder.png'}
        />
      </div>
    </Card>
  )
}

CardProducts.propTypes = {
  ProDescription: PropTypes.any,
  ProDescuento: PropTypes.number,
  ProImage: PropTypes.string,
  ProPrice: PropTypes.any,
  ValueDelivery: PropTypes.number,
  del: PropTypes.any,
  edit: PropTypes.any,
  handleDelete: PropTypes.func,
  key: PropTypes.any,
  onClick: PropTypes.func,
  pId: PropTypes.any,
  pName: PropTypes.any,
  render: PropTypes.any,
  widthButton: PropTypes.any
}

