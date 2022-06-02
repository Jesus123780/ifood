import { useCallback, useEffect, useRef, useState } from 'react'

export function useDrag2(ref) {
  useEffect(() => {
    const target = ref.current
    if (!target) return
    const previousOffset = { x: 0, y: 0 }
    let originMouseX
    let originMouseY
    function onMousemove(e) {
      const { pageX, pageY } = e
      const x = pageX - originMouseX + previousOffset.x
      const y = pageY - originMouseY + previousOffset.y
      target.style.transform = `translate(${x}px, ${y}px)`
    }
    function onMouseup(e) {
      previousOffset.x += e.pageX - originMouseX
      previousOffset.y += e.pageY - originMouseY
      window.removeEventListener('mousemove', onMousemove)
      window.removeEventListener('mouseup', onMouseup)
    }
    function onMousedown(e) {
      originMouseX = e.pageX
      originMouseY = e.pageY
      window.addEventListener('mousemove', onMousemove)
      window.addEventListener('mouseup', onMouseup)
    }
    target.addEventListener('mousedown', onMousedown)
    // eslint-disable-next-line consistent-return
    return () => {
      target?.removeEventListener('mousedown', onMousedown)
      window?.removeEventListener('mouseup', onMouseup)
      window?.removeEventListener('mousemove', onMousemove)
    }
  }, [ref])
}

export const useDrag = (x, y) => {
  const [move, setMove] = useState(false)
  const [moveTo, setMoveTo] = useState([x, y])
  const moveIcon = e => {
    const xcoord = moveTo[0] + e.movementX
    const ycoord = moveTo[1] + e.movementY
    setMoveTo([xcoord, ycoord])
  }
  const handleMove = e => {
    move && moveIcon(e)
  }
  const handelDown = () => {
    setMove(true)
  }
  const handelUp = () => {
    setMove(false)
  }

  return { move, moveTo, handelDown, handelUp, handleMove }
}

export const Draggable = ({ children, moveY = false, moveX = false, minX, minY, maxX, maxY }) => {
  const elemRef = useRef(null)
  const dragProps = useRef()
  useEffect(() => {
    if (elemRef.current) {
      elemRef.current.style.left = `${minX | 0}px`
      elemRef.current.style.top = `${minY | 0}px`
    }
  }, [minX, minY])

  const initialiseDrag = event => {
    const { target, clientX, clientY } = event
    const { offsetTop, offsetLeft } = target
    const { left, top } = elemRef.current.getBoundingClientRect()
    dragProps.current = {
      dragStartLeft: left - offsetLeft,
      dragStartTop: top - offsetTop,
      dragStartX: clientX,
      dragStartY: clientY
    }
    window.addEventListener('mousemove', startDragging, false)
    window.addEventListener('mouseup', stopDragging, false)
  }
  const stopDragging = useCallback(() => {
    window.removeEventListener('mousemove', startDragging, false)
    window.removeEventListener('mouseup', stopDragging, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleChange = ({ touches }) => {
    const { clientX, clientY } = touches[0]
    handleValidation({ valueX: clientX, valueY: clientY })
  }
  const startDragging = useCallback(({ clientX, clientY }) => {
    const valueX = dragProps.current.dragStartLeft + clientX - dragProps.current.dragStartX
    const valueY = dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY
    handleValidation({ valueX, valueY })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', startDragging, false)
      window.removeEventListener('mouseup', stopDragging, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleValidation = useCallback(({ valueX, valueY }) => {
    if (moveX) {
      if (maxX && maxX > valueX) {
        valueX = maxX
      }
      else if (minX && minX < valueX) {
        valueX = minX
      }
      elemRef.current.style.left = `${valueX}px`
    }
    if (moveY) {
      if (maxY && maxY > valueY) {
        valueY = maxY
      }
      else if (minY && minY < valueY) {
        valueY = minY
      }
      elemRef.current.style.top = `${valueY}px`
    }
  }, [maxX, maxY, minX, minY, moveX, moveY])
  return (
    <div
      onMouseDown={initialiseDrag}
      onTouchMove={handleChange}
      ref={elemRef}
      style={{
        width: '100%',
        position: 'fixed',
        touchAction: 'none'
      }}
    >
      {children}
    </div >
  )
}