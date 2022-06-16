import { EmptyLayout } from 'pages/_app'
import React, { useRef, useState } from 'react'
import { RandomCode } from 'utils'
const Dessert = () => {
  const data = [
    {
      title: null,
      items: [
        {
          id: 0,
          title: 'Dulce de Leche'

        }
      ]
    }
  ]
  const [list, setList] = useState(data)
  const [dragging, setDragging] = useState(false)
  const initialCoOrdinate = {
    groupIndex: 0,
    itemIndex: 0
  }
  const dragItem = useRef(initialCoOrdinate)
  const dragNode = useRef()
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
    dragItem.current = initialCoOrdinate
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
  const addCard = (groupIndex, itemIndex) => {
    const id = RandomCode(9)
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList))
      newList[groupIndex].items.splice(itemIndex, 0, id)
      return newList
    })
  }
  const removeCard = (groupIndex, itemIndex) => {
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList))
      newList[groupIndex].items.splice(itemIndex, 1)
      return newList
    })
  }
  const duplicateCard = (groupIndex, itemIndex) => {
    const duplicate = list[groupIndex].items[itemIndex]
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList))
      newList[groupIndex].items.splice(itemIndex, 0, duplicate)
      return newList
    })
  }
  const removeRow = (groupIndex) => {
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList))
      newList.splice(groupIndex, 1)
      return newList
    })
  }
  const addNewRow = () => {
    const id = RandomCode(9)
    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList))
      newList.push({
        title: id, id: id, items: [
          {
            title: 'Elige tu salsa favorita'
          }
        ]
      })
      return newList
    })
  }
  return (
    <div className='box-container'>
      <button onClick={() => { addNewRow() }}>ADD</button>
      <div className='box-container'>
        {list?.length > 0 && list.map((grp, grpIdx) => {
          return (
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
              <button onClick={() => { return removeRow(grp) }}>X    </button>
              <div className='group-title'>{grp.title}</div>
              {grp.items.map((item, itemIdx) => {
                return (
                  <div
                    className={dragging ? getStyles(grpIdx, itemIdx) : 'box-items'}
                    draggable
                    key={item}
                    onDragEnter={
                      dragging
                        ? (e) => { return handleDragEnter(e, grpIdx, itemIdx) }
                        : undefined
                    }
                    onDragStart={(e) => { return handleDragStart(e, grpIdx, itemIdx) }}
                  >
                    {item.id}
                    <button onClick={() => { addCard(grpIdx, itemIdx) }}>add</button>
                    <button onClick={() => { removeCard(grpIdx, itemIdx) }}>remove</button>
                    <button onClick={() => { duplicateCard(grpIdx, itemIdx) }}>duplicate</button>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dessert
Dessert.Layout = EmptyLayout