import { useState, useEffect, useCallback } from 'react'

const defaultSettings = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
}

export const usePosition = (watch = false, settings = defaultSettings) => {
  const [position, setPosition] = useState({})
  const [error, setError] = useState(null)

  const onChange = ({ coords, timestamp }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      speed: coords.speed,
      timestamp
    })
  }

  const onError = useCallback(() => {
    setError(error?.message)
  }, [error?.message])

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }

    let watcher = null
    if (watch) {
      watcher = navigator.geolocation.watchPosition(
        onChange,
        onError,
        settings
      )
    } else {
      navigator.geolocation.getCurrentPosition(onChange, onError, settings)
    }

    // eslint-disable-next-line consistent-return
    return () => { return watcher && navigator.geolocation.clearWatch(watcher) }
  }, [settings, settings.enableHighAccuracy, settings.timeout, settings.maximumAge, watch, onError])

  return { ...position, error }
}