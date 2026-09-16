'use client'
import React, { useEffect, useState } from 'react'

const ThemeTogleButton = () => {
  const [themeColor, setThemeColor] = useState('white');
  useEffect(() => {
    document.body.setAttribute('data-theme', themeColor);
  }, [themeColor]);
  const changeTheme = () => {
    setThemeColor(prev => (prev === 'dark' ? 'white' : 'dark'));
  };
  return (
    <div>
      <button
        onClick={changeTheme}
        className="px-4 py-2 border border-[var(--text-color)] rounded bg-[var(--bg-color)] text-[var(--text-color)]"
      >
        <span >({themeColor})</span>
      </button>
    </div>
  )
}

export default ThemeTogleButton