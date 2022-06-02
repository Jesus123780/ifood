import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { RippleButton } from '../../../components/Ripple'
import { EColor, PColor } from '../../../public/colors'
import { IconDelete, IconMiniCheck, IconPlus } from '../../../public/icons'
import { RandomCode, updateCache } from '../../../utils'
import { MockData } from '../../../components/common/mockData'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_EXTRAS_PRODUCT_FOOD_SUB_OPTIONAL, UPDATE_EXTRAS_PRODUCT_FOOD_OPTIONAL } from '../../update/Products/queries'
import { CardsComponent, ContainerListOptions, ContentCheckbox, Div, GarnishChoicesHeader, Input, WrapperList } from './styled'


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
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
        return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })
      }
    })
    setTitle('')
  }

  const handleRemoveList = i => {
    const Lines = data?.listIds?.filter((salesLine, index) => { return index !== i })
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
        update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
          return updateCache({
            cache,
            query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
            nameFun: 'ExtProductFoodsOptionalAll',
            dataNew: ExtProductFoodsOptionalAll
          })
        }
      })
      setTitle('')
    }
  }
  return <ContainerListOptions>
    {data?.listIds?.map((listID, index) => {
      const list = data.lists[listID]
      return (
        <Div key={index} role='list'>
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
              onClick={() => { return handleRemoveList(index) }}
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
            onChange={(e) => { return setTitle(e.target.value) }}
            onKeyDown={(event) => { return (event.key === 'Enter' && handleAdd({ listId: listID })) }}
            placeholder='enter card'
            value={listID.title}
          />
          <RippleButton
            margin='20px auto'
            onClick={() => { return handleAdd({ listId: listID }) }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAdd({ listId: listID })
              }
            }}
            widthButton='100%'
          >Add list</RippleButton>
          z
        </Div>
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
        onChange={(e) => { return setTitle(e.target.value) }}
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
            onChange={e => { return handleCheck(e) }}
            type='checkbox'
          />
        </ContentCheckbox>
        <RippleButton
          margin='0'
          onClick={() => { return handleAddList({ title: title, numberLimit: numberLimit }) }}
          padding='0'
          type='button'
          widthButton='100%'
        >Add list</RippleButton>
        <div style={{ display: 'block' }}>
          <RippleButton
            bgColor={'transparent'}
            border='1px solid'
            margin='0'
            onClick={() => { return setNumberLimit(numberLimit + 1) }}
            padding='0'
            type='button'
            widthButton='100%'
          ><IconPlus color={PColor} size='16px' /></RippleButton>
          {/* <RippleButton
            bgColor={'transparent'}
            border='1px solid'
            color='#000'
            margin='0'
            onClick={() => {return setNumberLimit(numberLimit = 0 && numberLimit - 1)}}
            padding='0'
            type='button'
            widthButton='100%'
          >--</RippleButton> */}
        </div>
      </GarnishChoicesHeader>
    </div>
  </ContainerListOptions>

}

export const List = ({ list, setData, data }) => {
  return (
    <WrapperList>
      <div>
        {list?.cards?.map((card, index) => {
          return (
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
              s
            </div>
          )
        })}
      </div>
    </WrapperList>
  )
}

export const Card = ({ card, index }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleRemoveItemCard = async () => {
  }
  return (
    <div>
      <CardsComponent>
        <div>
          <h3 className='title_card'>{card?.title}</h3>
          <h3 className='title_card'>Item: {index + 1}</h3>
        </div>
        <RippleButton
          bgColor={'transparent'}
          margin='0px'
          onClick={() => { return handleRemoveItemCard(index) }}
          type='button'
          widthButton='min-content'
        >
          <IconDelete color={EColor} size='25px' />
        </RippleButton>
      </CardsComponent>
    </div>
  )
}

export const InputHookProducts = ({ placeholder, value, onChange, inputText, type, color }) => {
  return (
    <>
      <Input
        color={color}
        inputText={inputText}
        onChange={onChange ? e => { return onChange(e.target.value) } : undefined}
        placeholder={placeholder || ''}
        type={type || 'text'}
        value={value || ''}
      />
    </>
  )
}
