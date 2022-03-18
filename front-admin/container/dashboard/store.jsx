import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { BGColor, PColor, PLColor, TBGBColor, APColor } from '../../public/colors'
import { SpinnerColor } from '../../components/Loading'
import Link from 'next/link'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { Container, Content, Text, Wrapper, WrapperRow, CardOverFloW, CircleCompany, ButtonTheme, SwitchButton, ContentToggle, OlList, FeedItem, ItemTeam, ItemInf, CardDevice, LateralModal, HeadCategory, CardProductsContent, MerchantListWrapper, CardProductsModal, Flex, DisRestaurant, ContentInfo, HeadSticky, ContentImage } from './styled'
import { useFormTools } from '../../components/BaseForm'
import { GET_ONE_STORE } from '../Restaurant/queries'
import { IconDelete, IconEdit, IconLogo, IconPromo } from '../../public/icons'
import { Food } from '../update/Products/food'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useUser } from '../../components/hooks/useUser'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_EXTRA_PRODUCT } from './queries'
import { Overline } from '../../components/common/Reusable'
import { ScheduleTimings } from './ScheduleTimings'
import { ManageCategories } from './manageCategories'
import { AddEmployee } from '../searchAddTeam'
import { CardProduct, ContainerFilter, ItemFilter } from '../../components/Update/Products/styled'
import { ActionName, ButtonAction, ButtonCard, ContentCategoryProducts, InputFile, Section, MerchantBannerWrapperInfo, MerchantInfo, MerchantInfoTitle, RestaurantColumn, WrapperOptions } from './styledStore'
import InputHooks from '../../components/InputHooks/InputHooks'
import { GET_ONE_PRODUCTS_FOOD } from '../producto/queries'
import { ExtrasProductsItems, OptionalExtraProducts } from '../producto/extras'
import { ExtraProducts } from '../Extraproducts'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL } from '../update/Products/queries'
import { Context } from 'context/Context'
import moment from 'moment'
import { CREATE_LOGO, GET_ONE_SCHEDULE_STORE } from './queriesStore'
import { useStore } from 'components/hooks/useStore'
import { CLIENT_URL_BASE } from 'apollo/urls'

