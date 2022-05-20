import React, { useCallback, useContext, useState } from 'react'
import { useMutation } from '@apollo/client'
import { RippleButton } from '../../../components/Ripple'
import { BGColor, EColor, PColor } from '../../../public/colors'
import { IconDelete, IconMiniCheck, IconPlus } from '../../../public/icons'
import { numberFormat, RandomCode, updateCache } from '../../../utils'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_EXTRAS_PRODUCT_FOOD_SUB_OPTIONAL, UPDATE_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_MULTI_EXTRAS_PRODUCT_FOOD } from '../../update/Products/queries'
import { MockData } from '../../../components/common/mockData'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { DELETE_CAT_EXTRA_PRODUCTS, DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS, DELETE_EXTRA_PRODUCTS, GET_ALL_EXTRA_PRODUCT } from '../../dashboard/queries'
import { AwesomeModal } from '../../../components/AwesomeModal'
import { Action, CardsComponent, Container, ContainerListOptions, ContentCheckbox, ContentLinesItems, ContentModal, GarnishChoicesHeader, Input, WrapperList } from './styled'
import { useSetState } from '../../../components/hooks/useState'
import { useFormTools } from '../../../components/BaseForm'
import InputHooks from '../../../components/InputHooks/InputHooks'
import moment from 'moment'
import { Context } from 'context/Context'

