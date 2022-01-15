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
        if (show) window.addEventListener('keyup', e => e.code === 'Escape' && show.setState(false))
        return () => window.removeEventListener('keyup', () => { })
    }, [show])
    return (
        <div>
            <ContentToggle>
                <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.5rem' margin='0 .625rem' width='auto' >Monthly</Text>
                <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                    <SwitchButton active={Switch.state ? '36px' : '3.5px'} />
                </ButtonTheme>
                <Text lineHeight={'2.75rem'} font='PFont-Regular' bold='600' justify='center' color={SECColor} size='1.5rem' margin='0 .625rem' width='auto' >Annual</Text>
            </ContentToggle>
            <ContentCards>

                <ContentPricing>
                    <ContentCarPrice>
                        {[1, 2]?.map(x => (
                            <>
                                <CardWrap overflow='hidden' key={x._id} alignContent='flex-start' radius='5px' shadow='0 0.125rem 0.5rem 0 rgb(0 0 0 / 20%)' maxWidth='16.5625rem' width="100vw" margin='1.5rem .625rem 0' padding='20px 20px' justify='flex-start'>
                                    <Text color={BColor} lineHeight='1.4' bold='500' size='1.25rem' >{x.LName}</Text>
                                    <Line />
                                    <Pricing>
                                        <s>
                                            {x.LDescuento ? `£ ${x.LDescuento}` : '£ 16'}
                                        </s>
                                    </Pricing>
                                    <ContentPrice>
                                        <Text lineHeight={'1.3'} font='PFont-Bold' bold='700' color={SECColor} size='2.5rem' margin='.5rem 0'>{'£ 2'}</Text>
                                    </ContentPrice>
                                    <ActiveLink activeClassName="active" href={`/restaurante/revisa-tus-datos`}>
                                        <a>
                                            <RippleButton margin='0px 10px 20px 0px' border='624.9375rem' color={BGColor} widthButton='150px' bgColor={'#0e8900'} family='PFont-Medium'>comprar ahora</RippleButton>
                                        </a>
                                    </ActiveLink>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(z => (
                                        <div key={z._id}>
                                            <FeatureItem>
                                                <IconArrowBottom color={BColor} size='17px' />
                                                <BtnItem overflow style={{ fontSize: '1.25rem' }} onClick={() => show.setState(x === show.state ? false : x)}>{z.lineItemsDescription}</BtnItem>
                                            </FeatureItem>
                                        </div>
                                    ))}
                                </CardWrap>
                                <ModuleInfo show={true}>
                                    <Module>
                                        <BtnClose onClick={() => show.setState(false)}>
                                            <IconCancel size='20px' />
                                        </BtnClose>
                                        <Text color={SECColor} lineHeight='1.4' bold='600' size='2rem' margin='2.5rem 0 0'>Track income & expenses</Text>
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(z => (
                                            <ul key={z._id}>
                                                <li >{z.lineItemsDescription}</li>
                                            </ul>
                                        ))}
                                    </Module>
                                </ModuleInfo>
                            </>

                        ))}
                    </ContentCarPrice>
                </ContentPricing>
            </ContentCards>
        </div>
    )
}

Planes.propTypes = {

}

export default Planes
