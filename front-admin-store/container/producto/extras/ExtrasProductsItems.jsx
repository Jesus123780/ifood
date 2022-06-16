import { AwesomeModal } from 'components/AwesomeModal'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from 'components/Ripple'
import { DELETE_CAT_EXTRA_PRODUCTS, DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS, DELETE_EXTRA_PRODUCTS, GET_ALL_EXTRA_PRODUCT } from 'container/dashboard/queries'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_MULTI_EXTRAS_PRODUCT_FOOD } from 'container/update/Products/queries'
import { Context } from 'context/Context'
import { useSetState } from 'hooks/useState'
import { useMutation } from '@apollo/client'
import moment from 'moment'
import { BGColor, EColor } from 'public/colors'
import { IconDelete, IconMiniCheck, IconPlus } from 'public/icons'
import { useCallback, useContext, useMemo, useState } from 'react'
import { numberFormat, updateCache } from 'utils'
import { InputHookProducts } from '.'
import { Action, CardsComponent, Container, ContentCheckbox, ContentLinesItems, ContentModal, GarnishChoicesHeader, Input } from './styled'
import { useFormTools } from 'components/BaseForm'
import Column from 'components/common/Atoms/Column'
import { Checkbox } from 'components/Checkbox'
import Row from 'components/common/Atoms/Row'

