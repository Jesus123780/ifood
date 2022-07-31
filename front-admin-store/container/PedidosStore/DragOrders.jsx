import Column from 'components/common/Atoms/Column'
import Row from 'components/common/Atoms/Row'
import Text from 'components/common/Atoms/Text'
import { Context } from 'context/Context'
import { EmptyLayout } from 'pages/_app'
import { BGColor, PVColor, SEGColor } from 'public/colors'
import { IconDost } from 'public/icons'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RandomCode, updateCache } from 'utils'
import { useQuery, useMutation } from '@apollo/client'
import { CHANGE_STATE_STORE_PEDIDO, GET_ALL_PEDIDOS } from './queries'

const DragOrders = ({ dataReadyOrder, dataRechazados, dataConcludes, dataProgressOrder, data: dataInitial }) => {
    // STATES
    const { setAlertBox } = useContext(Context)
    const data = [
        {
            title: `Pedidos entrantes`,

            items: dataInitial || []
        },
        {
            title: `pedidos en progreso`,
            items: dataProgressOrder || []
        },
        {
            title: `Pedidos listos para entrega`,
            items: dataReadyOrder || []
        },
        {
            title: `Pedidos concluidos`,
            items: dataConcludes || []
        },
        {
            title: `Rechazados`,
            items: dataRechazados || []
        },
    ]
    const [list, setList] = useState(data)
    // QUERIES
    const [changePPStatePPedido, { loading, error }] = useMutation(CHANGE_STATE_STORE_PEDIDO, {
      onCompleted: (res) => {
        setAlertBox({ message: res.changePPStatePPedido.message })
      }
    })
    // EFFECTS
    useEffect(() => {
        setList(data)
    }, [dataReadyOrder, dataRechazados, dataConcludes, dataProgressOrder, dataInitial])
    const [dragging, setDragging] = useState(false)
    const initialCoOrdinate = {
        groupIndex: 0,
        itemIndex: 0
    }
    const dragItem = useRef(initialCoOrdinate)
    const dragNode = useRef()
    // HANDLESS
    const [position, setPosition] = useState(undefined)
    const [elem, setElem] = useState('')

    const handleDragStart = (e, groupIndex, itemIndex, item) => {
        const { pCodeRef } = item || {}
        setElem(pCodeRef)
        console.log(pCodeRef)
        const currentItem = dragItem.current
        const params = {
            groupIndex: groupIndex,
            itemIndex: itemIndex
        }
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }
    const handleDragEnd = () => {
        let _a
        setDragging(false);
        (_a = dragNode.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('dragend', handleDragEnd)
        dragItem.current = initialCoOrdinate
        dragNode.current = undefined
        pushPosition()
    }
    const handleDragEnter = useCallback(
        (e, groupIndex, itemIndex, item) => {
            try {
                const { pSState } = item || {}
                const params = {
                    groupIndex: groupIndex,
                    itemIndex: itemIndex
                }
                const currentItem = dragItem.current
                if (e.target !== dragNode.current) {
                    setPosition(groupIndex + 1)
                    setList((oldList) => {
                        let newList = JSON.parse(JSON.stringify(oldList))
                        newList[params.groupIndex].items.splice(params.itemIndex, 0, newList[currentItem.groupIndex].items.splice(currentItem.itemIndex, 1)[0])
                        dragItem.current = params
                        return newList
                    })
                    if ((pSState !== currentItem.groupIndex + 1) && (position && elem)) {
    
                    }
                }
    
            } catch (error) {
                console.log(error)
            }
        },
        [position, data, dragItem.current],
    )

    // const handleDragEnter = (e, groupIndex, itemIndex, item) => {
  
    // }
    const getStyles = (groupIndex, itemIndex) => {
        const currentItem = dragItem.current
        if (currentItem.groupIndex === groupIndex &&
            currentItem.itemIndex === itemIndex) {
            return 'current box-items'
        }
        return 'box-items'
    }
    console.log(elem)
    useEffect(() => {
        setPosition(position)
        setElem(elem)
    }, [position, elem])

    function pushPosition() {
        changePPStatePPedido({
            variables: {
                pPStateP: position,
                pCodeRef: elem,
                pDatMod: new Date()
            }, update: (cache, { data: { getAllPedidoStoreFinal } }) => {return updateCache({
              cache,
              query: GET_ALL_PEDIDOS,
              nameFun: 'getAllPedidoStoreFinal',
              dataNew: getAllPedidoStoreFinal
            })}
      
          })
    }
    return (
        <Column height='100%' with='fit-content' padding='0 0 40px 34px' alignItems='stretch' justifyContent='flex-start' backgroundColor={BGColor} userSelect='none'>
            <Row backgroundColor={BGColor} >
                {list?.length > 0 && list.map((grp, grpIdx) => {
                    return (
                        <Column margin={'0 15px 0 0 '} transition='1s ease' borderRadius='10px' maxWidth='260px' width='260px' background='#f4f5f7' key={grp.title}
                            onDragEnter={
                                dragging && !grp.items.length
                                    ? (e) => {
                                        handleDragEnter(e, grpIdx, 0)
                                    }
                                    : undefined
                            }

                        >
                            <Column height={'45px'} overflow={'hidden'} textOverflow='ellipsis' maxHeight='calc(100%  - 45px)'>
                                <Text as='h2' fontSize='10px' margin='15px 0 0 10px' textAlign={'start'} color='#5e6c84' textTransform='uppercase' textOverflow='ellipsis' className='group-title'>{grp.title}</Text>
                            </Column>
                            {
                                dragging && <Column display='grid' placeContent='center' border={`1px solid ${PVColor}`} backgroundColor={`${PVColor}10`} width='95%' margin='auto' borderRadius='5px' height='40px' >
                                    <Text fontSize='10px' family='PFont-Regular' color={SEGColor}>{grp.title}</Text>
                                </Column>

                            }
                            {grp.items.length > 0 && grp.items.map((item, itemIdx) => {
                                return (
                                    <Column position={'relative'} gridTemplate={`"image" 157px "info-price" 1fr "info" 1fr`} display='grid' draggable={true} width='96%' borderRadius='5px ' margin='auto'
                                        className={dragging ? getStyles(grpIdx, itemIdx) : 'box-items'}
                                        key={item?.pCodeRef}
                                        onDragEnter={dragging ? (e) => { return handleDragEnter(e, grpIdx, itemIdx, item) } : undefined} onDragStart={(e) => { return handleDragStart(e, grpIdx, itemIdx, item) }}
                                    >

                                        <Column as='button' height='35px' placeContent='center' display='grid' borderRadius='2px' right='15px' top='15px' position='absolute' width='min-content'>
                                            <IconDost size='20px' />
                                        </Column>
                                        <Column gridArea='image'>
                                            {item?.pCodeRef}
                                        </Column>
                                        <Column gridArea='info-price'>
                                            <Text fontSize='10px' family='PFont-Regular' color={SEGColor}>{grp.title}</Text>
                                        </Column>
                                        <Column gridArea='info'>
                                            <Text fontSize='10px' >{item?.pCodeRef}</Text>
                                        </Column>
                                    </Column>
                                )
                            })}
                        </Column>
                    )
                })}
            </Row>
        </Column>
    )
}

export default DragOrders
