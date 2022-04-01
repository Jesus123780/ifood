import React, { useCallback, useContext, useState } from 'react';
import { useMutation } from '@apollo/client'
import { RippleButton } from '../../../components/Ripple';
import { BGColor, EColor, PColor, PLColor, PVColor, BColor } from '../../../public/colors';
import { IconDelete, IconMiniCheck, IconPlus } from '../../../public/icons';
import { numberFormat, RandomCode, updateCache } from '../../../utils';
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_EXTRAS_PRODUCT_FOOD_SUB_OPTIONAL, UPDATE_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_MULTI_EXTRAS_PRODUCT_FOOD } from '../../update/Products/queries';
import { MockData } from '../../../components/common/mockData';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { DELETE_CAT_EXTRA_PRODUCTS, DELETE_CAT_EXTRA_SUB_OPTIONAL_PRODUCTS, DELETE_EXTRA_PRODUCTS, GET_ALL_EXTRA_PRODUCT } from '../../dashboard/queries';
import { AwesomeModal } from '../../../components/AwesomeModal';
import { Action, CardsComponent, Container, ContainerListOptions, ContentCheckbox, ContentLinesItems, ContentModal, GarnishChoicesHeader, Input, WrapperList } from './styled';
import { useSetState } from '../../../components/hooks/useState';
import { useFormTools } from '../../../components/BaseForm';
import InputHooks from '../../../components/InputHooks/InputHooks';
import moment from 'moment';
import { Context } from 'context/Context';

