'use client'


import React from 'react'
import Banner from './banner'

import dynamic from 'next/dynamic'
import DirectionalScrollCard from './directional_scroll_card'
import LaserFlowBoxExample from './three_component/laserflowwithbg'
import Qualification_commponent from './qualification_commponent'
// import LaserFlow from './laserflow'



const TargetCursor = dynamic(
    () => import('./targetCursor'),
    {
        ssr: false,
    }
)

const Maincomponent = () => {
    return (
        <div className='w-full h-full bg-black'>
            <div>
                <TargetCursor
                    targetSelector=".cursor-target"
                    spinDuration={2}
                    hideDefaultCursor={true}
                    hoverDuration={0.2}
                    parallaxOn={true}
                    cursorColor="#ffffff"
                    cursorColorOnTarget="#ffffff"
                />
                <div id="targetsContainer" >
                    <Banner />
                    <DirectionalScrollCard/>
                    {/* <LaserFlow/>  */}
                    <LaserFlowBoxExample/>
                    <Qualification_commponent/>
                </div>
            </div>
        </div>
    )
}

export default Maincomponent