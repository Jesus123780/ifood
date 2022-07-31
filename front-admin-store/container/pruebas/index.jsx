import React, { useState, Fragment } from 'react'
import { ArrowsLabel, ButtonAction, ButtonCode, ButtonNext, ButtonPagination, ButtonPrev, ButtonStatus, CardsComponent, CheckBox, CheckBoxLabel, CheckBoxWrapper, CicleStatus, ContentItems, ContentList, ContentTable, ContentTitles, Image, Input, ListActions, Pagination, SectionTitles, Text, Title, WrapperTable } from './styled'
import { BColor, SECColor } from '../../public/colors'
import { IconArrowLeft, IconArrowRight, IconDost } from '../../public/icons'
import { MockData } from '../../components/common/mockData'
import { RandomCode } from '../../utils'
import { RippleButton } from '../../components/Ripple'
import moment from 'moment'

export const CustomTable = () => {
  const [data, setData] = useState(MockData)
  const [title, setTitle] = useState('')
  const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })

  const addCard = async (title, listId) => {
    const id = await RandomCode(9)
    const newCard = {
      id: id,
      title: title
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
    setTitle('')
  }

  const handleAdd = ({ listId }) => {
    if (title !== '') {
      addCard(title, listId)
    }
  }

  const handleAddList = async ({ title }) => {
    if (title !== '') {
      const newListId = await RandomCode(9)
      setData({
        listIds: [...data.listIds, newListId],
        lists: {
          ...data.lists,
          [newListId]: {
            id: newListId,
            title: title,
            cards: []
          }
        }
      })
      setTitle('')
    }
  }
  const onDragEnd = async (results) => {
    // eslint-disable-next-line
    const { destination, destination: { droppableId: destDroppableId, index: desIndex }, source, source: { droppableId: sourceDroppableId, index: sourceIndex }, draggableId, type } = results
    if (!destination) {
      return
    }
    const sourceList = data.lists[sourceDroppableId]
    const destinationList = data.lists[destDroppableId]
    const draggingCard = sourceList?.cards?.filter(card => { return card?.id === draggableId })[0]
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
  return <div style={{ display: 'flex' }}>
    {data?.listIds?.map((listID, index) => {
      const list = data.lists[listID]
      return (
        <div key={index + 1} onDragEnd={onDragEnd}>
          <div
            direction='vertical'
            droppableId={listID}
            type='list'
          >
            {
              (provided) => {
                return (
                  <ContentList
                    key={listID}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>
                      <Input
                        name='fromDate'
                        onChange={e => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }}
                        type='date'
                        value={valuesDates?.fromDate}
                      />
                      <Input
                        name='toDate'
                        onChange={e => { return setValuesDates({ ...valuesDates, [e.target.name]: e.target.value }) }}
                        type='date'
                        value={valuesDates?.toDate}
                      />
                      <Title>{list?.title}</Title>
                      <span>{list?.cards?.length}</span>
                      <CicleStatus status={list.title} />
                      <List index={index} list={list} />
                      <Input
                        aria-disabled
                        autoFocus
                        name='title'
                        onChange={(e) => { return setTitle(e.target.value) }}
                        placeholder='enter card'
                        value={listID.title}
                      />
                      <RippleButton
                        margin='20px auto'
                        onClick={() => { return handleAdd({ listId: listID }) }}
                        type='button'
                        widthButton='100%'
                      >Add list</RippleButton>
                      {provided.placeholder}
                    </div>
                  </ContentList>
                )
              }
            }
          </div>
        </div>
      )
    })}
    <div style={{ display: 'block' }}>
      <Input
        name='title'
        onChange={(e) => { return setTitle(e.target.value) }}
        placeholder='Añadir nueva lista'
        type='text'
        value={title}
      />
      <button onClick={() => { return handleAddList({ title: title }) }} type='button'>Add list</button>
    </div>
  </div>

}
export const List = ({ list, index }) => {
  // PRODUCT_RECOGER: state?.PRODUCT_RECOGER?.filter((t, idx) => idx !== action?.idx)

  return (
    <div draggableId={list.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div direction='horizontal' droppableId={list.id}>
              {
                (provided) => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps} >
                      {list?.cards?.map((card, index) => {
                        return (
                          <div key={card?.id}>

                            <Card
                              card={card}
                              index={index}
                              key={card?.id}
                            />
                            {provided.placeholder}
                          </div>
                        )
                      })}
                    </div>
                  )
                }
              }
            </div>
          </div>
        )
      }}
    </div>
  )
}

export const Card = ({ card, index }) => {
  return (
    <div style={{ display: 'flex', padding: '10px' }}>
      <div draggableId={card?.id} index={index} >
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <CardsComponent>
                {card?.title}
                <h3>id: {index + 1}</h3>
              </CardsComponent>
            </div>
          )
        }}
      </div>
    </div>
  )
}

