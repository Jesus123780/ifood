import PropTypes from 'prop-types'
import { RippleButton } from 'components/Ripple'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { APColor, BColor, BGColor, PColor } from 'public/colors'
import { IconDelete, IconEdit } from 'public/icons'
import styled, { css } from 'styled-components'
import { numberFormat } from 'utils'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const CardProducts = ({ pName, del, edit, key, ProDescription, ValueDelivery, pId, ProPrice, render = null, onClick = () => { }, handleDelete = () => { }, ProDescuento, ProImage, widthButton }) => {
  const router = useRouter()
  return (
    <Card key={key}>
      {del && <ButtonCard grid={false} onClick={handleDelete}>
        <IconDelete color={PColor} size={20} />
        <ActionName >
                    Eliminar
        </ActionName>
      </ButtonCard>}
      {edit && <ButtonCard
        delay='.1s'
        grid={false}
        onClick={() => {return router.push(`/producto/editar/${pId}`)}}
        top={'80px'}
      >
        <IconEdit color={PColor} size={20} />
        <ActionName>
                    Editar
        </ActionName>
      </ButtonCard>}
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
            onClick={() => {return onClick()}}
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

export const ContentImage = styled.div`
    display: flex;
    width: 100%;
    && > img {
        height: 300px; 
        min-height: 300px; 
        object-fit: cover;
        max-height: 300px; 
        width: 100%; 
    }
`
export const InputFile = styled.input`
    /* display: none;    */
`
export const ActionName = styled.span`
    position: absolute;
    height: 20px;
    width: 100px;
    right: 35px;
    color: ${BColor};
    opacity: 0;
    font-family: PFont-Light;
    transition: .1s ease-in-out;
    z-index: -900;
`
export const ButtonCard = styled.button` 
    font-size: 12px;
    font-family: PFont-Light;
    cursor: pointer;
    word-break: break-word;
    box-shadow: 0px 0px 6px 0px #16101028;
    position: absolute;
    right: -50px;
    transition: .4s ease;
    width: 50px;
    height: 50px;
    z-index: 999; 
    top: ${({ top }) => {return top ? top : '20px'}};
    transition-delay: ${({ delay }) => {return delay ? delay : 'auto'}};
    max-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    align-items: center;
    display: grid;
    justify-content: center;
    background-color: ${BGColor};
    &:hover  ${ActionName} {
        opacity: 1;
        z-index: 900;
    }
    ${props => {return props.grid && css`
        top: ${({ top }) => {return top ? top : '80px'}};
        `}
}
`
const Card = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    text-decoration: none;
    transition: .2s;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgba(0,0,0,.05);
    border-radius: 4px;
    padding: 0;
    /* max-width: 222px; */
    grid-template:
     "image" 157px 
     "info-price"  1fr
     "info"  1fr;
    grid-gap: 28px;
    height: 400px;
    align-items: flex-end;
    top: 0;
    &:hover  ${ButtonCard} {
        right: 15px;
    }
    &#space {
        padding: 30px;
        justify-content: space-between;
    }
    @media only screen and (min-width: 960px) {
        cursor: pointer;
    }
    .dish-card__info {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        margin: 0;
        display: grid;
        grid-area: info;
        grid-template-rows: 1fr;
        padding: 10px 20px;
        height: min-content;
        /* padding: 0 20px; */
    }
    .dish-card__container-image {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-family: SulSans,Helvetica,sans-serif;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        height: 157px;
        grid-area: image;
    width: 100%;
    overflow: hidden;
    height: 100%;
    border-radius: 4px 4px 0 0;
        box-sizing: border-box;
        position: relative;
    }
    .marmita-image--responsive {
        line-height: 1.15;
        text-rendering: optimizeLegibility;
        font-size: 16px;
        list-style: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        box-sizing: border-box;
        border-style: none;
        pointer-events: none;
        align-self: flex-start;
        object-fit: cover;
        grid-area: image;
        width: 100%;
        border-radius: 4px 4px 0 0;
        height: 157px;
    }
    .dish-card__description {
    text-rendering: optimizeLegibility;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    color: #3e3e3e;
    font-weight: 400;
    margin-top: 0;
    line-height: 1.5rem;
    margin-bottom: 9px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.165rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    width: 85%;
    }
    .description {
    text-rendering: optimizeLegibility;
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: lighter;
    color: #717171;
    word-break: break-word;
    font-size: .875rem;
    line-height: 1.25rem;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
    .price {
    list-style: none;
    cursor: pointer;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: ${APColor};
    }
    .discount {
    color: #3e3e3e;
    text-decoration-line: line-through;
    }
    .flex-wrap {
        display: flex;
        justify-content: space-between;
    }
    .info-price {
        display: flex;
        padding: 0 20px;
    }
`
const ContainerActions = styled.button`
    position: absolute;
    width: max-content;
    right: 25px;
    background-color: transparent;
    border-radius: 50%;
`
// const InputHooks = styled.input`
// margin: 5px;
// `