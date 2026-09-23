'use client'
import React, { useEffect, useState } from 'react'
import darkIcon from '@/public/image/paint_dark.png'
import lightIcon from '@/public/image/paint_light.png'
import Image from 'next/image'

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
        className="p-1 w-10 border border-[var(--text-color)] rounded-full bg-[var(--bg-color)] text-[var(--text-color)]" 
      >
        {
          changedTheme?
          <Image src={darkIcon} alt='dark' className='w-full h-full object-cover'/>
          :
          <Image src={lightIcon} alt='light' className='w-full h-full object-cover'/>
        }
      </button>
      
    </div>
  )
}

export default ThemeTogleButton