export const ExtrasProductsItems = ({ pId, dataOptional, dataExtra, setModal, modal }) => {
    //    STATES
    const [handleChange, handleSubmit, handleForcedData, { dataForm }] = useFormTools()
    const OPEN_MODAL_CAT_EXTRA = useSetState(false)
    const INFO_EXTRA = useSetState({})
    const { setAlertBox } = useContext(Context)

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
                },
                update: (cache, { data: { ExtProductFoodsAll } }) => updateCache({
                    cache,
                    query: GET_ALL_EXTRA_PRODUCT,
                    nameFun: 'ExtProductFoodsAll',
                    dataNew: ExtProductFoodsAll
                })
            })
            setModal(false)
        } catch (error) {
        }
    }
    // DELETE ADICIONAL
    const handleDeleteAdditional = async elem => {
        const { state, exPid } = elem || {}
        deleteextraproductfoods({
            variables: {
                state,
                id: exPid
            }, update: (cache, { data: { ExtProductFoodsAll } }) => updateCache({
                cache,
                query: GET_ALL_EXTRA_PRODUCT,
                nameFun: 'ExtProductFoodsAll',
                dataNew: ExtProductFoodsAll
            })
        })
    }
    const handleDeleteCatOptional = async elem => {
        const { state, opExPid } = elem || {}
        DeleteExtProductFoodsOptional({
            variables: {
                state: state,
                opExPid: opExPid
            }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => updateCache({
                cache,
                query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
                nameFun: 'ExtProductFoodsOptionalAll',
                dataNew: ExtProductFoodsOptionalAll
            })
        })
        OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
    }
    const handleDeleteItemSubOptional = async elem => {
        const { state, opSubExPid } = elem || {}
        DeleteExtFoodSubsOptional({
            variables: {
                state: state,
                opSubExPid: opSubExPid
            }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => updateCache({
                cache,
                query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
                nameFun: 'ExtProductFoodsOptionalAll',
                dataNew: ExtProductFoodsOptionalAll
            })
        }).then(res => setAlertBox({ message: res?.message?.DeleteExtFoodSubsOptional?.message }))
    }


    const handleOpenExtra = async elem => {
        OPEN_MODAL_CAT_EXTRA.setState(!OPEN_MODAL_CAT_EXTRA.state)
        INFO_EXTRA.setState(elem)
        handleForcedData({ ...elem })
    }
    const [setCheck, setChecker] = useState({})
    const handleCheck = (e) => {
        const { name, checked } = e.target
        setChecker({ ...setCheck, [name]: checked ? 1 : 0 })
    }

    return (
        <Container>
            {dataExtra.length > 0 && <form onSubmit={(e) => onSubmitUpdate(e)} >
                <GarnishChoicesHeader onClick={() => setModal(!modal)}>
                    <div>
                        <p className="garnish-choices__title">Adicionales</p>
                        <p className="garnish-choices__title-desc">Escoge hasta 3 opciones.</p>
                    </div>
                    <IconMiniCheck size={'15px'} color={'#009b3a'} />
                </GarnishChoicesHeader>
                {dataExtra?.map((Adicionales, index) => (
                    <div key={index + 1}>
                        <CardsComponent>
                            <div>
                                <h3 className="title_card">{Adicionales.extraName}</h3>
                                <h3 className="price"> $ {Adicionales.extraPrice}</h3>
                            </div>
                            <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleDeleteAdditional(Adicionales)} >
                                <IconDelete size='25px' color={EColor} />
                            </RippleButton>
                        </CardsComponent>
                    </div>
                ))}

            </form>}
            {dataOptional && dataOptional?.map((x, i) => (
                <div key={i + 1}>
                    <GarnishChoicesHeader onClick={() => handleOpenExtra(x)}>
                        <div>
                            <p className="garnish-choices__title">{x.OptionalProName}</p>
                            {!!x.numbersOptionalOnly && <p className="garnish-choices__title-desc">Escoge hasta {x.numbersOptionalOnly} opciones.</p>}
                        </div>
                        <div className="garnish-choices">
                            <IconMiniCheck size={'15px'} color={'#009b3a'} />
                            {!!x.required ? <span span className="marmita-minitag">OBLIGATORIO</span> : <span style={{ backgroundColor: 'transparent', color: 'transparent', width: '8  0px', zIndex: '0' }} className="marmita-minitag">OBLIGATORIO</span>}
                        </div>
                    </GarnishChoicesHeader>
                    {
                        x.ExtProductFoodsSubOptionalAll?.map((z, index) => (
                            <CardsComponent key={z.opSubExPid}>
                                <div>
                                    <h3 className="title_card">{z?.OptionalSubProName}</h3>
                                    <h3 className="title_card">Item: {index + 1}</h3>

                                </div>
                                <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleDeleteItemSubOptional(z)} >
                                    <IconDelete size='25px' color={EColor} />
                                </RippleButton>
                            </CardsComponent>
                        ))
                    }
                </div >
            ))}
            {/* Open adicional modal */}
            <AwesomeModal show={modal} backdrop onCancel={() => setModal(false)} onHide={() => setModal(false)} btnConfirm={false} header={false} footer={false} padding='60px' size='medium' zIndex='99988' >
                <ContentModal>
                    {LineItems && LineItems?.Lines?.map((salesLine, i) => (
                        <ContentLinesItems key={salesLine._id}>
                            <div style={{ width: '100%', height: 'auto', display: 'block' }}>
                                <InputHookProducts
                                    inputText
                                    margin='10px 0'
                                    placeholder='Extra products'
                                    value={salesLine.extraName}
                                    onChange={value => handleLineChange(i, 'extraName', value)}
                                />
                                <ContentLinesItems noBorder >
                                    <span><IconPlus size="10px" color={PColor} /></span>
                                    <InputHookProducts
                                        inputText
                                        color={EColor}
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
                    <Action>
                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='240px' type="button" onClick={() => CleanLines()} >
                            <IconDelete size='25px' color={EColor} />
                        </RippleButton>
                        <RippleButton margin='0px' widthButton='240px' type="button" onClick={() => handleAdd()} >
                            <IconPlus size='20px' color={BGColor} />
                        </RippleButton>
                        <RippleButton margin='0px' widthButton='240px' onClick={(e) => { e.preventDefault(); onSubmitUpdate() }} >
                            Update
                        </RippleButton>
                    </Action>
                </ContentModal>
            </AwesomeModal>
            <AwesomeModal bgColor='transparent' show={OPEN_MODAL_CAT_EXTRA.state} backdrop onCancel={() => OPEN_MODAL_CAT_EXTRA.setState(false)} onHide={() => OPEN_MODAL_CAT_EXTRA.setState(false)} btnConfirm={false} header={false} footer={false} padding='10px' size='70%' zIndex='99988' >
                <ContentModal height='400px'>
                    <GarnishChoicesHeader>
                        <div>
                            <p className="garnish-choices__title">{moment(INFO_EXTRA.state.pDatCre).format('YYYY-MM-DD')}</p>
                            <p className="garnish-choices__title">{INFO_EXTRA.state.OptionalProName}</p>
                            <p className="garnish-choices__title-desc">Escoge hasta {INFO_EXTRA.state.numbersOptionalOnly} opciones.</p>
                        </div>
                        {INFO_EXTRA.state.required === 1 ? <div className="garnish-choices">
                            <span span className="marmita-minitag">OBLIGATORIO</span>
                        </div> : null}
                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleDeleteCatOptional(INFO_EXTRA.state)} >
                            <IconDelete size='25px' color={EColor} />
                        </RippleButton>
                    </GarnishChoicesHeader>
                    <InputHooks required onChange={handleChange} name='OptionalProName' value={dataForm.OptionalProName} />
                    <RippleButton margin='0px' widthButton='25%' padding='5' type="button" onClick={() => { }} >
                        Editar
                    </RippleButton>
                </ContentModal>
            </AwesomeModal>
        </Container >);
};

