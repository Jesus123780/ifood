import React, { useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { BColor, BGColor, PColor, PLColor, TBGBColor } from '../../public/colors'
import { Loading } from '../../components/Loading'
import { RippleButton } from '../../components/Ripple'
import Link from 'next/link'
import router, { useRouter } from 'next/router'
import { Avatar, Card, CardPrimary, Container, Content, Text, Wrapper, WrapperRow, CardOverFloW, CircleCompany, ButtonTheme, SwitchButton, ContentToggle, OlList, FeedItem, ItemTeam, ItemInf, CardDevice, LateralModal } from './styled'
import { useFormTools } from '../../components/BaseForm'
import { ActionName, ButtonAction, ButtonCard, InputFile, MerchantBanner, MerchantBannerWrapperInfo, MerchantInfo, MerchantInfoTitle, RestaurantColumn, WrapperOptions } from './styledStore'
import { GET_ONE_STORE } from '../Restaurant/queries'
import { IconDelete, IconEdit, IconLogo, IconPromo } from '../../public/icons'
import { Food } from '../update/Products/food'
import { useSetState } from '../../components/hooks/useState'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useUser } from '../../components/hooks/useUser'
import { CREATE_FOOD_PRODUCT } from './queries'
import { Overline } from '../../components/common/Reusable'
import { ScheduleTimings } from './ScheduleTimings'
import { ManageCategories } from './manageCategories'

const DashboardStore = ({ StoreId }) => {
    // STATE
    const location = useRouter()
    const loading = false
    const [open, setOpen] = useState(false)
    const [baseHandle, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
    const SHOW_MODAL_UPDATE_PRODUCTS = useSetState(false)
    const SHOW_MANAGE_CATEGORIES = useSetState(false)
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
    console.log(data, 'ES AQUI')
    const [dataUser] = useUser()
    console.log(dataUser, 'DATA USER')
    const dataStore = data?.getStore || {}
    // images
    const fileInputRef = useRef(null)
    const initialState = { alt: "/images/DEFAULTBANNER.png", src: "/images/DEFAULTBANNER.png" };
    const [{ alt, src }, setPreviewImg] = useState(initialState)

    const onFileInputChange = event => {
        const { files } = event.target;
        setPreviewImg(
            files.length
                ? {
                    src: URL.createObjectURL(files[0]),
                    alt: files[0].name
                }
                : initialState
        );
    }
    const onTargetClick = e => {
        e.preventDefault()
        fileInputRef.current.click()
    }
    // HANDLE_SUBMIT
    // const [newRegisterFoodProduct, { loading, error }] = useMutation(CREATE_FOOD_PRODUCT, {
    //     onCompleted: () => {
    //         console.log('object')
    //     }
    // })

    return (<>
        <Wrapper>
            <Overline onClick={() => setOpen(!open)} show={!open} bgColor='' />
            <Container>
                <RestaurantColumn>
                    <MerchantBanner>
                        <InputFile
                            accept=".jpg, .png"
                            onChange={onFileInputChange}
                            ref={fileInputRef}
                            id='iFile' type='file'
                        />
                        <MerchantBannerWrapperInfo bannerImage={src ? `url(${src})` : `url("/images/DEFAULTBANNER.png")`} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><g fill-rule="evenodd" transform="translate(1 1)"><path fill={BGColor} fill={BGColor} fill-rule="nonzero" d="M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z"></path><rect fill={BGColor} width="20.514" height="1.895" x="15.243" y="35.105" rx=".947"></rect><rect fill={BGColor} width="10.568" height="1.895" x="20.216" y="30.684" rx=".947"></rect><path fill={BGColor} fill={BGColor} fill-rule="nonzero" d="M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z"></path><path fill={BGColor} fill={BGColor} fill-rule="nonzero" d="M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z"></path><path fill={BGColor} fill-rule="nonzero" d="M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z"></path></g></svg>
                            </span>
                            <div className="merchant-banner__status-description" data-test-id="merchant-banner-status-description">
                                <h2 className="merchant-banner__status-title">Restaurante  cerrado</h2>
                                <h3 className="merchant-banner__status-message">Abre mañana a las 11:00</h3>
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
                    </MerchantBanner>
                    {/* info */}
                    <MerchantBanner>
                        <MerchantInfo>
                            <span>
                                <span>Logo</span>
                            </span>
                            <MerchantInfoTitle>{dataStore.storeName}</MerchantInfoTitle>
                        </MerchantInfo>
                        <WrapperOptions>
                            <div>
                                <ButtonAction onClick={() => SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state)}>
                                    Update products
                                </ButtonAction >
                                <ButtonAction onClick={() => setOpen(!open)}>
                                    Editar agenda
                                </ButtonAction>
                                <ButtonAction onClick={() => SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state)}>
                                    Administrar Categorias
                                </ButtonAction>
                            </div>
                        </WrapperOptions>
                    </MerchantBanner>
                </RestaurantColumn>
            </Container>
            <LateralModal open={open}>
                <Text size='20px'>
                    <ScheduleTimings />
                </Text>
            </LateralModal>
            {/* UPDATE PRODUCTS */}
            <AwesomeModal backdrop='static' zIndex='9990' padding='20px' height='100vh' show={SHOW_MODAL_UPDATE_PRODUCTS.state} onHide={() => { SHOW_MODAL_UPDATE_PRODUCTS.setState(!SHOW_MODAL_UPDATE_PRODUCTS.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='0' >
                <Food />
            </AwesomeModal>
            {/* UPDATE PRODUCTS */}
            <AwesomeModal backdrop='static' zIndex='9990' padding='25px' height='100vh' show={SHOW_MANAGE_CATEGORIES.state} onHide={() => { SHOW_MANAGE_CATEGORIES.setState(!SHOW_MANAGE_CATEGORIES.state) }} onCancel={() => false} size='large' btnCancel={true} btnConfirm={false} header={true} footer={false} borderRadius='10px' >
                <ManageCategories />
            </AwesomeModal>
        </Wrapper>
    </>
    )
}

DashboardStore.propTypes = {

}

export default DashboardStore
