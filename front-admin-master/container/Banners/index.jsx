import { AwesomeModal } from 'components/AwesomeModal'
import { useFormTools } from 'components/BaseForm'
import { Container } from 'components/common/Reusable'
import { InputFiles } from 'components/InputFilesPrev'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { CREATE_BANNER_MAIN, CREATE_BANNER_PROMO } from 'container/dashboard/queries'
import React, { useState } from 'react'
import { GET_ALL_BANNERS } from './queries'

export const Banners = () => {
  const [open, setOpen] = useState(false)
  const [openModalPromo, setOpenModalPromo] = useState(false)
  const [image, setImage] = useState('')
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm, setForcedError }] = useFormTools()
  const [setBanners, { error: Error }] = useMutation(CREATE_BANNER_MAIN, {
    context: { clientName: "admin-server" }
  })
  const [setPromoBanners] = useMutation(CREATE_BANNER_PROMO, {
    context: { clientName: "admin-server" }
  })
  const { data, loading } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: "admin-server" }
  })


  const handleFileChange = async (param) => {
    // setImage(e.target.files[0])
    console.log(param[0])
    setImage(param[0])
  }
  // const { data: dataM } = useQuery(GET_MESSAGES, {
  //   context: { clientName: "admin-server" }
  // });
  const handleForm = (e, show) => handleSubmit({
    event: e,
    action: () => {
      if (show === 1) {
        return setPromoBanners({
          variables: {
            input: {
              description: dataForm.description,
              bpState: 1,
              name: dataForm.name,
              image: image,
            }
          }
        })
      }
      else {
        return setBanners({
          variables: {
            input: {
              description: dataForm.description,
              BannersState: 1,
              name: dataForm.name,
              image: image,
            }
          }
        }).then(res => {
          if (res) {
            // window.localStorage.setItem('restaurant', res?.idStore)
          }
        }).catch(e => {
        })
      }
    },
    actionAfterSuccess: () => {
      setDataValue({})
    }
  })
  return (
    <Container>
      <RippleButton onClick={() => setOpen(!open)}>Open</RippleButton>
      <RippleButton onClick={() => setOpenModalPromo(!openModalPromo)}>Open PROMO</RippleButton>
      <AwesomeModal zIndex='99390' padding='20px' show={open} onHide={() => { setOpen(!open) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} >
        Banners
        <form onSubmit={(e) => handleForm(e)}>
          <InputFiles Disable={false} onChange={handleFileChange} reset={false} />
          <InputHooks
            title='Nombre del banner'
            required
            errors={dataForm?.name}
            value={dataForm?.name}
            onChange={handleChange}
            name='name'
          />
          <InputHooks
            title='Description'
            required
            errors={dataForm?.description}
            value={dataForm?.description}
            onChange={handleChange}
            name='description'
          />
          <RippleButton type='submit' widthButton='100% '>Subir</RippleButton>
        </form>
      </AwesomeModal>
      <AwesomeModal zIndex='99390' padding='20px' show={openModalPromo} onHide={() => { setOpenModalPromo(!openModalPromo) }} onCancel={() => false} size='medium' btnCancel={true} btnConfirm={false} header={true} footer={false} >
        Banner PROMO
        <form onSubmit={(e) => handleForm(e, 1)}>
          <InputFiles Disable={false} onChange={handleFileChange} reset={false} />
          <InputHooks
            title='Nombre del banner'
            required
            errors={dataForm?.name}
            value={dataForm?.name}
            onChange={handleChange}
            name='name'
          />
          <InputHooks
            title='Description'
            required
            errors={dataForm?.description}
            value={dataForm?.description}
            onChange={handleChange}
            name='description'
          />
          <RippleButton type='submit' widthButton='100% '>Subir</RippleButton>
        </form>
      </AwesomeModal>

      {!loading && data?.getAllMasterBanners.length > 0  ? data?.getAllMasterBanners?.map((b) => (
        <div key={b.BannerId}>
          {b.description}
        </div>
      )) : <span>No hay datos</span>}
    </Container>
  )
}