export const ExtrasProductsItems = ({ pId, dataOptional, dataExtra, setModal, modal }) => {
  // eslint-disable-next-line
    const [handleChange, _handleSubmit, handleForcedData, { dataForm }] = useFormTools()
  const OPEN_MODAL_CAT_EXTRA = useSetState(false)
  const INFO_EXTRA = useSetState({})
  const { setAlertBox } = useContext(Context)

  const initialLine = useMemo(() => {
    return {
      extraName: '',
      extraPrice: '',
      exState: false
    }
  }, [])

  const initialLineItems = useMemo(() => {
    return {
      Lines: [
        {
          extraName: '',
          extraPrice: '',
          exState: false
        },
        (initialLine)
      ]
    }
  }, [initialLine])

  // HANDLES
  const CleanLines = useCallback(() => {
    setLine(initialLineItems)
  }, [initialLineItems])
  //    QUERIES
  const [updateMultipleExtProductFoods] = useMutation(UPDATE_MULTI_EXTRAS_PRODUCT_FOOD, {
    onCompleted: () => {
      CleanLines()
    }
  })
  const [deleteextraproductfoods] = useMutation(DELETE_EXTRA_PRODUCTS, {
    onCompleted: () => { CleanLines() }
  })
  const [DeleteExtProductFoodsOptional] = useMutation(DELETE_CAT_EXTRA_PRODUCTS)
  const [DeleteExtFoodSubsOptional] = useMutation(DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS)

  const [LineItems, setLine] = useState(initialLineItems)
  const handleAdd = () => {
    // eslint-disable-next-line no-unsafe-optional-chaining
    const Lines = [...LineItems?.Lines, { ...initialLine }, { ...initialLine }]
    setLine({ ...LineItems, Lines })
  }
  const handleLineChange = useCallback((index, name, value) => {
    const Lines = LineItems.Lines.map((salesLine, i) => {
      if (i === index) {
        const newLine = { ...salesLine }
        if (name === 'extraName' && 'extraPrice') {
          newLine[name] = value

        } else if (name === 'exState') {
          const { checked } = value.target
          newLine[name] = checked
        } else {
          newLine[name] = value
        }
        return newLine
      }
      return { ...salesLine }
    })
    setLine({ ...LineItems, Lines })
  }, [LineItems])
  const handleRemove = i => {
    const Lines = LineItems?.Lines?.filter((salesLine, index) => { return index !== i })
    setLine({ ...LineItems, Lines })
  }
  const dataArr = LineItems?.Lines?.map(x => { return { extraPrice: parseFloat(x.extraPrice), exState: x.exState === true ? 1 : 0, extraName: x.extraName, pId: pId } })
  const onSubmitUpdate = async () => {
    // e.preventDefault()
    try {
      await updateMultipleExtProductFoods({
        variables: {
          inputLineItems: {
            setData: dataArr || []
          }
        },
        update: (cache, { data: { ExtProductFoodsAll } }) => {
          return updateCache({
            cache,
            query: GET_ALL_EXTRA_PRODUCT,
            nameFun: 'ExtProductFoodsAll',
            dataNew: ExtProductFoodsAll
          })
        }
      }).then(() => { return {} })
      // setModal(false)
    } catch (error) {
      setAlertBox({ message: `${error}`, duration: 7000 })
    }
  }
  // DELETE ADICIONAL
  const handleDeleteAdditional = async elem => {
    const { state, exPid } = elem || {}
    deleteextraproductfoods({
      variables: {
        state,
        id: exPid
      }, update: (cache, { data: { ExtProductFoodsAll } }) => {
        return updateCache({
          cache,
          query: GET_ALL_EXTRA_PRODUCT,
          nameFun: 'ExtProductFoodsAll',
          dataNew: ExtProductFoodsAll
        })
      }
    })
  }
  const handleDeleteCatOptional = async elem => {
    const { state, opExPid } = elem || {}
    DeleteExtProductFoodsOptional({
      variables: {
        state: state,
        opExPid: opExPid
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
        return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })
      }
    })
    OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
  }
  const handleDeleteItemSubOptional = async elem => {
    const { state, opSubExPid } = elem || {}
    DeleteExtFoodSubsOptional({
      variables: {
        state: state,
        opSubExPid: opSubExPid
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
        return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })
      }
    }).then(res => { return setAlertBox({ message: res?.message?.DeleteExtFoodSubsOptional?.message }) })
  }

  const handleOpenExtra = async elem => {
    OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
    INFO_EXTRA.setState(elem)
    handleForcedData({ ...elem })
  }
  return (
    <Column>
      {dataExtra?.length > 0 && <form onSubmit={(e) => { return onSubmitUpdate() }} >
        <GarnishChoicesHeader onClick={() => { return setModal(!modal) }}>
          <div>
            <p className='garnish-choices__title'>Adicionales</p>
            <p className='garnish-choices__title-desc'>Escoge hasta 3 opciones.</p>
          </div>
          <IconMiniCheck color={'#009b3a'} size={'15px'} />
        </GarnishChoicesHeader>
        {dataExtra?.map((Adicionales, index) => {
          return (
            <div key={index + 1}>
              <CardsComponent>
                <div>
                  <h3 className='title_card'>{Adicionales.extraName}</h3>
                  <h3 className='price'> $ {numberFormat(Adicionales.extraPrice)}</h3>
                </div>
                <RippleButton
                  bgColor={'transparent'}
                  margin='0px'
                  onClick={() => { return handleDeleteAdditional(Adicionales) }}
                  type='button'
                  widthButton='min-content'
                >
                  <IconDelete color={EColor} size='25px' />
                </RippleButton>
              </CardsComponent>
            </div>
          )
        })}

      </form>}
      {dataOptional?.length > 0 && dataOptional?.map((x, i) => {
        return (
          <div key={i + 1}>
            <GarnishChoicesHeader onClick={() => { return handleOpenExtra(x) }}>
              <div>
                <p className='garnish-choices__title'>{x.OptionalProName}</p>
                {!!x.numbersOptionalOnly && <p className='garnish-choices__title-desc'>Escoge hasta {x.numbersOptionalOnly} opciones.</p>}
              </div>
              <div className='garnish-choices'>
                <IconMiniCheck color={'#009b3a'} size={'15px'} />
                {x.required ? <span className='marmita-minitag' span>OBLIGATORIO</span> : <span className='marmita-minitag' style={{ backgroundColor: 'transparent', color: 'transparent', width: '8  0px', zIndex: '0' }}>OBLIGATORIO</span>}
              </div>
            </GarnishChoicesHeader>
            {
              x.ExtProductFoodsSubOptionalAll?.map((z, index) => {
                return (
                  <CardsComponent key={z.opSubExPid}>
                    <div>
                      <h3 className='title_card'>{z?.OptionalSubProName}</h3>
                      <h3 className='title_card'>Item: {index + 1}</h3>

                    </div>
                    <RippleButton
                      bgColor={'transparent'}
                      margin='0px'
                      onClick={() => { return handleDeleteItemSubOptional(z) }}
                      type='button'
                      widthButton='min-content'
                    >
                      <IconDelete color={EColor} size='25px' />
                    </RippleButton>
                  </CardsComponent>
                )
              })
            }
          </div >
        )
      })}
      {/* Open adicional modal */}
      <AwesomeModal
        backdrop
        btnConfirm={false}
        footer={false}
        header={false}
        height='100vh'
        onCancel={() => { return setModal(false) }}
        onHide={() => { return setModal(false) }}
        padding='60px'
        show={modal}
        size='small'
      >
        <ContentModal>
          {LineItems && LineItems?.Lines?.map((salesLine, i) => {
            return (
              <ContentLinesItems key={salesLine._id}>
                  <Row noBorder >
                    <InputHookProducts
                      margin='0'
                      padding='10px'
                      height={'100px'}
                      outline='none'
                      onChange={value => { return handleLineChange(i, 'extraName', value) }}
                      placeholder='Nombre'
                      value={salesLine.extraName}
                      name={salesLine.extraName}
                    />
                    <InputHookProducts
                      margin='0'
                      height={'100px'}
                      onChange={value => { return handleLineChange(i, 'extraPrice', value) }}
                      placeholder='Precio'
                      name={salesLine.extraPrice}
                      value={numberFormat(salesLine.extraPrice)}
                    />
                  </Row>
                  <Checkbox
                    checked={salesLine.exState}
                    margin='10px 0'
                    onChange={value => { return handleLineChange(i, 'exState', value) }}
                    name={salesLine.exState}
                    id={i}
                  />
                <RippleButton
                  bgColor={'transparent'}
                  margin='0px'
                  onClick={() => { return handleRemove(i) }}
                  type='button'
                  widthButton='min-content'
                >
                  <IconDelete color={EColor} size='25px' />
                </RippleButton>
              </ContentLinesItems>
            )
          })}
          <Action>
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => { return CleanLines() }}
              type='button'
              widthButton='240px'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
            <RippleButton
              margin='0px'
              onClick={() => { return handleAdd() }}
              type='button'
              widthButton='240px'
            >
              <IconPlus color={BGColor} size='20px' />
            </RippleButton>
            <RippleButton
              margin='0px'
              onClick={(e) => { e.preventDefault(); onSubmitUpdate() }}
              widthButton='240px'
            >
                            Update
            </RippleButton>
          </Action>
        </ContentModal>
      </AwesomeModal>
      <AwesomeModal
        backdrop
        bgColor='transparent'
        btnConfirm={false}
        footer={false}
        header={false}
        onCancel={() => { return OPEN_MODAL_CAT_EXTRA.setState(false) }}
        onHide={() => { return OPEN_MODAL_CAT_EXTRA.setState(false) }}
        padding='10px'
        show={OPEN_MODAL_CAT_EXTRA.state}
        size='70%'
        zIndex='99988'
      >
        <ContentModal height='400px'>
          <GarnishChoicesHeader>
            <div>
              <p className='garnish-choices__title'>{moment(INFO_EXTRA.state.pDatCre).format('YYYY-MM-DD')}</p>
              <p className='garnish-choices__title'>{INFO_EXTRA.state.OptionalProName}</p>
              <p className='garnish-choices__title-desc'>Escoge hasta {INFO_EXTRA.state.numbersOptionalOnly} opciones.</p>
            </div>
            {INFO_EXTRA.state.required === 1 ? <div className='garnish-choices'>
              <span className='marmita-minitag' span>OBLIGATORIO</span>
            </div> : null}
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => { return handleDeleteCatOptional(INFO_EXTRA.state) }}
              type='button'
              widthButton='min-content'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
          </GarnishChoicesHeader>
          <InputHooks
            name='OptionalProName'
            onChange={handleChange}
            required
            value={dataForm.OptionalProName}
          />

        </ContentModal>
      </AwesomeModal>
    </Column >)
}