export const ExtrasProductsItems = ({ pId, dataOptional, dataExtra, setModal, modal }) => {
  //    STATES
  // eslint-disable-next-line
    const [handleChange, _handleSubmit, handleForcedData, { dataForm }] = useFormTools()
  const OPEN_MODAL_CAT_EXTRA = useSetState(false)
  const INFO_EXTRA = useSetState({})
  const { setAlertBox } = useContext(Context)

  const initialLine = {
    extraName: '',
    extraPrice: '',
    exState: false
  }
  const initialLineItems = {
    Lines: [
      {
        extraName: '',
        extraPrice: '',
        exState: false
      },
      (initialLine)
    ]
  }
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
    const Lines = LineItems?.Lines?.filter((salesLine, index) => {return index !== i})
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
        update: (cache, { data: { ExtProductFoodsAll } }) => {return updateCache({
          cache,
          query: GET_ALL_EXTRA_PRODUCT,
          nameFun: 'ExtProductFoodsAll',
          dataNew: ExtProductFoodsAll
        })}
      }).then((e) => {return console.log(e)})
      // setModal(false)
    } catch (error) {
      setAlertBox({ message: `${ error }` , duration: 7000 })
    }
  }
  // DELETE ADICIONAL
  const handleDeleteAdditional = async elem => {
    const { state, exPid } = elem || {}
    deleteextraproductfoods({
      variables: {
        state,
        id: exPid
      }, update: (cache, { data: { ExtProductFoodsAll } }) => {return updateCache({
        cache,
        query: GET_ALL_EXTRA_PRODUCT,
        nameFun: 'ExtProductFoodsAll',
        dataNew: ExtProductFoodsAll
      })}
    })
  }
  const handleDeleteCatOptional = async elem => {
    const { state, opExPid } = elem || {}
    DeleteExtProductFoodsOptional({
      variables: {
        state: state,
        opExPid: opExPid
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {return updateCache({
        cache,
        query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
        nameFun: 'ExtProductFoodsOptionalAll',
        dataNew: ExtProductFoodsOptionalAll
      })}
    })
    OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
  }
  const handleDeleteItemSubOptional = async elem => {
    const { state, opSubExPid } = elem || {}
    DeleteExtFoodSubsOptional({
      variables: {
        state: state,
        opSubExPid: opSubExPid
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {return updateCache({
        cache,
        query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
        nameFun: 'ExtProductFoodsOptionalAll',
        dataNew: ExtProductFoodsOptionalAll
      })}
    }).then(res => {return setAlertBox({ message: res?.message?.DeleteExtFoodSubsOptional?.message })})
  }

  const handleOpenExtra = async elem => {
    OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
    INFO_EXTRA.setState(elem)
    handleForcedData({ ...elem })
  }
  return (
    <Container>
      {dataExtra?.length > 0 && <form onSubmit={(e) => {return onSubmitUpdate(e)}} >
        <GarnishChoicesHeader onClick={() => {return setModal(!modal)}}>
          <div>
            <p className='garnish-choices__title'>Adicionales</p>
            <p className='garnish-choices__title-desc'>Escoge hasta 3 opciones.</p>
          </div>
          <IconMiniCheck color={'#009b3a'} size={'15px'} />
        </GarnishChoicesHeader>
        {dataExtra?.map((Adicionales, index) => {return (
          <div key={index + 1}>
            <CardsComponent>
              <div>
                <h3 className='title_card'>{Adicionales.extraName}</h3>
                <h3 className='price'> $ {numberFormat(Adicionales.extraPrice)}</h3>
              </div>
              <RippleButton
                bgColor={'transparent'}
                margin='0px'
                onClick={() => {return handleDeleteAdditional(Adicionales)}}
                type='button'
                widthButton='min-content'
              >
                <IconDelete color={EColor} size='25px' />
              </RippleButton>
            </CardsComponent>
          </div>
        )})}

      </form>}
      {dataOptional?.length > 0 && dataOptional?.map((x, i) => {return (
        <div key={i + 1}>
          <GarnishChoicesHeader onClick={() => {return handleOpenExtra(x)}}>
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
            x.ExtProductFoodsSubOptionalAll?.map((z, index) => {return (
              <CardsComponent key={z.opSubExPid}>
                <div>
                  <h3 className='title_card'>{z?.OptionalSubProName}</h3>
                  <h3 className='title_card'>Item: {index + 1}</h3>

                </div>
                <RippleButton
                  bgColor={'transparent'}
                  margin='0px'
                  onClick={() => {return handleDeleteItemSubOptional(z)}}
                  type='button'
                  widthButton='min-content'
                >
                  <IconDelete color={EColor} size='25px' />
                </RippleButton>
              </CardsComponent>
            )})
          }
        </div >
      )})}
      {/* Open adicional modal */}
      <AwesomeModal
        backdrop
        btnConfirm={false}
        footer={false}
        header={false}
        height='100vh'
        onCancel={() => {return setModal(false)}}
        onHide={() => {return setModal(false)}}
        padding='60px'
        show={modal}
        size='small'
      >
        <ContentModal>
          {LineItems && LineItems?.Lines?.map((salesLine, i) => {return (
            <ContentLinesItems key={salesLine._id}>
              <div style={{ width: '100%', height: 'auto', display: 'block' }}>
                <ContentLinesItems noBorder >
                  <InputHookProducts
                    margin='10px 0'
                    onChange={value => {return handleLineChange(i, 'extraName', value)}}
                    placeholder='Nombre'
                    value={salesLine.extraName}
                  />
                  <InputHookProducts
                    color={EColor}
                    margin='10px 0'
                    onChange={value => {return handleLineChange(i, 'extraPrice', value)}}
                    placeholder='Precio'
                    value={numberFormat(salesLine.extraPrice)}
                  />
                </ContentLinesItems>
              </div>
              <ContentCheckbox>
                <Input
                  checkbox
                  margin='10px 0'
                  onChange={value => {return handleLineChange(i, 'exState', value)}}
                  type='checkbox'
                />
              </ContentCheckbox>
              <RippleButton
                bgColor={'transparent'}
                margin='0px'
                onClick={() => {return handleRemove(i)}}
                type='button'
                widthButton='min-content'
              >
                <IconDelete color={EColor} size='25px' />
              </RippleButton>
            </ContentLinesItems>
          )})}
          <Action>
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => {return CleanLines()}}
              type='button'
              widthButton='240px'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
            <RippleButton
              margin='0px'
              onClick={() => {return handleAdd()}}
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
        onCancel={() => {return OPEN_MODAL_CAT_EXTRA.setState(false)}}
        onHide={() => {return OPEN_MODAL_CAT_EXTRA.setState(false)}}
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
              onClick={() => {return handleDeleteCatOptional(INFO_EXTRA.state)}}
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
          <RippleButton
            margin='0px'
            onClick={() => { }}
            padding='5'
            type='button'
            widthButton='25%'
          >
                        Editar
          </RippleButton>
        </ContentModal>
      </AwesomeModal>
    </Container >)
}

