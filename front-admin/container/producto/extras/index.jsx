import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { gql, useQuery, useMutation } from '@apollo/client'
import { RippleButton } from '../../../components/Ripple';
import { BGColor, EColor, PColor, PLColor, PVColor, BColor } from '../../../public/colors';
import { IconDelete, IconMiniCheck, IconPlus } from '../../../public/icons';
import { numberFormat, RandonCode } from '../../../utils';
import { UPDATE_MULTI_EXTRAS_PRODUCT_FOOD } from '../../update/Products/queries';
import { MockData } from '../../../components/common/mockData';
import moment from 'moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const ExtrasProductsItems = ({ pId }) => {
    //    STATES
    const initialLine = {
        extraName: '',
        extraPrice: '',
        exState: false,
    }
    const initialLineItems = {
        Lines: [
            {
                extraName: '',
                extraPrice: '',
                exState: false,
            },
            (initialLine)
        ],
    }
    const CleanLines = useCallback(() => {
        setLine(initialLineItems)
    }, [initialLineItems])
    //    QUERIES
    const [updateMultipleExtProductFoods, { loading, error }] = useMutation(UPDATE_MULTI_EXTRAS_PRODUCT_FOOD, {
        onCompleted: () => {
            CleanLines()
        }
    })

    // HANDLESS
    const [LineItems, setLine] = useState(initialLineItems)
    const handleAdd = () => {
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
        const Lines = LineItems?.Lines?.filter((salesLine, index) => index !== i)
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
                }
            }).then(res => console.log(res))
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <Container>
            <form onSubmit={(e) => onSubmitUpdate(e)} >
                <GarnishChoicesHeader>
                    <div>
                        <p className="garnish-choices__title">Adicionales</p>
                        <p className="garnish-choices__title-desc">Escoge hasta 3 opciones.</p>
                    </div>
                    <IconMiniCheck size={'15px'} color={'#009b3a'} />
                </GarnishChoicesHeader>
                {LineItems && LineItems?.Lines?.map((salesLine, i) => (
                    <ContentLinesItems key={salesLine._id}>
                        <div style={{ width: '100%', height: 'auto', display: 'block' }}>
                            <InputHooks
                                inputText
                                inputText
                                margin='10px 0'
                                placeholder='Extra products'
                                value={salesLine.extraName}
                                onChange={value => handleLineChange(i, 'extraName', value)}
                            />
                            <ContentLinesItems noBorder >
                                <span><IconPlus size="10px" color={PColor} /></span>
                                <InputHooks
                                    inputText
                                    color={EColor}
                                    inputText
                                    margin='10px 0'
                                    placeholder='Precio'
                                    value={numberFormat(salesLine.extraPrice)}
                                    onChange={value => handleLineChange(i, 'extraPrice', value)}
                                />
                            </ContentLinesItems>

                        </div>
                        <ContentCheckbox>
                            <Input
                                checkbox
                                type='checkbox'
                                margin='10px 0'
                                // value={salesLine.exState}
                                onChange={value => handleLineChange(i, 'exState', value)}
                            />
                        </ContentCheckbox>
                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemove(i)} >
                            <IconDelete size='25px' color={EColor} />
                        </RippleButton>
                    </ContentLinesItems>
                ))}
            </form>
            <Action>
                <RippleButton bgColor={'transparent'} margin='0px' widthButton='240px' type="button" onClick={() => CleanLines()} >
                    <IconDelete size='25px' color={EColor} />
                </RippleButton>
                <RippleButton margin='0px' widthButton='240px' type="button" onClick={() => handleAdd()} >
                    <IconPlus size='20px' color={BGColor} />
                </RippleButton>
                <RippleButton margin='0px' widthButton='240px' onClick={() => onSubmitUpdate()} >
                    Update
                </RippleButton>
            </Action>
        </Container>);
};