export const OptionalExtraProducts = ({ pId, dataOptional }) => {
    // STATES
    const [data, setData] = useState(MockData);
    const [numberLimit, setNumberLimit] = useState(2);
    const [title, setTitle] = useState('');
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
            required: setCheck.exState,
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
            }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => updateCache({
                cache,
                query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
                nameFun: 'ExtProductFoodsOptionalAll',
                dataNew: ExtProductFoodsOptionalAll
            })
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
                        numbersOptionalOnly: numberLimit,
                    }
                },
                update: (cache, { data: { ExtProductFoodsOptionalAll } }) => updateCache({
                    cache,
                    query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
                    nameFun: 'ExtProductFoodsOptionalAll',
                    dataNew: ExtProductFoodsOptionalAll
                })
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
                <DragDropContext onDragEnd={onDragEnd} key={index + 1}>
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
                                                <div className="garnish-choices">
                                                    {list.required === 1 && <span className="marmita-minitag">OBLIGATORIO</span>}
                                                </div>
                                            </div>
                                            <IconMiniCheck size={'15px'} color={'#009b3a'} />
                                            <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" onClick={() => handleRemoveList(index)} >
                                                <IconDelete size='25px' color={EColor} />
                                            </RippleButton>
                                        </GarnishChoicesHeader>
                                        <span>{list?.cards?.length}</span>
                                        <List list={list} index={index} setData={setData} data={data} />
                                        <Input card aria-disabled autoFocus onKeyDown={(event) => (event.key === 'Enter' && handleAdd({ listId: listID }))} onChange={(e) => setTitle(e.target.value)} value={listID.title} name='title' placeholder='enter card' />
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
            <GarnishChoicesHeader>
                <div>
                    <p className="garnish-choices__title">{title ? title : 'Escoge tu... '}</p>
                    <p className="garnish-choices__title-desc">Escoge hasta {numberLimit} opciones.</p>
                </div>
                <div className="garnish-choices">
                    {setCheck.exState === 1 && <span className="marmita-minitag">OBLIGATORIO</span>}
                </div>
                <div>
                    <div>
                        <RippleButton bgColor={'transparent'} margin='0px' widthButton='min-content' type="button" >
                            <IconDelete size='25px' color={`${EColor}90`} />
                        </RippleButton>
                    </div>
                </div>
            </GarnishChoicesHeader>
            <Input margin='10px 0' card onChange={(e) => setTitle(e.target.value)} value={title} name='title' type="text" placeholder='Añadir nueva lista' />
            <GarnishChoicesHeader>
                <ContentCheckbox>
                    <Input
                        checkbox
                        type='checkbox'
                        margin='10px 0'
                        name={'exState'}
                        onChange={e => handleCheck(e)}
                    />
                </ContentCheckbox>
                <RippleButton widthButton='100%' margin='0' padding='0' type="button" onClick={() => handleAddList({ title: title, numberLimit: numberLimit })}>Add list</RippleButton>
                <div style={{ display: 'block' }}>
                    <RippleButton widthButton='100%' bgColor={'transparent'} border='1px solid' margin='0' padding='0' type="button" onClick={() => setNumberLimit(numberLimit + 1)}><IconPlus color={PColor} size='16px' /></RippleButton>
                    <RippleButton widthButton='100%' color='#000' bgColor={'transparent'} border='1px solid' margin='0' padding='0' type="button" onClick={() => setNumberLimit(numberLimit = 0 && numberLimit - 1)}>--</RippleButton>
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

export const InputHookProducts = ({ placeholder, value, onChange, inputText, type, color }) => {
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
