import React, { useState, useEffect } from 'react'

const HookMouse = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  function logMousePosition(e) {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', logMousePosition)

    return () => {
      window.removeEventListener('mousemove', logMousePosition)
    }
  }, [])

  return (
    <div>
      Hooks X - {x} Y - {y}
    </div>
  )
}

export default HookMouse

export function useFakeSvgDrag() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  return {
    coordinates,
    startDrag: coordinates => {
      setDragging(true)
    },
    drag: coordinates => {
      if (dragging) {
        setCoordinates(coordinates)
      }
    },
    stopDrag: _ => {
      setDragging(false)
    }
  }
}

export function getCoordinates(event) {
  const { top, left } = event.target.getBoundingClientRect()

  return {
    x: event.clientX - left,
    y: event.clientX - parseInt(top, 10)
  }
}