const DashboardStore = ({ StoreId, setAlertBox }) => {
    // STATE
    const { error, isSession, openSchedule, setOpenSchedule } = useContext(Context)
    const location = useRouter()
    const loading = false
    const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const SHOW_MODAL_UPDATE_PRODUCTS = useSetState(false)
    const SHOW_MANAGE_CATEGORIES = useSetState(false)
    const SHOW_MANAGE_EMPLOYEE = useSetState(false)
    const SET_OPEN = useSetState(false)
    const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
    const [search, setSearch] = useState('')
    const [dataProCat, setData] = useState([])
    const [showMore, setShowMore] = useState(100)
    const refInput = useRef()
    const [setALogoStore, { error: Error, data: d }] = useMutation(CREATE_LOGO, {
        onCompleted: (data) => setAlertBox({ message: data?.setALogoStore?.message }),
        context: { clientName: "admin-server" }
    })

    // QUERY
    const [getCatProductsWithProduct, { data: dataProductAndCategory, loading: loadCatPro }] = useLazyQuery(GET_ALL_CATEGORIES_WITH_PRODUCT, {
        fetchPolicy: 'network-only',
        variables:
        {
            search,
            gender: searchFilter?.gender,
            desc: searchFilter?.desc,
            categories: searchFilter?.speciality,
        }
    })
    useEffect(() => {
        dataProductAndCategory?.getCatProductsWithProduct && setData([...dataProductAndCategory?.getCatProductsWithProduct])
    }, [dataProductAndCategory, searchFilter])
    useEffect(() => {
        getCatProductsWithProduct({ variables: { max: showMore } })
    }, [searchFilter, showMore])
    // HANDLES
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
    const { data } = useQuery(GET_ONE_STORE)
    const [dataUser] = useUser()
    const dataStore = data?.getStore || {}
    const { idStore } = data?.getStore || {}
    // images
    const fileInputRef = useRef(null)
    const fileInputRefLogo = useRef(null)
    const initialState = { alt: "/images/DEFAULTBANNER.png", src: "/images/DEFAULTBANNER.png" };
    const [{ alt, src }, setPreviewImg] = useState(initialState)
    const [{ altLogo, srcLogo }, setPreviewImgLogo] = useState({})

    const onFileInputChange = event => {
        const { files } = event.target;
        setPreviewImg(
            files.length
                ? {
                    src: URL.createObjectURL(files[0]),
                    alt: files[0].name
                }
                : initialState
        )

    }
    const onFileInputChangeLogo = event => {
        const { files } = event.target;
        setPreviewImgLogo(
            files.length
                ? {
                    srcLogo: URL.createObjectURL(files[0]),
                    altLogo: files[0].name
                }
                : initialState
        );
        console.log(files)
        setALogoStore({
            variables: {
                logo: files[0],
                idStore: idStore
            }, update(cache) {
                cache.modify({
                    fields: {
                        getStore(dataOld = []) {
                            return cache.writeQuery({ query: GET_ONE_STORE, data: dataOld })
                        }
                    }
                })
            }
        })
    }
    const onTargetClick = e => {
        e.preventDefault()
        fileInputRef.current.click()
    }
    const onTargetClickLogo = e => {
        e.preventDefault()
        fileInputRefLogo.current.click()
    }
    const handleBlur = () => {
        SET_OPEN.setState(false)
    }
    // HANDLE_SUBMIT
    // const [newRegisterFoodProduct, { loading, error }] = useMutation(CREATE_FOOD_PRODUCT, {
    //     onCompleted: () => {
    //     }
    // })
    // if (1===1) return  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAwIDMyMDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxzdHlsZT4KICAgICAgICBzdmcgewogICAgICAgICAgICBmb250LXNpemU6IDE2cHg7CiAgICAgICAgfQoKICAgICAgICAvKioKICAgICAgICAqIEFkYXB0aXZlIG1lZGlhIHF1ZXJpZXMgdGlsbCAyNDAwcHggd2lkZSBnZW5lcmF0ZWQgdmlhIGh0dHBzOi8vY29kZXBlbi5pby9qYWtvYnVkL3Blbi92bUtMWWIKICAgICAgICAqIFZhbHVlczogJG1hcDogKDEyMDBweDogMjEuMzNweCwgMTYwMHB4OiAxNnB4LCAyNDAwcHg6IDEwLjY2N3B4LCAzMjAwOiA4cHgsIDQyMDA6IDYuMXB4KTsKICAgICAgICAqLwoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMTcwLjd2dyArIDQyNi43cHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTUwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtODUuM3Z3ICsgMjk4LjZweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAyMDBweCkgewogICAgICAgICAgICBzdmcgewogICAgICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKC00Mi42NnZ3ICsgMjEzLjMycHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMzAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMjEuMzR2dyArIDE0OS4zNnB4KTsKICAgICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDQwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTEyLjh2dyArIDExNS4ycHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtOC41NHZ3ICsgOTMuOXB4KTsKICAgICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTUuMzN2dyArIDc0LjY0cHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogODAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMy4ydncgKyA1Ny42cHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTIuMTM1dncgKyA0Ni45NXB4KTsKICAgICAgICAgICAgfQogICAgICAgIH0KCiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDEyMDBweCkgewogICAgICAgICAgICBzdmcgewogICAgICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKC0xLjMzMjV2dyArIDM3LjMycHgpOwogICAgICAgICAgICB9CiAgICAgICAgfQoKICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogMTYwMHB4KSB7CiAgICAgICAgICAgIHN2ZyB7CiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoLTAuNjY2N3Z3ICsgMjYuNjdweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAyNDAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMC4zMzMzN3Z3ICsgMTguNjdweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgogICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiAzMjAwcHgpIHsKICAgICAgICAgICAgc3ZnIHsKICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygtMC4xOXZ3ICsgMTQuMDhweCk7CiAgICAgICAgICAgIH0KICAgICAgICB9CgoKICAgICAgICByZWN0Om5vdChbZmlsbF0pIHsKICAgICAgICAgICAgZmlsbDogdXJsKCNsaW5lYXIpOwogICAgICAgIH0KCiAgICAgICAgcmVjdCB7CiAgICAgICAgICAgIHJ4OiAwLjI1ZW07CiAgICAgICAgfQoKICAgICAgICBjaXJjbGU6bm90KFtmaWxsXSkgewogICAgICAgICAgICBmaWxsOiB1cmwoI2xpbmVhcik7CiAgICAgICAgfQoKICAgICAgICBsaW5lOm5vdChbZmlsbF0pIHsKICAgICAgICAgICAgc3Ryb2tlOiB1cmwoI2xpbmVhcik7CiAgICAgICAgfQoKICAgICAgICBsaW5lIHsKICAgICAgICAgICAgc3Ryb2tlLXdpZHRoOiAwLjE1ZW07CiAgICAgICAgfQogICAgPC9zdHlsZT4KCiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhciIgeDE9IjBlbSIgeTE9IjBlbSIgeDI9IjEwMGVtIiB5Mj0iMTBlbSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9Ii4xMCIgc3RvcC1jb2xvcj0iI2Y0ZjVmNyI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvZmZzZXQiIGZyb209Ii0uMTAiIHRvPSIxLjQiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjE1IiBzdG9wLWNvbG9yPSIjZTdlOWVjIj4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9mZnNldCIgZnJvbT0iLS4wNSIgdG89IjEuNDUiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iLjIwIiBzdG9wLWNvbG9yPSIjZjRmNWY3Ij4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9mZnNldCIgZnJvbT0iMCIgdG89IjEuNTAiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogICAgICAgICAgICA8L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KCiAgICAKCiAgICA8IS0tIEJyZWFkY3J1bWJzIC0tPgogICAgPHJlY3QgeD0iMGVtIiB5PSIxLjVlbSIgd2lkdGg9IjMuMjVlbSIgaGVpZ2h0PSIwLjYyNWVtIiAgcng9IjEiLz4KICAgIDxyZWN0IHg9IjRlbSIgeT0iMS41ZW0iIHdpZHRoPSI1ZW0iIGhlaWdodD0iMC42MjVlbSIgIHJ4PSIxIi8+CiAgICA8cmVjdCB4PSIwZW0iIHk9IjMuNWVtIiB3aWR0aD0iOWVtIiBoZWlnaHQ9IjFlbSIgIHJ4PSIxIi8+CgogICAgPCEtLSBnaHgtbW9kZXMtdG9vbHMgLS0+CiAgICA8cmVjdCB4PSJjYWxjKDEwMCUgLSA5LjVlbSkiIHk9IjNlbSIgd2lkdGg9IjJlbSIgaGVpZ2h0PSIyZW0iICByeD0iMSIvPgogICAgPHJlY3QgeD0iY2FsYygxMDAlIC0gN2VtKSIgeT0iM2VtIiB3aWR0aD0iMmVtIiBoZWlnaHQ9IjJlbSIgIHJ4PSIxIi8+CiAgICA8cmVjdCB4PSJjYWxjKDEwMCUgLSA0LjVlbSkiIHk9IjNlbSIgd2lkdGg9IjJlbSIgaGVpZ2h0PSIyZW0iICByeD0iMSIvPgoKICAgIDwhLS0gZ2h4LW9wZXJhdGlvbnMgLS0+CiAgICA8cmVjdCB4PSIwZW0iIHk9IjYuNWVtIiB3aWR0aD0iOS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KICAgIDxjaXJjbGUgY3g9IjExLjVlbSIgY3k9ImNhbGMoNi41ZW0gKyAxZW0pIiByPSIxZW0iIC8+CiAgICA8Y2lyY2xlIGN4PSIxNGVtIiBjeT0iY2FsYyg2LjVlbSArIDFlbSkiIHI9IjFlbSIgLz4KICAgIDxyZWN0IHg9IjE2ZW0iIHk9IjYuNWVtIiB3aWR0aD0iNS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KICAgIDxyZWN0IHg9IjIyZW0iIHk9IjYuNWVtIiB3aWR0aD0iNS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KICAgIDxyZWN0IHg9ImNhbGMoMTAwJSAtIDhlbSkiIHk9IjYuNWVtIiB3aWR0aD0iNS41ZW0iIGhlaWdodD0iMmVtIiAgcng9IjEiLz4KCiAgICA8IS0tIGdoeC1jb2x1bW4gLS0+CiAgICA8cmVjdCB4PSIwZW0iIHk9IjEwLjVlbSIgd2lkdGg9ImNhbGMoMjAlIC0gMWVtKSIgaGVpZ2h0PSIxMDAlIiAgcng9IjEiLz4KCiAgICA8IS0tIGdoeC1jb2x1bW4gLS0+CiAgICA8cmVjdCB4PSJjYWxjKDIwJSAtIDAuMjVlbSkiIHk9IjEwLjVlbSIgd2lkdGg9ImNhbGMoMjAlIC0gMWVtKSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjgiICByeD0iMSIvPgoKICAgIDwhLS0gZ2h4LWNvbHVtbiAtLT4KICAgIDxyZWN0IHg9ImNhbGMoNDAlIC0gMC41ZW0pIiB5PSIxMC41ZW0iIHdpZHRoPSJjYWxjKDIwJSAtIDFlbSkiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC42IiAgcng9IjEiLz4KCiAgICA8IS0tIGdoeC1jb2x1bW4gLS0+CiAgICA8cmVjdCB4PSJjYWxjKDYwJSAtIDAuNzVlbSkiIHk9IjEwLjVlbSIgd2lkdGg9ImNhbGMoMjAlIC0gMWVtKSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjQiICByeD0iMSIvPgoKICAgIDwhLS0gZ2h4LWNvbHVtbiAtLT4KICAgIDxyZWN0IHg9ImNhbGMoODAlIC0gMWVtKSIgeT0iMTAuNWVtIiB3aWR0aD0iY2FsYygyMCUgLSAxZW0pIiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMiIgIHJ4PSIxIi8+CgoKCgo8L3N2Zz4K" alt="Cargando..." />
    const [hour, setHour] = useState(null)
    const [day, setDay] = useState()
    const { data: dataSchedule } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day } })
    const { data: dataScheduleTomorrow } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day + 1 } })
    useEffect(() => {
        let date = new Date().getTime()
        let dateDay = new Date().getUTCDay()
        setDay(dateDay)
        setHour(moment(date).format('hh:mm'))
    })
    const [table, openTable] = useState(false)
    return (<>
        <Wrapper>
            <Overline onClick={() => setOpenSchedule(!openSchedule)} show={!openSchedule} bgColor='' />
            <Container>
                <RestaurantColumn>
                    <Section>
                        <InputFile accept=".jpg, .png" onChange={onFileInputChange} ref={fileInputRef} id='iFile' type='file' />
                        <InputFile accept=".jpg, .png" onChange={onFileInputChangeLogo} ref={fileInputRefLogo} id='iFile' type='file' />
                        <MerchantBannerWrapperInfo bannerImage={src ? `url(${src})` : `url("/images/DEFAULTBANNER.png")`} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><g fillRule="evenodd" transform="translate(1 1)"><path fill={BGColor} fillRule="nonzero" d="M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z"></path><rect fill={BGColor} width="20.514" height="1.895" x="15.243" y="35.105" rx=".947"></rect><rect fill={BGColor} width="10.568" height="1.895" x="20.216" y="30.684" rx=".947"></rect><path fill={BGColor} fillRule="nonzero" d="M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z"></path><path fill={BGColor} fillRule="nonzero" d="M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z"></path><path fill={BGColor} fillRule="nonzero" d="M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z"></path></g></svg>
                            </span>
                            <div className="merchant-banner__status-description" data-test-id="merchant-banner-status-description">
                                <h2 className="merchant-banner__status-title">{dataSchedule?.getOneStoreSchedules?.schHoEnd > hour && 'Restaurante  cerrado'}</h2>
                                <h3 className="merchant-banner__status-message">{dataSchedule?.getOneStoreSchedules?.schHoEnd > hour ? `Abre mañana a las ${dataScheduleTomorrow?.getOneStoreSchedules?.schHoSta}` : null}</h3>
                            </div>
                        </MerchantBannerWrapperInfo>
                        {/* actions */}
                        <ButtonCard onClick={() => console.log('x._id, x.companyName')}>
                            <IconDelete size={20} color={PColor} />
                            <ActionName >
                                Delete
                            </ActionName>
                        </ButtonCard>
                        <ButtonCard delay='.1s' top={'60px'} color={1} onClick={() => console.log('x._id, x.companyName')}>
                            <IconEdit size={20} color={PColor} />
                            <ActionName>
                                Edit
                            </ActionName>
                        </ButtonCard>
                        <ButtonCard delay='.2s' top={'100px'} onClick={() => console.log('x._id, x.companyName')}>
                            <IconPromo size={20} color={PColor} />
                            <ActionName>
                                Change State
                            </ActionName>
                        </ButtonCard>
                        {!src ? <ButtonCard delay='.1s' top={'150px'} onClick={onTargetClick}>
                            {!src ? <IconLogo size={20} color={PColor} /> : <IconDelete size={20} color={PColor} />}
                            <ActionName>
                                Change Banner {alt}
                            </ActionName>
                        </ButtonCard> : <ButtonCard delay='.1s' top={'150px'} onClick={() => setPreviewImg(false)}>
                            {!src ? <IconLogo size={20} color={PColor} /> : <IconDelete size={20} color={PColor} />}
                            <ActionName>
                                delete Banner {alt}
                            </ActionName>
                        </ButtonCard>}
                    </Section>
                    {/* info */}
                    <Section>
                        <MerchantInfo onClick={(e) => onTargetClickLogo(e)}>
                            {!dataStore?.Image ? <span>
                                <img src={srcLogo} alt={altLogo} className='logo' />
                            </span> : <img src={dataStore?.Image} alt={'altLogo'} className='logo' />}

                            <MerchantInfoTitle>{dataStore.storeName}</MerchantInfoTitle>
                        </MerchantInfo>
                        <WrapperOptions>
                            <div>
                                <ButtonAction onClick={() => SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state)}> Subir productos</ButtonAction >
                                <ButtonAction onClick={() => setOpenSchedule(!openSchedule)}> Editar agenda </ButtonAction>
                                <ButtonAction onClick={() => SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state)}> Administrar Categorías</ButtonAction>
                                <ButtonAction onClick={() => SHOW_MANAGE_EMPLOYEE.setState(!SHOW_MANAGE_EMPLOYEE.state)}> Agregar empleados</ButtonAction>
                                <ButtonAction onClick={() => openTable(!table)}> Ver sobre mesa</ButtonAction>
                            </div>
                        </WrapperOptions>
                        <InputHooks title='Buscar en el menu' required errors={errorForm?.search} value={dataForm?.search} onChange={handleChange} name='search' />
                        <ContentCategoryProducts>
                            {dataProCat ? dataProCat?.map(x => {
                                return (
                                    <div key={x.carProId}>
                                        <HeadCategory>
                                            {SET_OPEN.state ? <input ref={refInput} onBlur={handleBlur} placeholder={'Lol'} />
                                                :
                                                <button onClick={() => { SET_OPEN.setState(!SET_OPEN.state), refInput.current.focus() }}>
                                                    <Text size='40px'>{x.pName}</Text>
                                                </button>}

                                        </HeadCategory>
                                        <MerchantListWrapper>
                                            {x.productFoodsAll ? x.productFoodsAll.map(food => {
                                                return (
                                                    <CardProducts food={food} key={food.pId} />
                                                )
                                            }) : <div>No products</div>}
                                        </MerchantListWrapper>
                                    </div>
                                )
                            }) : <div>Loading</div>}
                        </ContentCategoryProducts>
                    </Section>
                </RestaurantColumn>
            </Container>
            <LateralModal openSchedule={openSchedule}>
                <ScheduleTimings />
            </LateralModal>
            <AwesomeModal backdrop='static' zIndex='99390' padding='20px' height='100vh' show={SHOW_MODAL_UPDATE_PRODUCTS.state} onHide={() => { SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                <Food />
            </AwesomeModal>
            <AwesomeModal backdrop='static' zIndex='99390' padding='20px' height='100vh' show={table} onHide={() => openTable(!table)} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                <ExtraProducts />
            </AwesomeModal>
            <AwesomeModal backdrop='static' zIndex='9990' padding='25px' height='100vh' show={SHOW_MANAGE_CATEGORIES.state} onHide={() => { SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state) }} onCancel={() => false} size='100%' btnCancel={true} btnConfirm={false} header={true} footer={false} >
                <ManageCategories SHOW_MODAL_UPDATE_PRODUCTS={SHOW_MODAL_UPDATE_PRODUCTS} />
            </AwesomeModal>
            <AwesomeModal zIndex='9990' padding='25px' height='50vh' show={SHOW_MANAGE_EMPLOYEE.state} onHide={() => { SHOW_MANAGE_EMPLOYEE.setState(!SHOW_MANAGE_EMPLOYEE.state) }} onCancel={() => false} size='50%' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <AddEmployee />
            </AwesomeModal>
        </Wrapper>
    </>
    )
}

