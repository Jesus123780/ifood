import React, { useEffect, useState, useReducer } from 'react'
import PropTypes from 'prop-types'
import { BtnIcon, ContainerTable, Content, Section, TableBtn, Text, Title, CheckBoxWrapper, CheckBox, CheckBoxLabel, TableResponsive, StatusC, EntryPerViewC, EntryLabel, EntryInput, EntryPaginationC, EntryButton, CurrentPage, ArrowsCheck, ArrowsLabel, Button } from './styled'
import { orderColumn } from './orderColumn'
import { IconArrowBottom, IconArrowTop } from '../../public/icons'
import { BColor } from '../../public/colors'

export const Table = ({ titles = [], bgRow, data, pointer, renderBody = [], entryPerView, handleAdd, buttonAdd, labelBtn }) => {
  const initialState = { selectedIndex: 0 }

  function reducer (state, action) {
    switch (action.type) {
      case 'arrowUp':
        return {
          selectedIndex:
            state.selectedIndex !== 0 ? state.selectedIndex - 1 : data.length - 1
        }
      case 'arrowDown':
        return {
          selectedIndex:
            state.selectedIndex !== data.length - 1 ? state.selectedIndex + 1 : 0
        }
      case 'select':
        return { selectedIndex: action.payload }
      default:
        throw new Error()
    }
  }
  const arrowUpPressed = useKeyPress('ArrowUp')
  const arrowDownPressed = useKeyPress('ArrowDown')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: 'arrowUp' })
    }
  }, [arrowUpPressed])

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: 'arrowDown' })
    }
  }, [arrowDownPressed])

  const [currentColumn, setCurrentColumn] = useState({})
  const [properties, setProperties] = useState({
    currentPage: 1,
    entriesValue: 100,
    pages: [],
    indexFirstElem: '',
    indexLastElem: ''
  })
  const [pages, setPages] = useState([])

  useEffect(() => {
    const allPages = Math.ceil(data?.length / properties.entriesValue)
    setPages([])
    for (let i = 0; i < allPages; i++) {
      setPages(s => {return [...s, i]})
    }
    const indexLastElem = properties.currentPage * properties.entriesValue
    const indexFirstElem = indexLastElem - properties.entriesValue
    setProperties({ ...properties, indexLastElem, indexFirstElem })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties.entriesValue, properties.currentPage, data])

  const handleEntries = event => {
    const { value } = event.target
    value >= 10 && setProperties({ ...properties, entriesValue: parseInt(value) })
  }
  // Handle para identificar columna seleccionada
  const handleColumn = (e, key) => {
    const { name, checked } = e.target
    setCurrentColumn({ [name]: checked ? 0 : 1, key })
  }
  const fileInputRef = React.useRef(null)

  const onTargetClick = e => {
    e.preventDefault()
    fileInputRef?.current?.click()
  }
  return (
    <>
      <EntryPerViewC>
        {(entryPerView && data?.length > 0) && <EntryLabel>
          Mostrar
          <EntryInput
            max={data?.length?.toString()}
            onChange={handleEntries}
            step={100}
            type='number'
            value={properties.entriesValue}
          />
          elementos
        </EntryLabel>}
        {buttonAdd && <TableButton
          label={`Add ${labelBtn}`}
          onClick={handleAdd}
          type={4}
        />}
      </EntryPerViewC>
      <TableResponsive>
        <ContainerTable>
          <Section bgRow={bgRow} columnWidth={titles || []}>
            {titles?.map((x, i) => {return <Content justify={x.justify} key={i}>
              <ArrowsLabel htmlFor={x.key}>
                <Title onClick={onTargetClick} pointer={pointer}>{x.name}</Title>
              </ArrowsLabel>
              {x.arrow && <ArrowsLabel htmlFor={x.key}>
                <ArrowsCheck
                  id={x.key}
                  name={x.key}
                  onChange={(e) => {return handleColumn(e, x.key)}}
                  ref={fileInputRef}
                  type='checkbox'
                />
                <Button onClick={onTargetClick} style={{ height: '10px' }}><IconArrowTop color={currentColumn?.[`${x.key}`] === 0 ? BColor : '#d0d7ec'} size='15px' /></Button>
                <Button onClick={onTargetClick} style={{ height: '10px' }}><IconArrowBottom color={currentColumn?.[`${x.key}`] === 1 ? BColor : '#d0d7ec'} size='15px' /></Button>
              </ArrowsLabel>}
            </Content>})}
          </Section>
          {renderBody(data?.filter((x, i) => {return ((i >= properties.indexFirstElem) && i < properties.indexLastElem)})?.sort((prev, post) => {return orderColumn(prev, post, currentColumn)}), titles, properties.indexFirstElem)}
        </ContainerTable>
      </TableResponsive>
      {entryPerView && data?.length > 0 && <EntryPaginationC>
        <Text size='12px'>Show {properties.currentPage} / {pages.length} Pages </Text>
        <div style={{ display: 'flex' }}>
          <EntryButton onClick={() => {return setProperties(s => {return { ...properties, currentPage: properties.currentPage !== 1 ? s.currentPage - 1 : 1 }})}}>Before</EntryButton>
          {pages.map(x => {return <CurrentPage
            current={(x + 1 === properties.currentPage && 'true')}
            key={x}
            onClick={() => {return setProperties({ ...properties, currentPage: x + 1 })}}
          >{x + 1}</CurrentPage>})}
          <EntryButton onClick={() => {return setProperties(s => {return { ...properties, currentPage: s.currentPage !== pages.length ? s.currentPage + 1 : s.currentPage }})}} >Next</EntryButton>
        </div>
      </EntryPaginationC>}
    </>
  )
}
// Botones de la tabla, recibe tres props, Type, Icon, Label
export const TableButton = ({ onClick, type, icon, label }) => {
  return (
    <TableBtn color={type} onClick={onClick}>
      <BtnIcon icon={icon} />
      <Text color={type} padding>{label} </Text>
    </TableBtn>
  )
}
// Status Toggle recibe como props ID
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
// Status recibe como props 'type', tipo 1 es 'Pagado'
export const Status = ({ type }) => {
  return (
    <StatusC color={type}>
      {type === 1 && 'Pagado'}
    </StatusC>
  )
}

export const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}

TableButton.propTypes = {
  type: PropTypes.number,
  onClick: PropTypes.func,
  icon: PropTypes.object,
  label: PropTypes.string
}

Table.propTypes = {
  titles: PropTypes.array,
  bgRow: PropTypes.number,
  buttonAdd: PropTypes.bool,
  data: PropTypes.array,
  handleAdd: PropTypes.func,
  pointer: PropTypes.bool,
  renderBody: PropTypes.func,
  labelBtn: PropTypes.string,
  entryPerView: PropTypes.bool || PropTypes.string,
  columnWidth: PropTypes.string

}

StatusToggle.propTypes = {
  id: PropTypes.string,
  state: PropTypes.bool,
  onChange: PropTypes.func
}

Status.propTypes = {
  type: PropTypes.number
}
