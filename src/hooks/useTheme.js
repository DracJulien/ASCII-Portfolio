import { useEffect, useState } from 'react'

const KEY = 'prefersLight'

export default function useTheme(){
  const [theme, setTheme] = useState('dark')

  useEffect(()=>{
    const light = localStorage.getItem(KEY) === '1'
    setTheme(light ? 'light' : 'dark')
  }, [])

  useEffect(()=>{
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark'
    document.body.dataset.theme = theme
  }, [theme])

  function toggleTheme(){
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem(KEY, next === 'light' ? '1' : '0')
      return next
    })
  }

  return { theme, toggleTheme }
}
