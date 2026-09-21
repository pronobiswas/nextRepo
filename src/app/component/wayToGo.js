import React from 'react'
import icon1 from '@/public/image/edit_tools.png'
import icon2 from '@/public/image/api.png'
import icon3 from '@/public/image/startup.png'
import Image from 'next/image'

const waytogo = {
  heading: "what i do?",
  cards: [
    {
      icon: icon1,
      title: 'figma to webpage',
      discription: 'onethe other hand, flowing client requirement generate idea with Ai ----make the website',

    },
    {
      icon: icon2,
      title: 'Api intrigetion',
      discription: 'connecting with cnd or fetch autorized backend api make the site interactive',

    },
    {
      icon: icon3,
      title: 'deploy to the host',
      discription: 'deploy the site to hosted domain for public and seo',

    },
  ]
}
const WayToGo = () => {
  return (
    <>
      <section className='w-full bg-[var(--bg-color)] p-5 py-12'>
        {/* ======wrapper */}
        <div className='w-full'>
          <h3 className='text-5xl capitalize font-oswald text-[var(--text-color)] mb-5 md:mb-8'>{waytogo.heading}</h3>
          <div className='cardWrapper w-full flex flex-col md:flex-row gap-5'>

            {
              waytogo.cards.map((item, idx) => (
                <div
                  className='servicesCard w-full p-[1px] relative rounded-md'
                  key={idx}>
                  <div className='servicesCardInner w-full h-full p-5 lg:p-8 2xl:p-12 flex flex-col gap-5 bg-[var(--bg-color)] rounded-md'>

                    {/* ===icon box */}
                    <div className='icon w-20 shrink-0'>
                      <Image src={item.icon} alt={item.title} className='w-full h-full object-cover' />
                    </div>
                    {/* ====content-box */}
                    <div className='text-[var(--text-color)]'>
                      <span className='font-oswald capitalize text-xl xl:text-2xl'>{item.title}</span>
                      <p className='font-josefin-slab text-base xl:text-xl mt-4'>{item.discription}</p>
                    </div>
                  </div>
                </div>
              ))
            }


          </div>

        </div>
      </section>
    </>
  )
}

export default WayToGo