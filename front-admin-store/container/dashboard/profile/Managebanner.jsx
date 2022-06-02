import { BGColor, PColor } from 'public/colors'
import Image from 'next/image'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { CREATE_BANNER_STORE, CREATE_LOGO, DELETE_ONE_BANNER_STORE, DELETE_ONE_LOGO_STORE, GET_ONE_BANNER_STORE, GET_ONE_SCHEDULE_STORE } from '../queriesStore'
import { ActionName, ButtonCard, InputFile, Section, MerchantBannerWrapperInfo, MerchantInfo, MerchantInfoTitle, ButtonOption } from '../styledStore'
import { useMutation, useQuery } from '@apollo/client'
import { IconCopy, IconDelete, IconEdit, IconPromo } from 'public/icons'
import { GET_ONE_STORE } from 'container/Restaurant/queries'
import { Context } from 'context/Context'
import moment from 'moment'
import { Skeleton } from 'components/Skeleton/index'
import { SET_EDIT_STORE_NAME } from 'container/producto/queries'
import { LoadEllipsis } from 'components/LoadingButton'


const Banner = () => {
  // STATES
  const { setAlertBox } = useContext(Context)
  const fileInputRef = useRef(null)
  const fileInputRefLogo = useRef(null)
  const [day, setDay] = useState()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hour, setHour] = useState(null)
  const [openStore, SetStoreOpen] = useState(false)
  const [{ altLogo, srcLogo }, setPreviewImgLogo] = useState({})
  let date = new Date().getTime()
  const { data: dataSchedule, loading } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day } })
  const { schHoSta, schHoEnd } = dataSchedule?.getOneStoreSchedules || {}

  useEffect(() => {
    if (!loading) {
      // console.log(moment().isoWeekday())
      setDay(moment().isoWeekday())
      setHour(moment(date).format('hh:mm'))
      // const start = moment(schHoSta)
      if (moment(schHoSta).isAfter(schHoEnd)) {
        SetStoreOpen(true)
        // return setAlertBox({ message: 'La Hora Final no puede ser menor que la Hora de Inicio.' })
      } else if (moment(schHoSta).isBefore(schHoEnd)) {
        SetStoreOpen(false)
      } else if (moment(schHoSta).isSame(schHoEnd)) {
        // return setAlertBox({ message: 'La Hora final no puede ser igual que la Hora de inicio.' })
      }
    }

  }, [])

  // QUERIES
  const { data, loading: loaStore } = useQuery(GET_ONE_STORE)
  const dataStore = useMemo(() => { return data?.getStore }, [data])
  const [nameStore, setNameStore] = useState(dataStore?.storeName)
  useEffect(() => {
    setNameStore(dataStore?.storeName)
  }, [dataStore])
  const [openSName, setOpenSName] = useState(false)
  const [setEditNameStore, { loading: loadingEditName }] = useMutation(SET_EDIT_STORE_NAME)
  const handleEditNameStore = () => {
    setEditNameStore({
      variables: {
        StoreName: nameStore
      }, update(cache) {
        cache.modify({
          fields: {
            getStore(dataOld = []) {
              return cache.writeQuery({ query: GET_ONE_STORE, data: dataOld })
            }
          }
        })
      }
    }).then(() => {
      setOpenSName(false)
    })
  }

  const [setALogoStore] = useMutation(CREATE_LOGO, {
    onCompleted: (data) => { return setAlertBox({ message: data?.setALogoStore?.message }) },
    context: { clientName: 'admin-server' }
  })
  const [registerBanner] = useMutation(CREATE_BANNER_STORE, {
    onCompleted: (data) => { return setAlertBox({ message: data?.registerBanner?.message }) },
    context: { clientName: 'admin-server' }
  })
  const [DeleteOneBanner] = useMutation(DELETE_ONE_BANNER_STORE, {
    onCompleted: (data) => { return setAlertBox({ message: data?.DeleteOneBanner?.message }) },
    context: { clientName: 'admin-server' }
  })
  const [deleteALogoStore] = useMutation(DELETE_ONE_LOGO_STORE, {
    onCompleted: (data) => {
      setAlertBox({
        message: data.deleteALogoStore.message
      })
      setPreviewImgLogo(initialState)
    },
    context: { clientName: 'admin-server' },
    update(cache) {
      cache.modify({
        fields: {
          getStore(dataOld = []) {
            return cache.writeQuery({ query: GET_ONE_STORE, data: dataOld })
          }
        }
      })
    }
  })

  const { idStore, ImageName } = data?.getStore || {}
  const { data: dataBanner } = useQuery(GET_ONE_BANNER_STORE, {
    context: { clientName: 'admin-server' },
    variables: {
      idStore
    }
  })
  const { path, bnState, bnId, bnImageFileName } = dataBanner?.getOneBanners || {}
  const initialState = { alt: '/app/images/DEFAULTBANNER.png', src: '/app/images/DEFAULTBANNER.png' }
  // eslint-disable-next-line
  const [{ alt, src }, setPreviewImg] = useState(initialState)
  // HANDLES
  const onTargetClickLogo = e => {
    e.preventDefault()
    fileInputRefLogo.current.click()
  }
  const onFileInputChange = event => {
    try {
      const { files } = event.target
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
      }).catch(() => {
        setAlertBox({ message: 'No pudimos cargar la imagen', duration: 7000 })
        setPreviewImg(initialState)
      })

    } catch {
      setPreviewImg(initialState)
      setAlertBox({ message: 'No pudimos cargar la imagen', duration: 7000 })
    }

  }
  const onFileInputChangeLogo = event => {
    const { files } = event.target
    setPreviewImgLogo(
      files.length
        ? {
          srcLogo: URL.createObjectURL(files[0]),
          altLogo: files[0].name
        }
        : initialState
    )
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
    }).catch(() => {
      setAlertBox({ message: 'No pudimos cargar el banner', duration: 7000 })
      setPreviewImgLogo(initialState)
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
        bnImageFileName: bnImageFileName,
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
  const refInput = useRef('')
  const handleEdit = () => {
    // refInput?.current?.focus()
    setOpenSName(!openSName)
  }
  return (
    <div>
      <Section>
        <InputFile
          accept='.jpg, .png'
          id='iFile'
          onChange={onFileInputChange}
          ref={fileInputRef}
          type='file'
        />
        <InputFile
          accept='.jpg, .png'
          id='iFile'
          onChange={onFileInputChangeLogo}
          ref={fileInputRefLogo}
          type='file'
        />
        {(loading || loaStore) ? <Skeleton height={250} /> : <MerchantBannerWrapperInfo bannerImage={(path || src) ? `url(${path || src})` : `url("/app/images/DEFAULTBANNER.png")`} >
          <span>
            <svg
              height={53}
              width={53}
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='red' transform='translate(1 1)'>
                <path d='M34.514 35.105 32.649 37v-1.895h1.865zM18.35 37l-1.865-1.895h1.865V37zm14.3-13.263h1.865V37H16.486V23.737h1.865v11.368H32.65V23.737zM18.35 37l-1.865-1.895h1.865V37zm16.163-1.895L32.649 37v-1.895h1.865zm-16.163 0h14.3V23.737h1.865V37H16.486V23.737h1.865v11.368z' />
                <rect
                  height={1.895}
                  rx={0.947}
                  width={20.514}
                  x={15.243}
                  y={35.105}
                />
                <rect
                  height={1.895}
                  rx={0.947}
                  width={10.568}
                  x={20.216}
                  y={30.684}
                />
                <path d='M21.359 14.895h-3.974l-1.19 5.875a1.91 1.91 0 0 0-.04.392c0 1.073.857 1.943 1.913 1.943 1.606 0 2.932-1.277 3.016-2.907l.275-5.303zM15.865 13h7.46l-.379 7.298C22.81 22.934 20.666 25 18.068 25c-2.086 0-3.778-1.718-3.778-3.838 0-.26.026-.52.078-.774L15.865 13z' />
                <path d='M22.945 20.37a2.64 2.64 0 0 0-.003.136c0 1.435 1.145 2.6 2.558 2.6.045 0 .09-.002.134-.004 1.411-.076 2.495-1.3 2.42-2.733l-.283-5.474H23.23l-.284 5.474zM21.46 13h8.082l.376 7.27c.129 2.478-1.745 4.593-4.185 4.724A4.354 4.354 0 0 1 25.5 25c-2.443 0-4.423-2.012-4.423-4.494 0-.079.002-.158.006-.236l.376-7.27z' />
                <path d='M29.915 20.17c.085 1.646 1.423 2.935 3.044 2.935.133 0 .266-.014.396-.042 1.036-.221 1.7-1.255 1.481-2.308l-1.214-5.86h-3.98l.273 5.275zM27.675 13h7.46l1.526 7.365c.43 2.077-.878 4.115-2.922 4.553a3.725 3.725 0 0 1-.78.082c-2.613 0-4.77-2.079-4.907-4.73L27.676 13z' />
              </g>
            </svg>
          </span>
          <div className='merchant-banner__status-description' data-test-id='merchant-banner-status-description'>
            {openStore && <h2 className='merchant-banner__status-title'>{'Restaurante  cerrado'}</h2>}
            {/* <h3 className="merchant-banner__status-message">{dataSchedule?.getOneStoreSchedules?.schHoEnd > hour ? `Abre mañana a las ${dataScheduleTomorrow?.getOneStoreSchedules?.schHoSta}` : null}</h3> */}
          </div>
        </MerchantBannerWrapperInfo>}

        {/* actions */}
        <ButtonCard onClick={() => { return path && bnImageFileName && HandleDeleteBanner() }}>
          <IconDelete color={PColor} size={20} />
          <ActionName >
            Eliminar
          </ActionName>
        </ButtonCard>
        <ButtonCard
          color={1}
          delay='.1s'
          onClick={onTargetClick}
          top={'60px'}
        >
          <IconEdit color={PColor} size={20} />
          <ActionName>
            Editar
          </ActionName>
        </ButtonCard>
        <ButtonCard
          delay='.2s'
          onClick={onTargetClick}
          top={'100px'}
        >
          <IconPromo color={PColor} size={20} />
          <ActionName>
            Subir
          </ActionName>
        </ButtonCard>
        <MerchantInfo >
          <ButtonOption>
            {dataStore?.Image && <button
              onClick={() => {
                return deleteALogoStore({
                  variables: {
                    Image: ImageName || null
                  }
                })
              }}
            >Eliminar Logo <IconDelete color={PColor} size={20} /> </button>}
            <button onClick={(e) => { return onTargetClickLogo(e) }}>Subir Logo</button>
          </ButtonOption>
          {dataStore?.Image ?
            <Image
              alt={altLogo || 'logo'}
              blurDataURL='/app/images/DEFAULTBANNER.png'
              className='logo'
              height={70}
              objectFit='contain'
              onClick={(e) => { return onTargetClickLogo(e) }}
              placeholder='blur'
              src={dataStore?.Image || '/app/images/DEFAULTBANNER.png'}
              width={70} // Optional blur-up while loading
            />
            :
            <Image
              alt={altLogo || 'logo'}
              blurDataURL='/app/images/DEFAULTBANNER.png'
              className='logo'
              height={70}
              objectFit='contain'
              onClick={(e) => { return onTargetClickLogo(e) }}
              placeholder='blur'
              src={srcLogo || '/app/images/DEFAULTBANNER.png'}
              width={70} // Optional blur-up while loading
            />}
          <MerchantInfoTitle >
            {openSName ? <input
              autoFocus='on'
              name='nameStore'
              onBlur={() => { return setOpenSName(!openSName) }}
              onChange={(e) => { return setNameStore(e.target.value) }}
              onKeyUp={(event) => { return (event.key === 'Enter' ? handleEditNameStore() : null) }}
              ref={refInput}
              style={{ border: 'none', outline: 'none' }}
              value={nameStore}
            /> : dataStore?.storeName}
            <button onClick={() => { return handleEdit() }}>{loadingEditName ? <LoadEllipsis /> : <IconEdit color={PColor} size={'20px'} />}</button>
          </MerchantInfoTitle>
        </MerchantInfo>
      </Section>
    </div>
  )
}
export const Managebanner = React.memo(Banner)
