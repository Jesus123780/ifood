import { Draggable } from 'hooks/useDrag'
import { getCoordinates, useFakeSvgDrag } from 'hooks/useMouseposition'
import { EmptyLayout } from 'pages/_app'
import { BGColor } from 'public/colors'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
const DragNDrop = () => {
  // https://codesandbox.io/s/k355wo7jk3?file=/index.js
  // https://codesandbox.io/s/react-drag-and-drop-hook-o67yn?file=/src/components/DragNDrop.tsx
  // https://codesandbox.io/s/fake-svg-drag-hook-5q5t5?file=/src/useFakeSvgDrag.js
  const data = [
    { title: 'group 1', items: ['1', '2', '3'] },
    { title: 'group 2', items: ['5', '6', '7'] },
    { title: 'group 3', items: ['88', '99'] },
    { title: 'group 4', items: ['0'] }
  ]

  const [list, setList] = useState(data)

  const [dragging, setDragging] = useState(false)
  const initialCoOrdiate = {
    groupIndex: 0,
    itemIndex: 0
  }
  const dragItem = useRef(initialCoOrdiate)
  const dragNode = useRef()
  // const handleDragStart = (e: React.DragEvent, params: CoOrd) => {
  const handleDragStart = (e, groupIndex, itemIndex) => {
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
    dragItem.current = initialCoOrdiate
    dragNode.current = undefined

  }
  const handleDragEnter = (e, groupIndex, itemIndex) => {
    const params = {
      groupIndex: groupIndex,
      itemIndex: itemIndex
    }
    const currentItem = dragItem.current
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList))
        newList[params.groupIndex].items.splice(params.itemIndex, 0, newList[currentItem.groupIndex].items.splice(currentItem.itemIndex, 1)[0])
        // console.log(newList)
        dragItem.current = params
        return newList
      })
    }
  }
  const getStyles = (groupIndex, itemIndex) => {
    const currentItem = dragItem.current
    if (currentItem.groupIndex === groupIndex &&
      currentItem.itemIndex === itemIndex) {
      return 'current box-items'
    }
    return 'box-items'
  }
  // menu
  const openedSize = 150

  const { coordinates, startDrag, drag, stopDrag } = useFakeSvgDrag()
  const [position, setCoordPosition] = useState(false)
  return (
    <div className='box-container'>
      <DraggableMenu
        height='400'
        onMouseDown={e => {
          startDrag(getCoordinates(e))
        }}
        onMouseMove={e => {
          drag(getCoordinates(e))
        }}
        onMouseOut={() => {
          stopDrag()
        }}
        onMouseUp={() => {
          stopDrag()
          setCoordPosition(!position)

        }}
      >

        <ContainerMenu offset={position ? 0 : coordinates.x} openedSize={ openedSize}>
          <li>
            About
          </li>
          <li>
            ContainerSearch
          </li>
        </ContainerMenu>
      </DraggableMenu>
      <div className='box-container'>
        {list.map((grp, grpIdx) => {return (
          <div
            className='box-group'
            key={grp.title}
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => {
                  handleDragEnter(e, grpIdx, 0)
                }
                : undefined
            }
          >
            <div className='group-title'>{grp.title}</div>
            {grp.items.map((item, itemIdx) => {return (
              <div
                className={dragging ? getStyles(grpIdx, itemIdx) : 'box-items'}
                draggable
                key={item}
                onDragEnter={
                  dragging
                    ? (e) => {return handleDragEnter(e, grpIdx, itemIdx)}
                    : undefined
                }
                onDragStart={(e) => {return handleDragStart(e, grpIdx, itemIdx)}}
              >
                {item}
              </div>
            )})}
          </div>
        )})}
      </div>
    </div>
  )
}
const DraggableMenu = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: red;

`
const ContainerMenu = styled.div`
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border: 1px solid blue;
    color: ${BGColor};
    transition: 250ms;
    width: ${({ openedSize }) => { return openedSize && `${openedSize}px` }};
    transform: ${({ openedSize, offset }) => {
    if (offset < 20) {
      return false
    }
    else if (offset > 20 && offset < 50) {
      return (openedSize, offset) && `translateX(${offset - openedSize}px)`
    }
    return `translateX(${-openedSize}px)`
  }};
`
export default DragNDrop
DragNDrop.Layout = EmptyLayout