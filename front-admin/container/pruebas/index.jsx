import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { ArrowsLabel, ButtonAction, ButtonCode, ButtonNext, ButtonPagination, ButtonPrev, ButtonStatus, CardsComponent, CheckBox, CheckBoxLabel, CheckBoxWrapper, CicleStatus, ContentItems, ContentList, ContentTable, ContentTitles, Image, Input, ListActions, Pagination, SectionTitles, Text, Title, WrapperTable } from './styled';
import { BColor, BGColor, SECColor, SEGColor } from '../../public/colors';
import { IconArrowLeft, IconArrowRight, IconDost } from '../../public/icons';
import { MockData } from '../../components/common/mockData';
import { RandomCode } from '../../utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { RippleButton } from '../../components/Ripple';
import moment from 'moment';

export const CustomTable = props => {
    const [data, setData] = useState(MockData);
    const [title, setTitle] = useState('');
    const [valuesDates, setValuesDates] = useState({ fromDate: moment().format('YYYY-MM-DD'), toDate: moment().format('YYYY-MM-DD') })

    const addCard = async (title, listId) => {
        const id = await RandomCode(9)
        const newCard = {
            id: id,
            title: title,
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
        const { destination, destination: { droppableId: destDroppableId, index: desIndex }, source, source: { droppableId: sourceDroppableId, index: sourceIndex }, draggableId, type } = results
        if (!destination) {
            return;
        }
        const sourceList = data.lists[sourceDroppableId]
        const destinationList = data.lists[destDroppableId]
        const draggingCard = sourceList?.cards?.filter(card => card?.id === draggableId)[0]
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
                [destinationList.id]: destinationList,
            })
        }
    }
    return <div style={{ display: 'flex' }}>
        {data?.listIds?.map((listID, index) => {
            const list = data.lists[listID]
            console.log(list);
            return (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={listID} type='list' direction='vertical'>
                        {
                            (provided) => (
                                <ContentList key={listID} ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div>
                                        <Input type='date' name='fromDate' value={valuesDates?.fromDate} onChange={e => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })} />
                                        <Input type='date' name='toDate' value={valuesDates?.toDate} onChange={e => setValuesDates({ ...valuesDates, [e.target.name]: e.target.value })} />
                                        <Title>{list?.title}</Title>
                                        <span>{list?.cards?.length}</span>
                                        <CicleStatus status={list.title} />
                                        <List list={list} index={index} />
                                        <Input aria-disabled autoFocus onChange={(e) => setTitle(e.target.value)} value={listID.title} name='title' placeholder='enter card' />
                                        <RippleButton widthButton='100%' margin='20px auto' type="button" onClick={() => handleAdd({ listId: listID })}>Add list</RippleButton>
                                        {provided.placeholder}
                                    </div>
                                </ContentList>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            )
        })}
        <div style={{ display: 'block' }}>
            <Input onChange={(e) => setTitle(e.target.value)} value={title} name='title' type="text" placeholder='Añadir nueva lista' />
            <button type="button" onClick={() => handleAddList({ title: title })}>Add list</button>
        </div>
    </div>

}
export const List = ({ list, index }) => {
    // PRODUCT_RECOGER: state?.PRODUCT_RECOGER?.filter((t, idx) => idx !== action?.idx)

    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <Droppable droppableId={list.id} direction='horizontal'>
                        {
                            (provided) => (
                                <div ref={provided.innerRef}   {...provided.droppableProps} >
                                    {list?.cards?.map((card, index) => (
                                        <div key={card?.id}>

                                            <Card card={card} key={card?.id} index={index} />
                                            {provided.placeholder}
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export const Card = ({ card, index }) => {
    return (
        <div style={{ display: 'flex', padding: '10px' }}>
            <Draggable draggableId={card?.id} index={index} >
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <CardsComponent>
                            {card?.title}
                            <h3>id: {index + 1}</h3>
                        </CardsComponent>
                    </div>
                )}
            </Draggable>
        </div>
    )
}




export const CustomTable2 = props => {
    const [statusToggle, setItemsToggle] = useState(false)
    const [openMenuActions, setOpenMenuActions] = useState(false)
    const handleToggle = (e, uId) => {
        const { id, checked } = e.target
    }
    return (
        <div>
            <ContentTable>
                <TitleTables titles={[
                    { justify: 'center', name: 'Toggle', width: '.5fr' },
                    { justify: 'center', name: 'Franchise Name', width: '1fr' },
                    { justify: 'center', name: 'Status', width: '1fr' },
                    { justify: 'center', name: 'Type', width: '1fr' },
                    { justify: 'center', name: 'SKU', width: '1fr' },
                    { justify: 'center', name: 'Contact', width: '1fr' },
                    { justify: 'center', name: 'Price USD', width: '1fr' },
                    { justify: 'center', name: 'Action', width: '1fr' }
                ]} />
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(currentItems => (
                    <WrapperTable columnWidth={['.5fr', '1fr', '1fr', '1fr', '1fr', '1fr', '1fr', '.5fr']} key={currentItems._id}>
                        <ContentItems>
                            <StatusToggle id={currentItems?.aId} state={currentItems?.aState !== 3} onChange={e => handleToggle(e, currentItems?.uId)} />
                        </ContentItems>
                        <ContentItems paddingLeft='0'>
                            <Image src={'https://res.cloudinary.com/smart-accounting/image/upload/v1642167965/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_qqdec1.png'} alt='https://res.cloudinary.com/smart-accounting/image/upload/v1642167965/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_qqdec1.png' />
                            <Text margin='auto 20px' size='16px'>Luis Vuitton</Text>
                        </ContentItems>
                        <ContentItems paddingLeft='45px'>
                            <ButtonStatus status={'Active'}>
                                {!currentItems.status === 'Active' ? 'Active' : currentItems?.status === 'Danger' ? 'Active' : 'Pending'}
                            </ButtonStatus>
                        </ContentItems>
                        <ContentItems>
                            <Text paddingLeft='15px' margin='0' size='16px'>Bravo</Text>
                        </ContentItems>
                        <ContentItems>
                            <ButtonCode>
                                9177
                            </ButtonCode>
                        </ContentItems>
                        <ContentItems >
                            <Image radius src={'https://res.cloudinary.com/smart-accounting/image/upload/v1642169312/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_ooujgm.png'} alt='https://res.cloudinary.com/smart-accounting/image/upload/v1642169312/images-template-smart-repor-client/Anotaci%C3%B3n_2022-01-14_084009_ooujgm.png' />
                            <Text margin='auto 20px' size='16px'>Evan flores</Text>
                        </ContentItems>
                        <ContentItems>
                            <Text margin='auto 20px' size='16px'>£ {currentItems.price ? currentItems.price : '452.45'}</Text>
                        </ContentItems>
                        <ContentItems>
                            <ButtonAction onClick={() => setOpenMenuActions(currentItems === openMenuActions ? false : currentItems)}>
                                <IconDost size='30px' color={SECColor} />
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
                ))}
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
                <CheckBox id={id} type="checkbox" defaultChecked={!state} onChange={onChange} />
                <CheckBoxLabel htmlFor={id} />
            </CheckBoxWrapper>
        </>
    )
}
export const TitleTables = ({ titles }) => {
    const pTitles = titles
    return (
        <SectionTitles columnWidth={pTitles}>
            {pTitles?.map((x, i) => <ContentTitles justify={x.justify} key={i}>
                <ArrowsLabel htmlFor={x.key}>
                    <Text size={'15px'} margin='0'>{x.name}</Text>
                </ArrowsLabel>
            </ContentTitles>)}
        </SectionTitles>
    )
}