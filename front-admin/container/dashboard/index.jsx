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
import { GET_ALL_EMPLOYEE_STORE } from './queriesStore'
import { GET_ALL_DEVICES } from 'container/profile/queries'
import moment from 'moment'

const Dashboard = () => {
    // STATE
    const location = useRouter()
    // const token = getToken({ restaurant: 'restaurant' })
    const loading = false
    const { data: dataDevice } = useQuery(GET_ALL_DEVICES)

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
    const [dataUser, { loading: loUser }] = useUser()
    const { email } = dataUser || {}
    const [dataStore, { loading: LoadingRes }] = useStore()
    const { storeName, idStore } = dataStore || {}
    const SHOW_MODAL_RESTAURANT = useSetState(true)
    const { data: dataEmployees, loading: loadEmployees, error: errEmployees } = useQuery(GET_ALL_EMPLOYEE_STORE)
    if (loUser || LoadingRes || loadEmployees || errEmployees) return <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAwIDMyMDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxzdHlsZT4KICAgICAgICBzdmcgewogICAgICAgICAgICBmb250LXNpemU6IDE2cHg7CiAgICAgICAgfQoKICAgICAgICAvKioKICAgICAgICAqIEFkYXB0aXZlIG1lZGlhIHF1ZXJpZXMgdGlsbCAyNDAwcHggd2lkZSBnZW5lcmF0ZWQgdmlhIGh0dHBzOi8vY29kZXBlbi5pby9qYWtvYnVkL3Blbi92bUtMWWIKICAgICAgICAqIFZhbHVlczogJG1hcDogKDEyMDBweDogMjEuMzNweCwgMTYwMHB4OiAxNnB4LCAyNDAwcHg6IDEwLjY2N3B4LCAzMjAwOiA4cHgsIDQyMDA6IDYuMXB4KTsKICAgICAgICAqLwoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMTcwLjd2dyArIDQyNi43cHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTUwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtODUuM3Z3ICsgMjk4LjZweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAyMDBweCkgewogICAgICAgICAgICBzdmcgewogICAgICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKC00Mi42NnZ3ICsgMjEzLjMycHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMzAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMjEuMzR2dyArIDE0OS4zNnB4KTsKICAgICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDQwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTEyLjh2dyArIDExNS4ycHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtOC41NHZ3ICsgOTMuOXB4KTsKICAgICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTUuMzN2dyArIDc0LjY0cHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogODAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMy4ydncgKyA1Ny42cHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTIuMTM1dncgKyA0Ni45NXB4KTsKICAgICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkgewogICAgICAgICAgICBzdmcgewogICAgICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKC0xLjMzMjV2dyArIDM3LjMycHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTYwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTAuNjY2N3Z3ICsgMjYuNjdweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAyNDAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMC4zMzMzN3Z3ICsgMTguNjdweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAzMjAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMC4xOXZ3ICsgMTQuMDhweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgoKICAgICAgICByZWN0Om5vdChbZmlsbF0pIHsKICAgICAgICAgICAgZmlsbDogdXJsKCNsaW5lYXIpOwogICAgICAgIH0KCiAgICAgICAgcmVjdCB7CiAgICAgICAgICAgIHJ4OiAwLjI1ZW07CiAgICAgICAgfQoKICAgICAgICBjaXJjbGU6bm90KFtmaWxsXSkgewogICAgICAgICAgICBmaWxsOiB1cmwoI2xpbmVhcik7CiAgICAgICAgfQoKICAgICAgICBsaW5lOm5vdChbZmlsbF0pIHsKICAgICAgICAgICAgc3Ryb2tlOiB1cmwoI2xpbmVhcik7CiAgICAgICAgfQoKICAgICAgICBsaW5lIHsKICAgICAgICAgICAgc3Ryb2tlLXdpZHRoOiAwLjE1ZW07CiAgICAgICAgfQogICAgPC9zdHlsZT4KCiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhciIgeDE9IjBlbSIgeTE9IjBlbSIgeDI9IjEwMGVtIiB5Mj0iMTBlbSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9Ii4xMCIgc3RvcC1jb2xvcj0iI2Y0ZjVmNyI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvZmZzZXQiIGZyb209Ii0uMTAiIHRvPSIxLjQiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjE1IiBzdG9wLWNvbG9yPSIjZTdlOWVjIj4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9mZnNldCIgZnJvbT0iLS4wNSIgdG89IjEuNDUiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjIwIiBzdG9wLWNvbG9yPSIjZjRmNWY3Ij4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9mZnNldCIgZnJvbT0iMCIgdG89IjEuNTAiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KCiAgICAKCiAgICA8IS0tIEJyZWFkY3J1bWJzIC0tPgogICAgPHJlY3QgeD0iMGVtIiB5PSIxLjVlbSIgd2lkdGg9IjMuMjVlbSIgaGVpZ2h0PSIwLjYyNWVtIiAgcng9IjEiLz4KICAgIDxyZWN0IHg9IjRlbSIgeT0iMS41ZW0iIHdpZHRoPSI1ZW0iIGhlaWdodD0iMC42MjVlbSIgIHJ4PSIxIi8+CiAgICA8cmVjdCB4PSIwZW0iIHk9IjMuNWVtIiB3aWR0aD0iOWVtIiBoZWlnaHQ9IjFlbSIgIHJ4PSIxIi8+CgogICAgPCEtLSBnaHgtbW9kZXMtdG9vbHMgLS0+CiAgICA8cmVjdCB4PSJjYWxjKDEwMCUgLSA5LjVlbSkiIHk9IjNlbSIgd2lkdGg9IjJlbSIgaGVpZ2h0PSIyZW0iICByeD0iMSIvPgogICAgPHJlY3QgeD0iY2FsYygxMDAlIC0gN2VtKSIgeT0iM2VtIiB3aWR0aD0iMmVtIiBoZWlnaHQ9IjJlbSIgIHJ4PSIxIi8+CiAgICA8cmVjdCB4PSJjYWxjKDEwMCUgLSA0LjVlbSkiIHk9IjNlbSIgd2lkdGg9IjJlbSIgaGVpZ2h0PSIyZW0iICByeD0iMSIvPgoKICAgIDwhLS0gZ2h4LW9wZXJhdGlvbnMgLS0+CiAgICA8cmVjdCB4PSIwZW0iIHk9IjYuNWVtIiB3aWR0aD0iOS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KICAgIDxjaXJjbGUgY3g9IjExLjVlbSIgY3k9ImNhbGMoNi41ZW0gKyAxZW0pIiByPSIxZW0iIC8+CiAgICA8Y2lyY2xlIGN4PSIxNGVtIiBjeT0iY2FsYyg2LjVlbSArIDFlbSkiIHI9IjFlbSIgLz4KICAgIDxyZWN0IHg9IjE2ZW0iIHk9IjYuNWVtIiB3aWR0aD0iNS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KICAgIDxyZWN0IHg9IjIyZW0iIHk9IjYuNWVtIiB3aWR0aD0iNS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KICAgIDxyZWN0IHg9ImNhbGMoMTAwJSAtIDhlbSkiIHk9IjYuNWVtIiB3aWR0aD0iNS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KCiAgICA8IS0tIGdoeC1jb2x1bW4gLS0+CiAgICA8cmVjdCB4PSIwZW0iIHk9IjEwLjVlbSIgd2lkdGg9ImNhbGMoMjAlIC0gMWVtKSIgaGVpZ2h0PSIxMDAlIiAgcng9IjEiLz4KCiAgICA8IS0tIGdoeC1jb2x1bW4gLS0+CiAgICA8cmVjdCB4PSJjYWxjKDIwJSAtIDAuMjVlbSkiIHk9IjEwLjVlbSIgd2lkdGg9ImNhbGMoMjAlIC0gMWVtKSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjgiICByeD0iMSIvPgoKICAgIDwhLS0gZ2h4LWNvbHVtbiAtLT4KICAgIDxyZWN0IHg9ImNhbGMoNDAlIC0gMC41ZW0pIiB5PSIxMC41ZW0iIHdpZHRoPSJjYWxjKDIwJSAtIDFlbSkiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC42IiAgcng9IjEiLz4KCiAgICA8IS0tIGdoeC1jb2x1bW4gLS0+CiAgICA8cmVjdCB4PSJjYWxjKDYwJSAtIDAuNzVlbSkiIHk9IjEwLjVlbSIgd2lkdGg9ImNhbGMoMjAlIC0gMWVtKSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjQiICByeD0iMSIvPgoKICAgIDwhLS0gZ2h4LWNvbHVtbiAtLT4KICAgIDxyZWN0IHg9ImNhbGMoODAlIC0gMWVtKSIgeT0iMTAuNWVtIiB3aWR0aD0iY2FsYygyMCUgLSAxZW0pIiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMiIgIHJ4PSIxIi8+CgoKCgo8L3N2Zz4K" alt="Cargando..." />
    return (<>
        {LoadingRes && dataStore === null && <AwesomeModal backdrop='static' zIndex='9990' padding='25px' height='90vh' show={SHOW_MODAL_RESTAURANT.state} onHide={() => { SHOW_MODAL_RESTAURANT.setState(!SHOW_MODAL_RESTAURANT.state) }} onCancel={() => false} size='90%' btnCancel={false} btnConfirm={true} onConfirm={() => router.push('/restaurante')} header={false} footer={true} borderRadius='10px' >
            <Text align='center' style={{ justifyContent: 'center' }} size='30px' >Debes registrar un restaurante para continuar</Text>
        </AwesomeModal >}
        <Wrapper>
            <Container>
                <Content width="20%">
                    <Card padding='0' width='97%'>
                        <CardPrimary radius='8px 8px 0px 0px' bgColor={TBGBColor} padding='30px 10px'>
                            <Text size='22px' >Welcome Back !</Text>
                            <Text size='20px' >{email}</Text>
                        </CardPrimary>
                        <CardPrimary padding=''>
                            <Avatar />
                            {dataStore !== null && <Link activeClassName="active" href={`/dashboard/${storeName?.replace(/\s/g, '-').toLowerCase()}/${idStore}`}>
                                <a>
                                    <RippleButton style={{ justifyContent: 'center' }} margin='20px 0' widthButton='100%' size='10px' padding='5px'>Ir a la tienda</RippleButton>
                                </a>
                            </Link>}
                        </CardPrimary>
                    </Card>
                    <Card overflow='auto' wrap='no-wrap' width='97%' style={{ paddingLeft: '30px' }}>
                        {[1, 2, 3, 4, 5].map((x, i) => (
                            <div id='circleEmployee' key={x._id} style={{ zIndex: '200', width: 'min-content', marginLeft: 'calc(10% - 45px)' }}> <CircleCompany pulse={x._id === x._id} onClick={() => handleCompany({ ...x })} >{x.companyName?.slice(0, 2).toUpperCase()}</CircleCompany> </div>
                        ))}
                    </Card>
                </Content>
                <Content width="40%">
                    <Content>
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
                    <Content>
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
                    <Content>
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
                <Content width="100%">
                    <Content>
                        <Card width='30%'>
                            <Text>My team </Text>
                            {dataEmployees?.employees?.map(x => (
                                <ItemTeam key={x.eId}>
                                    <ItemInf>
                                        {x.uEmail}
                                    </ItemInf>
                                    <Link activeClassName="active" href={`/team/${x.idEmployee}`}>
                                        <a>
                                            <ItemInf end>
                                                <RippleButton margin='0' widthButton='70px' size='10px' padding='5px'>{x.uEmail.slice(0, 2).toUpperCase()}</RippleButton>
                                            </ItemInf>
                                        </a>
                                    </Link>
                                </ItemTeam>
                            ))}
                        </Card>
                        <Card width='30%'>
                            <Text>Recent Activity Feed </Text>
                            <CardOverFloW>
                                <OlList>
                                    {[1, 2].map(x => (
                                        <FeedItem key={x._id}>
                                            <span className='date'>date, Sep 25</span>
                                            <span className='activity-text'>Pay One Bills</span>
                                        </FeedItem>
                                    ))}
                                </OlList>
                            </CardOverFloW>
                        </Card>
                        <Card width='30%'>
                            <Text>Your account has been connected on these devices </Text>
                            {dataDevice?.getDeviceUsers?.map(x => (
                                <CardDevice key={x.dId}>
                                    <span className='device__icon'>
                                        {x.short_name === 'WIN' ?
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="1.75" y="0.75" width="20.5" height="15.5" rx="3.25" stroke="#3E3E3E" strokeWidth="1.5"></rect><path d="M5 13L19 13" stroke="#3E3E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 22C8 20.343 9.79133 19 12 19C14.2087 19 16 20.343 16 22H8Z" stroke="#3E3E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17L12.0017 19" stroke="#3E3E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="5.75" y="0.75" width="12.5" height="22.5" rx="3.25" stroke="#3E3E3E" strokeWidth="1.5"></rect><path d="M10 4H14" stroke="#3E3E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M11 21H13" stroke="#3E3E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>}
                                    </span>
                                    <div className="device__info">
                                        <div className="device__description-wrapper">
                                            <span className="device__description"> {x.deviceName} - {x.platform} </span>
                                            {<span className="device__current">Current device </span>}
                                        </div>
                                        <span className="device__localization" tabIndex="0"> {x.short_name}</span>
                                        <span className="device__localization" tabIndex="0"> {x.locationFormat}</span>
                                        <span className="device__localization" tabIndex="0"> {moment(x.DatCre).format('YYYY-MM-DD')} </span>
                                    </div>
                                </CardDevice>
                            ))}
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
