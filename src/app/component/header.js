'use client'

import Link from 'next/link'
import React from 'react'
import ThemeTogleButton from './theme_togle_button';

const Header = () => {
    const menulist = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Qualification', href: '/qualification' },
        { label: 'Skills and Knowledge', href: '/skills-and-knowledge' },
        { label: 'Reference', href: '/reference' },
    ];

    const clickHandler1 = () => {
        console.log('Button clicked');
    }
    return (
        <section className='z-50'>
            <nav className='w-full px-5 py-1 bg-[var(--bg-color)]  flex justify-between items-center border-b border-amber-600/20'>
                {/* logo wapper */}
                <div className="logo text-xl text-[var(--text-color)]">
                    pronob
                </div>
                <ul className='flex gap-5 text-gray-200 font-oswald font-light'>
                    {menulist.map((item) => (
                        <li key={item.href} className='menuItem relative group transition-all duration-300'>
                            <Link href={item.href}>
                                <div className='w-fit flex items-center '>
                                    <div className="navLink w-full h-6   relative flex flex-col overflow-hidden z-20 ">
                                        <span className='group-hover:translate-y-[-22px] transition-all duration-300 tracking-widest text-[var(--text-color)]'>{item.label}</span>
                                        <span className='group-hover:translate-y-[-24px] text-[var(--text-color)] transition-all duration-300 tracking-widest'>{item.label}</span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <ThemeTogleButton/>
                <button className='myBtnBg font-josefin text-black text-xl px-5 py-2 cursor-pointer' onClick={clickHandler1}>
                    Connect
                </button>
            </nav>
        </section>
    )
}

export default Header