'use client'

import { useEffect, useState } from "react";
import React from 'react'
import Banner from './banner'

import dynamic from 'next/dynamic'
import DirectionalScrollCard from './directional_scroll_card'
import LaserFlowBoxExample from './three_component/laserflowwithbg'
import Qualification_commponent from './qualification_commponent'
import HexagonVideo from './hexagonanimation'
// import LaserFlow from './laserflow'



const TargetCursor = dynamic(
    () => import('./targetCursor'),
    {
        ssr: false,
    }
)


const Maincomponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


        useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch("/api/user");

                const data = await response.json();

                if (data.success) {
                    setUsers(data.users);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);



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
            <HexagonVideo/>
        </div>
    )
}

export default Maincomponent