'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import ThemeTogleButton from './theme_togle_button';
// import gsap from 'gsap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const mobileMenuRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    const menulist = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Qualification', href: '/qualification' },
        { label: 'Skills and Knowledge', href: '/skills-and-knowledge' },
        { label: 'Reference', href: '/reference' },
    ];

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const clickHandler1 = () => {
        console.log('Button clicked');
    }
    console.log(isOpen)
    return (
        <section className='z-50 sticky top-0 overflow-x-clip'>
            <nav className='w-full px-5 py-1 backdrop-blur-[10px] flex justify-between items-center border-b border-amber-600/20 relative '
                style={{ background: 'var(--headerBg)' }}
            >
                {/* logo wapper */}
                <Link href='/'>
                    <div className="logo text-3xl text-[var(--text-color)] font-bold">
                        <span>&lt;&#123;p/b&#125;&gt;</span>
                    </div>
                </Link>
                {/* ====menu wrapper== */}
                <div className='hidden lg:block'>

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
                </div>
                {/* ====rest== */}
                <div className='flex gap-5 items-center justify-end'>
                    <ThemeTogleButton />


                    {/* =====mobile menu=== */}
                    <div onClick={handleClick} ref={mobileMenuButtonRef} className='w-fit h-fit block lg:hidden'>
                        <div
                            className="iconDiv relative w-12 h-8 cursor-pointer flex items-center justify-center"
                        >
                            <div
                                className={`absolute w-full h-1 bg-[var(--text-color)] rounded-md transition-all duration-300 ${isOpen ? "rotate-45" : "-translate-y-3"
                                    }`}
                            />

                            <div
                                className={`absolute w-full h-1 bg-[var(--text-color)] rounded-md transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                                    }`}
                            />

                            <div
                                className={`absolute w-full h-1 bg-[var(--text-color)] rounded-md transition-all duration-300 ${isOpen ? "-rotate-45" : "translate-y-3"
                                    }`}
                            />
                        </div>

                    </div>



                    <button className='hidden md:block myBtnBg font-josefin text-black text-xl font-josefin-slab px-5 py-2 cursor-pointer' onClick={clickHandler1}>
                        Buy me a Cofee
                    </button>
                </div>


                {/* &&&&&&&&&&&&&&  mobile menu  &&&&&&&&&&&&&&&&&&&&& */}

                <div ref={mobileMenuRef} className={`absolute top-16 ${isOpen ? 'right-0' : 'right-[-100%]'} w-1/2 h-full min-h-screen bg-[var(--bg-color)] p-5`}>
                    <ul className='flex flex-col gap-5 text-gray-200 font-oswald font-light'>
                        {menulist.map((item) => (
                            <li key={item.href} className='menuItem relative group transition-all duration-300 '>
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
                </div>

            </nav>
        </section>
    )
}

export default Header