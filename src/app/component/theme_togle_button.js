'use client'
import React, { useEffect, useState } from 'react'

const ThemeTogleButton = () => {
  const [themeColor, setThemeColor] = useState('white');
  const[changedTheme , setChangedTheme] = useState(false)
  useEffect(() => {
    document.body.setAttribute('data-theme', themeColor);
    setChangedTheme(!changedTheme)
  }, [themeColor]);
  const changeTheme = () => {
    setThemeColor(prev => (prev === 'dark' ? 'white' : 'dark'));
  };
  return (
    <div className=' gap-5'>
      <button
        onClick={changeTheme}
        className="px-4 py-2 border border-[var(--text-color)] rounded bg-[var(--bg-color)] text-[var(--text-color)]" 
      >
        {
          changedTheme?"light":"dark"
        }
      </button>
      
    </div>
  )
}

export default ThemeTogleButton