export const OptionalExtraProducts = ({ pId }) => {
  // STATES
  const [data, setData] = useState(MockData)
  const [numberLimit, setNumberLimit] = useState(2)
  const [title, setTitle] = useState('')
  const [setCheck, setChecker] = useState({})
  // QUERIES
  const [updateExtProductFoodsOptional] = useMutation(UPDATE_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const [updateExtProductFoodsSubOptional] = useMutation(GET_EXTRAS_PRODUCT_FOOD_SUB_OPTIONAL)
  // HANDLES
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
  }
  const addCard = async (title, listId) => {
    const id = await RandomCode(9)
    const newCard = {
      id: id,
      title: title,
      numberLimit: 5,
      required: setCheck.exState
    }
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
    await updateExtProductFoodsSubOptional({
      variables: {
        input: {
          pId,
          OptionalSubProName: title,
          exCodeOptionExtra: listId,
          exCode: id,
          state: 1
        }
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {return updateCache({
        cache,
        query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
        nameFun: 'ExtProductFoodsOptionalAll',
        dataNew: ExtProductFoodsOptionalAll
      })}
    })
    setTitle('')
  }

  const handleRemoveList = i => {
    const Lines = data?.listIds?.filter((salesLine, index) => {return index !== i})
    setData({
      listIds: [...Lines],
      lists: {
        ...data.lists
      }
    })
  }
  const handleAdd = ({ listId }) => {
    if (title !== '') {
      addCard(title, listId)
    }
  }
  const handleAddList = async ({ title, numberLimit }) => {
    if (title !== '') {
      const newListId = await RandomCode(9)
      setData({
        listIds: [...data.listIds, newListId],
        lists: {
          ...data.lists,
          [newListId]: {
            id: newListId,
            title: title,
            required: setCheck.exState,
            numberLimit: numberLimit,
            cards: []
          }
        }
      })
      await updateExtProductFoodsOptional({
        variables: {
          input: {
            pId,
            code: newListId,
            OptionalProName: title,
            required: setCheck.exState,
            numbersOptionalOnly: numberLimit
          }
        },
        update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })}
      })
      setTitle('')
    }
  }
  // OPTIONAL EXTRA PRODUCT
  const onDragEnd = async (results) => {
    // eslint-disable-next-line
        const { destination, destination: { droppableId: destDroppableId, index: desIndex }, _source, source: { droppableId: sourceDroppableId, index: sourceIndex }, draggableId, type } = results
    if (!destination) {
      return
    }
    const sourceList = data.lists[sourceDroppableId]
    const destinationList = data.lists[destDroppableId]
    const draggingCard = sourceList?.cards?.filter(card => {return card?.id === draggableId})[0]
    if (sourceDroppableId === destDroppableId) {
      // utilizaremos splice para intercambiar los indices y actualizamos data
      sourceList.cards.splice(sourceIndex, 1)
      destinationList.cards.splice(desIndex, 0, draggingCard)
      setData({
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList
        }
      })
    } else {
      sourceList.cards.splice(sourceIndex, 1)
      destinationList.cards.splice(desIndex, 0, draggingCard)
      setData({
        ...data.lists,
        [sourceList.id]: sourceList,
        [destinationList.id]: destinationList
      })
    }
  }
  return <ContainerListOptions style={{ display: 'flex' }}>
    {data?.listIds?.map((listID, index) => {
      const list = data.lists[listID]
      return (
        <DragDropContext key={index + 1} onDragEnd={onDragEnd}>
          <Droppable
            direction='vertical'
            droppableId={listID}
            type='list'
          >
            {
              (provided) => {return (
                <div
                  className='wrapper-list'
                  key={listID}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div>
                    <GarnishChoicesHeader>
                      <div>
                        <p className='garnish-choices__title'>{list?.title}</p>
                        <p className='garnish-choices__title-desc'>Escoge hasta {list?.numberLimit} opciones.</p>
                        <div className='garnish-choices'>
                          {list.required === 1 && <span className='marmita-minitag'>OBLIGATORIO</span>}
                        </div>
                      </div>
                      <IconMiniCheck color={'#009b3a'} size={'15px'} />
                      <RippleButton
                        bgColor={'transparent'}
                        margin='0px'
                        onClick={() => {return handleRemoveList(index)}}
                        type='button'
                        widthButton='min-content'
                      >
                        <IconDelete color={EColor} size='25px' />
                      </RippleButton>
                    </GarnishChoicesHeader>
                    <span>{list?.cards?.length}</span>
                    <List
                      data={data}
                      index={index}
                      list={list}
                      setData={setData}
                    />
                    <Input
                      aria-disabled
                      autoFocus
                      card
                      name='title'
                      onChange={(e) => {return setTitle(e.target.value)}}
                      onKeyDown={(event) => {return (event.key === 'Enter' && handleAdd({ listId: listID }))}}
                      placeholder='enter card'
                      value={listID.title}
                    />
                    <RippleButton
                      margin='20px auto'
                      onClick={() => {return handleAdd({ listId: listID })}}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAdd({ listId: listID })
                        }
                      }}
                      widthButton='100%'
                    >Add list</RippleButton>
                    {provided.placeholder}
                  </div>
                </div>
              )}
            }
          </Droppable>
        </DragDropContext>
      )
    })}
    <div className='wrapper-list'>
      <GarnishChoicesHeader>
        <div>
          <p className='garnish-choices__title'>{title ? title : 'Escoge tu... '}</p>
          <p className='garnish-choices__title-desc'>Escoge hasta {numberLimit} opciones.</p>
        </div>
        <div className='garnish-choices'>
          {setCheck.exState === 1 && <span className='marmita-minitag'>OBLIGATORIO</span>}
        </div>
        <div>
          <div>
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              type='button'
              widthButton='min-content'
            >
              <IconDelete color={`${EColor}90`} size='25px' />
            </RippleButton>
          </div>
        </div>
      </GarnishChoicesHeader>
      <Input
        card
        margin='10px 0'
        name='title'
        onChange={(e) => {return setTitle(e.target.value)}}
        placeholder='Añadir nueva lista'
        type='text'
        value={title}
      />
      <GarnishChoicesHeader>
        <ContentCheckbox>
          <Input
            checkbox
            margin='10px 0'
            name={'exState'}
            onChange={e => {return handleCheck(e)}}
            type='checkbox'
          />
        </ContentCheckbox>
        <RippleButton
          margin='0'
          onClick={() => {return handleAddList({ title: title, numberLimit: numberLimit })}}
          padding='0'
          type='button'
          widthButton='100%'
        >Add list</RippleButton>
        <div style={{ display: 'block' }}>
          <RippleButton
            bgColor={'transparent'}
            border='1px solid'
            margin='0'
            onClick={() => {return setNumberLimit(numberLimit + 1)}}
            padding='0'
            type='button'
            widthButton='100%'
          ><IconPlus color={PColor} size='16px' /></RippleButton>
          {/* <RippleButton widthButton='100%' color='#000' bgColor={'transparent'} border='1px solid' margin='0' padding='0' type="button" onClick={() => setNumberLimit(numberLimit = 0 && numberLimit - 1)}>--</RippleButton> */}
        </div>
      </GarnishChoicesHeader>
    </div>
  </ContainerListOptions>

}