export const CustomTable2 = () => {
  const [openMenuActions, setOpenMenuActions] = useState(false)
  const handleToggle = (e) => {
    // eslint-disable-next-line
    const { id, checked } = e.target
  }
  return (
    <div>
      <ContentTable>
        <TitleTables
          titles={[
            { justify: 'center', name: 'Toggle', width: '.5fr' },
            { justify: 'center', name: 'Franchise Name', width: '1fr' },
            { justify: 'center', name: 'Status', width: '1fr' },
            { justify: 'center', name: 'Type', width: '1fr' },
            { justify: 'center', name: 'SKU', width: '1fr' },
            { justify: 'center', name: 'Contact', width: '1fr' },
            { justify: 'center', name: 'Price USD', width: '1fr' },
            { justify: 'center', name: 'Action', width: '1fr' }
          ]}
        />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(currentItems => {
          return (
            <WrapperTable columnWidth={['.5fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '.5fr']} key={currentItems._id}>
              <ContentItems>
                <StatusToggle
                  id={currentItems?.aId}
                  onChange={e => { return handleToggle(e, currentItems?.uId) }}
                  state={currentItems?.aState !== 3}
                />
              </ContentItems>
              <ContentItems paddingLeft='0'>
                <Image alt='https://res.cloudinary.com/smart-accounting/image/upload/v1642167965/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_qqdec1.png' src={'https://res.cloudinary.com/smart-accounting/image/upload/v1642167965/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_qqdec1.png'} />
                <Text margin='auto 20px' size='16px'>Luis Vuitton</Text>
              </ContentItems>
              <ContentItems paddingLeft='45px'>
                <ButtonStatus status={'Active'}>
                  {!currentItems.status == 'Active' ? 'Active' : currentItems?.status === 'Danger' ? 'Active' : 'Pending'}
                </ButtonStatus>
              </ContentItems>
              <ContentItems>
                <Text
                  margin='0'
                  paddingLeft='15px'
                  size='16px'
                >Bravo</Text>
              </ContentItems>
              <ContentItems>
                <ButtonCode>
                  9177
                </ButtonCode>
              </ContentItems>
              <ContentItems >
                <Image
                  alt='https://res.cloudinary.com/smart-accounting/image/upload/v1642169312/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_ooujgm.png'
                  radius
                  src={'https://res.cloudinary.com/smart-accounting/image/upload/v1642169312/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_ooujgm.png'}
                />
                <Text margin='auto 20px' size='16px'>Evan flores</Text>
              </ContentItems>
              <ContentItems>
                <Text margin='auto 20px' size='16px'>£ {currentItems.price ? currentItems.price : '452.45'}</Text>
              </ContentItems>
              <ContentItems>
                <ButtonAction onClick={() => { return setOpenMenuActions(currentItems === openMenuActions ? false : currentItems) }}>
                  <IconDost color={SECColor} size='30px' />
                </ButtonAction>
                <ListActions openMenuActions={openMenuActions === currentItems}>
                  <ButtonStatus margin='0 0 5px 0' status={'Danger'}>
                    DELETE
                  </ButtonStatus>
                  <ButtonStatus margin='0 0 5px 0' status={'Active'}>
                    CHANGE STATUS
                  </ButtonStatus>
                  <ButtonStatus margin='0 0 5px 0' status={''}>
                    EDIT
                  </ButtonStatus>
                </ListActions>
              </ContentItems>
            </WrapperTable>
          )
        })}
      </ContentTable>
      <Pagination>
        <ButtonPrev>
          <IconArrowLeft color={`${BColor}78`} size='20px' />
        </ButtonPrev>
        <ButtonPagination Active={true}>
          1
        </ButtonPagination>
        /
        <ButtonPagination>
          16
        </ButtonPagination>
        <ButtonNext>
          <IconArrowRight color={`${BColor}78`} size='20px' />
        </ButtonNext>
      </Pagination>
    </div>
  )
}

CustomTable.propTypes = {

}
//Status Toggle recibe como props ID
export const StatusToggle = ({ id, state, onChange }) => {
  return (
    <>
      <CheckBoxWrapper>
        <CheckBox
          defaultChecked={!state}
          id={id}
          onChange={onChange}
          type='checkbox'
        />
        <CheckBoxLabel htmlFor={id} />
      </CheckBoxWrapper>
    </>
  )
}
export const TitleTables = ({ titles }) => {
  const pTitles = titles
  return (
    <SectionTitles columnWidth={pTitles}>
      {pTitles?.map((x, i) => {
        return <ContentTitles justify={x.justify} key={i}>
          <ArrowsLabel htmlFor={x.key}>
            <Text margin='0' size={'15px'}>{x.name}</Text>
          </ArrowsLabel>
        </ContentTitles>
      })}
    </SectionTitles>
  )
}