import Image from 'next/image'
import React, { useLayoutEffect } from 'react'
import gsap from 'gsap'
import Textbg from './text_bg01.jpg'

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);


const qualificationData = {
  mern: {
    year: 2025,
    Institution: "Creative IT Institute , Dhanmondi , Dhaka",
    percentage: 80,
    board: "Creative IT Institute",
    stream: "MERN Stack Development",
  },
  rwd: {
    year: 2023,
    Institution: "Coders Trust Bangladesh, Mirpur, Dhaka",
    percentage: 95,
    board: "Coders Trust Bangladesh",
    stream: "Responsive Web Design",
  },
  hsc: {
    year: 2013,
    Institution: "Kazi Azhar Ali College, Fakirhat",
    board: "Jeshore Board",
    stream: "Business Studies",
    percentage: 70,
  },
  ssc: {
    year: 2011,
    Institution: "S.S Niketan Khalishpur Secondary School",
    board: "Jeshore Board",
    stream: "Business Studies",
    percentage: 73.4,
  },

};

const Qualification_commponent = () => {

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".qualification-item", {
        y: 200,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: "#qualificationSection",
          start: "top 80%",
          end: "bottom 95%",
          scrub: true,
          markers: false
        }
      });

      gsap.fromTo(
        ".qualification_title",
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "200% 100%",
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#qualificationSection",
            start: "top 80%",
            end: "bottom 95%",
            scrub: true,
          }
        }
      );

    });
    return () => ctx.revert();
  }, []);



  return (
    <>
      <section id="qualificationSection" className="w-full h-full bg-[var(--bg-color)]">
        {/* ====wrapper=== */}
        <div className="w-full py-10 md:py-20 lg:py-40 px-5">
          <h2 className="qualification_title text-5xl leading-[1.52] bg-red-500">
            Education and Training
          </h2>

          {/* <div className="w-full flex justify-between gap-5 mt-12">
            <div className='qualification-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {Object.entries(qualificationData).map(([key, value]) => (
                <div key={key} className='qualification-item w-full border border-red-600 overflow-clip rounded-md'>
                  <div className='qualification-header w-full h-fit py-8 bg-black/0 flex items-center justify-center'>
                    <h3 className='qualification-title text-3xl font-bold uppercase'>{key}</h3>
                  </div>
                  <ul className='p-5 relative'>
                    <div className="absolute w-full h-full top-0 left-0 bg-gray-900  rotate-z-45"></div>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <li key={subKey} className='qualification-detail flex gap-5'>
                        <strong>{subKey}:</strong> {subValue}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div> */}

          <div className="w-full flex justify-between gap-5 mt-12">
            <div className="qualification-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {Object.entries(qualificationData).map(([key, value]) => (
                <div
                  key={key}
                  className="qualification-item relative w-full border border-slate-600 rounded-md overflow-hidden bg-[var(--text-color)] qualification_card"

                >
                  {/* Header */}
                  <div className="qualification-header w-full p-6 flex gap-5 items-end justify-start relative z-10">
                    <div className='w-20 h-20 bg-green-700'></div>
                    <h3 className="qualification-title text-3xl font-bold uppercase text-[var(--bg-color)]">
                      {key}
                    </h3>
                  </div>

                  {/* =====*/}
                  <div className="relative  rounded-md overflow-clip">
                    {/* Trapezoid shape inside */}
                    {/* <div className="absolute inset-0 bg-gray-800 clip_trapezoid"></div> */}

                    {/* Content list */}
                    <ul className="relative z-10 p-5 text-[var(--bg-color)]">
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey} className="qualification-detail flex gap-5">
                          <strong className='capitalize'>{subKey}:</strong> {subValue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>



        </div>
      </section>
    </>
  )
}

export default Qualification_commponent
