import { useEffect, useState } from 'react'
import { darkTheme, lightTheme } from '../../constants/theme'

export const useTheme = () => {
    const [theme, setTheme] = useState(lightTheme)
    const [keyTheme, setKeyTheme] = useState('light')
    const [mountedComponent, setMountedComponent] = useState(false)

    const setMode = (themeMode, mode) => {
        window.localStorage.setItem('theme', mode)
        setTheme(themeMode)
    }

    const handleTheme = mode => {
        mode === 'light' ? setMode(lightTheme, 'light') : setMode(darkTheme, mode)
        setKeyTheme(mode)
    }
    const [time, changeTime] = useState(new Date().toLocaleTimeString());
    useEffect(function () {
        setInterval(() => {
            changeTime(new Date().toLocaleTimeString());
        }, 1000);
        if (time > 10) setMode(darkTheme)
    }, []);
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme')
        localTheme ? handleTheme(localTheme) : handleTheme('light')
        setMountedComponent(true)
    }, [])

    return [theme, handleTheme, mountedComponent, { keyTheme }]
}