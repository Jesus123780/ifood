import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { BColor, BGColor, PColor, PLColor, TBGBColor } from '../../public/colors'
import { Loading } from '../../components/Loading'
import { RippleButton } from '../../components/Ripple'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import { useSetState } from '../../components/hooks/useState'
// import { LineChart } from '@/components/Chart/multiAxis'
import { Avatar, Card, CardPrimary, Container, Content, Text, Wrapper, WrapperRow, CardOverFloW, CircleCompany, ButtonTheme, SwitchButton, ContentToggle, OlList, FeedItem, ItemTeam, ItemInf, CardDevice } from './styled'
import { useFormTools } from '../../components/BaseForm'
import { useUser } from '../../components/hooks/useUser'
import { getToken } from '../../utils'
import { useStore } from '../../components/hooks/useStore'
import { AwesomeModal } from '../../components/AwesomeModal'

const Dashboard = () => {
    // STATE
    const location = useRouter()
    // const token = getToken({ restaurant: 'restaurant' })
    const loading = false
    const [baseHandle, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const HandleClickEdit = item => {
        // create func
        if (item.view === 1) {
            // setModal(true)
            // setDisable(true)
            // edit func
        } else if (item.view === 2) {
            // setDisable(false)
            // View func
        } else if (item.view === 3) {
            // isEdit.setState(true)
        }
        setDataValue({
            idBill: item._id,
            bDescription: item.bDescription,
            billNo: item.billNo,
            refCode: item.bInvoiceRef,
            bDueDate: item.bDueDate,
            _id: item?.idSupplier?._id,
            items: item?.lineItems?.map(x => { return { id: x._id, bDescription: x.description, quantity: parseInt(x.quantity), idAccount: x.idAccount, idRef: x.idPro, rate: parseInt(x.rate), iPercentage: x.lineItemsBillIva } })
        })
    }
    const handleDelete = async elem => {
        const { _id } = elem
        const results = await null({
            variables: { id: _id },
            update(cache) {
                cache.modify({
                    fields: {
                        getAllBill(dataOld = []) {
                            return cache.writeQuery({ query: 'GET_ALL_BILL', data: dataOld })
                        }
                    }
                })
            }
        }).catch(err => setAlertBox({ message: `${err}`, duration: 8000 }))
        if (results) setAlertBox({ message: 'successfully removed', duration: 8000, color: 'success' })
    }
    // EFFECT
    const Switch = {}
    const [dataUser] = useUser()
    const { email } = dataUser || {}
    const [dataStore, { loading: LoadingRes }] = useStore()
    const { storeName, idStore } = dataStore || {}
    const SHOW_MODAL_RESTAURANT = useSetState(true)

    return (<>
        {!LoadingRes && dataStore === null && <AwesomeModal backdrop='static' zIndex='9990' padding='25px' height='90vh' show={SHOW_MODAL_RESTAURANT.state} onHide={() => { SHOW_MODAL_RESTAURANT.setState(!SHOW_MODAL_RESTAURANT.state) }} onCancel={() => false} size='90%' btnCancel={false} btnConfirm={true} onConfirm={() => router.push('/restaurante')} header={false} footer={true} borderRadius='10px' >
            <Text align='center' style={{ justifyContent: 'center' }} size='30px' >Debes registrar un restaurante para continuar</Text>
        </AwesomeModal >}
        <Wrapper>
            <Container>
                <Content width="20%" /* direction="row" */>
                    <Card padding='0' width='97%'>
                        <CardPrimary radius='8px 8px 0px 0px' bgColor={TBGBColor} padding='30px 10px'>
                            <Text size='22px' >Welcome Back !</Text>
                            <Text size='20px' >{email}</Text>
                        </CardPrimary>
                        <CardPrimary padding=''>
                            <Avatar />
                            {dataStore !== null && <Link activeClassName="active" href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
                                <a>
                                    <RippleButton margin='20px 0' widthButton='70px' size='10px' padding='5px'>Ir a la tienda</RippleButton>
                                </a>
                            </Link>}
                            <WrapperRow margin='0px 0px 15px'>
                                <div>
                                    <Text font='PFont-Medium' justify='center' align='center' size='17px' >12</Text>
                                    <Text justify='center' align='center' size='14px' >Total Bills</Text>
                                </div>
                                <div>
                                    <Text font='PFont-Medium' justify='center' align='center' size='17px' >234234</Text>
                                    <Text justify='center' align='center' size='14px' >Vendors</Text>
                                </div>
                                <div>
                                    <Text font='PFont-Medium' justify='center' align='center' size='17px' >2342342</Text>
                                    <Text justify='center' align='center' size='14px' >Files</Text>
                                </div>
                            </WrapperRow>
                        </CardPrimary>
                    </Card>
                    <Card overflow='auto' wrap='no-wrap' width='97%' /* direction="row" */>
                        {[1, 2, 3, 4, 5].map((x, i) => (
                            <div key={x._id} style={{ zIndex: '200', width: 'min-content',/*  marginLeft: 'calc(10% - 45px)' */ }}> <CircleCompany pulse={x._id === x._id} onClick={() => handleCompany({ ...x })} >{x.companyName?.slice(0, 2).toUpperCase()}</CircleCompany> </div>
                        ))}
                    </Card>
                    <Card overflow='auto' wrap='no-wrap' width='97%' /* direction="row" */>
                        <ContentToggle>
                            <div>
                                <Text style={{ margin: '0' }} size='13px' >PRIVACY</Text>
                                <ButtonTheme onClick={() => Switch.setState(!Switch.state)}>
                                    <SwitchButton active={Switch.state ? '42px' : '3.5px'} />
                                </ButtonTheme>
                            </div>
                        </ContentToggle>
                    </Card>
                </Content>
                <Content width="40%">
                    <Content /* direction="row" */>
                        <Card onClick={() => location.push('/usermgt')} style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >100000000</Text>
                            <Text size='14px' >Employees</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >0</Text>
                            <Text size='14px' >Vendors</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >122221212</Text>
                            <Text size='14px' >Files</Text>
                        </Card>
                    </Content>
                    <Content /* direction="row" */>
                        <Card onClick={() => location.push('/usermgt')} style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >100000000</Text>
                            <Text size='14px' >Employees</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >0</Text>
                            <Text size='14px' >Vendors</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='30%'>
                            <Text font='PFont-Medium' size='17px' >122221212</Text>
                            <Text size='14px' >Files</Text>
                        </Card>
                    </Content>
                    <Card width='97%'>

                    </Card>
                </Content>
                <Content width="20%">
                    <Content /* direction="row" */>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='100%'>
                            <Text size='14px' >Earning Reports</Text>
                            <Text size='30px' >$51,255</Text>
                            <Text size='12px' color={PLColor} >Total Revenue</Text>
                        </Card>
                        <Card style={{ cursor: 'pointer' }} animation height='100px' width='100%'>
                            <Text font='PFont-Medium' size='17px' >100000000</Text>
                            <Text size='14px' >Employees</Text>
                        </Card>
                    </Content>
                    <Card width='97%'>

                    </Card>
                </Content>
                <Content width="20%" /* direction="row" */>
                    <Card width='97%'>
                        Lorem 1
                    </Card>
                    <Card width='97%'>
                        Lorem 2
                    </Card>
                </Content>
                <Content width="100%">
                    <Content /* direction="row" */>
                        <Card width='30%'>
                            <Text>My team </Text>
                            {[1, 2, 3, 4, 5, 6, 7].map(x => (
                                <ItemTeam key={x._id}>
                                    <ItemInf>
                                        Stuart
                                    </ItemInf>
                                    <ItemInf end>
                                        <RippleButton margin='0' widthButton='70px' size='10px' padding='5px'>View</RippleButton>
                                    </ItemInf>
                                </ItemTeam>
                            ))}
                            <RippleButton margin='20px 0' widthButton='70px' size='10px' padding='5px'>Load More</RippleButton>
                        </Card>
                        <Card width='30%'>
                            <Text>Recent Activity Feed </Text>
                            <CardOverFloW>
                                <OlList>
                                    {[1, 2, 3, 4, 5, 6, 7].map(x => (
                                        <FeedItem key={x._id}>
                                            <span className='date'>date, Sep 25</span>
                                            <span className='activity-text'>Pay One Bills</span>
                                        </FeedItem>
                                    ))}
                                </OlList>
                            </CardOverFloW>
                            <RippleButton margin='20px 0' widthButton='70px' size='10px' padding='5px'>Load More</RippleButton>
                        </Card>
                        {/* http://admiria-v.node.themesbrand.com/dashboard2 */}
                        {/* https://mannatthemes.com/dastone/default/widgets.html */}
                        <Card width='30%'>
                            <Text>Your account has been connected on these devices </Text>
                            <CardDevice>
                                <span className='device__icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="1.75" y="0.75" width="20.5" height="15.5" rx="3.25" stroke="#3E3E3E" stroke-width="1.5"></rect><path d="M5 13L19 13" stroke="#3E3E3E" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"></path><path d="M8 22C8 20.343 9.79133 19 12 19C14.2087 19 16 20.343 16 22H8Z" stroke="#3E3E3E" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"></path><path d="M12 17L12.0017 19" stroke="#3E3E3E" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                                <div className="device__info">
                                    <div className="device__description-wrapper">
                                        <span className="device__description"> Windows</span>
                                        <span className="device__current">Current device </span>
                                    </div>
                                    <span className="device__localization" tabIndex="0"> Location unknown</span>
                                </div>
                            </CardDevice>
                            <CardDevice>
                                <span className='device__icon'>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5.75" y="0.75" width="12.5" height="22.5" rx="3.25" stroke="#3E3E3E" stroke-width="1.5"></rect><path d="M10 4H14" stroke="#3E3E3E" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"></path><path d="M11 21H13" stroke="#3E3E3E" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round"></path></svg>
                                </span>
                                <div className="device__info">
                                    <div className="device__description-wrapper">
                                        <span className="device__description"> Windows</span>
                                        <span className="device__current"> Three months ago</span>
                                    </div>
                                    <span className="device__localization" tabIndex="0"> Location unknown</span>
                                </div>
                            </CardDevice>
                        </Card>
                    </Content>
                </Content>
            </Container>
        </Wrapper>
    </>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