export const OptionalExtraProducts = ({ pId }) => {
    const [data, setData] = useState(MockData);
    const [numberLimit, setNumberLimit] = useState(0);
    const [title, setTitle] = useState('');
    const addCard = async (title, listId) => {

        const id = await RandonCode(9)
        const newCard = {
            id: id,
            title: title,
            numberLimit: 5,
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

    const handleRemoveList = i => {
        const Lines = data?.listIds?.filter((salesLine, index) => index !== i)
        setData({
            listIds: [...Lines],
            lists: {
                ...data.lists,
            }
        })
    }
    const handleAdd = ({ listId }) => {
        if (title !== '') {
            addCard(title, listId)
        } else {

        }
    }

    const handleAddList = async ({ title, numberLimit }) => {
        if (title !== '') {
            const newListId = await RandonCode(9)
            setData({
                listIds: [...data.listIds, newListId],
                lists: {
                    ...data.lists,
                    [newListId]: {
                        id: newListId,
                        title: title,
                        numberLimit: numberLimit,
                        cards: []
                    }
                }
            })
            setTitle('')
        }
    }
    // OPTIONAL EXTRA PRODUCT
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
    return <ContainerListOptions style={{ display: 'flex' }}>
        {data?.listIds?.map((listID, index) => {
            const list = data.lists[listID]
            return (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={listID} type='list' direction='vertical'>
                        {
                            (provided) => (
                                <div className='wrapper-list' key={listID} ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <div>
                                        <GarnishChoicesHeader>
                                            <div>
                                                <p className="garnish-choices__title">{list?.title}</p>
                                                <p className="garnish-choices__title-desc">Escoge hasta {list?.numberLimit} opciones.</p>
                                            </div>
                                            <IconMiniCheck size={'15px'} color={'#009b3a'} />
                                            <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemoveList(index)} >
                                                <IconDelete size='25px' color={EColor} />
                                            </RippleButton>
                                        </GarnishChoicesHeader>
                                        <span>{list?.cards?.length}</span>
                                        <List list={list} index={index} setData={setData} data={data} />
                                        <Input card aria-disabled autoFocus autoComplete={false} onKeyDown={(event) => (event.key === 'Enter' && handleAdd({ listId: listID }))} onChange={(e) => setTitle(e.target.value)} value={listID.title} name='title' placeholder='enter card' />
                                        <RippleButton widthButton='100%' margin='20px auto' onClick={(e) => handleAdd({ listId: listID })} onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAdd({ listId: listID })
                                            }
                                        }} >Add list</RippleButton>
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )
                        }
                    </Droppable>
                </DragDropContext>
            )
        })}
        <div className="wrapper-list">
            <Input card onChange={(e) => setTitle(e.target.value)} value={title} name='title' type="text" placeholder='Add new list' />
            <GarnishChoicesHeader>
                <RippleButton widthButton='100%' margin='0' padding='0' type="button" onClick={() => handleAddList({ title: title, numberLimit: numberLimit })}>Add list</RippleButton>
                <RippleButton widthButton='100%' margin='0' padding='0' type="button" onClick={() => setNumberLimit(numberLimit + 1)}>Number{numberLimit}</RippleButton>
            </GarnishChoicesHeader>
        </div>
    </ContainerListOptions>

}