export const CardProducts = ({ food }) => {
    // STATES
    const { setAlertBox } = useContext(Context)
    const SET_OPEN_PRODUCT = useSetState(false)
    // QUERIES
    const [productFoodsOne, { data, loading, error }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
    const [ExtProductFoodsOptionalAll, { error: errorOptional, data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
    const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
    // HANDLE
    const handleGetOneProduct = () => {
        SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
        productFoodsOne({ variables: { pId: food.pId } })
        ExtProductFoodsOptionalAll({ variables: { pId: food.pId } })
        ExtProductFoodsAll({ variables: { pId: food.pId } }).then(res => setAlertBox({ message: '' })).catch(err => setAlertBox({ message: '' }))
    }
    const [modal, setModal] = useState(false)
    const { getStore, pId, carProId, sizeId, colorId, idStore, cId, caId, dId, ctId, tpId, fId, pName, ProPrice, ProDescuento, ProUniDisponibles, ProDescription, ProProtegido, ProAssurance, ProImage, ProStar, ProWidth, ProHeight, ProLength, ProWeight, ProQuantity, ProOutstanding, ProDelivery, ProVoltaje, pState, sTateLogistic, pDatCre, pDatMod, } = data?.productFoodsOne || {}
    const { storeName } = getStore || {}
    const [store] = useStore()
    const { storeName: nameStore, idStore: storeId } = store || {}
    return (
        <div>
            <CardProductsContent onClick={() => handleGetOneProduct()}>
                <div>
                    <h3 className="card__description">{food.pName}</h3>
                    <h3 className="card__description">{food.ProDescription}</h3>
                    <div className='footer'>
                        <span className="card__price">$ {food.ProPrice}</span>
                        <span className="card__des" style={{ color: APColor }}>$ {food.ProDescuento}</span>
                    </div>
                </div>
                <Image
                    className='store_image'
                    width={100}
                    height={100}
                    src={'/images/hamb.jpg'}
                    alt={"Picture of the author"}
                    blurDataURL="/images/DEFAULTBANNER.png"
                    placeholder="blur" // Optional blur-up while loading
                />
            </CardProductsContent>
            <AwesomeModal zIndex='999' backdrop='static' height='50vh' show={SET_OPEN_PRODUCT.state} onHide={() => { SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <CardProductsModal>
                    {loading && <SpinnerColor />}
                    <ContentImage>
                        <Image
                            className='store_image'
                            width={450}
                            height={450}
                            objectFit='contain'
                            src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
                            alt="Picture of the author"
                            blurDataURL="data:..."
                            placeholder="blur" // Optional blur-up while loading
                        />
                    </ContentImage>
                    <ContentInfo>
                        <HeadSticky>
                            <Text size='1.1em'>{pName}</Text>
                            <svg width="24" height="24" viewBox="0 0 24 24" role="presentation"><g fill="currentColor" fillRule="evenodd"><path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"></path><path d="M11.977 13.984c-1.103 0-2-.897-2-2s.897-2 2-2c1.104 0 2 .897 2 2s-.896 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.207 0 4-1.794 4-4s-1.793-4-4-4"></path></g></svg>
                        </HeadSticky>
                        <Text size='14px' margin='20px 0' color='#676464'>{ProDescription}</Text>
                        <Flex>
                            <Text margin='12px 0' size='.875rem' color={APColor}>$ {ProPrice}</Text>
                            <Text margin='12px 0 0 5px' size='14px'>$ {ProDescuento}</Text>
                        </Flex>
                        <DisRestaurant>
                            {store && <Link
                                passHref
                                shallow
                                replace
                                href={store && {
                                    pathname: `${CLIENT_URL_BASE}delivery/${store?.city?.cName?.toLocaleLowerCase()}-${store?.department?.dName?.toLocaleLowerCase()}/${nameStore.replace(/\s/g, '-').toLocaleLowerCase()}/${store.idStore}`,
                                    query: { shared: '' }
                                }} >
                                <a target="_blank">
                                    <Text margin='12px 0 0 5px' size='19px'>$ {storeName}</Text>
                                </a>
                            </Link>}
                            <div className="dish-restaurant__divisor"></div>
                            <label tabIndex="0" className="dish-observation-form__label" for="observations-form">¿Algún comentario?</label>
                        </DisRestaurant>
                        <ExtrasProductsItems
                            pId={pId}
                            setModal={setModal}
                            modal={modal}
                            dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                            dataExtra={dataExtra?.ExtProductFoodsAll || []} />
                    </ContentInfo>
                </CardProductsModal>
                <ContainerFilter>
                    <ItemFilter onClick={() => setModal(!modal)}>Añadir Adicionales</ItemFilter>
                </ContainerFilter>
                <OptionalExtraProducts
                    pId={pId}
                    dataOptional={dataOptional?.ExtProductFoodsOptionalAll || []}
                />
            </AwesomeModal>
        </div>
    );
};
DashboardStore.propTypes = {

}

export default DashboardStore

