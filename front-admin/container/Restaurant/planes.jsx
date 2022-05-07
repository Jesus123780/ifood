import PropTypes from 'prop-types'
import { useEffect } from 'react'
import ActiveLink from '../../components/common/Link'
import { useSetState } from '../../components/hooks/useState'
import { RippleButton } from '../../components/Ripple'
import { BColor, BGColor, SECColor } from '../../public/colors'
import { IconArrowBottom, IconCancel } from '../../public/icons'
import { BtnClose, BtnItem, ButtonTheme, Card, Cards, CardWrap, ContentCards, ContentCarPrice, ContentPrice, ContentPricing, ContentToggle, FeatureItem, Line, Module, ModuleInfo, Pricing, SwitchButton, Text } from './styled'

const Planes = () => {
  const show = useSetState(0)
  const Switch = useSetState(0)
  const handleShow = index => {
    show.setState(index === show.state ? false : index)
  }

  useEffect(() => {
    if (show) window.addEventListener('keyup', e => {return e.code === 'Escape' && show.setState(false)})
    return () => {return window.removeEventListener('keyup', () => { })}
  }, [show])
  return (
    <div>
      <ContentToggle>
        <Text
          bold='600'
          color={SECColor}
          font='PFont-Regular'
          justify='center'
          lineHeight={'2.75rem'}
          margin='0 .625rem'
          size='1.5rem'
          width='auto'
        >Monthly</Text>
        <ButtonTheme onClick={() => {return Switch.setState(!Switch.state)}}>
          <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
        </ButtonTheme>
        <Text
          bold='600'
          color={SECColor}
          font='PFont-Regular'
          justify='center'
          lineHeight={'2.75rem'}
          margin='0 .625rem'
          size='1.5rem'
          width='auto'
        >Annual</Text>
      </ContentToggle>
      <ContentCards>

        <ContentPricing>
          <ContentCarPrice>
            {[1, 2]?.map(x => {return (
              <>
                <CardWrap
                  alignContent='flex-start'
                  justify='flex-start'
                  key={x._id}
                  margin='1.5rem .625rem 0'
                  maxWidth='16.5625rem'
                  overflow='hidden'
                  padding='20px 20px'
                  radius='5px'
                  shadow='0 0.125rem 0.5rem 0 rgb(0 0 0 / 20%)'
                  width='100vw'
                >
                  <Text
                    bold='500'
                    color={BColor}
                    lineHeight='1.4'
                    size='1.25rem'
                  >{x.LName}</Text>
                  <Line />
                  <Pricing>
                    <s>
                      {x.LDescuento ? `£ ${x.LDescuento}` : '£ 16'}
                    </s>
                  </Pricing>
                  <ContentPrice>
                    <Text
                      bold='700'
                      color={SECColor}
                      font='PFont-Bold'
                      lineHeight={'1.3'}
                      margin='.5rem 0'
                      size='2.5rem'
                    >{'£ 2'}</Text>
                  </ContentPrice>
                  <ActiveLink activeClassName='active' href={`/restaurante/revisa-tus-datos`}>
                    <a>
                      <RippleButton
                        bgColor={'#0e8900'}
                        border='624.9375rem'
                        color={BGColor}
                        family='PFont-Medium'
                        margin='0px 10px 20px 0px'
                        widthButton='150px'
                      >comprar ahora</RippleButton>
                    </a>
                  </ActiveLink>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(z => {return (
                    <div key={z._id}>
                      <FeatureItem>
                        <IconArrowBottom color={BColor} size='17px' />
                        <BtnItem
                          onClick={() => {return show.setState(x === show.state ? false : x)}}
                          overflow
                          style={{ fontSize: '1.25rem' }}
                        >{z.lineItemsDescription}</BtnItem>
                      </FeatureItem>
                    </div>
                  )})}
                </CardWrap>
                <ModuleInfo show={true}>
                  <Module>
                    <BtnClose onClick={() => {return show.setState(false)}}>
                      <IconCancel size='20px' />
                    </BtnClose>
                    <Text
                      bold='600'
                      color={SECColor}
                      lineHeight='1.4'
                      margin='2.5rem 0 0'
                      size='2rem'
                    >Track income & expenses</Text>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(z => {return (
                      <ul key={z._id}>
                        <li >{z.lineItemsDescription}</li>
                      </ul>
                    )})}
                  </Module>
                </ModuleInfo>
              </>

            )})}
          </ContentCarPrice>
        </ContentPricing>
      </ContentCards>
    </div>
  )
}

Planes.propTypes = {

}

export default Planes
