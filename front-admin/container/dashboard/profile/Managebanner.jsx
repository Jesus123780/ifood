import { BGColor, PColor } from 'public/colors'
import React, { useContext, useRef, useState } from 'react'
import { CREATE_BANNER_STORE, CREATE_LOGO, DELETE_ONE_BANNER_STORE, GET_ONE_BANNER_STORE, GET_ONE_SCHEDULE_STORE } from '../queriesStore'
import { ActionName, ButtonCard, InputFile, Section, MerchantBannerWrapperInfo, MerchantInfo, MerchantInfoTitle } from '../styledStore'
import { useMutation, useQuery } from '@apollo/client'
import { IconDelete, IconEdit, IconLogo, IconPromo } from 'public/icons'
import { GET_ONE_STORE } from 'container/Restaurant/queries'
import { useUser } from 'components/hooks/useUser'
import { Context } from 'context/Context'

export const Managebanner = () => {
    // STATES
    const { openSchedule, setOpenSchedule, setAlertBox } = useContext(Context)
    const fileInputRef = useRef(null)
    const fileInputRefLogo = useRef(null)
    const refInput = useRef()
    const [day, setDay] = useState()
    const [hour, setHour] = useState(null)
    const [{ altLogo, srcLogo }, setPreviewImgLogo] = useState({})

    // QUERIES
    const [setALogoStore] = useMutation(CREATE_LOGO, {
        onCompleted: (data) => setAlertBox({ message: data?.setALogoStore?.message }),
        context: { clientName: "admin-server" }
    })
    const [registerBanner] = useMutation(CREATE_BANNER_STORE, {
        onCompleted: (data) => setAlertBox({ message: data?.registerBanner?.message }),
        context: { clientName: "admin-server" }
    })
    const [DeleteOneBanner] = useMutation(DELETE_ONE_BANNER_STORE, {
        onCompleted: (data) => setAlertBox({ message: data?.DeleteOneBanner?.message }),
        context: { clientName: "admin-server" }
    })
    const { data: dataSchedule } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day } })
    const { data } = useQuery(GET_ONE_STORE)
    const [dataUser] = useUser()
    const dataStore = data?.getStore || {}
    const { idStore } = data?.getStore || {}
    const { data: dataBanner, loading } = useQuery(GET_ONE_BANNER_STORE, {
        context: { clientName: "admin-server" },
        variables: {
            idStore
        }
    })
    const { path, bnState, bnId } = dataBanner?.getOneBanners || {}
    const initialState = { alt: "/images/DEFAULTBANNER.png", src: "/images/DEFAULTBANNER.png" };
    const [{ alt, src }, setPreviewImg] = useState(initialState)
    console.log(dataBanner?.getOneBanners)
    // HANDLES
    const onTargetClickLogo = e => {
        e.preventDefault()
        fileInputRefLogo.current.click()
    }
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
        registerBanner({
            variables: {
                input: {
                    bnImage: files[0],
                    idStore: idStore
                }
            }, update(cache) {
                cache.modify({
                    fields: {
                        getOneBanners(dataOld = []) {
                            return cache.writeQuery({ query: GET_ONE_BANNER_STORE, data: dataOld })
                        }
                    }
                })
            }
        })


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
    const HandleDeleteBanner = async () => {
        setPreviewImg(initialState)
       
        DeleteOneBanner({
            variables: {
                bnState: bnState,
                idStore,
                bnId
            }, update(cache) {
                cache.modify({
                    fields: {
                        getOneBanners(dataOld = []) {
                            return cache.writeQuery({ query: GET_ONE_BANNER_STORE, data: dataOld })
                        }
                    }
                })
            }
        }).then(() => {
            setPreviewImg(initialState)
        })
    }
    return (
        <div>
            <Section>
                <InputFile accept=".jpg, .png" onChange={onFileInputChange} ref={fileInputRef} id='iFile' type='file' />
                <InputFile accept=".jpg, .png" onChange={onFileInputChangeLogo} ref={fileInputRefLogo} id='iFile' type='file' />
                <MerchantBannerWrapperInfo bannerImage={(path || src) ? `url(${path || src})` : `url("/images/DEFAULTBANNER.png")`} >
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53"><g fillRule="evenodd" transform="translate(1 1)"><path fill={BGColor} fillRule="nonzero" d="M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z"></path><rect fill={BGColor} width="20.514" height="1.895" x="15.243" y="35.105" rx=".947"></rect><rect fill={BGColor} width="10.568" height="1.895" x="20.216" y="30.684" rx=".947"></rect><path fill={BGColor} fillRule="nonzero" d="M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z"></path><path fill={BGColor} fillRule="nonzero" d="M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z"></path><path fill={BGColor} fillRule="nonzero" d="M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z"></path></g></svg>
                    </span>
                    <div className="merchant-banner__status-description" data-test-id="merchant-banner-status-description">
                        <h2 className="merchant-banner__status-title">{dataSchedule?.getOneStoreSchedules?.schHoEnd > hour && 'Restaurante  cerrado'}</h2>
                        <h3 className="merchant-banner__status-message">{dataSchedule?.getOneStoreSchedules?.schHoEnd > hour ? `Abre mañana a las ${dataScheduleTomorrow?.getOneStoreSchedules?.schHoSta}` : null}</h3>
                    </div>
                </MerchantBannerWrapperInfo>
                {/* actions */}
                <ButtonCard onClick={() => path && HandleDeleteBanner()}>
                    <IconDelete size={20} color={PColor} />
                    <ActionName >
                        Eliminar
                    </ActionName>
                </ButtonCard>
                <ButtonCard delay='.1s' top={'60px'} color={1} onClick={onTargetClick}>
                    <IconEdit size={20} color={PColor} />
                    <ActionName>
                        Editar
                    </ActionName>
                </ButtonCard>
                <ButtonCard delay='.2s' top={'100px'} onClick={onTargetClick}>
                    <IconPromo size={20} color={PColor} />
                    <ActionName>
                        Subir
                    </ActionName>
                </ButtonCard>
                <MerchantInfo onClick={(e) => onTargetClickLogo(e)}>
                    {!dataStore?.Image ? <span>
                        <img src={srcLogo} alt={altLogo} className='logo' />
                    </span> : <img src={dataStore?.Image} alt={'altLogo'} className='logo' />}
                    <MerchantInfoTitle>{dataStore.storeName}</MerchantInfoTitle>
                </MerchantInfo>
            </Section>
        </div>
    )
}
