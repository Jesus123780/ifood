/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { SEGColor, SFVColor } from '../../public/colors'
import { IconCancel } from '../../public/icons'

export const InputTags = ({ width, disabled, setTags, tags, ...props }) => {
  const refBox = useRef()
  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)])
  }

  const addTags = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
    event.stopPropagation()
    if (event.target.value !== '') {
      setTags([...tags, event.target.value])
      props.selectedTags([...tags, event.target.value])
      event.target.value = ''
    }
  }
  return (
    <Box width={width} block={disabled} disabled={disabled} onClick={() => refBox.current.focus() }>
      <InputTag width={width} id="tags">
        <>
          {tags?.map((tag, index) => (
            <Tags key={index}>
              <Span>{tag}</Span>
              <IconContent onClick={() => !disabled && removeTags(index)}> <IconCancel size='11px' /> </IconContent>
            </Tags>
          ))}
          <InputText disabled={disabled} ref={refBox} type="text" onKeyDown={(event) => (event.key === 'Enter' ? addTags(event) : null)} placeholder="Press enter to add tags" />
        </>
      </InputTag>
    </Box>
  )
}
const Tags = styled.div`
  border: .5px solid ${`${SEGColor}69`};
  color: ${SEGColor};
  display: flex;
  place-content: center;
  margin: 0px 2px;
  padding: 0px 2px;
  border-radius: 20px;
  width: fit-content;
  justify-content: center;
  vertical-align: middle;
  align-items: center; 

`
const Box = styled.div`
    display: block;
    flex-direction: ${({ direction }) => direction || 'row'};
    position: relative;
    ${({ width }) => width && css`width: ${width};`}
    box-sizing: border-box;
    margin: 10px 5px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    ${props => props.block && css`
        background-color: ${SFVColor};
        cursor: no-drop;
    `}
 
`
const InputText = styled.input`
    border: none;
    box-shadow: none;
    outline: none;
    background-color: transparent;
    padding: 0 2px;
    width: fit-content;
    max-width: inherit;
    display: inline-block;
    max-height: 20px;
    font-size: 12px;
    &:disabled {
      cursor: no-drop;
      background-color: ${SFVColor};
    }
`
const IconContent = styled.div`
    padding: 2px;
    cursor: pointer;
`
const InputTag = styled.div`
    display: flex;
    padding: 5px;
    flex-wrap: wrap; 
    line-height: 20px;
    flex-direction: row;
    cursor: text;
    align-items: center;
    ${({ maxHeight }) => maxHeight && css`max-height: ${maxHeight};`}


`
const Span = styled.span`
    color: ${SEGColor};
    font-size: 10px;
    font-weight: normal;
    margin: 1px;
    padding: 1px;
    border-radius: 0;
    min-width: max-content;
  
`