export const List = ({ list, index, setData, data }) => {
    // PRODUCT_RECOGER: state?.PRODUCT_RECOGER?.filter((t, idx) => idx !== action?.idx)

    return (
        <WrapperList>
            <Draggable draggableId={list?.id} index={index}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                        <Droppable droppableId={list?.id} direction='horizontal'>
                            {
                                (provided) => (
                                    <div ref={provided.innerRef}   {...provided.droppableProps} >
                                        {list?.cards?.map((card, index) => (
                                            <div key={card?.id}>
                                                <Card card={card} key={card?.id} id={list?.id} index={index} list={list} setData={setData} data={data} />
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
        </WrapperList>
    )
}


export const Card = ({ card, index, list, setData, data, id }) => {
    const handleRemoveItemCard = async elem => {
        const list = data.lists[id]
        const Lines = list?.cards.filter((x, index) => index !== elem)
        console.log(list);
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
            {(provided) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                    <CardsComponent>
                        <div>
                            <h3 className="title_card">{card?.title}</h3>
                            <h3 className="title_card">Item: {index + 1}</h3>

                        </div>
                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemoveItemCard(index)} >
                            <IconDelete size='25px' color={EColor} />
                        </RippleButton>
                    </CardsComponent>
                </div>
            )}
        </Draggable>
    )
}

const ContainerListOptions = styled.div`
    display: flex;
    flex-wrap: wrap;
    display: flex;
    padding: 40px 0;
    margin: 102px 0;
    .wrapper-list {
        width: 30%;
        margin: 0 10px;
    }
`
const WrapperList = styled.div`
    width: 100%;
    cursor: move;
`
const GarnishChoicesHeader = styled.div`
    padding: 12px 40px 10px;
    display: flex;
    place-content: center;
    align-items: center;
    justify-content: space-between;
    background: #f2f2f2;
    position: sticky;
    top: 0;
    border-bottom: 1px solid #ccc;
    z-index: 99;
    .garnish-choices__title {
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
        color: #3f3e3e;
    }
    .garnish-choices__title-desc {
        font-weight: 100;
        font-size: .875rem;
        line-height: 17px;
        display: block;
        color: #717171;
    }
`
export const CardsComponent = styled.div`
    background-color: ${BGColor};
    padding: 10px;
    margin: 15px 0;
    border-bottom: 1px solid #ccc;
    grid-template-columns: 5fr 10%;
    gap: 20px;
    cursor: move;
    display: grid;
    .title_card{
        word-break: break-word;
        font-family: PFont-Light;
        color: ${BColor};
        margin: 0;
        font-size: 1rem;
        line-height: 1.25em;
        font-weight: 500;
        /* color: #3f3e3e; */
    }
`
const ContentLinesItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    max-height: 100%;
    height: 100%;
    border-bottom: 1px solid #ccc;
    ${props => props.noBorder && `border-bottom: none`}
`
const ContentCheckbox = styled.div`
    transition: all .1s;
    color: inherit;
    cursor: pointer;
    outline: none;
    position: relative;
    margin-right: 2px;
`
const Input = styled.input`

    ${props => props.card && css`
        padding: 15px;
        border: 2px solid ${PColor};
    `}
    ${props => props.inputText && css`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => color};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}
    ${props => props.inputText && css`
        overflow: visible;
        border: none;
        margin: 0 0 0 5px;
        color: ${({ color }) => color};
        outline: none;
        padding: 5px;
        border: 2px solid transparent;
    `}
    ${props => props.checkbox && css`
        cursor: inherit;
        zoom: inherit;
        margin: 0;
        z-index: 2;
    `}
    &:focus {
        border: 2px solid ${PVColor};
        outline: none;
    }
    &&::after {
        border-width: 6px;
        visibility: visible;
        border: 1 solid #ea1d2c;
        border: 1 solid #ea1d2c;
        background: transparent;
        z-index: 1;
        transition: .15s cubic-bezier(.25,.46,.45,.94);
        visibility: hidden;
        background: transparent;
        z-index: 1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        left: 50%;
        top: 50%;
        background: transparent;
        -webkit-transform: translate(-50%,-50%);
        -moz-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 50%;
    }
`
const Container = styled.div`
    padding: 20px;
    overflow: auto;
    @media only screen and (max-width: 768px) {
        display: none;
        padding: 0;
    }
`
const Action = styled.div`
    font-size: 16px;
    background: ${BGColor};
    border-top: 2px solid #f5f0eb;
    justify-content: flex-end;
    padding: 20px;
    height: 80px;
    align-items: center;
    z-index: 9999;
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
`
export const Checkbox = ({ name, checkAll, defaultChecked, onCheck }) => {
    const [checked, setChecked] = useState(defaultChecked);
    const handleCheck = useCallback(
        (name) => {
            setChecked(!checked);
            onCheck(name);
        },
        [checked, onCheck]
    );

    useEffect(() => {
        if (checkAll) {
            setChecked(true);
        }

        if (!checkAll && defaultChecked) {
            setChecked(true);
        }

        if (!defaultChecked && checkAll) {
            setChecked(true);
        }

        if (!defaultChecked && !checkAll) {
            setChecked(false);
        }
    }, [checkAll, defaultChecked]);

    return (
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={() => handleCheck(name)}
        />
    );
};

export const InputHooks = ({ placeholder, value, onChange, inputText, type, color }) => {
    return (
        <>
            <Input
                type={type || "text"}
                inputText={inputText}
                color={color}
                placeholder={placeholder || ''}
                value={value || ''}
                onChange={onChange ? e => onChange(e.target.value) : undefined}
            />
        </>
    )
}