export const List = ({ list, index, setData, data }) => {
  // PRODUCT_RECOGER: state?.PRODUCT_RECOGER?.filter((t, idx) => idx !== action?.idx)

  return (
    <WrapperList>
      <Draggable draggableId={list?.id} index={index}>
        {(provided) => {return (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Droppable direction='horizontal' droppableId={list?.id}>
              {
                (provided) => {return (
                  <div ref={provided.innerRef} {...provided.droppableProps} >
                    {list?.cards?.map((card, index) => {return (
                      <div key={card?.id}>
                        <Card
                          card={card}
                          data={data}
                          id={list?.id}
                          index={index}
                          key={card?.id}
                          list={list}
                          setData={setData}
                        />
                        {provided.placeholder}
                      </div>
                    )})}
                  </div>
                )}
              }
            </Droppable>
          </div>
        )}}
      </Draggable>
    </WrapperList>
  )
}

export const Card = ({ card, index, data, id }) => {
  const handleRemoveItemCard = async elem => {
    const list = data.lists[id]
    const Lines = list?.cards.filter((x, index) => {return index !== elem})
    // setData({
    //     ...data,
    //     ...Lines,
    //     lists: {
    //         ...data.lists
    //     }
    // })
  }
  return (
    <Draggable draggableId={card?.id} index={index} >
      {(provided) => {return (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <CardsComponent>
            <div>
              <h3 className='title_card'>{card?.title}</h3>
              <h3 className='title_card'>Item: {index + 1}</h3>
            </div>
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => {return handleRemoveItemCard(index)}}
              type='button'
              widthButton='min-content'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
          </CardsComponent>
        </div>
      )}}
    </Draggable>
  )
}

export const InputHookProducts = ({ placeholder, value, onChange, inputText, type, color }) => {
  return (
    <>
      <Input
        color={color}
        inputText={inputText}
        onChange={onChange ? e => {return onChange(e.target.value)} : undefined}
        placeholder={placeholder || ''}
        type={type || 'text'}
        value={value || ''}
      />
    </>
  )
}
